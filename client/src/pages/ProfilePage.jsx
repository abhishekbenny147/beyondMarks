import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSaved, toggleSave } from '../api/saved'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const navigate         = useNavigate()
  const queryClient      = useQueryClient()

  const { data: saved, isLoading } = useQuery({
    queryKey: ['saved'],
    queryFn: getSaved,
    enabled: !!user,
  })

  const unsaveMutation = useMutation({
    mutationFn: toggleSave,
    onSuccess: () => queryClient.invalidateQueries(['saved']),
  })

  const handleLogout = () => { logout(); navigate('/') }

  if (!user) { navigate('/login'); return null }

  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-[#F8FFFD]">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#DCEFE8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#14B88A] text-white flex items-center justify-center text-2xl font-extrabold flex-shrink-0 shadow-sm">
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">{user.name}</h1>
              <p className="text-[#64748B] text-sm mt-0.5">{user.email}</p>
              <span className={`inline-flex items-center mt-2 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                user.role === 'ADMIN'
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-[#E6F7F2] text-[#0D8F6A] border border-[#14B88A]/20'
              }`}>
                {user.role}
              </span>
            </div>
            <button onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-[#DCEFE8] bg-white text-[#64748B] font-semibold px-4 py-2 rounded-xl text-sm hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left — Saved careers ── */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#DCEFE8] rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-[#DCEFE8] flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">Saved Careers</h2>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{saved?.length || 0} bookmarked</p>
                </div>
                <Link to="/explore"
                  className="text-xs font-semibold text-[#14B88A] hover:text-[#0D8F6A] transition-colors">
                  + Explore more
                </Link>
              </div>

              {isLoading ? (
                <div className="p-6 space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 bg-[#E6F7F2] rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : saved?.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="w-12 h-12 bg-[#E6F7F2] rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#14B88A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-[#0F172A] font-semibold text-sm mb-1">No saved careers yet</p>
                  <p className="text-[#94A3B8] text-xs mb-5">Explore careers and save the ones that interest you</p>
                  <Link to="/explore"
                    className="inline-flex items-center gap-2 bg-[#14B88A] hover:bg-[#0D8F6A] text-white font-semibold px-5 py-2 rounded-xl text-sm transition-all">
                    Explore careers
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-[#DCEFE8]">
                  {saved.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8FFFD] transition-colors group">
                      <div className="w-8 h-8 rounded-xl bg-[#E6F7F2] text-[#14B88A] flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#14B88A] transition-colors truncate">
                          {item.career.name}
                        </p>
                        <p className="text-xs text-[#94A3B8] mt-0.5">
                          {item.career.category} · <span className="text-[#14B88A] font-semibold">{item.career.averageSalary}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Link to={`/career/${item.career.slug || item.career.id}`}
                          className="text-xs font-semibold text-[#64748B] hover:text-[#14B88A] px-3 py-1.5 rounded-lg border border-[#DCEFE8] hover:border-[#14B88A] transition-all">
                          View
                        </Link>
                        <button onClick={() => unsaveMutation.mutate(item.career.id)}
                          className="text-xs font-semibold text-[#94A3B8] hover:text-red-500 px-3 py-1.5 rounded-lg border border-[#DCEFE8] hover:border-red-200 hover:bg-red-50 transition-all">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right ── */}
          <div className="space-y-5">

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '❤️', label: 'Saved',   value: saved?.length || 0 },
                { icon: '✅', label: 'Status',  value: 'Active'           },
              ].map(stat => (
                <div key={stat.label} className="bg-white border border-[#DCEFE8] rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-lg font-extrabold text-[#0F172A]">{stat.value}</div>
                  <div className="text-xs text-[#94A3B8] font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="bg-white border border-[#DCEFE8] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-[#0F172A] mb-3">Quick Actions</h3>
              <div className="space-y-1.5">
                {[
                  { icon: '🎯', label: 'Take Career Quiz',   to: '/quiz'    },
                  { icon: '🔍', label: 'Explore Careers',    to: '/explore' },
                  { icon: '💡', label: 'Hidden Careers',     to: '/hidden'  },
                  { icon: '📖', label: 'Student Stories',    to: '/stories' },
                ].map(action => (
                  <Link key={action.to} to={action.to}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F8FFFD] transition-colors group">
                    <span className="text-base">{action.icon}</span>
                    <span className="text-sm font-medium text-[#64748B] group-hover:text-[#0F172A] transition-colors flex-1">
                      {action.label}
                    </span>
                    <svg className="w-3.5 h-3.5 text-[#DCEFE8] group-hover:text-[#14B88A] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Account info */}
            <div className="bg-white border border-[#DCEFE8] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-[#0F172A] mb-3">Account</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Name',  value: user.name  },
                  { label: 'Email', value: user.email },
                  { label: 'Role',  value: user.role  },
                  { label: 'Plan',  value: 'Free'     },
                ].map(info => (
                  <div key={info.label} className="flex items-center justify-between py-1.5 border-b border-[#F8FFFD] last:border-0">
                    <span className="text-xs text-[#94A3B8] font-medium">{info.label}</span>
                    <span className="text-xs font-semibold text-[#0F172A] truncate max-w-[160px] text-right">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#0F172A] rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#14B88A]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl pointer-events-none" />
              <div className="relative z-10">
                <p className="text-white font-bold text-sm mb-1">Your future is bigger</p>
                <p className="text-white/50 text-xs mb-4">than your marks.</p>
                <Link to="/quiz"
                  className="inline-flex items-center gap-2 bg-[#14B88A] hover:bg-[#0D8F6A] text-white font-semibold px-4 py-2 rounded-xl text-xs transition-all">
                  Retake the quiz
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}