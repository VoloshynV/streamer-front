'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useMutationStreamers } from '@/api-data'
import { Button, Form, FormInput, FormSelect, FormTextarea, useToast } from '@/components/ui'
import { platforms } from '@/lib/const/platforms'
import { createStreamerFormSchema, CreateStreamerFormType } from '@/lib/form-schema/create-streamer'

const CreateStreamerForm = () => {
  const { mutate, isLoading, isSuccess, isError, failureReason } = useMutationStreamers()
  const { toast } = useToast()

  const form = useForm<CreateStreamerFormType>({
    resolver: zodResolver(createStreamerFormSchema),
    defaultValues: {
      name: '',
      nickname: '',
      description: '',
      image: '',
      platform: '',
    },
  })

  function onSubmit(values: CreateStreamerFormType) {
    mutate(values)
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      toast({
        title: 'Streamer created',
      })
    }
    if (isError && axios.isAxiosError(failureReason)) {
      const errorDescription = failureReason.response?.data.message || failureReason.message
      toast({
        title: 'Error',
        description: errorDescription,
        variant: 'destructive',
        duration: 3000,
      })
    }
  }, [isSuccess, isError, isLoading, failureReason, toast, form])

  return (
    <Form {...form}>
      <div className='flex justify-center'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-lg space-y-8'>
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
      </div>
    </Form>
  )
}

export { CreateStreamerForm }
