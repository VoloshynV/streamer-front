import React from 'react'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Textarea } from './textarea'

interface FormTextareaProps extends CommonInputProps {}

const FormTextarea = ({ control, name, label, placeholder, description }: FormTextareaProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className='resize-none' {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { FormTextarea }
