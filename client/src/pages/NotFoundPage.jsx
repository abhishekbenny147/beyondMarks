import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold text-indigo-100 mb-4">404</div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8">This page does not exist.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
            Go Home
          </Link>
          <Link to="/explore" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition">
            Explore Careers
          </Link>
        </div>
      </div>
    </div>
  )
}