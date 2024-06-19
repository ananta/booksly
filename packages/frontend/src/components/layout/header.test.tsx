import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { Header } from './header'

// Mock the buttonVariants function to return a simple className
jest.mock('components/ui/button', () => ({
  buttonVariants: jest.fn().mockImplementation(() => 'button-variant')
}))

describe('Header Component', () => {
  it('renders the header with title and subtitle', () => {
    render(
      <Router>
        <Header />
      </Router>
    )

    expect(screen.getByText('Booksly')).toBeInTheDocument()
    expect(screen.getByText('track your books!')).toBeInTheDocument()
  })

  it('renders "Create Book" button on home page', () => {
    render(
      <Router>
        <Header />
      </Router>
    )

    expect(screen.getByText('Create Book')).toBeInTheDocument()
  })

  it('renders "Go Back" button on non-home page', () => {
    render(
      <MemoryRouter initialEntries={['/manage-book']}>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByText('Go Back')).toBeInTheDocument()
  })
})
