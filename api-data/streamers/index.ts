import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

import axios from '@/config/axios'
import axiosAuth from '@/config/axiosAuth'
import { CreateStreamerFormType } from '@/lib/form-schema/create-streamer'

type Platform = {
  name: string
}

interface StreamerCommon {
  id: number
  name: string
  nickname: string
  platform: Platform
}
export interface StreamerListItem extends StreamerCommon {
  upvotes: number
  downvotes: number
}

export interface Streamer extends StreamerCommon {
  description: string
  image: string
}

export const fetchStreamers = () =>
  axios.get<StreamerListItem[]>('streamers').then((response) => response.data)

export const fetchStreamer = (id: string) =>
  axios.get<Streamer>(`streamers/${id}`).then((response) => response.data)

export const useQueryStreamers = (options?: UseQueryOptions<StreamerListItem[]>) => {
  return useQuery({
    queryKey: ['streamers'],
    queryFn: fetchStreamers,
    ...options,
    refetchInterval: 5000,
  })
}

export const useMutationStreamers = () => {
  return useMutation({
    mutationKey: ['streamers'],
    mutationFn: (data: CreateStreamerFormType) => {
      return axios.post<Streamer>(`streamers`, data)
    },
  })
}

export const useVoteStreamer = (id: string | number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['streamers'],
    mutationFn: (data: { vote: boolean }) => {
      return axiosAuth.put(`streamers/${id}/vote`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['streamers'])
    },
  })
}
