import { useState, type FormEvent } from 'react'
import { isDemoMode, loginDemo } from '../../lib/mock-auth'
import { supabase } from '../../lib/supabase'

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
      // Force full remount so AuthProvider re-reads sessionStorage
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold text-lg"
            style={{ background: 'var(--brand-color, #D4622A)' }}
          >
            QR
          </div>
          <h1 className="text-2xl font-bold text-stone-800">MenuQR</h1>
          <p className="mt-1 text-sm text-stone-500">Panel de administración</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-100">
          <h2 className="mb-6 text-lg font-semibold text-stone-800">
            Iniciá sesión
          </h2>

          {isDemoMode() && (
            <div className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700 ring-1 ring-amber-200">
              <span className="font-semibold">Demo:</span> demo@menuqr.com / demo1234
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
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
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20"
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
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 text-sm font-bold text-white transition disabled:opacity-60"
              style={{ background: 'var(--brand-color, #D4622A)' }}
            >
              {loading ? 'Ingresando…' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
