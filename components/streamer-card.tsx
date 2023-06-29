'use client'

import { useQueryStreamerById } from '@/api-data'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
interface StreamerCardProps {
  id: string
  initialData: any
}

const StreamerCard = ({ id, initialData }: StreamerCardProps) => {
  const { data } = useQueryStreamerById(id, {
    initialData,
  })

  const { description, image, name, nickname, platformId } = data || {}

  return (
    <Card className='mx-auto my-12 max-w-md'>
      <CardHeader className='items-center'>
        <img src={image} className='md:w-xs mb-5 w-[70%] rounded-full border' alt='' />
        <CardTitle>{name}</CardTitle>
        <CardDescription>{nickname}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <p>{platformId}</p>
      </CardContent>
    </Card>
  )
}

export default StreamerCard
