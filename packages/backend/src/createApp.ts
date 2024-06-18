// Global dependencies
import express from 'express'
import bodyParser from 'body-parser'

// Project dependencies
import booksRouter from './routes/books'
import { errorHandler } from './middlewares/error'

/**
 * Function to create and configure an Express application.
 *
 * @returns {express.Express} - The configured Express application.
 */
export function createApp() {
  // Express Initialization
  const app = express()

  // Middlewares
  app.use(bodyParser.json())

  // Routes
  app.use('/books', booksRouter)

  /**
   * Catch-all route for undefined routes.
   *
   * @name all
   * @memberof createApp
   * @function
   * @param {string} route - The catch-all route.
   * @param {function} callback - The callback function to handle the request.
   */
  app.all('*', () => new Error("you shouldn't be here"))

  // Error handling
  app.use(errorHandler)

  return app
}
