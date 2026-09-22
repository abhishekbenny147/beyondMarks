import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'


const NAV_LINKS = [
  { label: 'Explore',        to: '/explore' },
  { label: 'Hidden Careers', to: '/hidden'  },
  { label: 'Stories',        to: '/stories' },
  { label: 'Quiz',           to: '/quiz'    },
]

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate         = useNavigate()
  const location         = useLocation()
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [scrolled,   setScrolled]    = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (to) => location.pathname === to

  return (
    <>
      <header className={`
        sticky top-0 z-50 w-full
        transition-all duration-300 ease-smooth
        ${scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-surface-border shadow-xs'
          : 'bg-surface-bg border-b border-transparent'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 flex-shrink-0 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#14B88A] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 3L4 7v5l5 3 5-3V7L9 3z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="9" cy="9" r="2" fill="white"/>
                </svg>
              </div>
             <span className="font-extrabold text-xl tracking-tight text-ink">
                beyond<span className="text-primary">Marks</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    px-3.5 py-2 rounded-lg text-body-sm font-medium
                    transition-all duration-150 ease-smooth
                    ${isActive(link.to)
                      ? 'text-primary bg-primary-light'
                      : 'text-ink-secondary hover:text-ink hover:bg-slate-100'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2.5">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(p => !p)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-surface-border hover:border-primary/40 hover:bg-primary-light/50 transition-all duration-150 group"
                  >
                    {/* Avatar */}
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-caption font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-body-sm font-medium text-ink max-w-[120px] truncate">
                      {user.name}
                    </span>
                    <svg className={`w-3.5 h-3.5 text-ink-muted transition-transform duration-150 ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-surface-card rounded-xl border border-surface-border shadow-lg z-20 overflow-hidden animate-scale-in">
                        <div className="px-4 py-3 border-b border-surface-border">
                          <p className="text-body-sm font-semibold text-ink truncate">{user.name}</p>
                          <p className="text-caption text-ink-secondary truncate">{user.email}</p>
                        </div>
                        <div className="p-1.5">
                          <Link to="/profile" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-body-sm text-ink-secondary hover:text-ink hover:bg-slate-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile
                          </Link>
                          <Link to="/explore" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-body-sm text-ink-secondary hover:text-ink hover:bg-slate-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Saved Careers
                          </Link>
                        </div>
                        <div className="p-1.5 border-t border-surface-border">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-body-sm text-status-danger hover:bg-red-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-body-sm font-medium text-ink-secondary hover:text-ink transition-colors px-3 py-2"
                  >
                    Sign in
                  </Link>
                  <Button
                    size="lg"
                    onClick={() => navigate('/register')}
                  >
                    Get started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-ink rounded-full transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-ink rounded-full transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-ink rounded-full transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-surface-border bg-surface-card animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    flex items-center px-3 py-2.5 rounded-lg text-body-sm font-medium
                    transition-colors
                    ${isActive(link.to)
                      ? 'text-primary bg-primary-light'
                      : 'text-ink-secondary hover:text-ink hover:bg-slate-50'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="px-4 pb-4 pt-2 border-t border-surface-border space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-caption font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold text-ink">{user.name}</p>
                      <p className="text-caption text-ink-secondary">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/profile" className="block px-3 py-2.5 rounded-lg text-body-sm text-ink-secondary hover:bg-slate-50 transition-colors">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-body-sm text-status-danger hover:bg-red-50 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block w-full text-center px-4 py-2.5 rounded-lg text-body-sm font-medium text-ink-secondary border border-surface-border hover:bg-slate-50 transition-colors">
                    Sign in
                  </Link>
                  <Link to="/register" className="block w-full text-center px-4 py-2.5 rounded-lg text-body-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors">
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}