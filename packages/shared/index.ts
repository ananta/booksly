import { v4 as uuid } from 'uuid'
import { subDays } from 'date-fns'
import { IBook } from './types/books'

export const books: IBook[] = [
  {
    id: uuid(),
    title: 'The Mysterious Island',
    author: 'Jules Verne',
    publishedYear: subDays(new Date(), 3650),
    genre: 'Science Fiction'
  },
  {
    id: uuid(),
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publishedYear: subDays(new Date(), 21900),
    genre: 'Fiction'
  },
  {
    id: uuid(),
    title: '1984',
    author: 'George Orwell',
    publishedYear: subDays(new Date(), 25550),
    genre: 'Dystopian'
  },
  {
    id: uuid(),
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publishedYear: subDays(new Date(), 74710),
    genre: 'Romance'
  },
  {
    id: uuid(),
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publishedYear: subDays(new Date(), 25550),
    genre: 'Fiction'
  }
]
