import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCareerBySlug, getCareerById, getAllCareers } from '../api/careers'
import axiosClient from '../api/axiosClient'

const fetchGuide = (id) =>
  axiosClient.get(`/careers/${id}/guide`).then(r => r.data)

export default function CareerDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isId = !isNaN(slug)

  const { data: career, isLoading, error } = useQuery({
    queryKey: ['career', slug],
    queryFn: async () => {
      if (isId) return getCareerById(slug)
      try {
        return await getCareerBySlug(slug)
      } catch {
        // fallback: search all careers by slug match
        const all = await getAllCareers()
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-bounce">🔍</div>
        <p className="text-gray-500 text-lg">Loading career...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <p className="text-red-400 text-lg">Career not found.</p>
      <button onClick={() => navigate('/explore')}
        className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold">
        Back to Explore
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            {career.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{career.name}</h1>
          <p className="text-indigo-100 text-base md:text-lg max-w-2xl leading-relaxed">{career.description}</p>

          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/10 rounded-xl px-4 py-3">
              <p className="text-indigo-200 text-xs uppercase tracking-wide mb-1">Avg Salary</p>
              <p className="text-white font-bold text-lg md:text-xl">{career.averageSalary}</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-3">
              <p className="text-indigo-200 text-xs uppercase tracking-wide mb-1">Field</p>
              <p className="text-white font-bold">{career.category}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">

        {guideLoading ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4 animate-spin">⚙️</div>
            <p className="text-gray-500">Generating your career guide...</p>
          </div>
        ) : guide ? (
          <>
            {/* Day in the Life */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4">☀️ A Day in the Life</h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">{guide.dayInLife}</p>
            </section>

            {/* Roadmap */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-8">
                🗺️ Your Roadmap
              </h2>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-indigo-100 hidden md:block" />
                <div className="space-y-6">
                  {guide.roadmap?.map((step, index) => (
                    <div key={index} className="flex gap-4 md:gap-6 relative">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0 z-10 shadow-md">
                        {step.step}
                      </div>
                      <div className="flex-1 bg-indigo-50 rounded-2xl p-4 md:p-5 border border-indigo-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                          <h3 className="text-base md:text-lg font-bold text-gray-800">{step.title}</h3>
                          <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full self-start md:self-auto">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills + Salary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">🛠️ Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills?.split(',').map(skill => (
                    <span key={skill}
                      className="bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-2 rounded-xl border border-indigo-100">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">💰 Salary Breakdown</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Entry Level', value: guide.salaryBreakdown?.entry, color: 'bg-green-100 text-green-700' },
                    { label: 'Mid Level', value: guide.salaryBreakdown?.mid, color: 'bg-blue-100 text-blue-700' },
                    { label: 'Senior Level', value: guide.salaryBreakdown?.senior, color: 'bg-purple-100 text-purple-700' },
                  ].map(tier => (
                    <div key={tier.label} className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium text-sm">{tier.label}</span>
                      <span className={`${tier.color} font-bold px-3 py-1 rounded-full text-sm`}>
                        {tier.value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Top Companies */}
            <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-extrabold text-gray-900 mb-4">🏢 Top Companies Hiring</h2>
              <div className="flex flex-wrap gap-3">
                {guide.topCompanies?.map(company => (
                  <span key={company}
                    className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-xl text-sm border border-gray-200">
                    {company}
                  </span>
                ))}
              </div>
            </section>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">✅ Pros</h2>
                <ul className="space-y-3">
                  {guide.prosAndCons?.pros?.map((pro, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-600 text-sm md:text-base">{pro}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">⚠️ Cons</h2>
                <ul className="space-y-3">
                  {guide.prosAndCons?.cons?.map((con, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                      <span className="text-gray-600 text-sm md:text-base">{con}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Resources */}
            <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-extrabold text-gray-900 mb-4">📚 Best Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {guide.resources?.map((res, i) => (
                  <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                    className="border border-gray-200 rounded-xl p-4 hover:border-indigo-400 hover:bg-indigo-50 transition group">
                    <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">
                      {res.type}
                    </span>
                    <p className="font-bold text-gray-800 mt-1 group-hover:text-indigo-700 text-sm md:text-base">
                      {res.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Visit →</p>
                  </a>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {/* Future Scope */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
          <h2 className="text-xl md:text-2xl font-extrabold mb-3">🚀 Future Scope</h2>
          <p className="text-indigo-100 text-base md:text-lg leading-relaxed">{career.futureScope}</p>
        </section>

      </div>
    </div>
  )
}