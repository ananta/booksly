import { randomUUID } from 'node:crypto'
import { IBook } from '../controllers/books'

export const books: IBook[] = [
  {
    id: randomUUID(),
    title: 'this is a random title',
    author: 'random author',
    publishedYear: '2024/01/01',
    genre: 'horror'
  }
]
