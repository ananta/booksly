import { NextFunction, Request, Response } from 'express'

/**
 * Error handling middleware for Express.js applications.
 *
 * @param err - The error object.
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @param next - The next middleware function.
 * @returns A response with a 500 status code and an error message.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO(logger): add a logger
  console.error(err)
  return res.status(500).send({ error: 'Internal Server Error' })
}
