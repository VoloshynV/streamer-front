'use client'

import { useState } from 'react'

import { CreateStreamerForm } from '@/components/forms'
import { Button } from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const AddNewStreamerModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add new streamer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adding a new streamer</DialogTitle>
        </DialogHeader>
        <CreateStreamerForm onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export { AddNewStreamerModal }
