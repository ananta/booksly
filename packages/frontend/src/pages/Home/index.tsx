import { useEffect } from 'react'
import { BookCards } from './components/bookcards'
export default function Home() {
  return (
    <>
      <h2 className="mb-4">Your Books</h2>
      {/* TODO: add skeletal loading component */}
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      </div>
    </>
  )
}
