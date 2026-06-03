import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
              beyond<span className="text-gray-800">Marks</span>
            </Link>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Helping students discover careers based on interests, strengths, and personality.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wide">Explore</h4>
            <ul className="space-y-2">
              {[
                { label: 'All Careers', to: '/explore' },
                { label: 'Hidden Careers', to: '/hidden' },
                { label: 'Student Stories', to: '/stories' },
                { label: 'Take the Quiz', to: '/quiz' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-500 text-sm hover:text-indigo-600 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wide">Account</h4>
            <ul className="space-y-2">
              {[
                { label: 'Login', to: '/login' },
                { label: 'Register', to: '/register' },
                { label: 'My Profile', to: '/profile' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-500 text-sm hover:text-indigo-600 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wide">Mission</h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Every student deserves to know all their options, not just the ones society approves of.
            </p>
            <Link to="/register"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">
              Get Started Free
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-gray-400 text-sm">
            2025 beyondMarks. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Contact Us'].map(label => (
              <Link key={label} to="/"
                className="text-gray-400 text-sm hover:text-indigo-600 transition">
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}