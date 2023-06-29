import { fetchStreamer } from '@/api-data'
import StreamerCard from '@/components/streamer-card'

export default async function SteamerPage({ params }: { params: { id: string } }) {
  const { id } = params
  const streamerData = await fetchStreamer(id)

  return <StreamerCard id={id} initialData={streamerData} />
}
