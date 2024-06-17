interface ResponseProps<T> {
  success: boolean
  data?: T
}

const ResponseWrapper = <T>(success: boolean, data: T): ResponseProps<T> => {
  return {
    ...data,
    success
  }
}

export default ResponseWrapper
