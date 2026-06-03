import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getHiddenCareers, upvoteHiddenCareer } from '../api/hiddenCareers'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
export default function HiddenCareersPage() {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: careers, isLoading } = useQuery({
    queryKey: ['hidden-careers'],
    queryFn: getHiddenCareers,
  })

  const upvote = useMutation({
    mutationFn: upvoteHiddenCareer,
    onSuccess: () => queryClient.invalidateQueries(['hidden-careers'])
  })

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Off the beaten path
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Hidden Careers</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Careers most students never hear about in school — but that are fulfilling, well-paid, and in demand.
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-48 border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careers?.map(career => (
              <div key={career.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">

                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-purple-500 uppercase tracking-wide">
                    {career.category}
                  </span>
                  <span className="text-green-600 font-semibold text-sm">{career.averageSalary}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{career.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{career.description}</p>

                <div className="bg-purple-50 rounded-xl p-3 mb-4">
                  <p className="text-xs font-semibold text-purple-600 mb-1">💡 Why it's hidden</p>
                  <p className="text-sm text-gray-600">{career.whyHidden}</p>
                </div>

                <div className="bg-amber-50 rounded-xl p-3 mb-4">
                  <p className="text-xs font-semibold text-amber-600 mb-1">🗺️ Discovery tip</p>
                  <p className="text-sm text-gray-600">{career.discoveryTip}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                   <button
                     onClick={() => user && upvote.mutate(career.id)}
                     className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition
                     ${user ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 cursor-pointer' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                    🔥 {career.curiosityScore}
                   </button>
                   <button
                     onClick={() => navigate(`/hidden/${career.id}`)}
                     className="text-purple-600 font-semibold text-sm hover:underline">
                    View Guide →
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