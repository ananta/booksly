import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError()
  console.error(error)
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {isRouteErrorResponse(error)
          ? error.data || error.statusText
          : 'Unknown error occurred!'}
      </p>
    </div>
  )
}
