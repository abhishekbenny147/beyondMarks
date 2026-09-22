import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCareerBySlug, getCareerById, getAllCareers } from '../api/careers'
import axiosClient from '../api/axiosClient'

const fetchGuide = (id) =>
  axiosClient.get(`/careers/${id}/guide`).then(r => r.data)

export default function CareerDetailPage() {
  const { slug }   = useParams()
  const navigate   = useNavigate()
  const isId       = !isNaN(slug)

  const { data: career, isLoading, error } = useQuery({
    queryKey: ['career', slug],
    queryFn: async () => {
      if (isId) return getCareerById(slug)
      try { return await getCareerBySlug(slug) }
      catch {
        const all  = await getAllCareers()
        const found = all.find(c => c.slug === slug || c.name?.toLowerCase().replace(/\s+/g, '-') === slug)
        if (found) return found
        throw new Error('Career not found')
      }
    }
  })

  const { data: guide, isLoading: guideLoading } = useQuery({
    queryKey: ['guide', career?.id],
    queryFn: () => fetchGuide(career.id),
    enabled: !!career?.id,
  })

  if (isLoading) return (
    <div className="min-h-screen bg-[#F8FFFD] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[#14B88A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#64748B] text-sm">Loading career guide...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-[#F8FFFD] flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#0F172A] mb-2">Career not found</h3>
        <p className="text-[#64748B] text-sm mb-6">This career path doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/explore')}
          className="inline-flex items-center gap-2 bg-[#14B88A] hover:bg-[#0D8F6A] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
          Back to Explore
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FFFD]">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#DCEFE8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#94A3B8] mb-6">
            <button onClick={() => navigate('/explore')} className="hover:text-[#14B88A] transition-colors">
              Explore
            </button>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#0F172A] font-medium">{career.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              {/* Category badge */}
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#E6F7F2] text-[#0D8F6A] border border-[#14B88A]/20 mb-4 uppercase tracking-widest">
                {career.category}
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
                {career.name}
              </h1>
              <p className="text-[#64748B] text-base leading-relaxed max-w-2xl">
                {career.description}
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex md:flex-col gap-3 flex-shrink-0">
              <div className="bg-[#E6F7F2] rounded-2xl px-5 py-3 text-center min-w-[120px]">
                <p className="text-xs text-[#0D8F6A] font-semibold uppercase tracking-wide mb-1">Avg Salary</p>
                <p className="text-lg font-extrabold text-[#0D8F6A]">{career.averageSalary}</p>
              </div>
              <div className="bg-[#F8FFFD] border border-[#DCEFE8] rounded-2xl px-5 py-3 text-center min-w-[120px]">
                <p className="text-xs text-[#94A3B8] font-semibold uppercase tracking-wide mb-1">Field</p>
                <p className="text-sm font-bold text-[#0F172A]">{career.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {guideLoading ? (
          <GuideLoadingSkeleton />
        ) : guide ? (
          <>
            {/* Day in the life */}
            <Section icon="☀️" title="A Day in the Life">
              <p className="text-[#64748B] leading-relaxed">{guide.dayInLife}</p>
            </Section>

            {/* Roadmap */}
            <Section icon="🗺️" title={`Your Roadmap to Become a ${career.name}`}>
              <div className="space-y-4">
                {guide.roadmap?.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#14B88A] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                        {step.step}
                      </div>
                      {i < guide.roadmap.length - 1 && (
                        <div className="w-px flex-1 bg-[#DCEFE8] mt-2" />
                      )}
                    </div>
                    <div className={`flex-1 bg-[#F8FFFD] border border-[#DCEFE8] rounded-2xl p-4 ${i < guide.roadmap.length - 1 ? 'mb-2' : ''}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-[#0F172A] text-sm">{step.title}</h4>
                        <span className="inline-flex text-xs font-semibold text-[#14B88A] bg-[#E6F7F2] px-2.5 py-0.5 rounded-full whitespace-nowrap w-fit">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm text-[#64748B] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Skills + Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Section icon="🛠️" title="Required Skills">
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills?.split(',').map(skill => (
                    <span key={skill}
                      className="text-sm font-medium px-3 py-1.5 bg-[#E6F7F2] text-[#0D8F6A] border border-[#14B88A]/20 rounded-xl">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </Section>

              <Section icon="💰" title="Salary Breakdown">
                <div className="space-y-3">
                  {[
                    { label: 'Entry Level',  value: guide.salaryBreakdown?.entry,  color: 'bg-green-50  text-green-700  border-green-200' },
                    { label: 'Mid Level',    value: guide.salaryBreakdown?.mid,    color: 'bg-blue-50   text-blue-700   border-blue-200'  },
                    { label: 'Senior Level', value: guide.salaryBreakdown?.senior, color: 'bg-purple-50 text-purple-700 border-purple-200'},
                  ].map(tier => (
                    <div key={tier.label} className="flex items-center justify-between">
                      <span className="text-sm text-[#64748B] font-medium">{tier.label}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tier.color}`}>
                        {tier.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Top companies */}
            <Section icon="🏢" title="Top Companies Hiring">
              <div className="flex flex-wrap gap-2">
                {guide.topCompanies?.map(company => (
                  <span key={company}
                    className="text-sm font-semibold px-4 py-2 bg-white border border-[#DCEFE8] text-[#0F172A] rounded-xl hover:border-[#14B88A] hover:text-[#14B88A] transition-colors cursor-default">
                    {company}
                  </span>
                ))}
              </div>
            </Section>

            {/* Pros + Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Section icon="✅" title="Pros">
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
              </Section>

              <Section icon="⚠️" title="Cons">
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
              </Section>
            </div>

            {/* Resources */}
            <Section icon="📚" title="Best Resources to Get Started">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {guide.resources?.map((res, i) => (
                  <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col gap-1 p-4 bg-[#F8FFFD] border border-[#DCEFE8] rounded-xl hover:border-[#14B88A] hover:bg-[#E6F7F2] transition-all">
                    <span className="text-[10px] font-bold text-[#14B88A] uppercase tracking-widest">{res.type}</span>
                    <span className="text-sm font-semibold text-[#0F172A] group-hover:text-[#0D8F6A] transition-colors">{res.name}</span>
                    <span className="text-xs text-[#94A3B8] flex items-center gap-1 mt-auto">
                      Visit
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </Section>
          </>
        ) : null}

        {/* Future scope */}
        <div className="bg-[#0F172A] rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#14B88A]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#14B88A]/20 border border-[#14B88A]/30 text-[#14B88A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              🚀 Future Scope
            </div>
            <p className="text-white/80 leading-relaxed">{career.futureScope}</p>
          </div>
        </div>

        {/* Back button */}
        <div className="flex justify-center pt-4 pb-8">
          <button onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#14B88A] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Explore
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({ icon, title, children }) {
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

function GuideLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white border border-[#DCEFE8] rounded-2xl p-6">
          <div className="h-4 bg-[#E6F7F2] rounded-lg w-1/4 mb-4" />
          <div className="space-y-2">
            <div className="h-3 bg-[#E6F7F2] rounded-lg w-full" />
            <div className="h-3 bg-[#E6F7F2] rounded-lg w-5/6" />
            <div className="h-3 bg-[#E6F7F2] rounded-lg w-4/5" />
          </div>
        </div>
      ))}
    </div>
  )
}