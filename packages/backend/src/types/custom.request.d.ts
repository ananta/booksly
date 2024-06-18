/** Declaration Merging
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html
 * tell typescript to grab the Request type from express
 * and add the
 **/

import * as express from 'express-serve-static-core'

import { IBookResolveRequest } from '../types/books'

// We are adding optional value to the request object for easy middleware parsing
declare global {
  namespace Express {
    interface Request extends IBookResolveRequest {}
  }
}
