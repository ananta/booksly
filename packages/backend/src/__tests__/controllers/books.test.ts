import { mockNextFunction, mockRequest, mockResponse } from '../../__mocks__'
import { books } from 'shared'
import {
  createBook,
  getBooks,
  removeBook,
  resolveBook,
  updateBook
} from '../../controllers/books'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn(() => 'random-uuid')
}))

/**
 * Test suite for Books Controller
 */
describe('Books Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  /**
   * Test suite for getBooks function
   */
  describe('getBooks', () => {
    it('should return an array of books', async () => {
      await getBooks(mockRequest, mockResponse)
      expect(mockResponse.json).toHaveBeenCalledWith(books)
    })
  })

  /**
   * Test suite for createBook function
   */
  describe('createBook', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'Test Book',
        author: 'Test Author'
      }
      mockRequest.body = newBook
      await createBook(mockRequest, mockResponse)
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          book: expect.objectContaining({
            ...newBook,
            id: 'random-uuid'
          })
        })
      )
    })
  })

  /**
   * Test suite for updateBook function
   */
  describe('updateBook', () => {
    it('should update the book', async () => {
      const bookIndex = 0
      const updatedBook = {
        title: 'Updated Title',
        author: 'Updated Author'
      }
      mockRequest.book = books[bookIndex]
      mockRequest.bookIndex = bookIndex
      mockRequest.body = { book: updatedBook }

      await updateBook(mockRequest, mockResponse)

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          book: expect.objectContaining({
            ...books[bookIndex]
          })
        })
      )
    })
  })

  /**
   * Test suite for removeBook function
   */
  describe('removeBook', () => {
    it('should delete a book', async () => {
      const bookIndex = 0
      mockRequest.bookIndex = bookIndex

      await removeBook(mockRequest, mockResponse)

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true
        })
      )
    })

    /**
     * Test suite for resolveBook function
     */
    describe('resolveBook', () => {
      it('should resolve a book by id', () => {
        const bookToResolve = books[0]
        mockRequest.params = { id: bookToResolve.id }

        resolveBook(mockRequest, mockResponse, mockNextFunction)
        expect(mockRequest.bookIndex).toBe(0)
        expect(mockRequest.book).toBe(bookToResolve)
        expect(mockNextFunction).toBeCalled()
      })

      it('should return 400 if id is not provided', () => {
        mockRequest.params = { id: undefined }
        resolveBook(mockRequest, mockResponse, mockNextFunction)
        expect(mockResponse.sendStatus).toBeCalledWith(400)
        expect(mockNextFunction).not.toBeCalled()
      })

      it('should return 404 if book is not found', () => {
        mockRequest.params = { id: 'non-existing-id' }

        resolveBook(mockRequest, mockResponse, mockNextFunction)
        expect(mockResponse.sendStatus).toBeCalledWith(404)
        expect(mockNextFunction).not.toBeCalled()
      })
    })
  })
})
