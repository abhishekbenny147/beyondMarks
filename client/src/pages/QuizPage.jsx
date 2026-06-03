import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient'

const QUESTIONS = [
  {
    id: 'q1',
    question: 'What kind of work excites you most?',
    options: [
      { label: '💻 Building technology', value: 'technology' },
      { label: '🎨 Creating things', value: 'creative' },
      { label: '🤝 Helping people', value: 'helping' },
      { label: '📊 Running a business', value: 'business' },
    ]
  },
  {
    id: 'q2',
    question: 'Where do you prefer to work?',
    options: [
      { label: '🏢 Office or remote desk', value: 'technology' },
      { label: '🌿 Outdoors or in the field', value: 'outdoor' },
      { label: '🏥 Hospital or community', value: 'helping' },
      { label: '🎭 Studio or creative space', value: 'creative' },
    ]
  },
  {
    id: 'q3',
    question: 'What subject did you enjoy most in school?',
    options: [
      { label: '🔢 Math or Statistics', value: 'numbers' },
      { label: '🔬 Science or Research', value: 'research' },
      { label: '✍️ Language or Writing', value: 'communication' },
      { label: '💡 Technology or Computers', value: 'technology' },
    ]
  },
  {
    id: 'q4',
    question: 'What motivates you the most?',
    options: [
      { label: '💰 High earning potential', value: 'business' },
      { label: '🌍 Making social impact', value: 'helping' },
      { label: '🔍 Discovering new things', value: 'research' },
      { label: '🎯 Solving complex problems', value: 'technology' },
    ]
  },
  {
    id: 'q5',
    question: 'How do you like to communicate?',
    options: [
      { label: '📝 Writing and storytelling', value: 'communication' },
      { label: '📊 Data and presentations', value: 'numbers' },
      { label: '🤝 Face to face conversations', value: 'helping' },
      { label: '💻 Code and technical docs', value: 'technology' },
    ]
  },
]

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const question = QUESTIONS[current]
  const progress = Math.round((current / QUESTIONS.length) * 100)
  const isLast = current === QUESTIONS.length - 1

  const handleAnswer = async (value) => {
    const updated = { ...answers, [question.id]: value }
    setAnswers(updated)

    if (!isLast) {
      setCurrent(current + 1)
      return
    }

    // Last question — submit
    setLoading(true)
    setError('')
    try {
      const res = await axiosClient.post('/recommendations', updated)
      setResults(res.data)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1)
  }

  const handleRetake = () => {
    setAnswers({})
    setCurrent(0)
    setResults(null)
    setError('')
  }

  // RESULTS SCREEN
  if (results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-12">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-10">
            <div className="text-5xl mb-4">🎯</div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
              Your Career Matches
            </h1>
            <p className="text-gray-500">
              Based on your interests, here are the best career paths for you.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {results.recommendations?.map((career, index) => (
              <div
                key={career.id}
                onClick={() => navigate(`/career/${career.slug || career.id}`)}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-800">{career.name}</h3>
                      <span className="text-green-600 font-semibold text-sm">
                        {career.averageSalary}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                      {career.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {career.requiredSkills?.split(',').slice(0, 3).map(skill => (
                        <span key={skill}
                          className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-indigo-400 text-lg">→</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={handleRetake}
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition">
              Retake Quiz
            </button>
            <button onClick={() => navigate('/explore')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
              Explore All Careers
            </button>
          </div>

        </div>
      </div>
    )
  }

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50">
        <div className="text-5xl mb-6 animate-bounce">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyzing your answers...</h2>
        <p className="text-gray-500">Finding the best career matches for you</p>
      </div>
    )
  }

  // QUIZ SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {current + 1} of {QUESTIONS.length}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map(option => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left px-5 py-4 rounded-xl border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-150 text-gray-700 font-medium text-lg"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Back button */}
        {current > 0 && (
          <button onClick={handleBack}
            className="text-gray-400 hover:text-gray-600 transition text-sm">
            ← Back
          </button>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

      </div>
    </div>
  )
}