import { ThumbsDown, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { StreamerListItem, useVoteStreamer } from '@/api-data'

import { TableCell, TableRow, useToast } from '../ui'

const StreamerRow = ({ id, name, nickname, platform, downvotes, upvotes }: StreamerListItem) => {
  const { toast } = useToast()
  const { status } = useSession()
  const isSignedIn = status === 'authenticated'
  const { mutate } = useVoteStreamer(id)

  const handleVote = (vote: boolean) =>
    mutate(
      { vote },
      {
        onSuccess: () =>
          toast({
            title: 'Your vote has been counted.',
          }),
        onError: () =>
          toast({
            title: 'Something went wrong.',
            description: 'Please try again later.',
            variant: 'destructive',
          }),
      }
    )

  return (
    <TableRow className='group'>
      <Link key={id} href={`/streamers/${id}`} legacyBehavior>
        <TableCell className='cursor-pointer font-medium'>{name}</TableCell>
      </Link>
      <TableCell>{nickname}</TableCell>
      <TableCell>{platform.name}</TableCell>
      <TableCell>
        <div className='flex items-center justify-center gap-2'>
          {upvotes}
          {isSignedIn && (
            <ThumbsUp
              onClick={() => handleVote(true)}
              size='20px'
              className='cursor-pointer transition group-hover:scale-100 lg:scale-0'
            />
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className='flex items-center justify-center gap-2'>
          {downvotes}
          {isSignedIn && (
            <ThumbsDown
              onClick={() => handleVote(false)}
              size='20px'
              className='cursor-pointer transition group-hover:scale-100 lg:scale-0'
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}

export { StreamerRow }
