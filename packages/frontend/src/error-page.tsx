import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from 'components/ui/card'
import { MessageCircleWarningIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError()
  console.error(error)
  return (
    <>
      <header>
        <nav className="flex justify-between">
          <Link to={'/'}>
            <h1 className="">Booksly</h1>
            <h3 className="scroll-m-20 first:mt-0 text-muted-foreground">
              track your books!
            </h3>
          </Link>
        </nav>
      </header>

      <div className="flex mt-48 justify-center">
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Oops!</CardTitle>
              <CardDescription>
                Sorry, an unexpected error has occurred.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className=" flex items-center space-x-4 rounded-md border p-4">
                <MessageCircleWarningIcon />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {isRouteErrorResponse(error)
                      ? error.data || error.statusText
                      : 'Unknown error occurred!'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
