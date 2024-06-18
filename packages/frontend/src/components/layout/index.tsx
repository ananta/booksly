/**
 * The Layout component.
 * Provides the overall structure of the application, including the Header and main content area.
 *
 * This component includes the Header at the top and a main section that uses React Router's
 * Outlet component to render child routes. It also wraps the Outlet component in a Suspense
 * component to handle loading states.
 *
 * @returns {JSX.Element} The rendered Layout component.
 */

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'


export const Layout: React.FC<{}> = () => {
  return (
    <>
      <main>
        <Suspense fallback={<div>loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}
