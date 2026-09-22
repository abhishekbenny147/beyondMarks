import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'

const FLOATING_STATS = [
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    value: '50+',
    label: 'Career Paths',
    action: 'Explore Now',
    to: '/explore',
    pos: 'top-8 right-8 md:top-12 md:right-4',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    value: '8',
    label: 'Hidden Careers',
    action: 'Uncover Now',
    to: '/hidden',
    pos: 'top-8 right-8 md:top-12 md:right-[-120px]',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    value: '5',
    label: 'Quiz Questions',
    action: 'Find Your Match',
    to: '/quiz',
    pos: 'bottom-24 right-8 md:bottom-32 md:right-4',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    value: '4',
    label: 'Major Categories',
    action: 'Browse All',
    to: '/explore',
    pos: 'bottom-24 right-8 md:bottom-32 md:right-[-120px]',
  },
]

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'primary',
    title: 'Personalised Recommendations',
    desc: 'AI-powered career suggestions based on your interests and strengths.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    color: 'primary',
    title: 'Step-by-Step Roadmaps',
    desc: 'Clear path to your dream career with timelines and resources.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'primary',
    title: 'Top Companies & Salaries',
    desc: 'Know where you can work and what you can earn at every level.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: 'primary',
    title: 'Real Student Stories',
    desc: 'Learn from students who took unconventional paths and made it.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'ai',
    title: 'Hidden Career Discovery',
    desc: 'Find opportunities you never knew existed — beyond the obvious choices.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'ai',
    title: 'AI Career Intelligence',
    desc: 'Smart insights on skill gaps, comparisons, and learning paths.',
    badge: 'Coming soon',
  },
]

const CATEGORIES = [
  { label: 'Tech & Digital',       count: 20, color: 'bg-blue-50   text-blue-700   border-blue-100'   },
  { label: 'Business',             count: 8,  color: 'bg-amber-50  text-amber-700  border-amber-100'  },
  { label: 'Creative & Media',     count: 8,  color: 'bg-pink-50   text-pink-700   border-pink-100'   },
  { label: 'Science & Health',     count: 7,  color: 'bg-green-50  text-green-700  border-green-100'  },
  { label: 'Social & Specialized', count: 6,  color: 'bg-purple-50 text-purple-700 border-purple-100' },
  { label: 'Hidden Careers',       count: 8,  color: 'bg-[#E6F7F2] text-[#0D8F6A]  border-[#14B88A]/20' },
]

