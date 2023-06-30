import { fetchStreamers } from '@/api-data'
import { StreamersList } from '@/components/streamers-list'

export default async function Home() {
  const streamers = await fetchStreamers()

  return <StreamersList initialData={streamers} />
}
