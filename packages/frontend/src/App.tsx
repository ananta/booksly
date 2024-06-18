import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from 'components/layout'
import { ErrorPage } from './error-page'
import { Home, BookForm } from './pages'

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/manage-book',
          element: <BookForm />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
