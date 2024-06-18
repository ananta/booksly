/**
 * Interface representing the structure of a response object.
 *
 * @template T - The type of the data property.
 */
interface ResponseProps<T> {
  success: boolean
  data?: T
}

/**
 * Utility function to wrap a response in a consistent format.
 *
 * @template T - The type of the data property.
 * @param {boolean} success - Indicates the success status of the response.
 * @param {T} data - The data to be included in the response.
 * @returns {ResponseProps<T>} - The formatted response object.
 */
const ResponseWrapper = <T>(success: boolean, data: T): ResponseProps<T> => {
  return {
    ...data,
    success
  }
}

export default ResponseWrapper
