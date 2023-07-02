import { z } from 'zod'

export const createStreamerFormSchema = z.object({
  name: z.string().min(2).max(50),
  nickname: z.string().min(2).max(50),
  image: z.string().min(2).max(100),
  platform: z.string().min(1).max(10),
  description: z.string().min(2).max(250),
})

export type CreateStreamerFormType = z.infer<typeof createStreamerFormSchema>
