import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'

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
interface StramerList extends StreamerCommon {
  upvotes: number
  downvotes: number
}

export interface Streamer extends StreamerCommon {
  description: string
  image: string
}

export const fetchStreamers = () =>
  axios.get<StramerList[]>(`${API.BASE_URL}/streamers`).then((response) => response.data)

export const fetchStreamer = (id: string) =>
  axios.get<Streamer>(`${API.BASE_URL}/streamers/${id}`).then((response) => response.data)

export const useQueryStreamers = (options?: UseQueryOptions<StramerList[]>) => {
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
