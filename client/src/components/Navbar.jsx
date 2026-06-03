import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const links = [
    { label: 'Explore', to: '/explore' },
    { label: 'Stories', to: '/stories' },
    { label: 'Hidden Careers', to: '/hidden' },
    { label: 'Quiz', to: '/quiz' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight flex-shrink-0">
          beyond<span className="text-gray-800">Marks</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <Link key={link.to} to={link.to}
              className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/profile"
                className="text-gray-700 font-medium hover:text-indigo-600 transition text-sm">
                Hi, {user?.name}
              </Link>
              <button onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="text-gray-600 hover:text-indigo-600 font-medium transition text-sm">
                Login
              </Link>
              <Link to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {links.map(link => (
            <Link key={link.to} to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 font-medium py-2 hover:text-indigo-600 transition">
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-3">
            {user ? (
              <div className="space-y-2">
                <Link to="/profile" onClick={() => setMenuOpen(false)}
                  className="block text-gray-700 font-medium py-2">
                  Hi, {user?.name}
                </Link>
                <button onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded-lg font-medium text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="block text-center border border-indigo-600 text-indigo-600 py-2 rounded-lg font-medium text-sm">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}
                  className="block text-center bg-indigo-600 text-white py-2 rounded-lg font-medium text-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}