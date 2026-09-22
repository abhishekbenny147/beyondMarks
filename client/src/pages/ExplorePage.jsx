import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllCareers, searchCareers } from '../api/careers'
import { toggleSave, getSaved } from '../api/saved'
import axiosClient from '../api/axiosClient'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const fetchFiltered = (q, category) =>
  axiosClient.get('/careers/filter', { params: { q: q || '', category: category || '' } })
    .then(r => r.data)

const fetchCategories = () =>
  axiosClient.get('/careers/categories').then(r => r.data)

const CATEGORY_COLORS = {
  'Tech & Digital':       'bg-blue-50   text-blue-700   border-blue-200',
  'Business & Management':'bg-amber-50  text-amber-700  border-amber-200',
  'Creative & Media':     'bg-pink-50   text-pink-700   border-pink-200',
  'Science & Health':     'bg-green-50  text-green-700  border-green-200',
  'Social & Specialized': 'bg-purple-50 text-purple-700 border-purple-200',
}

const CATEGORY_DOT = {
  'Tech & Digital':       'bg-blue-500',
  'Business & Management':'bg-amber-500',
  'Creative & Media':     'bg-pink-500',
  'Science & Health':     'bg-green-500',
  'Social & Specialized': 'bg-purple-500',
}

export default function ExplorePage() {
  const { user }        = useAuthStore()
  const queryClient     = useQueryClient()
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('')

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const { data: careers, isLoading } = useQuery({
    queryKey: ['careers', search, category],
    queryFn: () => fetchFiltered(search, category),
    keepPreviousData: true,
  })

  const { data: savedCareers } = useQuery({
    queryKey: ['saved'],
    queryFn: getSaved,
    enabled: !!user,
  })

  const savedIds = new Set(savedCareers?.map(s => s.career.id) || [])

  const saveMutation = useMutation({
    mutationFn: toggleSave,
    onSuccess: () => queryClient.invalidateQueries(['saved']),
  })

  const clearFilters = () => { setSearch(''); setCategory('') }

  return (
    <div className="min-h-screen bg-[#F8FFFD]">

      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#DCEFE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E6F7F2] border border-[#14B88A]/20 text-[#0D8F6A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                Career Explorer
              </div>
              <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-1">
                Find your path
              </h1>
              <p className="text-[#64748B] text-sm">
                {careers?.length || 0} career paths across {categories?.length || 0} categories
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search careers, skills..."
                className="w-full h-10 pl-10 pr-4 bg-[#F8FFFD] border border-[#DCEFE8] rounded-xl text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#14B88A] focus:ring-2 focus:ring-[#14B88A]/20 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setCategory('')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                category === ''
                  ? 'bg-[#14B88A] text-white border-[#14B88A] shadow-sm'
                  : 'bg-white text-[#64748B] border-[#DCEFE8] hover:border-[#14B88A] hover:text-[#14B88A]'
              }`}
            >
              All careers
            </button>
            {categories?.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat === category ? '' : cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                  category === cat
                    ? 'bg-[#14B88A] text-white border-[#14B88A] shadow-sm'
                    : `bg-white border-[#DCEFE8] hover:border-[#14B88A] hover:text-[#14B88A] text-[#64748B] ${CATEGORY_COLORS[cat] || ''}`
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${CATEGORY_DOT[cat] || 'bg-[#14B88A]'}`} />
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Active filters */}
        {(search || category) && (
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-[#64748B]">
              {careers?.length || 0} results
              {search && <> for <span className="font-semibold text-[#0F172A]">"{search}"</span></>}
              {category && <> in <span className="font-semibold text-[#0F172A]">{category}</span></>}
            </span>
            <button onClick={clearFilters}
              className="text-xs text-[#14B88A] font-semibold hover:text-[#0D8F6A] flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          </div>
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#DCEFE8] p-6 animate-pulse">
                <div className="w-10 h-10 bg-[#E6F7F2] rounded-xl mb-4" />
                <div className="h-4 bg-[#E6F7F2] rounded-lg w-2/3 mb-2" />
                <div className="h-3 bg-[#E6F7F2] rounded-lg w-full mb-1" />
                <div className="h-3 bg-[#E6F7F2] rounded-lg w-4/5 mb-4" />
                <div className="h-3 bg-[#E6F7F2] rounded-lg w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && careers?.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-[#E6F7F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#14B88A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">No careers found</h3>
            <p className="text-[#64748B] text-sm mb-6">Try a different search or clear your filters</p>
            <button onClick={clearFilters}
              className="inline-flex items-center gap-2 bg-[#14B88A] hover:bg-[#0D8F6A] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
              Clear filters
            </button>
          </div>
        )}

        {/* Career grid */}
        {!isLoading && careers?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {careers.map(career => (
              <CareerCard
                key={career.id}
                career={career}
                isSaved={savedIds.has(career.id)}
                isLoggedIn={!!user}
                onSave={() => saveMutation.mutate(career.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CareerCard({ career, isSaved, isLoggedIn, onSave }) {
  const catColor = CATEGORY_COLORS[career.category] || 'bg-[#E6F7F2] text-[#0D8F6A] border-[#14B88A]/20'
  const dotColor = CATEGORY_DOT[career.category]   || 'bg-[#14B88A]'

  return (
    <div className="group bg-white rounded-2xl border border-[#DCEFE8] p-5 flex flex-col hover:border-[#14B88A]/40 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${catColor}`}>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />
          {career.category}
        </span>
        {isLoggedIn && (
          <button
            onClick={onSave}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 flex-shrink-0 ${
              isSaved
                ? 'bg-red-50 text-red-500 hover:bg-red-100'
                : 'bg-[#F8FFFD] text-[#94A3B8] hover:bg-[#E6F7F2] hover:text-[#14B88A]'
            }`}
          >
            <svg className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* Title + desc */}
      <h3 className="text-[0.9375rem] font-bold text-[#0F172A] mb-2 group-hover:text-[#14B88A] transition-colors">
        {career.name}
      </h3>
      <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 flex-1 mb-4">
        {career.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {career.requiredSkills?.split(',').slice(0, 3).map(skill => (
          <span key={skill} className="text-[11px] font-medium px-2 py-0.5 bg-[#F8FFFD] border border-[#DCEFE8] text-[#64748B] rounded-full">
            {skill.trim()}
          </span>
        ))}
        {career.requiredSkills?.split(',').length > 3 && (
          <span className="text-[11px] font-medium px-2 py-0.5 bg-[#F8FFFD] border border-[#DCEFE8] text-[#94A3B8] rounded-full">
            +{career.requiredSkills.split(',').length - 3} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#DCEFE8]">
        <span className="text-sm font-bold text-[#14B88A]">{career.averageSalary}</span>
        <Link
          to={`/career/${career.slug || career.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F172A] hover:text-[#14B88A] transition-colors"
        >
          View guide
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}