import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function HomePage() {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1 rounded-full mb-6">
          Career Discovery Platform
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Your future is bigger <br />
          than your <span className="text-indigo-600">marks</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Discover careers that match your interests, strengths, and personality —
          not just what society expects of you.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to={user ? '/explore' : '/register'}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition shadow-lg">
            Explore Careers
          </Link>
          <Link to="/register"
            className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-50 transition">
            Take the Quiz
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: '🎯', title: 'Interest-Based', desc: 'Find careers aligned with what you genuinely love doing.' },
          { icon: '🔍', title: 'Hidden Careers', desc: 'Discover paths most people never hear about in school.' },
          { icon: '📖', title: 'Real Stories', desc: 'Learn from students who chose their own path.' },
        ].map((f) => (
          <div key={f.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

    </div>
  )
}