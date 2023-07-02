import { fetchStreamers } from '@/api-data'
import { AddNewStreamerModal } from '@/components/modals'
import { StreamersList } from '@/components/streamers-list'

export default async function Home() {
  const streamers = await fetchStreamers()

  return (
    <>
      <AddNewStreamerModal />
      <StreamersList initialData={streamers} />
    </>
  )
}
