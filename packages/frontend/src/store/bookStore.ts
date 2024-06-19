import { create } from 'zustand'
import { IBook } from 'shared/types/books'
import { customFetch } from 'utils/customFetch'

interface IBookState {
  isLoading: boolean
  books: IBook[]
  createBook: (
    newBook: Omit<IBook, 'id'>,
    onSuccess: () => void,
    onFailed: () => void
  ) => void
  updateBook: (
    updatedBook: IBook,
    onSuccess: () => void,
    onFailed: () => void
  ) => void
  removeBook: (
    bookId: string,
    onSucces: () => void,
    onFailed: () => void
  ) => void
  getBooks: () => void
}

export const useBookStore = create<IBookState>(set => ({
  isLoading: false,
  books: [],
  getBooks: async () => {
    try {
      set({ isLoading: true })
      const data = await customFetch<IBook[]>('/books')
      set({
        books: data,
        isLoading: false
      })
    } catch (error) {
      set({ isLoading: false })
    }
  },
  createBook: async (bookInfo: Omit<IBook, 'id'>, onSuccess, onFailed) => {
    try {
      set({ isLoading: true })
      const data = await customFetch<{
        book: IBook
        success: true
      }>('/books', {
        method: 'POST',
        body: JSON.stringify({ ...bookInfo })
      })
      if (data?.book) {
        set(state => ({
          ...state,
          books: [...state.books, data.book],
          isLoading: false
        }))
      }
      onSuccess()
    } catch (error) {
      console.log({ error })
      set({ isLoading: false })
      onFailed()
    }
  },
  updateBook: async (updatedBook, onSuccess, onFailed) => {
    try {
      const { id, ..._updatedBook } = updatedBook
      set({ isLoading: true })
      const data = await customFetch<{
        book: IBook
        success: true
      }>(`/books/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ..._updatedBook })
      })
      if (data?.book) {
        set(state => {
          let updatedBookIndex = state.books.findIndex(book => book.id == id)
          state.books[updatedBookIndex] = data.book
          return {
            ...state,
            books: [...state.books],
            isLoading: false
          }
        })
      }
      onSuccess()
    } catch (error) {
      set({ isLoading: false })
      onFailed()
    }
  },
  removeBook: async (bookId, onSuccess, onFailed) => {
    try {
      set({ isLoading: true })
      const data = await customFetch<{
        book: IBook
        success: true
      }>(`/books/${bookId}`, {
        method: 'DELETE'
      })
      if (data?.success) {
        set(state => {
          return {
            ...state,
            books: state.books.filter(book => book.id != bookId),
            isLoading: false
          }
        })
      }
      onSuccess()
    } catch (err) {
      set({ isLoading: false })
      onFailed()
    }
  }
}))
