import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'

import { API } from '@/config/api'

type Platform = {
  name: string
}

interface StreamerCommon {
  id: number
  name: string
  nickname: string
  platform: Platform
}
export interface StreamerList extends StreamerCommon {
  upvotes: number
  downvotes: number
}

export interface Streamer extends StreamerCommon {
  description: string
  image: string
}

export const fetchStreamers = () =>
  axios.get<StreamerList[]>(`${API.BASE_URL}/streamers`).then((response) => response.data)

export const fetchStreamer = (id: string) =>
  axios.get<Streamer>(`${API.BASE_URL}/streamers/${id}`).then((response) => response.data)

export const useQueryStreamers = (options?: UseQueryOptions<StreamerList[]>) => {
  return useQuery({
    queryKey: ['streamers'],
    queryFn: fetchStreamers,
    ...options,
    // refetchInterval: 1000,
  })
}

export const useQueryStreamerById = (id: string, options?: UseQueryOptions<Streamer>) => {
  return useQuery({
    queryKey: ['streamer', id],
    queryFn: () => fetchStreamer(id),
    ...options,
    // refetchInterval: 1000,
  })
}

export const useMutationStreamers = () => {
  return useMutation({
    mutationKey: ['streamers'],
    mutationFn: (data: any) => {
      return axios.post(`${API.BASE_URL}/streamers`, data)
    },
  })
}

export const useVoteStreamer = (id: string | number) => {
  const session = useSession()
  const token = session.data?.user.access_token
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['streamers'],
    mutationFn: (data: any) => {
      return axios.put(`${API.BASE_URL}/streamers/${id}/vote`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['streamers'])
    },
  })
}
