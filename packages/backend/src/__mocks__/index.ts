import { randomUUID } from 'node:crypto'

/**
 * Mock implementation of an Express.js request object.
 *
 * @property {object} book - Represents book-related data in the request.
 * @property {number} bookIndex - Numerical index for the book, initialized to `0`.
 * @property {object} body - Represents the body of the request.
 * @property {object} params - Route parameters, including `id` generated using `randomUUID`.
 */
export const mockRequest = {
  book: {},
  bookIndex: 0,
  body: {},
  params: {
    id: 'random-uuid'
  }
  // TODO: Add explicit typings for mock request object
} as unknown as any

/**
 * Mock implementation of an Express.js response object.
 *
 * @property {function} json - Mock function for sending a JSON response.
 * @property {function} sendStatus - Mock function for sending an HTTP status code.
 * @property {function} status - Mock function for setting the HTTP status code.
 */
export const mockResponse = {
  json: jest.fn(),
  sendStatus: jest.fn(),
  status: jest.fn()
  // TODO: Add explicit typings for mock response object
} as any

/**
 * Mock implementation of the `next` function in Express.js middleware.
 */
export const mockNextFunction = jest.fn()
