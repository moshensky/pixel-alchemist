import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Return to Gallery
      </Link>
    </div>
  )
}
