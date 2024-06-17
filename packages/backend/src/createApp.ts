// Global dependencies
import express from 'express'
import bodyParser from 'body-parser'

// Project dependencies
import booksRouter from './routes/books'
import { errorHandler } from './middlewares/error'

export function createApp() {
  // Express Initialization
  const app = express()

  // Middlewares
  app.use(bodyParser.json())

  // Routes
  app.use('/books', booksRouter)
  app.all('*', () => new Error("you shouldn't be here"))

  // Error handling
  app.use(errorHandler)
  return app
}
