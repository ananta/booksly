import { z } from 'zod'

export const bookFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.'
    })
    .max(80, {
      message: 'Title can`t be more than 80 characters.'
    }),
  publishedYear: z.date({
    required_error: 'Published date is required.'
  }),
  genre: z
    .string()
    .min(3, {
      message: 'Genre must be at least 3 characters.'
    })
    .max(20, {
      message: 'Genre can`t be more than 20 characters.'
    }),
  author: z
    .string()
    .min(2, {
      message: 'Author must be at least 2 characters.'
    })
    .max(80, {
      message: 'Author can`t be more than 80 characters.'
    })
})
