import { v4 as uuid } from 'uuid'
import { subDays } from 'date-fns'
import { IBook } from './types/books'

export const books: IBook[] = [
  {
    id: uuid(),
    title: 'random book 1',
    author: 'random author',
    publishedYear: subDays(new Date(), 60),
    genre: 'horror'
  },
  {
    id: uuid(),
    title: 'this is a random title',
    author: 'random author',
    publishedYear: subDays(new Date(), 120),
    genre: 'horror'
  },
  {
    id: uuid(),
    title: 'this is a random title',
    author: 'random author',
    publishedYear: subDays(new Date(), 220),
    genre: 'horror'
  },
  {
    id: uuid(),
    title: 'this is a random title',
    author: 'random author',
    publishedYear: subDays(new Date(), 2200),
    genre: 'horror'
  }
]
