import { getStreamers } from '@/api-data'

export default async function Home() {
  const streamers = await getStreamers()

  return (
    <main className='grid w-full gap-2 p-24'>
      {streamers.map(({ id, name }: any) => (
        <div key={id}>{name}</div>
      ))}
    </main>
  )
}
