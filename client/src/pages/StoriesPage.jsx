import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getStories, submitStory } from '../api/stories'
import useAuthStore from '../store/authStore'

export default function StoriesPage() {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '', content: '', careerName: '', authorName: '', isAnonymous: false
  })
  const [success, setSuccess] = useState(false)

  const { data: stories, isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: getStories,
  })

  const mutation = useMutation({
    mutationFn: submitStory,
    onSuccess: () => {
      setSuccess(true)
      setShowForm(false)
      setForm({ title: '', content: '', careerName: '', authorName: '', isAnonymous: false })
      queryClient.invalidateQueries(['stories'])
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({ ...form, authorName: form.isAnonymous ? 'Anonymous' : (form.authorName || user?.name) })
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Student Stories</h1>
            <p className="text-gray-500">Real journeys from students who chose their own path.</p>
          </div>
          {user && (
            <button onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition">
              {showForm ? 'Cancel' : '+ Share Your Story'}
            </button>
          )}
        </div>

        {/* Success */}
        {success && (
          <div className="bg-green-50 text-green-700 px-5 py-4 rounded-xl mb-6 border border-green-200">
            ✅ Story submitted! It will appear after review.
          </div>
        )}

        {/* Submit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Share Your Story</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Story title" required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input type="text" placeholder="Related career (e.g. Cloud Engineer)"
                value={form.careerName}
                onChange={e => setForm({ ...form, careerName: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <textarea placeholder="Tell your story..." required rows={5}
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              />
              <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                <input type="checkbox"
                  checked={form.isAnonymous}
                  onChange={e => setForm({ ...form, isAnonymous: e.target.checked })}
                />
                Post anonymously
              </label>
              <button type="submit" disabled={mutation.isPending}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
                {mutation.isPending ? 'Submitting...' : 'Submit Story'}
              </button>
            </form>
          </div>
        )}

        {/* Stories List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-32 border border-gray-100" />
            ))}
          </div>
        ) : stories?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No stories yet.</p>
            <p className="text-gray-400 text-sm">Be the first to share your journey!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {stories?.map(story => (
              <div key={story.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">
                    {story.careerName}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h3>
                <p className="text-gray-600 leading-relaxed line-clamp-3">{story.content}</p>
                <div className="mt-4 text-sm text-gray-400">
                  — {story.isAnonymous ? 'Anonymous' : story.authorName}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}