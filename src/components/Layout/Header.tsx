import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { Container } from './Container'
import { message } from './Header.messages'

export function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-10">
      <Container className="py-4">
        <div className="flex items-center">
          <Link to="/">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  <FormattedMessage {...message.title} />
                </h1>
                <p className="text-sm text-gray-500">
                  <FormattedMessage {...message.description} />
                </p>
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </header>
  )
}
