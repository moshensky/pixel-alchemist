import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it } from 'vitest'

describe('App', () => {
  it('renders the App component', () => {
    render(<App />)

    // prints out the jsx in the App component unto the command line
    screen.debug()
  })
})
