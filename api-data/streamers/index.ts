import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'

import { API } from '@/config/api'

interface Stramers {
  id: number
  name: string
  nickname: string
  upvotes: number
  downvotes: number
  platform: {
    name: string
  }
}

interface Streamer {
  id: number
  name: string
  nickname: string
  description: string
  image: string
  platformId: number
}

export const fetchStreamers = () =>
  axios.get<Stramers[]>(`${API.BASE_URL}/streamers`).then((response) => response.data)

export const fetchStreamer = (id: string) =>
  axios.get<Streamer>(`${API.BASE_URL}/streamers/${id}`).then((response) => response.data)

export const useQueryStreamers = (options?: UseQueryOptions<Stramers[]>) => {
  return useQuery({
    queryKey: ['streamers'],
    queryFn: fetchStreamers,
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

export const useQueryStreamerById = (id: string, options?: UseQueryOptions<Streamer>) => {
  return useQuery({
    queryKey: ['streamer', id],
    queryFn: () => fetchStreamer(id),
    ...options,
    // refetchInterval: 1000,
  })
}
