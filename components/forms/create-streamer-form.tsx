'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { use, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useMutationStreamers } from '@/api-data'
import { Button, Form, FormInput, FormSelect, FormTextarea } from '@/components/ui'
import { useToast } from '@/components/ui'
import { platforms } from '@/lib/const/platforms'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  nickname: z.string().min(2).max(50),
  image: z.string().min(2).max(100),
  platform: z.string().min(1).max(10),
  description: z.string().min(2).max(150),
})

const CreateStreamerForm = () => {
  const { mutate, isLoading, isSuccess, isError, failureReason } = useMutationStreamers()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      nickname: '',
      description: '',
      image: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      toast({
        title: 'Streamer created',
      })
    }
    if (isError) {
      toast({
        title: 'Error',
        // @ts-ignore
        description: failureReason.response.data.message,
        variant: 'destructive',
        duration: 3000,
      })
    }
  }, [isSuccess, isError, isLoading, failureReason])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormInput
          control={form.control}
          name={'name'}
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
          name={'platform'}
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
