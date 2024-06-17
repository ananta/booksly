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

router.get('/', getBooks)
router.get('/:id', resolveBook, getBook)
router.post('/', validate(newBookSchema), createBook)
router.put('/:id', validate(updateBookSchema), resolveBook, updateBook)
router.delete('/:id', resolveBook, removeBook)

export default router
