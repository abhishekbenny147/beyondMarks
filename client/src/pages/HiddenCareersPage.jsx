import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getHiddenCareers, upvoteHiddenCareer } from '../api/hiddenCareers'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function HiddenCareersPage() {
  const { user }    = useAuthStore()
  const navigate    = useNavigate()
  const queryClient = useQueryClient()

  const { data: careers, isLoading } = useQuery({
    queryKey: ['hidden-careers'],
    queryFn: getHiddenCareers,
  })

  const upvote = useMutation({
    mutationFn: upvoteHiddenCareer,
    onSuccess: () => queryClient.invalidateQueries(['hidden-careers'])
  })

  return (
    <div className="min-h-screen bg-[#F8FFFD]">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#DCEFE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="inline-flex items-center gap-2 bg-[#EDE9FE] border border-[#7C3AED]/20 text-[#7C3AED] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Off the beaten path
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
            Hidden Careers
          </h1>
          <p className="text-[#64748B] max-w-xl">
            Careers most students never hear about in school — but that are fulfilling,
            well-paid, and in demand. Sorted by student curiosity.
          </p>
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#DCEFE8] p-6 animate-pulse">
                <div className="h-4 bg-[#EDE9FE] rounded-lg w-1/3 mb-3" />
                <div className="h-5 bg-[#EDE9FE] rounded-lg w-1/2 mb-3" />
                <div className="h-3 bg-[#EDE9FE] rounded-lg w-full mb-2" />
                <div className="h-3 bg-[#EDE9FE] rounded-lg w-4/5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {careers?.map(career => (
              <div key={career.id}
                className="group bg-white rounded-2xl border border-[#DCEFE8] p-6 hover:border-[#7C3AED]/40 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col">

                {/* Top */}
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-[#EDE9FE] text-[#7C3AED] border border-[#7C3AED]/20">
                    {career.category}
                  </span>
                  <span className="text-sm font-bold text-[#14B88A]">{career.averageSalary}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#0F172A] mb-2 group-hover:text-[#7C3AED] transition-colors">
                  {career.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 mb-4">
                  {career.description}
                </p>

                {/* Why hidden */}
                <div className="bg-[#EDE9FE]/40 border border-[#7C3AED]/15 rounded-xl p-3 mb-3">
                  <p className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-widest mb-1">
                    💡 Why it's hidden
                  </p>
                  <p className="text-xs text-[#64748B] leading-relaxed">{career.whyHidden}</p>
                </div>

                {/* Discovery tip */}
                <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 mb-4">
                  <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">
                    🗺️ Discovery tip
                  </p>
                  <p className="text-xs text-[#64748B] leading-relaxed">{career.discoveryTip}</p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
                  {career.requiredSkills?.split(',').slice(0, 3).map(skill => (
                    <span key={skill} className="text-[11px] font-medium px-2 py-0.5 bg-[#F8FFFD] border border-[#DCEFE8] text-[#64748B] rounded-full">
                      {skill.trim()}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#DCEFE8]">
                  <button
                    onClick={() => user && upvote.mutate(career.id)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                      user
                        ? 'bg-[#EDE9FE] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white cursor-pointer'
                        : 'bg-[#F8FFFD] text-[#94A3B8] cursor-not-allowed'
                    }`}
                    title={!user ? 'Sign in to upvote' : ''}
                  >
                    🔥 {career.curiosityScore}
                    <span className="text-xs opacity-70">curious</span>
                  </button>
                  <button
                    onClick={() => navigate(`/hidden/${career.id}`)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F172A] hover:text-[#7C3AED] transition-colors"
                  >
                    View guide
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}