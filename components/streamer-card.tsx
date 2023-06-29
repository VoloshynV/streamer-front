import { Streamer } from '@/api-data'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
interface StreamerCardProps {
  initialData: Streamer
}

const StreamerCard = ({ initialData }: StreamerCardProps) => {
  const { description, image, name, nickname, platform } = initialData

  return (
    <Card className='mx-auto my-12 max-w-md'>
      <CardHeader className='items-center'>
        <img src={image} className='md:w-xs mb-5 w-[70%] rounded-full border' alt={name} />
        <CardTitle>{name}</CardTitle>
        <CardDescription>{nickname}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <p>Platform: {platform.name}</p>
      </CardFooter>
    </Card>
  )
}

export default StreamerCard
