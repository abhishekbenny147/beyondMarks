import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
        beyond<span className="text-gray-800">Marks</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/explore" className="text-gray-600 hover:text-indigo-600 font-medium transition">
          Explore
        </Link>
        <Link to="/stories" className="text-gray-600 hover:text-indigo-600 font-medium transition">
          Stories
        </Link>
        <Link to="/hidden" className="text-gray-600 hover:text-purple-600 font-medium transition">
          Hidden Careers
        </Link>
        <Link to="/quiz" className="text-gray-600 hover:text-indigo-600 font-medium transition">
          Quiz
        </Link>
        <Link to="/profile" className="text-gray-700 font-medium hover:text-indigo-600 transition">
         {user?.name}
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <button onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition">
              Login
            </Link>
            <Link to="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}