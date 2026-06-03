import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
              beyond<span className="text-gray-800">Marks</span>
            </Link>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Helping students discover careers based on interests, strengths, and personality — not just marks.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition text-sm font-bold">
                G
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition text-sm font-bold">
                T
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition text-sm font-bold">
                in
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { label: 'All Careers', to: '/explore' },
                { label: 'Tech & Digital', to: '/explore' },
                { label: 'Business', to: '/explore' },
                { label: 'Creative & Media', to: '/explore' },
                { label: 'Science & Health', to: '/explore' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to}
                    className="text-gray-500 text-sm hover:text-indigo-600 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Discover</h4>
            <ul className="space-y-2">
              {[
                { label: 'Take the Quiz', to: '/quiz' },
                { label: 'Hidden Careers', to: '/hidden' },
                { label: 'Student Stories', to: '/stories' },
                { label: 'My Profile', to: '/profile' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to}
                    className="text-gray-500 text-sm hover:text-indigo-600 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Our Mission</h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              Every student deserves to know all their options — not just the ones society approves of.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              beyondMarks exists to bridge the gap between potential and purpose.
            </p>
            <Link to="/register"
              className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">
              Get Started Free
            </Link>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} beyondMarks. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Privacy Policy', to: '/' },
              { label: 'Terms of Service', to: '/' },
              { label: 'Contact Us', to: '/' },
            ].map(link => (
              <Link key={link.label} to={link.to}
                className="text-gray-400 text-sm hover:text-indigo-600 transition">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}