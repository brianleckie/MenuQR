import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { isDemoMode, loginDemo } from '../../lib/mock-auth'
import { supabase } from '../../lib/supabase'
import { MenuQRLogo } from '../../components/ui/MenuQRLogo'

const BULLETS = [
  'Sin apps para tus clientes',
  'Cambios en tiempo real',
  'Pedidos directo a tu WhatsApp',
]

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (isDemoMode()) {
      const result = await loginDemo(email, password)
      if ('error' in result) {
        setError(result.error)
        setLoading(false)
        return
      }
      window.location.replace('/admin')
      return
    }

    const { error: authError } = await supabase!.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Email o contraseña incorrectos.')
      setLoading(false)
      return
    }

    window.location.replace('/admin')
  }

  function fillDemo() {
    setEmail('demo@menuqr.com')
    setPassword('demo1234')
  }

  return (
    <div className="flex min-h-screen">

      {/* ── Left column — login panel (60%) ── */}
      <div
        className="flex w-full flex-col items-center justify-center px-8 py-12 md:w-3/5 md:px-16"
        style={{ background: 'var(--mq-cream)' }}
      >
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <MenuQRLogo logoOnly width={140} />
          </div>

          {/* Heading */}
          <h1
            className="mb-2 text-center font-serif text-[28px] font-semibold leading-tight"
            style={{ color: 'var(--mq-ink)' }}
          >
            Bienvenido de nuevo
          </h1>
          <p className="mb-8 text-center text-sm" style={{ color: 'var(--mq-ink-soft)' }}>
            Ingresá para gestionar tu menú
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
                style={{ color: 'var(--mq-ink-soft)' }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                autoComplete="email"
                className="w-full rounded-xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:ring-2"
                style={{ borderColor: 'var(--mq-line)', color: 'var(--mq-ink)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--mq-slate)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(122,139,156,0.18)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--mq-line)'; e.currentTarget.style.boxShadow = '' }}
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
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:ring-2"
                style={{ borderColor: 'var(--mq-line)', color: 'var(--mq-ink)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--mq-slate)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(122,139,156,0.18)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--mq-line)'; e.currentTarget.style.boxShadow = '' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ background: 'var(--mq-slate-deep)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--mq-ink)' }}
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

          {/* Links */}
          <div className="mt-6 space-y-2 text-center">
            <p className="text-sm" style={{ color: 'var(--mq-ink-soft)' }}>
              ¿No tenés cuenta?{' '}
              <Link
                to="/"
                className="font-semibold underline-offset-2 hover:underline"
                style={{ color: 'var(--mq-slate-deep)' }}
              >
                Crear menú gratis
              </Link>
            </p>

            {isDemoMode() && (
              <button
                type="button"
                onClick={fillDemo}
                className="text-sm font-medium transition hover:opacity-80"
                style={{ color: 'var(--mq-slate)' }}
              >
                Modo demo →
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ── Right column — decorative panel (40%), desktop only ── */}
      <div
        className="hidden flex-col items-center justify-between px-12 py-16 md:flex md:w-2/5"
        style={{ background: 'var(--mq-slate-deep)' }}
      >
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h2
            className="mb-10 font-serif text-4xl font-normal italic leading-snug text-white"
            style={{ maxWidth: 300 }}
          >
            Tu menú digital,<br />listo en minutos.
          </h2>

          <ul className="space-y-4 text-left">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-sm text-white/80">
                <span className="text-base font-bold" style={{ color: 'var(--mq-ochre)' }}>✓</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <p className="font-mono text-xs text-white/30">
          menu-qr-sigma.vercel.app/menu/la-burger-co
        </p>
      </div>

    </div>
  )
}
