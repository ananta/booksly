/**
 * The Header component.
 * Displays the navigation bar and site logo.
 *
 * This component shows a title and subtitle linking to the home page. It conditionally
 * renders a "Create Book" button or a "Go Back" button based on the current location
 * path.
 *
 * @returns {JSX.Element} The rendered Header component.
 */

import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'

import { buttonVariants } from 'components/ui/button'

export const Header: React.FC<{}> = () => {
  let location = useLocation()
  return (
    <>
      <nav className="flex justify-between">
        <Link to={'/'}>
          <h1 className="">Booksly</h1>
          <h3 className="scroll-m-20 first:mt-0 text-muted-foreground">
            track your books!
          </h3>
        </Link>
        {location.pathname === '/' ? (
          <Link
            to={'/manage-book'}
            state={{ type: 'create' }}
            className={buttonVariants({ variant: 'default' })}
          >
            <Plus className="mr-2" /> Create Book
          </Link>
        ) : (
          <Link to={'/'} className={buttonVariants({ variant: 'outline' })}>
            <ArrowLeft className="mr-2" /> Go Back
          </Link>
        )}
      </nav>
    </>
  )
}
