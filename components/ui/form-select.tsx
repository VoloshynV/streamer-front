import Link from 'next/link'
import React from 'react'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

interface FormSelectProps extends CommonInputProps {
  values: { value: string; label: string }[]
}

const FormSelect = ({
  control,
  name,
  label,
  placeholder,
  values,
  description,
}: FormSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { FormSelect }
