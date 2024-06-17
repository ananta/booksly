import { NextFunction, Request, Response } from 'express'

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
