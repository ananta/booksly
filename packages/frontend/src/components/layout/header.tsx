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
      </nav>
    </>
  )
}
