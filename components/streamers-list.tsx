'use client'

import Link from 'next/link'

import { useQueryStreamers } from '@/api-data'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

const StreamersList = () => {
  const { data: streamers = [] } = useQueryStreamers()

  return (
    <div className='grid gap-2'>
      <Table>
        <TableCaption>A list of streamers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Nickname</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead className='text-center'>Upvotes</TableHead>
            <TableHead className='text-center'>Downvotes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {streamers.map(({ id, name, nickname, platform, downvotes, upvotes }) => (
            <Link key={id} href={`/streamers/${id}`} legacyBehavior>
              <TableRow className='cursor-pointer'>
                <TableCell className='font-medium'>{name}</TableCell>
                <TableCell>{nickname}</TableCell>
                <TableCell>{platform.name}</TableCell>
                <TableCell className='text-center'>{upvotes}</TableCell>
                <TableCell className='text-center'>{downvotes}</TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { StreamersList }
