import { randomUUID } from 'node:crypto'
import { IBook } from '../types/books'

/**
 * An array of book objects representing the library's collection.
 * Each book object adheres to the IBook interface.
 *
 * @property {string} id - A unique identifier for the book, generated using `randomUUID`.
 * @property {string} title - The title of the book.
 * @property {string} author - The author of the book.
 * @property {string} publishedYear - The publication date of the book in YYYY/MM/DD format.
 * @property {string} genre - The genre of the book.
 */
export const books: IBook[] = [
  {
    id: randomUUID(),
    title: 'this is a random title',
    author: 'random author',
    publishedYear: '2024/01/01',
    genre: 'horror'
  }
]
