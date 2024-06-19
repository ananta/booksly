import { randomUUID } from 'node:crypto'
import { IBook } from 'shared/types/books'

/**
 * Generates a new book object without an id.
 *
 * @returns A new book object with a unique title and author, and default values for publishedYear and genre.
 */
export const generateNewBook = (): Omit<IBook, 'id'> => ({
  title: `Test Book ${randomUUID()}`,
  author: `Test Author ${randomUUID()}`,
  publishedYear: new Date(),
  genre: 'horror'
})
