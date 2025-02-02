import { describe, it } from 'vitest'
import App from './App'
import { render, screen } from './test/test-utils'

describe('App', () => {
  it('renders the App component', () => {
    render(<App />)

    // prints out the jsx in the App component unto the command line
    screen.debug()
  })
})
