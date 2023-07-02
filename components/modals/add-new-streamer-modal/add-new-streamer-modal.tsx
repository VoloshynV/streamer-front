'use client'

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add new streamer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adding a new streamer</DialogTitle>
        </DialogHeader>
        <CreateStreamerForm />
      </DialogContent>
    </Dialog>
  )
}

export { AddNewStreamerModal }
