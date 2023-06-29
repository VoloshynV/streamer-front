import { fetchStreamers } from '@/api-data'
import { StreamersList } from '@/components/streamers-list'

export default async function Home() {
  const streamers = await fetchStreamers()

  return (
    <main className='w-full p-24'>
      <StreamersList />
    </main>
  )
}
