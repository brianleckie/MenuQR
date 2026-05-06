import { useState, type FormEvent } from 'react'
import { isDemoMode, loginDemo } from '../../lib/mock-auth'
import { supabase } from '../../lib/supabase'
import { MenuQRLogo } from '../../components/ui/MenuQRLogo'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showDemoCredentials, setShowDemoCredentials] = useState(false)

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

    const { error: authError } = await supabase!.auth.signInWithPassword({
      email,
      password,
    })

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
    setShowDemoCredentials(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 px-4 py-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <MenuQRLogo size={48} showText={false} className="mb-3" />
          <MenuQRLogo size={32} showText className="text-stone-800" />
          <p className="mt-1.5 text-sm text-stone-500">Panel de administración</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
          <h2 className="mb-5 text-base font-semibold text-stone-800">Iniciá sesión</h2>

          {/* Demo credentials pill */}
          {isDemoMode() && (
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowDemoCredentials(v => !v)}
                className="flex w-full items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700 transition hover:bg-amber-100"
              >
                <span className="font-semibold">Ver credenciales demo</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-transform duration-200"
                  style={{ transform: showDemoCredentials ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Animated credentials reveal */}
              <div
                className="overflow-hidden transition-all duration-200"
                style={{ maxHeight: showDemoCredentials ? 120 : 0, opacity: showDemoCredentials ? 1 : 0 }}
              >
                <div className="mt-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
                  <p className="mb-0.5 font-mono text-xs text-amber-800">
                    <span className="font-semibold">Email:</span> demo@menuqr.com
                  </p>
                  <p className="mb-3 font-mono text-xs text-amber-800">
                    <span className="font-semibold">Pass:</span> demo1234
                  </p>
                  <button
                    type="button"
                    onClick={fillDemo}
                    className="rounded-lg px-3 py-1.5 text-xs font-bold text-white transition"
                    style={{ background: 'var(--brand-color, #D4622A)' }}
                  >
                    Autocompletar →
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                autoComplete="email"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white transition disabled:opacity-60"
              style={{ background: 'var(--brand-color, #D4622A)' }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Ingresando…
                </>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
