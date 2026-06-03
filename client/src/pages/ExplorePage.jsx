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

export default function ExplorePage() {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
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

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Explore Careers</h1>
        <p className="text-gray-500 mb-8">Find a path that truly fits you.</p>

        {/* Search + Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search careers, skills..."
            className="flex-1 border border-gray-300 rounded-xl px-5 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border border-gray-300 rounded-xl px-5 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          >
            <option value="">All Categories</option>
            {categories?.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {(search || category) && (
            <button
              onClick={() => { setSearch(''); setCategory('') }}
              className="text-gray-500 hover:text-red-500 px-4 py-3 border border-gray-300 rounded-xl transition">
              ✕ Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              category === '' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-400'
            }`}>
            All
          </button>
          {categories?.map(cat => (
            <button key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === cat ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-400'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!isLoading && (
          <p className="text-gray-400 text-sm mb-6">
            {careers?.length} career{careers?.length !== 1 ? 's' : ''} found
            {category ? ` in ${category}` : ''}
            {search ? ` for "${search}"` : ''}
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-48 border border-gray-100" />
            ))}
          </div>
        ) : careers?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No careers found.</p>
            <button onClick={() => { setSearch(''); setCategory('') }}
              className="mt-4 text-indigo-600 hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careers?.map(career => (
              <div key={career.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">

                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">
                    {career.category}
                  </span>
                  {user && (
                    <button
                      onClick={() => saveMutation.mutate(career.id)}
                      className={`text-xl transition ${savedIds.has(career.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
                      title={savedIds.has(career.id) ? 'Remove from saved' : 'Save career'}
                    >
                      {savedIds.has(career.id) ? '❤️' : '🤍'}
                    </button>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2">{career.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 flex-1">{career.description}</p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-green-600 font-semibold text-sm">{career.averageSalary}</span>
                  <Link to={`/career/${career.slug || career.id}`}
                    className="text-indigo-600 font-semibold text-sm hover:underline">
                    View Guide →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}