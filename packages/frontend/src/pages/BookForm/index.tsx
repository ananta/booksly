import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { useLocation, useNavigate } from 'react-router-dom'
import { CalendarIcon } from 'lucide-react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from 'components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { Calendar } from 'components/ui/calendar'
import { Input } from 'components/ui/input'
import { Button } from 'components/ui/button'
import { cn } from 'utils/twMerge'
import { useToast } from 'hooks/useToast'

import { IManageBookRouteState } from 'types/routestate'
import { useBookStore } from 'store/bookStore'
import { bookFormSchema } from './validation'

export default function BookForm() {
  const { state }: { state: IManageBookRouteState } = useLocation()
  const navigate = useNavigate()
  const { createBook, isLoading, updateBook } = useBookStore()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: state.title || '',
      publishedYear: state.publishedYear
        ? new Date(state.publishedYear)
        : new Date(),
      genre: state.genre || '',
      author: state.author || ''
    }
  })

  function onSubmit(values: z.infer<typeof bookFormSchema>) {
    if (state.type === 'create')
      createBook(
        values,
        () => {
          toast({
            title: '✅ Book Added Successfully! ',
            description: 'Your book has been added to the collection.'
          })
          navigate(-1)
        },
        () =>
          toast({
            title: '❌ Failed to Add Book',
            description:
              'There was an error adding your book. Please try again.'
          })
      )
    else if (state.type === 'edit')
      updateBook(
        { ...values, id: state.id },
        () => navigate(-1),
        () =>
          toast({
            title: '❌ Failed to Update Book',
            description:
              'There was an error updating your book. Please try again.'
          })
      )
    return
  }

  return (
    <>
      <h2 className="mb-4">
        {state.type === 'create' ? 'Create' : 'Update'} Book
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title here" {...field} />
                </FormControl>
                <FormDescription>This is your book title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishedYear"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Published Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onDayClick={field.onChange}
                      disabled={date =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Published date of the book.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input placeholder="Enter genre here" {...field} />
                </FormControl>
                <FormDescription>This is your book genre</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author's name here" {...field} />
                </FormControl>
                <FormDescription>This is the author of book</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}