export default function HomePage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F8FFFD]">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — text */}
          <div className="max-w-xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E6F7F2] border border-[#14B88A]/30 text-[#0D8F6A] text-sm font-semibold px-4 py-1.5 rounded-full mb-8">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Career Discovery Platform
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#0F172A] leading-[1.1] tracking-tight mb-6">
              Your future is bigger<br />
              than your{' '}
              <span className="text-[#14B88A] relative inline-block">
                marks.
                <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 100 5" preserveAspectRatio="none">
                  <path d="M0 4 Q50 0 100 4" stroke="#14B88A" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Sub */}
            <p className="text-lg text-[#64748B] leading-relaxed mb-8">
              Discover careers that match your interests, strengths,
              and personality — not just what society expects of you.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={() => navigate(user ? '/explore' : '/register')}
                className="inline-flex items-center justify-center gap-2 bg-[#14B88A] hover:bg-[#0D8F6A] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150 active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {user ? 'Explore Careers' : 'Explore Careers'}
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#E6F7F2] text-[#0F172A] font-semibold px-6 py-3 rounded-xl border border-[#DCEFE8] hover:border-[#14B88A] transition-all duration-150 active:scale-[0.98]"
              >
                <svg className="w-4 h-4 text-[#14B88A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Take the Quiz
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-[#64748B]">
                <span className="font-semibold text-[#0F172A]">Students</span> discovering their perfect career paths
              </p>
            </div>
          </div>

          {/* Right — image + floating cards */}
          <div className="relative hidden lg:flex items-center justify-center">

            {/* Green circle backdrop */}
            <div className="absolute w-[420px] h-[420px] bg-[#14B88A]/10 rounded-full" />
            <div className="absolute w-[400px] h-[400px] bg-[#14B88A]/5 rounded-full scale-110" /> 

            {/* Student image */}
            <div className="relative z-10 w-[380px] h-[380px] rounded-full overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=760&h=760&fit=crop&crop=center"
                alt="Student discovering career paths"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating card — top left */}
            <div className="absolute top-6 -left-8 z-20 animate-fade-in">
              <FloatCard
                icon={<svg className="w-4 h-4 text-[#14B88A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                value="50+"
                label="Career Paths"
                action="Explore Now"
                to="/explore"
                iconBg="bg-[#E6F7F2]"
              />
            </div>

            {/* Floating card — top right */}
            <div className="absolute top-6 -right-8 z-20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <FloatCard
                icon={<svg className="w-4 h-4 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                value="8"
                label="Hidden Careers"
                action="Uncover Now"
                to="/hidden"
                iconBg="bg-amber-50"
              />
            </div>

            {/* Floating card — bottom left */}
            <div className="absolute bottom-8 -left-8 z-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <FloatCard
                icon={<svg className="w-4 h-4 text-[#14B88A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                value="5"
                label="Quiz Questions"
                action="Find Your Match"
                to="/quiz"
                iconBg="bg-[#E6F7F2]"
              />
            </div>

            {/* Floating card — bottom right */}
            <div className="absolute bottom-8 -right-8 z-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <FloatCard
                icon={<svg className="w-4 h-4 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                value="4"
                label="Major Categories"
                action="Browse All"
                to="/explore"
                iconBg="bg-[#EDE9FE]"
              />
            </div>

            {/* AI card — center bottom */}
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white rounded-2xl shadow-lg border border-[#DCEFE8] px-4 py-3 flex items-center gap-3 min-w-[220px]">
                <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">AI Powered Recommendations</p>
                  <p className="text-xs text-[#64748B]">Get personalised career suggestions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────── */}
      <section className="border-y border-[#DCEFE8] bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-6">
            Explore by category
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.label}
                to="/explore"
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-full
                  text-sm font-medium border transition-all duration-150
                  hover:shadow-sm hover:-translate-y-0.5 ${cat.color}
                `}
              >
                {cat.label}
                <span className="opacity-60 text-xs">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#E6F7F2] border border-[#14B88A]/30 text-[#0D8F6A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Everything you need
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Built for students who think differently
          </h2>
          <p className="text-lg text-[#64748B] max-w-xl mx-auto">
            Not just a career list. A complete intelligence platform to help
            you discover, plan, and pursue the right path.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`
                group rounded-2xl p-6 border transition-all duration-200
                hover:-translate-y-1 hover:shadow-md cursor-default
                ${f.color === 'ai'
                  ? 'bg-[#EDE9FE]/40 border-[#7C3AED]/20'
                  : 'bg-white border-[#DCEFE8]'
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center mb-4
                transition-all duration-200
                ${f.color === 'ai'
                  ? 'bg-[#EDE9FE] text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white'
                  : 'bg-[#E6F7F2] text-[#14B88A] group-hover:bg-[#14B88A] group-hover:text-white'
                }
              `}>
                {f.icon}
              </div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-[0.9375rem] font-semibold text-[#0F172A]">{f.title}</h3>
                {f.badge && (
                  <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] mt-0.5">
                    {f.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#64748B] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#DCEFE8] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E6F7F2] border border-[#14B88A]/30 text-[#0D8F6A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
                Student stories
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-5">
                Real students.<br />Real careers.
              </h2>
              <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
                Every career on beyondMarks has real stories from students
                who took that path — what they did, what they earned, and
                what they wish they had known earlier.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/stories')}
                  className="inline-flex items-center gap-2 bg-[#14B88A] hover:bg-[#0D8F6A] text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-150 text-sm"
                >
                  Read stories
                </button>
                <button
                  onClick={() => navigate('/stories')}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F2] text-[#0F172A] font-semibold px-5 py-2.5 rounded-xl border border-[#DCEFE8] hover:border-[#14B88A] transition-all duration-150 text-sm"
                >
                  Share yours
                </button>
              </div>
            </div>

            {/* Right — testimonial cards */}
            <div className="space-y-4">
              {[
                {
                  text: "I always thought I had to be a doctor. beyondMarks showed me Biomedical Engineering and I have never been more excited about my future.",
                  name: 'Priya S.',
                  role: 'B.Tech Student, Pune',
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
                },
                {
                  text: "The roadmap for Cloud Security was so detailed. I knew exactly what certifications to get and in what order. Got my first internship in 4 months.",
                  name: 'Rahul M.',
                  role: 'CSE Student, Hyderabad',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                },
              ].map((q, i) => (
                <div key={i} className="bg-[#F8FFFD] border border-[#DCEFE8] rounded-2xl p-5">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} className="w-3.5 h-3.5 text-[#14B88A]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-[#64748B] leading-relaxed mb-4 italic">"{q.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={q.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">{q.name}</p>
                      <p className="text-xs text-[#94A3B8]">{q.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative bg-[#14B88A] rounded-3xl px-8 py-16 md:py-20 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Start discovering your path today
            </h2>
            <p className="text-lg text-white/80 max-w-lg mx-auto mb-10">
              Free forever. No credit card. No pressure.
              Just you and the career you were meant for.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate(user ? '/explore' : '/register')}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F2] text-[#14B88A] font-bold px-7 py-3 rounded-xl transition-all duration-150 shadow-sm hover:shadow-md text-sm"
              >
                {user ? 'Explore careers' : 'Create free account'}
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3 rounded-xl transition-all duration-150 text-sm border border-white/20"
              >
                Take the quiz first
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

// ── Floating stat card ────────────────────────────────────────────────────────
function FloatCard({ icon, value, label, action, to, iconBg }) {
  return (
    <Link to={to} className="block bg-white rounded-2xl shadow-lg border border-[#DCEFE8] p-3.5 min-w-[150px] hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center gap-2.5 mb-2">
        <div className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <span className="text-xl font-extrabold text-[#0F172A]">{value}</span>
      </div>
      <p className="text-xs font-medium text-[#64748B] mb-1.5">{label}</p>
      <p className="text-xs font-semibold text-[#14B88A]">{action} →</p>
    </Link>
  )
}