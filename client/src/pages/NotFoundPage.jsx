import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#DCEFE8] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-[#14B88A] flex items-center justify-center group-hover:bg-[#0D8F6A] transition-colors">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M9 3L4 7v5l5 3 5-3V7L9 3z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="9" cy="9" r="2" fill="white"/>
                </svg>
              </div>
              <span className="font-extrabold text-base text-[#0F172A]">
                beyond<span className="text-[#14B88A]">Marks</span>
              </span>
            </Link>
            <p className="text-[#64748B] text-sm leading-relaxed mb-4">
              Helping students discover careers based on interests, strengths, and personality.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14B88A] bg-[#E6F7F2] px-3 py-1.5 rounded-full border border-[#14B88A]/20">
              Free forever
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'All Careers',     to: '/explore' },
                { label: 'Hidden Careers',  to: '/hidden'  },
                { label: 'Student Stories', to: '/stories' },
                { label: 'Take the Quiz',   to: '/quiz'    },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-[#64748B] hover:text-[#14B88A] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-4">Account</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Sign In',       to: '/login'    },
                { label: 'Create Account',to: '/register' },
                { label: 'My Profile',    to: '/profile'  },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-[#64748B] hover:text-[#14B88A] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-4">Mission</h4>
            <p className="text-sm text-[#64748B] leading-relaxed mb-4">
              Every student deserves to know all their options — not just the ones society approves of.
            </p>
            <Link to="/register"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#14B88A] hover:text-[#0D8F6A] transition-colors">
              Get started free
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#DCEFE8] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#94A3B8]">
            2025 beyondMarks. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map(label => (
              <Link key={label} to="/"
                className="text-xs text-[#94A3B8] hover:text-[#14B88A] transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}