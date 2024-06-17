import { randomUUID } from 'node:crypto'
import { NextFunction, Request, Response } from 'express'

import ResponseWrapper from '../utils/responseWrapper'
import { books } from '../constants/books'

export interface IBook {
  id: string
  title: string
  author: string
  publishedYear: string
  genre: string
}

export interface IBookInfo {
  bookIndex: number
  book: IBook
}

export type BookRequest = IBookInfo & Request

export interface BookIdentifier {
  id: string
}

/**
 *
 * @param req
 * @param res
 */

export async function getBooks(
  _request: Request,
  response: Response
): Promise<Response<IBook[]>> {
  return response.json(books)
}

export async function getBook(
  request: Request<{}, {}, IBook>,
  response: Response
): Promise<Response<IBook>> {
  return response.json(
    ResponseWrapper<{ book: IBook }>(true, { book: request.book })
  )
}

export async function createBook(
  request: Request<{}, {}, IBook>,
  response: Response
): Promise<Response<IBook>> {
  const book = request.body
  book.id = randomUUID()
  books.push(book)
  return response.json(ResponseWrapper<{ book: IBook }>(true, { book }))
}

export async function updateBook(
  request: Request<BookIdentifier>,
  response: Response
): Promise<Response> {
  const { book, bookIndex, body } = request
  books[bookIndex] = { ...book, ...body }
  return response.json(
    ResponseWrapper<{ book: IBook }>(true, { book: books[bookIndex] })
  )
}

export async function removeBook(
  request: Request<BookIdentifier>,
  response: Response
): Promise<Response> {
  const { bookIndex } = request
  const book = books.splice(bookIndex, 1)
  return response.json(
    ResponseWrapper<{ book: IBook }>(true, { book: book[bookIndex] })
  )
}

export function resolveBook(
  request: Request<BookIdentifier>,
  response: Response,
  next: NextFunction
) {
  const {
    params: { id }
  } = request
  if (!id) return response.sendStatus(400)
  const bookIndex = books.findIndex(book => book.id === id)
  if (bookIndex === -1) return response.sendStatus(404)
  request.bookIndex = bookIndex
  request.book = books[bookIndex]
  next()
}
