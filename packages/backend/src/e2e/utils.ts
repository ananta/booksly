import { randomUUID } from 'node:crypto'
import { IBook } from '../controllers/books'

export const generateNewBook = (): Omit<IBook, 'id'> => ({
  title: `Test Book ${randomUUID()}`,
  author: `Test Author ${randomUUID()}`,
  publishedYear: '2024',
  genre: 'horror'
})
