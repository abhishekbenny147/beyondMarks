import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getStories, submitStory } from '../api/stories'
import useAuthStore from '../store/authStore'

export default function StoriesPage() {
  const { user }    = useAuthStore()
  const queryClient = useQueryClient()
  const [showForm, setShowForm]   = useState(false)
  const [success,  setSuccess]    = useState(false)
  const [form, setForm] = useState({
    title: '', content: '', careerName: '', authorName: '', isAnonymous: false
  })

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
    mutation.mutate({
      ...form,
      authorName: form.isAnonymous ? 'Anonymous' : (form.authorName || user?.name)
    })
  }

  return (
    <div className="min-h-screen bg-[#F8FFFD]">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#DCEFE8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E6F7F2] border border-[#14B88A]/20 text-[#0D8F6A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                Community
              </div>
              <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-1">
                Student Stories
              </h1>
              <p className="text-[#64748B] text-sm">
                Real journeys from students who chose their own path.
              </p>
            </div>
            {user && (
              <button
                onClick={() => { setShowForm(f => !f); setSuccess(false) }}
                className="inline-flex items-center gap-2 bg-[#14B88A] hover:bg-[#0D8F6A] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all active:scale-[0.98] flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                {showForm ? 'Cancel' : 'Share your story'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-5">

        {/* Success */}
        {success && (
          <div className="flex items-start gap-3 bg-[#E6F7F2] border border-[#14B88A]/30 text-[#0D8F6A] px-5 py-4 rounded-2xl">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-sm">Story submitted successfully!</p>
              <p className="text-sm opacity-75 mt-0.5">It will appear here after our team reviews it.</p>
            </div>
          </div>
        )}

        {/* Submit form */}
        {showForm && (
          <div className="bg-white border border-[#DCEFE8] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#0F172A] mb-5">Share your career story</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Story title</label>
                <input type="text" required placeholder="What's your story about?"
                  value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full h-11 px-4 bg-[#F8FFFD] border border-[#DCEFE8] rounded-xl text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#14B88A] focus:ring-2 focus:ring-[#14B88A]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Related career</label>
                <input type="text" placeholder="e.g. Cloud Security Engineer"
                  value={form.careerName} onChange={e => setForm({ ...form, careerName: e.target.value })}
                  className="w-full h-11 px-4 bg-[#F8FFFD] border border-[#DCEFE8] rounded-xl text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#14B88A] focus:ring-2 focus:ring-[#14B88A]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Your story</label>
                <textarea required rows={5} placeholder="Tell your story — what path did you choose and why?"
                  value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8FFFD] border border-[#DCEFE8] rounded-xl text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#14B88A] focus:ring-2 focus:ring-[#14B88A]/20 resize-none transition-all"
                />
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => setForm(f => ({ ...f, isAnonymous: !f.isAnonymous }))}
                  className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 ${form.isAnonymous ? 'bg-[#14B88A]' : 'bg-[#DCEFE8]'}`}
                >
                  <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${form.isAnonymous ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm text-[#64748B]">Post anonymously</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={mutation.isPending}
                  className="inline-flex items-center gap-2 bg-[#14B88A] hover:bg-[#0D8F6A] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-[0.98] disabled:opacity-60">
                  {mutation.isPending
                    ? <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Submitting...</>
                    : 'Submit story'
                  }
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] bg-[#F8FFFD] border border-[#DCEFE8] hover:border-[#94A3B8] transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Stories list */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#DCEFE8] rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-[#E6F7F2] rounded-lg w-1/4 mb-3" />
                <div className="h-5 bg-[#E6F7F2] rounded-lg w-2/3 mb-3" />
                <div className="space-y-2">
                  <div className="h-3 bg-[#E6F7F2] rounded-lg w-full" />
                  <div className="h-3 bg-[#E6F7F2] rounded-lg w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : stories?.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 bg-[#E6F7F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-[#14B88A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">No stories yet</h3>
            <p className="text-[#64748B] text-sm mb-6">Be the first to share your journey.</p>
            {user && (
              <button onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-[#14B88A] hover:bg-[#0D8F6A] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
                Share your story
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {stories.map(story => (
              <div key={story.id} className="bg-white border border-[#DCEFE8] rounded-2xl p-6 hover:border-[#14B88A]/30 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {story.careerName && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-[#E6F7F2] text-[#0D8F6A] border border-[#14B88A]/20">
                        {story.careerName}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#94A3B8] flex-shrink-0">
                    {new Date(story.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-2">{story.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed line-clamp-4">{story.content}</p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#DCEFE8]">
                  <div className="w-7 h-7 rounded-full bg-[#E6F7F2] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#0D8F6A]">
                      {(story.isAnonymous ? 'A' : story.authorName?.charAt(0))?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[#0F172A]">
                    {story.isAnonymous ? 'Anonymous' : story.authorName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}