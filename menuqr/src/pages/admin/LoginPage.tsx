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
      <img
        src="/menuqr-logo.svg"
        alt="MenuQR"
        width="180"
        className="mb-8 block"
      />

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
