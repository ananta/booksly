import { randomUUID } from 'node:crypto'

export const books = [
  {
    id: randomUUID(),
    title: 'this is a random title',
    author: 'random author',
    publishedYear: '2024/01/01',
    genre: 'horror'
  }
]
