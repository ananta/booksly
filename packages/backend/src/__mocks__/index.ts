import { randomUUID } from 'node:crypto'

export const mockRequest = {
  book: {},
  bookIndex: 0,
  body: {},
  params: {
    id: randomUUID
  }
  // TODO: add explicit typings
} as unknown as any
export const mockResponse = {
  json: jest.fn(),
  sendStatus: jest.fn(),
  status: jest.fn()
} as any

export const mockNextFunction = jest.fn()
