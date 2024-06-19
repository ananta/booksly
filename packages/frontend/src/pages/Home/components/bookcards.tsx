import { useState } from 'react'
import { Edit, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from 'components/ui/card'
import { Badge } from 'components/ui/badge'
import { Button, buttonVariants } from 'components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'components/ui/dialog'

import { IBook } from 'shared/types/books'
import { useToast } from 'hooks/useToast'

export const BookCards: React.FC<{
  book: IBook
  handleRemove: (
    bookId: string,
    onSuccess: () => void,
    onFailed: () => void
  ) => void
}> = ({ book, handleRemove }) => {
  const [openRemoveBookDialog, setOpenRemoveBookDialog] =
    useState<boolean>(false)
  const [selectedBookId, setSelectedBookId] = useState<string>('')
  const { toast } = useToast()

  return (
    <Card key={book.id} className="flex flex-col justify-between">
      <CardHeader className="flex-row gap-4">
        <div className="w-full">
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>
            <div className="flex justify-between">
              {format(book.publishedYear, 'PPP')}
              <Badge variant={'default'}>{book.genre}</Badge>
            </div>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="italic">by: {book.author}</p>
      </CardContent>
      <CardFooter className="flex justify-between gap-1">
        <Link
          to="/manage-book"
          state={{
            type: 'edit',
            ...book
          }}
          className={buttonVariants({ variant: 'default' })}
        >
          <Edit size={18} className="mr-1" />
          Update Book
        </Link>
        <Dialog
          open={openRemoveBookDialog}
          onOpenChange={open => {
            setSelectedBookId(book.id)
            setOpenRemoveBookDialog(open)
          }}
        >
          <DialogTrigger asChild>
            <Link to="#" className={buttonVariants({ variant: 'destructive' })}>
              <Trash size={18} className="mr-1" /> Remove Book
            </Link>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                book from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2"></div>
            <DialogFooter className="sm:justify-start">
              <Button
                type="button"
                variant={'destructive'}
                onClick={() =>
                  handleRemove(
                    selectedBookId,
                    () => setOpenRemoveBookDialog(false),
                    () => {
                      toast({
                        title: '❌ Failed to Remove Book',
                        description:
                          'There was an error removing your book. Please try again.'
                      })
                      setOpenRemoveBookDialog(false)
                    }
                  )
                }
              >
                <Trash className="mr-2" />
                Confirm
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
