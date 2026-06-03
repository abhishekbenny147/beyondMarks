import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../api/axiosClient'
import useAuthStore from '../store/authStore'

const fetchCareer = (id) =>
  axiosClient.get(`/hidden-careers/${id}`).then(r => r.data)

const fetchGuide = (id) =>
  axiosClient.get(`/hidden-careers/${id}/guide`).then(r => r.data)

export default function HiddenCareerDetailPage() {
  const { id } = useParams()
  const { user } = useAuthStore()
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-bounce">🔍</div>
        <p className="text-gray-500 text-lg">Loading hidden career...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            🔍 Hidden Career · {career?.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{career?.title}</h1>
          <p className="text-purple-100 text-lg max-w-2xl leading-relaxed">{career?.description}</p>

          <div className="flex flex-wrap gap-6 mt-8">
            <div className="bg-white/10 rounded-xl px-5 py-3">
              <p className="text-purple-200 text-xs uppercase tracking-wide mb-1">Avg Salary</p>
              <p className="text-white font-bold text-xl">{career?.averageSalary}</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3">
              <p className="text-purple-200 text-xs uppercase tracking-wide mb-1">Curiosity Score</p>
              <p className="text-white font-bold text-xl">🔥 {career?.curiosityScore}</p>
            </div>
            <button
              onClick={() => user && upvote.mutate()}
              className={`bg-white/20 hover:bg-white/30 transition rounded-xl px-5 py-3 font-semibold
                ${!user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              🔥 {user ? 'Upvote this career' : 'Login to upvote'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">

        {/* Why Hidden + Discovery Tip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
            <h2 className="text-lg font-extrabold text-purple-800 mb-3">💡 Why It's Hidden</h2>
            <p className="text-purple-700 leading-relaxed">{career?.whyHidden}</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h2 className="text-lg font-extrabold text-amber-800 mb-3">🗺️ Discovery Tip</h2>
            <p className="text-amber-700 leading-relaxed">{career?.discoveryTip}</p>
          </div>
        </div>

        {guideLoading ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4 animate-spin">⚙️</div>
            <p className="text-gray-500">Generating your career guide...</p>
          </div>
        ) : guide ? (
          <>
            {/* Day in the Life */}
            <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4">☀️ A Day in the Life</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{guide.dayInLife}</p>
            </section>

            {/* Roadmap */}
            <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
                🗺️ Your Roadmap to Become a {career?.title}
              </h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-100" />
                <div className="space-y-6">
                  {guide.roadmap?.map((step, index) => (
                    <div key={index} className="flex gap-6 relative">
                      <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 z-10 shadow-md">
                        {step.step}
                      </div>
                      <div className="flex-1 bg-purple-50 rounded-2xl p-5 border border-purple-100">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills + Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">🛠️ Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {career?.requiredSkills?.split(',').map(skill => (
                    <span key={skill}
                      className="bg-purple-50 text-purple-700 text-sm font-medium px-3 py-2 rounded-xl border border-purple-100">
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
                      <span className="text-gray-600 font-medium">{tier.label}</span>
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
              <h2 className="text-xl font-extrabold text-gray-900 mb-4">🏢 Where You Can Work</h2>
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
                      <span className="text-gray-600">{pro}</span>
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
                      <span className="text-gray-600">{con}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Resources */}
            <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-extrabold text-gray-900 mb-4">📚 Best Resources to Get Started</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {guide.resources?.map((res, i) => (
                  <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                    className="border border-gray-200 rounded-xl p-4 hover:border-purple-400 hover:bg-purple-50 transition group">
                    <span className="text-xs font-semibold text-purple-500 uppercase tracking-wide">
                      {res.type}
                    </span>
                    <p className="font-bold text-gray-800 mt-1 group-hover:text-purple-700 transition">
                      {res.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Visit →</p>
                  </a>
                ))}
              </div>
            </section>

          </>
        ) : null}

      </div>
    </div>
  )
}