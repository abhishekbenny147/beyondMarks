import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSaved, toggleSave } from '../api/saved'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: saved, isLoading } = useQuery({
    queryKey: ['saved'],
    queryFn: getSaved,
    enabled: !!user,
  })

  const unsaveMutation = useMutation({
    mutationFn: toggleSave,
    onSuccess: () => queryClient.invalidateQueries(['saved']),
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    navigate('/login')
    return null
  }

  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Profile Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white/20 text-white flex items-center justify-center text-4xl font-extrabold shadow-lg border-2 border-white/30">
            {initials}
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-1">Student Profile</p>
            <h1 className="text-4xl font-extrabold text-white mb-1">{user.name}</h1>
            <p className="text-indigo-200">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/quiz"
              className="bg-white text-indigo-600 px-5 py-2 rounded-xl font-semibold hover:bg-indigo-50 transition text-sm">
              🎯 Retake Quiz
            </Link>
            <button onClick={handleLogout}
              className="bg-white/10 border border-white/30 text-white px-5 py-2 rounded-xl font-semibold hover:bg-white/20 transition text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '❤️', label: 'Saved Careers', value: saved?.length || 0, color: 'text-red-500' },
            { icon: '🎓', label: 'Account Type', value: user.role, color: 'text-indigo-600' },
            { icon: '✅', label: 'Status', value: 'Active', color: 'text-green-600' },
            { icon: '🔍', label: 'Platform', value: 'beyondMarks', color: 'text-purple-600' },
          ].map(stat => (
            <div key={stat.label}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center hover:shadow-md transition">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className={`text-xl font-extrabold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-400 text-xs mt-1 font-medium uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Saved Careers — takes 2 columns */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">❤️ Saved Careers</h2>
                <p className="text-gray-400 text-sm mt-0.5">{saved?.length || 0} careers bookmarked</p>
              </div>
              <Link to="/explore"
                className="text-indigo-600 text-sm font-semibold hover:underline">
                + Add More
              </Link>
            </div>

            <div className="divide-y divide-gray-50">
              {isLoading ? (
                <div className="p-6 space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-16" />
                  ))}
                </div>
              ) : saved?.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="text-gray-500 font-medium mb-2">No saved careers yet</p>
                  <p className="text-gray-400 text-sm mb-6">Explore careers and click the ❤️ to save them here</p>
                  <Link to="/explore"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition text-sm">
                    Explore Careers
                  </Link>
                </div>
              ) : (
                saved?.map((item, index) => (
                  <div key={item.id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition group">

                    {/* Rank */}
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 group-hover:text-indigo-700 transition truncate">
                        {item.career.name}
                      </p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-gray-400">{item.career.category}</span>
                        <span className="text-xs text-green-600 font-semibold">{item.career.averageSalary}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link to={`/career/${item.career.slug || item.career.id}`}
                        className="text-xs text-indigo-600 font-semibold px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition">
                        View Guide
                      </Link>
                      <button
                        onClick={() => unsaveMutation.mutate(item.career.id)}
                        className="text-xs text-red-400 font-semibold px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition"
                        title="Remove from saved"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-extrabold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: '🎯', label: 'Take Career Quiz', to: '/quiz', color: 'hover:bg-indigo-50 hover:border-indigo-300' },
                  { icon: '🔍', label: 'Explore Careers', to: '/explore', color: 'hover:bg-purple-50 hover:border-purple-300' },
                  { icon: '💡', label: 'Hidden Careers', to: '/hidden', color: 'hover:bg-amber-50 hover:border-amber-300' },
                  { icon: '📖', label: 'Student Stories', to: '/stories', color: 'hover:bg-green-50 hover:border-green-300' },
                ].map(action => (
                  <Link key={action.to} to={action.to}
                    className={`flex items-center gap-3 p-3 rounded-xl border border-gray-100 transition ${action.color} group`}>
                    <span className="text-xl">{action.icon}</span>
                    <span className="text-gray-700 font-medium text-sm group-hover:text-gray-900">{action.label}</span>
                    <span className="ml-auto text-gray-300 group-hover:text-gray-500">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-extrabold text-gray-900 mb-4">Account Info</h3>
              <div className="space-y-3">
                {[
                  { label: 'Name', value: user.name },
                  { label: 'Email', value: user.email },
                  { label: 'Role', value: user.role },
                  { label: 'Plan', value: 'Free' },
                ].map(info => (
                  <div key={info.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-400 text-sm">{info.label}</span>
                    <span className="text-gray-800 text-sm font-semibold">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <p className="text-indigo-100 text-xs uppercase tracking-widest mb-2 font-semibold">Our Promise</p>
              <p className="text-white font-bold text-lg leading-snug mb-3">
                Your future is bigger than your marks.
              </p>
              <p className="text-indigo-200 text-sm leading-relaxed">
                Keep exploring. Keep discovering. The right path is out there.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}