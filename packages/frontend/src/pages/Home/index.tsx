import { useEffect } from 'react'
import { useBookStore } from 'store/bookStore'
import { BookCards } from './components/bookcards'
import { InfoCard } from './components/infocard'

export default function Home() {
  const { books, getBooks, removeBook, isLoading } = useBookStore()

  useEffect(() => {
    getBooks()
  }, [])

  return (
    <>
      <h2 className="mb-4">Your Books</h2>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books && books.length > 0 ? (
          books.map(book => <BookCards book={book} handleRemove={removeBook} />)
        ) : (
          <InfoCard
            title="Empty"
            description="Please create a book using `+ create book` button!"
          />
        )}
      </div>
      {/* TODO: add skeletal/spinner loading component */}
      {isLoading && <p>loading..</p>}
    </>
  )
}
