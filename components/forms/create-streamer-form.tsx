'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button, Form, FormInput, FormSelect, FormTextarea } from '@/components/ui'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  nickname: z.string().min(2).max(50),
  image: z.string().min(2).max(100),
  platformId: z.string().min(1).max(1),
  description: z.string().min(2).max(150),
})

const CreateStreamerForm = () => {
  const platforms = [
    { value: '1', label: 'Twitch' },
    { value: '2', label: 'YouTube' },
    { value: '3', label: 'TikTok' },
    { value: '4', label: 'Kick' },
    { value: '5', label: 'Rumble' },
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      nickname: '',
      description: '',
      image: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newValues = {
      ...values,
      platformId: Number(values.platformId),
    }

    console.log(newValues)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormInput
          control={form.control}
          name={'username'}
          label={'Username'}
          placeholder={'Joe Doe'}
          description={'This is streamer username'}
        />
        <FormInput
          control={form.control}
          name={'nickname'}
          label={'Nickname'}
          placeholder={'joedoe'}
          description={'This is streamer nickname'}
        />
        <FormSelect
          control={form.control}
          name={'platformId'}
          label={'Platform'}
          placeholder={'Select platform'}
          description={'This is streamer platform'}
          values={platforms}
        />
        <FormInput
          control={form.control}
          name={'image'}
          label={'Image URL'}
          placeholder={'https://picsum.photos/200/300'}
          description={'This is streamer image'}
        />
        <FormTextarea
          control={form.control}
          name={'description'}
          label={'Description'}
          placeholder={'Small description about streamer'}
          description={'Small description about streamer'}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export { CreateStreamerForm }
