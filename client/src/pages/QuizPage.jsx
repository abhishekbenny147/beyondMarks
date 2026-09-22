import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient'

const QUESTIONS = [
  {
    id: 'q1',
    question: 'What kind of work excites you most?',
    options: [
      { label: 'Building technology and software', value: 'technology', icon: '💻' },
      { label: 'Creating art, design or content',  value: 'creative',   icon: '🎨' },
      { label: 'Helping and supporting people',    value: 'helping',    icon: '🤝' },
      { label: 'Running a business or team',       value: 'business',   icon: '📊' },
    ]
  },
  {
    id: 'q2',
    question: 'Where do you prefer to work?',
    options: [
      { label: 'Office or remote desk',       value: 'technology', icon: '🏢' },
      { label: 'Outdoors or in the field',    value: 'outdoor',    icon: '🌿' },
      { label: 'Hospital or community space', value: 'helping',    icon: '🏥' },
      { label: 'Studio or creative space',    value: 'creative',   icon: '🎭' },
    ]
  },
  {
    id: 'q3',
    question: 'Which subject did you enjoy most in school?',
    options: [
      { label: 'Maths or Statistics',      value: 'numbers',      icon: '🔢' },
      { label: 'Science or Research',      value: 'research',     icon: '🔬' },
      { label: 'Language or Writing',      value: 'communication',icon: '✍️' },
      { label: 'Technology or Computers',  value: 'technology',   icon: '💡' },
    ]
  },
  {
    id: 'q4',
    question: 'What motivates you the most?',
    options: [
      { label: 'High earning potential',    value: 'business',   icon: '💰' },
      { label: 'Making a social impact',    value: 'helping',    icon: '🌍' },
      { label: 'Discovering new things',    value: 'research',   icon: '🔍' },
      { label: 'Solving complex problems',  value: 'technology', icon: '🎯' },
    ]
  },
  {
    id: 'q5',
    question: 'How do you like to communicate?',
    options: [
      { label: 'Writing and storytelling',  value: 'communication', icon: '📝' },
      { label: 'Data and presentations',    value: 'numbers',       icon: '📊' },
      { label: 'Face to face conversation', value: 'helping',       icon: '🤝' },
      { label: 'Code and technical docs',   value: 'technology',    icon: '💻' },
    ]
  },
]

export default function QuizPage() {
  const [current,  setCurrent]  = useState(0)
  const [answers,  setAnswers]  = useState({})
  const [loading,  setLoading]  = useState(false)
  const [results,  setResults]  = useState(null)
  const [error,    setError]    = useState('')
  const navigate = useNavigate()

  const question   = QUESTIONS[current]
  const progress   = Math.round((current / QUESTIONS.length) * 100)
  const isLast     = current === QUESTIONS.length - 1

  const handleAnswer = async (value) => {
    const updated = { ...answers, [question.id]: value }
    setAnswers(updated)
    if (!isLast) { setCurrent(c => c + 1); return }
    setLoading(true); setError('')
    try {
      const res = await axiosClient.post('/recommendations', updated)
      setResults(res.data)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  const handleRetake = () => {
    setAnswers({}); setCurrent(0); setResults(null); setError('')
  }

  // Loading
  if (loading) return (
    <div className="min-h-screen bg-[#F8FFFD] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-[#14B88A] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h2 className="text-xl font-bold text-[#0F172A] mb-2">Analysing your answers...</h2>
        <p className="text-[#64748B] text-sm">Finding the best career matches for you</p>
      </div>
    </div>
  )

  // Results
  if (results) return (
    <div className="min-h-screen bg-[#F8FFFD]">
      <div className="bg-white border-b border-[#DCEFE8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="inline-flex items-center gap-2 bg-[#E6F7F2] border border-[#14B88A]/20 text-[#0D8F6A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Quiz complete
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
            Your career matches
          </h1>
          <p className="text-[#64748B]">
            Based on your interests, here are the best career paths for you.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-4 mb-8">
          {results.recommendations?.map((career, index) => (
            <div
              key={career.id}
              onClick={() => navigate(`/career/${career.slug || career.id}`)}
              className="bg-white border border-[#DCEFE8] rounded-2xl p-5 flex items-center gap-4 hover:border-[#14B88A]/40 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E6F7F2] text-[#14B88A] flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-[#0F172A] group-hover:text-[#14B88A] transition-colors truncate">
                    {career.name}
                  </h3>
                  <span className="text-sm font-bold text-[#14B88A] flex-shrink-0">
                    {career.averageSalary}
                  </span>
                </div>
                <p className="text-sm text-[#64748B] line-clamp-1">{career.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {career.requiredSkills?.split(',').slice(0, 3).map(skill => (
                    <span key={skill} className="text-[11px] font-medium px-2 py-0.5 bg-[#F8FFFD] border border-[#DCEFE8] text-[#64748B] rounded-full">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <svg className="w-4 h-4 text-[#14B88A] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={handleRetake}
            className="inline-flex items-center justify-center gap-2 border border-[#DCEFE8] bg-white text-[#0F172A] font-semibold px-6 py-2.5 rounded-xl text-sm hover:border-[#14B88A] hover:text-[#14B88A] transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retake quiz
          </button>
          <button onClick={() => navigate('/explore')}
            className="inline-flex items-center justify-center gap-2 bg-[#14B88A] hover:bg-[#0D8F6A] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-[0.98]">
            Explore all careers
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )

  // Quiz
  return (
    <div className="min-h-screen bg-[#F8FFFD] flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-12 flex-1 flex flex-col">

        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="font-semibold text-[#0F172A]">
              Question {current + 1} <span className="text-[#94A3B8]">of {QUESTIONS.length}</span>
            </span>
            <span className="text-[#14B88A] font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#DCEFE8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#14B88A] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-[#E6F7F2] border border-[#14B88A]/20 text-[#0D8F6A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-5">
              Career Quiz
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map(option => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="group flex items-center gap-4 p-4 bg-white border border-[#DCEFE8] rounded-2xl text-left hover:border-[#14B88A] hover:bg-[#E6F7F2]/40 hover:shadow-sm transition-all duration-150 active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F8FFFD] border border-[#DCEFE8] flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-[#E6F7F2] group-hover:border-[#14B88A]/30 transition-colors">
                  {option.icon}
                </div>
                <span className="text-sm font-semibold text-[#0F172A] group-hover:text-[#0D8F6A] transition-colors leading-snug">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Back */}
        <div className="mt-10 flex items-center justify-between">
          {current > 0 ? (
            <button onClick={() => setCurrent(c => c - 1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back
            </button>
          ) : <div />}

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        </div>
      </div>
    </div>
  )
}