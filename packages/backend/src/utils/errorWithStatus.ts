/**
 * A custom error object with `status` and `message` property
 */
class ErrorWithStatus extends Error {
  status: number
  message: string
  constructor(status: number, message: string) {
    super()
    this.status = status
    this.message = message
  }
}

export default ErrorWithStatus
