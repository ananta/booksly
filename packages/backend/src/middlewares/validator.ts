import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

import ResponseWrapper from '../utils/responseWrapper'
import { BookIdentifier } from '../types/books'

/**
 * Middleware to validate request body against a given Joi schema.
 *
 * @param schema - The Joi schema to validate against.
 * @returns A middleware function that validates the request body.
 */
export const validate =
  (schema: Joi.ObjectSchema<any>) =>
  (req: Request<BookIdentifier>, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body)
    if (result.error)
      return res
        .status(400)
        .json(ResponseWrapper(false, result.error.details[0].message))
    next()
  }

/**
 * Joi schema for validating new book data.
 */
export const newBookSchema = Joi.object().keys({
  title: Joi.string().min(3).max(80).required().label('Title'),
  author: Joi.string().min(2).max(80).required().label('Author'),
  publishedYear: Joi.date()
    .required()
    .less(Date.now() + 1000)
    .label('Published Year'),
  genre: Joi.string().min(3).max(40).required().label('Genre')
})

/**
 * Joi schema for validating updated book data.
 */
export const updateBookSchema = Joi.object().keys({
  title: Joi.string().min(3).max(80).label('Title'),
  author: Joi.string().min(2).max(80).label('Author'),
  genre: Joi.string().min(3).max(40).label('Genre')
})
