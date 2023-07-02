'use client'

import { StreamerListItem, useQueryStreamers } from '@/api-data'

import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'
import { StreamerRow } from './streamers-row'

interface StreamersListProps {
  initialData?: StreamerListItem[]
}

const StreamersList = ({ initialData }: StreamersListProps) => {
  const { data: streamers = [] } = useQueryStreamers({ initialData })

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
          {streamers.map((props) => (
            <StreamerRow key={props.id} {...props} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { StreamersList }
