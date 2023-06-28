import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const getStreamers = async () => {
  const res = await fetch('http://localhost:3000/streamers', {
    cache: 'no-cache',
  })
  const streamers = await res.json()

  return streamers
}

export const useQueryStreamers = (initialData?: any) => {
  return useQuery({
    queryKey: ['streamers'],
    queryFn: getStreamers,
    initialData,
  })
}

export const useMutationStreamers = () => {
  return useMutation({
    mutationKey: ['streamers'],
    mutationFn: (data: any) => {
      return axios.post('http://localhost:3000/streamers', data)
    },
  })
}
