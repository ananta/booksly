import { randomUUID } from 'node:crypto'
import { NextFunction, Request, Response } from 'express'

import { IBook, BookIdentifier } from 'shared/types/books'
import { books } from 'shared'
import ResponseWrapper from '../utils/responseWrapper'

/**
 * Get all books.
 *
 * @param _request - The incoming request object.
 * @param response - The outgoing response object.
 * @returns A JSON response containing an array of books.
 */
export async function getBooks(
  _request: Request,
  response: Response
): Promise<Response<IBook[]>> {
  return response.json(books)
}

/**
 * Get a specific book.
 *
 * @param request - The incoming request object.
 * @param response - The outgoing response object.
 * @returns A JSON response containing the requested book.
 */
export async function getBook(
  request: Request<{}, {}, IBook>,
  response: Response
): Promise<Response<IBook>> {
  return response.json(
    ResponseWrapper<{ book: IBook }>(true, { book: request.book })
  )
}

/**
 * Create a new book.
 *
 * @param request - The incoming request object.
 * @param response - The outgoing response object.
 * @returns A JSON response containing the created book.
 */
export async function createBook(
  request: Request<{}, {}, IBook>,
  response: Response
): Promise<Response<IBook>> {
  const book = request.body
  book.id = randomUUID()
  books.push(book)
  return response.json(ResponseWrapper<{ book: IBook }>(true, { book }))
}

/**
 * Update an existing book.
 *
 * @param request - The incoming request object.
 * @param response - The outgoing response object.
 * @returns A JSON response indicating the update status.
 */
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

/**
 * Remove a book.
 *
 * @param request - The incoming request object.
 * @param response - The outgoing response object.
 * @returns A JSON response indicating the removal status.
 */
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

/**
 * Resolve a book by its ID.
 *
 * @param request - The incoming request object.
 * @param response - The outgoing response object.
 * @param next - The next middleware function.
 * @returns Calls the next middleware function or sends an error response.
 */
export async function resolveBook(
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
