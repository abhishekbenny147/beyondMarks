import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../api/axiosClient'
import useAuthStore from '../store/authStore'

const fetchCareer = (id) =>
  axiosClient.get(`/hidden-careers/${id}`).then(r => r.data)

const fetchGuide = (id) =>
  axiosClient.get(`/hidden-careers/${id}/guide`).then(r => r.data)

export default function HiddenCareerDetailPage() {
  const { id }      = useParams()
  const { user }    = useAuthStore()
  const navigate    = useNavigate()
  const queryClient = useQueryClient()

  const { data: career, isLoading } = useQuery({
    queryKey: ['hidden-career', id],
    queryFn: () => fetchCareer(id),
  })

  const { data: guide, isLoading: guideLoading } = useQuery({
    queryKey: ['hidden-guide', id],
    queryFn: () => fetchGuide(id),
    enabled: !!career,
  })

  const upvote = useMutation({
    mutationFn: () => axiosClient.post(`/hidden-careers/${id}/upvote`).then(r => r.data),
    onSuccess: () => queryClient.invalidateQueries(['hidden-career', id])
  })

  if (isLoading) return (
    <div className="min-h-screen bg-[#F8FFFD] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#64748B] text-sm">Loading hidden career...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FFFD]">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#DCEFE8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#94A3B8] mb-6">
            <button onClick={() => navigate('/hidden')} className="hover:text-[#7C3AED] transition-colors">
              Hidden Careers
            </button>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#0F172A] font-medium">{career?.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#EDE9FE] border border-[#7C3AED]/20 text-[#7C3AED] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Hidden Career · {career?.category}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
                {career?.title}
              </h1>
              <p className="text-[#64748B] text-base leading-relaxed max-w-2xl">
                {career?.description}
              </p>
            </div>

            <div className="flex md:flex-col gap-3 flex-shrink-0">
              <div className="bg-[#E6F7F2] rounded-2xl px-5 py-3 text-center min-w-[120px]">
                <p className="text-xs text-[#0D8F6A] font-semibold uppercase tracking-wide mb-1">Avg Salary</p>
                <p className="text-lg font-extrabold text-[#0D8F6A]">{career?.averageSalary}</p>
              </div>
              <button
                onClick={() => user && upvote.mutate()}
                className={`rounded-2xl px-5 py-3 text-center min-w-[120px] transition-all ${
                  user
                    ? 'bg-[#EDE9FE] hover:bg-[#7C3AED] hover:text-white cursor-pointer'
                    : 'bg-[#F8FFFD] border border-[#DCEFE8] cursor-not-allowed'
                }`}
              >
                <p className="text-xs text-[#7C3AED] font-semibold uppercase tracking-wide mb-1">Curiosity</p>
                <p className="text-lg font-extrabold text-[#7C3AED]">🔥 {career?.curiosityScore}</p>
              </button>
            </div>
          </div>

          {/* Why hidden + tip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-[#EDE9FE]/40 border border-[#7C3AED]/15 rounded-2xl p-4">
              <p className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest mb-2">💡 Why it's hidden</p>
              <p className="text-sm text-[#64748B] leading-relaxed">{career?.whyHidden}</p>
            </div>
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">🗺️ Discovery tip</p>
              <p className="text-sm text-[#64748B] leading-relaxed">{career?.discoveryTip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Guide content ───────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {guideLoading ? (
          <div className="space-y-6 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#DCEFE8] rounded-2xl p-6">
                <div className="h-4 bg-[#EDE9FE] rounded-lg w-1/4 mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-[#EDE9FE] rounded-lg w-full" />
                  <div className="h-3 bg-[#EDE9FE] rounded-lg w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : guide ? (
          <>
            {/* Day in the life */}
            <HSection icon="☀️" title="A Day in the Life">
              <p className="text-[#64748B] leading-relaxed">{guide.dayInLife}</p>
            </HSection>

            {/* Roadmap */}
            <HSection icon="🗺️" title={`Your Roadmap to Become a ${career?.title}`}>
              <div className="space-y-4">
                {guide.roadmap?.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                        {step.step}
                      </div>
                      {i < guide.roadmap.length - 1 && (
                        <div className="w-px flex-1 bg-[#DCEFE8] mt-2" />
                      )}
                    </div>
                    <div className={`flex-1 bg-[#F8FFFD] border border-[#DCEFE8] rounded-2xl p-4 ${i < guide.roadmap.length - 1 ? 'mb-2' : ''}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-[#0F172A] text-sm">{step.title}</h4>
                        <span className="inline-flex text-xs font-semibold text-[#7C3AED] bg-[#EDE9FE] px-2.5 py-0.5 rounded-full whitespace-nowrap w-fit">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm text-[#64748B] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </HSection>

            {/* Skills + Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HSection icon="🛠️" title="Required Skills">
                <div className="flex flex-wrap gap-2">
                  {career?.requiredSkills?.split(',').map(skill => (
                    <span key={skill}
                      className="text-sm font-medium px-3 py-1.5 bg-[#EDE9FE] text-[#7C3AED] border border-[#7C3AED]/20 rounded-xl">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </HSection>

              <HSection icon="💰" title="Salary Breakdown">
                <div className="space-y-3">
                  {[
                    { label: 'Entry Level',  value: guide.salaryBreakdown?.entry,  color: 'bg-green-50  text-green-700  border-green-200'  },
                    { label: 'Mid Level',    value: guide.salaryBreakdown?.mid,    color: 'bg-blue-50   text-blue-700   border-blue-200'   },
                    { label: 'Senior Level', value: guide.salaryBreakdown?.senior, color: 'bg-purple-50 text-purple-700 border-purple-200' },
                  ].map(tier => (
                    <div key={tier.label} className="flex items-center justify-between">
                      <span className="text-sm text-[#64748B] font-medium">{tier.label}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tier.color}`}>
                        {tier.value}
                      </span>
                    </div>
                  ))}
                </div>
              </HSection>
            </div>

            {/* Companies */}
            <HSection icon="🏢" title="Where You Can Work">
              <div className="flex flex-wrap gap-2">
                {guide.topCompanies?.map(company => (
                  <span key={company}
                    className="text-sm font-semibold px-4 py-2 bg-white border border-[#DCEFE8] text-[#0F172A] rounded-xl hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors cursor-default">
                    {company}
                  </span>
                ))}
              </div>
            </HSection>

            {/* Pros + Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HSection icon="✅" title="Pros">
                <ul className="space-y-2.5">
                  {guide.prosAndCons?.pros?.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-[#64748B] leading-relaxed">{pro}</span>
                    </li>
                  ))}
                </ul>
              </HSection>
              <HSection icon="⚠️" title="Cons">
                <ul className="space-y-2.5">
                  {guide.prosAndCons?.cons?.map((con, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-sm text-[#64748B] leading-relaxed">{con}</span>
                    </li>
                  ))}
                </ul>
              </HSection>
            </div>

            {/* Resources */}
            <HSection icon="📚" title="Best Resources to Get Started">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {guide.resources?.map((res, i) => (
                  <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col gap-1 p-4 bg-[#F8FFFD] border border-[#DCEFE8] rounded-xl hover:border-[#7C3AED] hover:bg-[#EDE9FE]/40 transition-all">
                    <span className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-widest">{res.type}</span>
                    <span className="text-sm font-semibold text-[#0F172A] group-hover:text-[#7C3AED] transition-colors">{res.name}</span>
                    <span className="text-xs text-[#94A3B8] flex items-center gap-1 mt-auto">
                      Visit
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </HSection>
          </>
        ) : null}

        {/* Back */}
        <div className="flex justify-center pt-4 pb-8">
          <button onClick={() => navigate('/hidden')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#7C3AED] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Hidden Careers
          </button>
        </div>
      </div>
    </div>
  )
}

function HSection({ icon, title, children }) {
  return (
    <div className="bg-white border border-[#DCEFE8] rounded-2xl p-6">
      <h2 className="flex items-center gap-2 text-base font-bold text-[#0F172A] mb-4">
        <span>{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  )
}