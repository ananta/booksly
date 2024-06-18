import { Router } from 'express'
import {
  createBook,
  getBook,
  getBooks,
  removeBook,
  resolveBook,
  updateBook
} from '../controllers/books'
import {
  newBookSchema,
  updateBookSchema,
  validate
} from '../middlewares/validator'

const router = Router()

/**
 * Route to get all books.
 *
 * @name GET /books
 * @function
 * @memberof module:routes/books
 */
router.get('/', getBooks)

/**
 * Route to get a specific book by id.
 *
 * @name GET /books/:id
 * @function
 * @memberof module:routes/books
 * @param {string} id - The id of the book to retrieve.
 */
router.get('/:id', resolveBook, getBook)

/**
 * Route to create a new book.
 *
 * @name POST /books
 * @function
 * @memberof module:routes/books
 * @param {Object} book - The book data to create.
 */
router.post('/', validate(newBookSchema), createBook)

/**
 * Route to update an existing book.
 *
 * @name PUT /books/:id
 * @function
 * @memberof module:routes/books
 * @param {string} id - The id of the book to update.
 * @param {Object} book - The updated book data.
 */
router.put('/:id', validate(updateBookSchema), resolveBook, updateBook)

/**
 * Route to delete a book.
 *
 * @name DELETE /books/:id
 * @function
 * @memberof module:routes/books
 * @param {string} id - The id of the book to delete.
 */
router.delete('/:id', resolveBook, removeBook)

export default router
