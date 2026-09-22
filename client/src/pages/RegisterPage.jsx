import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth'
import useAuthStore from '../store/authStore'

export default function RegisterPage() {
  const [form,    setForm]    = useState({ name: '', email: '', password: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw,  setShowPw]  = useState(false)
  const { login: storeLogin } = useAuthStore()
  const navigate              = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true); setError('')
    try {
      const data = await register(form)
      storeLogin(data.token, { name: data.name, email: data.email, role: data.role })
      navigate('/quiz')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally { setLoading(false) }
  }

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3
  const strengthMeta = [
    null,
    { label: 'Weak',   bar: 'bg-red-400',   text: 'text-red-500'    },
    { label: 'Good',   bar: 'bg-amber-400',  text: 'text-amber-500'  },
    { label: 'Strong', bar: 'bg-[#14B88A]',  text: 'text-[#14B88A]' },
  ]

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel ─────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1E293B 60%, #0F2A1E 100%)' }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#14B88A]/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#7C3AED]/15 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#14B88A]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#14B88A] flex items-center justify-center group-hover:bg-[#0D8F6A] transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3L4 7v5l5 3 5-3V7L9 3z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="9" cy="9" r="2" fill="white"/>
              </svg>
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">beyondMarks</span>
          </Link>
        </div>

        {/* Center */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-10">
          <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            Start your journey.<br />
            <span className="text-[#14B88A]">Find your path.</span>
          </h2>
          <p className="text-white/55 text-base leading-relaxed mb-10 max-w-sm">
            Join students who discovered careers they love —
            not just careers that pay well.
          </p>

          <div className="space-y-4 mb-10">
            {[
              { icon: '🗺️', text: 'Step-by-step roadmaps for 50+ careers'         },
              { icon: '🎯', text: 'Personalised quiz-based recommendations'         },
              { icon: '💡', text: 'Hidden careers most students never discover'     },
              { icon: '📖', text: 'Real stories from students on those paths'       },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-base flex-shrink-0">
                  {item.icon}
                </div>
                <p className="text-white/65 text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-white/10 mb-8" />

          <div className="flex items-start gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
              alt="" className="w-9 h-9 rounded-full object-cover border border-white/20 flex-shrink-0"
            />
            <div>
              <p className="text-white/70 text-sm italic leading-relaxed mb-1">
                "The roadmap for Cloud Security was so detailed. Got my first internship in 4 months."
              </p>
              <p className="text-white/35 text-xs font-medium">Rahul M. — CSE Student, Hyderabad</p>
            </div>
          </div>
        </div>

        {/* Bottom avatars */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
            ].map((src, i) => (
              <img key={i} src={src} alt="" className="w-7 h-7 rounded-full border-2 border-[#0F172A] object-cover" />
            ))}
          </div>
          <p className="text-white/35 text-xs">Students discovering their path</p>
        </div>
      </div>

      {/* ── Right panel ─────────────────────────────────────────────── */}
      <div
        className="w-full lg:w-[55%] flex items-center justify-center px-6 py-10 relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 70% 20%, #E6F7F2 0%, #F8FFFD 45%, #ffffff 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.5] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#14B88A 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#14B88A]/8 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#7C3AED]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

        {/* Form card */}
        <div className="w-full max-w-[400px] relative z-10">

          {/* Mobile logo */}
          <div className="lg:hidden mb-6 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#14B88A] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M9 3L4 7v5l5 3 5-3V7L9 3z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="9" cy="9" r="2" fill="white"/>
                </svg>
              </div>
              <span className="font-extrabold text-lg text-[#0F172A]">beyond<span className="text-[#14B88A]">Marks</span></span>
            </Link>
            <Link to="/login" className="text-sm text-[#14B88A] font-semibold hover:text-[#0D8F6A]">Sign in →</Link>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mb-1.5">
              Create your account
            </h1>
            <p className="text-[#64748B] text-sm">Free forever. Start discovering in 60 seconds.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Full name</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input type="text" required placeholder="Your full name"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full h-11 pl-10 pr-4 bg-[#F8FFFD] border border-[#DCEFE8] rounded-xl text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#14B88A] focus:ring-2 focus:ring-[#14B88A]/20 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Email address</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input type="email" required placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full h-11 pl-10 pr-4 bg-[#F8FFFD] border border-[#DCEFE8] rounded-xl text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#14B88A] focus:ring-2 focus:ring-[#14B88A]/20 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input type={showPw ? 'text' : 'password'} required placeholder="Min 6 characters"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full h-11 pl-10 pr-11 bg-[#F8FFFD] border border-[#DCEFE8] rounded-xl text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#14B88A] focus:ring-2 focus:ring-[#14B88A]/20 focus:bg-white transition-all"
                />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors">
                  {showPw
                    ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  }
                </button>
              </div>

              {/* Strength */}
              {form.password.length > 0 && strengthMeta[strength] && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthMeta[strength].bar : 'bg-[#DCEFE8]'}`} />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${strengthMeta[strength].text}`}>
                    {strengthMeta[strength].label} password
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed">
              By creating an account you agree to our{' '}
              <Link to="/terms" className="text-[#14B88A] hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-[#14B88A] hover:underline">Privacy Policy</Link>.
            </p>

            <button type="submit" disabled={loading}
              className="w-full h-11 bg-[#14B88A] hover:bg-[#0D8F6A] text-white font-semibold rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-sm hover:shadow-md">
              {loading
                ? <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating account...</>
                : 'Create free account'
              }
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#DCEFE8]" />
            <span className="text-xs text-[#94A3B8] font-medium">or continue with</span>
            <div className="flex-1 h-px bg-[#DCEFE8]" />
          </div>

          <button type="button" disabled
            className="w-full h-11 bg-[#F8FFFD] border border-[#DCEFE8] rounded-xl flex items-center justify-center gap-3 text-sm font-medium text-[#64748B] opacity-60 cursor-not-allowed">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
            <span className="text-[10px] bg-slate-100 text-[#94A3B8] px-2 py-0.5 rounded-full">Soon</span>
          </button>

          <p className="text-center text-sm text-[#64748B] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#14B88A] font-semibold hover:text-[#0D8F6A] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}