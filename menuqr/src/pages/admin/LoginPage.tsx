import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { isDemoMode, loginDemo } from '../../lib/mock-auth'
import { supabase } from '../../lib/supabase'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function doLogin(loginEmail: string, loginPassword: string) {
    setError(null)
    setLoading(true)

    if (isDemoMode()) {
      const result = await loginDemo(loginEmail, loginPassword)
      if ('error' in result) {
        setError(result.error)
        setLoading(false)
        return
      }
      window.location.replace('/admin')
      return
    }

    const { error: authError } = await supabase!.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    })

    if (authError) {
      setError('Email o contraseña incorrectos.')
      setLoading(false)
      return
    }

    window.location.replace('/admin')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await doLogin(email, password)
  }

  const handleDemoLogin = () => doLogin('demo@menuqr.com', 'demo1234')

  const inputClass =
    'w-full rounded-xl border bg-white px-4 py-3.5 text-sm outline-none transition'

  function focusInput(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = 'var(--mq-slate)'
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,127,146,0.16)'
  }
  function blurInput(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = 'var(--mq-line)'
    e.currentTarget.style.boxShadow = ''
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 py-12"
      style={{ background: 'var(--mq-cream)' }}
    >
      {/* Logo above card */}
      <div className="mb-8 flex items-center gap-2.5">
        <svg width="34" height="34" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--mq-slate-deep)', flexShrink: 0 }}>
          {/* top-left finder */}
          <rect x="1" y="1" width="7" height="7" rx="1" fill="currentColor"/>
          <rect x="2.5" y="2.5" width="4" height="4" rx="0.4" fill="var(--mq-cream)"/>
          <rect x="3.5" y="3.5" width="2" height="2" fill="currentColor"/>
          {/* top-right finder */}
          <rect x="13" y="1" width="7" height="7" rx="1" fill="currentColor"/>
          <rect x="14.5" y="2.5" width="4" height="4" rx="0.4" fill="var(--mq-cream)"/>
          <rect x="15.5" y="3.5" width="2" height="2" fill="currentColor"/>
          {/* bottom-left finder */}
          <rect x="1" y="13" width="7" height="7" rx="1" fill="currentColor"/>
          <rect x="2.5" y="14.5" width="4" height="4" rx="0.4" fill="var(--mq-cream)"/>
          <rect x="3.5" y="15.5" width="2" height="2" fill="currentColor"/>
          {/* data dots */}
          <rect x="10" y="1" width="2" height="2" fill="currentColor"/>
          <rect x="10" y="4" width="2" height="2" fill="currentColor"/>
          <rect x="10" y="7" width="2" height="2" fill="currentColor"/>
          <rect x="13" y="10" width="2" height="2" fill="currentColor"/>
          <rect x="16" y="10" width="2" height="2" fill="currentColor"/>
          <rect x="19" y="10" width="1" height="2" fill="currentColor"/>
          <rect x="1"  y="10" width="2" height="2" fill="currentColor"/>
          <rect x="4"  y="10" width="2" height="2" fill="currentColor"/>
          <rect x="13" y="13" width="2" height="2" fill="currentColor"/>
          <rect x="16" y="16" width="2" height="2" fill="currentColor"/>
          <rect x="13" y="16" width="2" height="2" fill="currentColor"/>
          <rect x="16" y="13" width="2" height="2" fill="currentColor"/>
          <rect x="19" y="16" width="1" height="2" fill="currentColor"/>
          <rect x="19" y="19" width="1" height="1" fill="currentColor"/>
          <rect x="13" y="19" width="2" height="1" fill="currentColor"/>
          <rect x="10" y="10" width="2" height="2" fill="currentColor"/>
          <rect x="10" y="13" width="2" height="2" fill="currentColor"/>
          <rect x="10" y="16" width="2" height="2" fill="currentColor"/>
          <rect x="10" y="19" width="2" height="1" fill="currentColor"/>
        </svg>
        <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--mq-ink)' }}>
          MenuQR<sup style={{ fontSize: '0.5em', verticalAlign: 'super', fontWeight: 400, letterSpacing: 0 }}>™</sup>
        </span>
      </div>

      {/* Card */}
      <div
        className="w-full bg-white p-10"
        style={{
          maxWidth: 420,
          borderRadius: 20,
          boxShadow: '0 4px 24px -4px rgba(30,35,40,0.10), 0 0 0 1px rgba(30,35,40,0.06)',
        }}
      >
        <h1
          className="mb-1.5 text-center font-serif text-[26px] font-semibold leading-tight"
          style={{ color: 'var(--mq-ink)' }}
        >
          Bienvenido de nuevo
        </h1>
        <p className="mb-7 text-center text-sm" style={{ color: 'var(--mq-ink-soft)' }}>
          Ingresá para gestionar tu menú
        </p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
              style={{ color: 'var(--mq-ink-soft)' }}
            >
              Email
            </label>
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com" autoComplete="email"
              className={inputClass}
              style={{ borderColor: 'var(--mq-line)', color: 'var(--mq-ink)' }}
              onFocus={focusInput} onBlur={blurInput}
            />
          </div>
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
              style={{ color: 'var(--mq-ink-soft)' }}
            >
              Contraseña
            </label>
            <input
              type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" autoComplete="current-password"
              className={inputClass}
              style={{ borderColor: 'var(--mq-line)', color: 'var(--mq-ink)' }}
              onFocus={focusInput} onBlur={blurInput}
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition disabled:opacity-60"
            style={{ background: 'var(--mq-slate-deep)' }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'var(--mq-ink)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--mq-slate-deep)' }}
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Ingresando…
              </>
            ) : 'Ingresar'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm" style={{ color: 'var(--mq-ink-soft)' }}>
          ¿No tenés cuenta?{' '}
          <Link
            to="/"
            className="font-semibold underline-offset-2 hover:underline"
            style={{ color: 'var(--mq-slate-deep)' }}
          >
            Crear menú gratis
          </Link>
        </p>

        {/* Separator */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 border-t" style={{ borderColor: 'var(--mq-line)' }} />
          <span className="text-xs" style={{ color: 'var(--mq-ink-soft)' }}>o</span>
          <div className="flex-1 border-t" style={{ borderColor: 'var(--mq-line)' }} />
        </div>

        {/* Demo button — always visible */}
        <button
          type="button" disabled={loading}
          onClick={handleDemoLogin}
          className="w-full rounded-xl border py-3 text-sm font-medium transition hover:opacity-80 disabled:opacity-40"
          style={{ borderColor: 'var(--mq-line)', color: 'var(--mq-ink-soft)', background: 'transparent' }}
        >
          Probar con cuenta demo
        </button>
      </div>
    </div>
  )
}
