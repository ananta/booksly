class ResponseError extends Error {
  response: Response

  constructor(message: string, response: Response) {
    super(message)
    this.response = response
    this.name = 'ResponseError'
  }
}

function handleFetchError(error: unknown) {
  if (error instanceof ResponseError) {
    // Detailed error handling based on status code
    switch (error.response.status) {
      case 404:
        /* Handle "Not found" */ break
      case 401:
        /* Handle "Unauthorized" */ break
      case 418:
        /* Handle "I'm a teapot" */ break
      // ... other status codes ...
      default:
        /* Handle other errors */ break
    }
  } else {
    // Handle non-ResponseError errors
    throw new Error('An unknown error occurred', { cause: error })
  }
}

export async function customFetch<TData>(url: string, options?: RequestInit) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  let fetchOptions: RequestInit = {
    method: 'GET', // Default method
    headers: defaultHeaders,
    ...options
  }

  // If there's a body and it's an object, stringify it
  if (fetchOptions.body && typeof fetchOptions.body === 'object') {
    fetchOptions.body = JSON.stringify(fetchOptions.body)
  }

  // Merge the default headers with any provided headers
  fetchOptions.headers = { ...defaultHeaders, ...(options?.headers || {}) }

  try {
    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      throw new ResponseError('Bad fetch response', response)
    }

    return response.json() as Promise<TData>
  } catch (error) {
    handleFetchError(error)
  }
}
