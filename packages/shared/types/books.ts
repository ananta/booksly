/**
 * Interface representing a Book object.
 */
export interface IBook {
  id: string
  title: string
  author: string
  publishedYear: Date
  genre: string
}

/**
 * Interface for resolving book-related requests.
 */
export interface IBookResolveRequest {
  bookIndex: number
  book: IBook
}

/**
 * Extended request type for handling book-related data.
 */
export type BookRequest = IBookResolveRequest & Request

/**
 * Interface for identifying a book by its ID.
 */
export interface BookIdentifier {
  id: string
}
