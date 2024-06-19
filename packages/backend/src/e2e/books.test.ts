import request from 'supertest'
import * as express from 'express-serve-static-core'

import { createApp } from '../createApp'
import { books } from 'shared'
import { generateNewBook } from './utils'
import { IBook } from 'shared/types/books'

/**
 * End-to-end test suite for /books endpoint
 */
describe('/books', () => {
  let app: express.Express = createApp()

  /**
   * Setup the application instance before running tests
   */
  beforeAll(() => {
    app = createApp()
  })

  /**
   * Test for GET /books endpoint
   */
  it('GET /books should return all books', async () => {
    const response = await request(app).get('/books')
    expect(response.status).toBe(200)
    const _books = response.body.map((book: IBook) => ({
      ...book,
      publishedYear: new Date(book.publishedYear)
    }))
    expect(_books).toStrictEqual(_books)
  })

  /**
   * Test for POST /books endpoint
   */
  it('POST /books should create a new book', async () => {
    const newBook = generateNewBook()
    const response = await request(app).post('/books').send(newBook)
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.book).toHaveProperty('id')
    expect(response.body.book.title).toBe(newBook.title)
    expect(response.body.book.author).toBe(newBook.author)
    expect(books.length).toBe(6)
  })

  /**
   * Test for PUT /books/:id endpoint
   */
  it('PUT /books/:id should update an existing book', async () => {
    const updatedBook = { title: 'Updated Title', author: 'Updated Author' }
    const booksRes = await request(app).get('/books')
    const bookBeforeUpdate: IBook = booksRes.body[0]
    const response = await request(app)
      .put(`/books/${bookBeforeUpdate.id}`)
      .send({ ...updatedBook })
    expect(response.status).toBe(200)

    // check if the updated items are different
    const bookResponse = await request(app).get(`/books/${bookBeforeUpdate.id}`)
    expect(bookResponse.body.book.title).toBe(updatedBook.title)
    expect(bookResponse.body.book.author).toBe(updatedBook.author)
  })

  /**
   * Test for DELETE /books/:id endpoint
   */
  it('DELETE /books/:id should delete a book', async () => {
    const bookData = generateNewBook()
    const createBookResponse = await request(app).post('/books').send(bookData)
    expect(createBookResponse.status).toBe(200)
    expect(createBookResponse.body.success).toBeTruthy()
    expect(createBookResponse.body.book.title).toBe(bookData.title)

    const newBook: IBook = createBookResponse.body.book

    const response = await request(app).delete(`/books/${newBook.id}`)
    expect(response.status).toBe(200)
  })

  /**
   * Test for PUT /books/:id endpoint with non-existing book
   */
  it('PUT /books/:id should return 404 for non-existing book', async () => {
    const updatedBook = { title: 'Updated Title', author: 'Updated Author' }
    const response = await request(app)
      .put('/books/non-existing-id')
      .send({ ...updatedBook })
    expect(response.status).toBe(404)
  })

  /**
   * Test for DELETE /books/:id endpoint with non-existing book
   */
  it('DELETE /books/:id should return 404 for non-existing book', async () => {
    const response = await request(app).delete('/books/non-existing-id')
    expect(response.status).toBe(404)
  })
})
