import Image from 'next/image'

import { CreateStreamerForm } from '@/components/forms'
import { Button } from '@/components/ui'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <CreateStreamerForm />
    </main>
  )
}
