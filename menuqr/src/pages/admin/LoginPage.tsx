import { useState, useEffect, type FormEvent } from 'react'
import { isDemoMode, loginDemo } from '../../lib/mock-auth'
import { supabase } from '../../lib/supabase'
import { MenuQRLogo } from '../../components/ui/MenuQRLogo'

const CONTACT_WHATSAPP = import.meta.env.VITE_CONTACT_WHATSAPP ?? '595991234567'

const PERKS = [
  'Menú digital con QR para tus mesas',
  'Carrito y pedidos directo por WhatsApp',
  'Tu logo, colores y fotos propias',
  'Sin app, sin comisiones — solo tu menú',
]

// ── Promo sheet ───────────────────────────────────────────────────────────────

function PromoSheet({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: 'rgba(28,20,16,0.45)', backdropFilter: 'blur(4px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up w-full rounded-t-3xl bg-white px-6 pt-5"
        style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}
      >
        <div className="mb-4 flex justify-center">
          <div className="h-1 w-9 rounded-full bg-stone-200" />
        </div>

        <div className="mb-5 flex items-start justify-between">
          <div>
            <MenuQRLogo size={26} showText className="mb-2 text-stone-800" />
            <h2 className="font-serif text-xl font-bold text-stone-800">
              Menú digital con QR<br />para tu restaurante
            </h2>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition hover:bg-stone-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="mb-6 space-y-2.5">
          {PERKS.map(perk => (
            <li key={perk} className="flex items-center gap-2.5 text-sm text-stone-700">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {perk}
            </li>
          ))}
        </ul>

        <a
          href={`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent('Hola! Me interesa tener un menú digital para mi restaurante con MenuQR. ¿Pueden darme más info?')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white no-underline"
          style={{ background: '#25D366' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.571a.5.5 0 0 0 .609.61l5.801-1.525A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.724.977.993-3.63-.233-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
          </svg>
          Quiero mi menú digital
        </a>
      </div>
    </div>
  )
}

// ── LoginPage ─────────────────────────────────────────────────────────────────

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showDemoCredentials, setShowDemoCredentials] = useState(false)
  const [promoOpen, setPromoOpen] = useState(false)

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
    setShowDemoCredentials(false)
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 py-8"
      style={{
        background: '#F0EDE8',
        backgroundImage: 'radial-gradient(#D8D3CB 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="w-full max-w-sm">
        {/* Logo — solo el ícono grande + nombre como texto */}
        <div className="mb-6 flex flex-col items-center">
          <MenuQRLogo size={52} showText={false} className="mb-3" />
          <h1 className="text-xl font-extrabold tracking-tight text-stone-800">
            Menu<span style={{ color: 'var(--brand-color, #D4622A)' }}>QR</span>
          </h1>
          <p className="mt-1 text-sm text-stone-500">Panel de administración</p>
        </div>

        {/* Login card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
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
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  className="transition-transform duration-200"
                  style={{ transform: showDemoCredentials ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                className="overflow-hidden transition-all duration-200"
                style={{ maxHeight: showDemoCredentials ? 120 : 0, opacity: showDemoCredentials ? 1 : 0 }}
              >
                <div className="mt-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
                  <p className="mb-0.5 font-mono text-xs text-amber-800"><span className="font-semibold">Email:</span> demo@menuqr.com</p>
                  <p className="mb-3 font-mono text-xs text-amber-800"><span className="font-semibold">Pass:</span> demo1234</p>
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
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Email</label>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com" autoComplete="email"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500">Contraseña</label>
              <input
                type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" autoComplete="current-password"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white transition disabled:opacity-60"
              style={{ background: 'var(--brand-color, #D4622A)' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Ingresando…
                </>
              ) : 'Ingresar'}
            </button>
          </form>
        </div>

        {/* Footer promo — one-liner, tap to open sheet */}
        <div className="mt-5 text-center">
          <p className="text-xs text-stone-400">MenuQR · menú digital para restaurantes</p>
          <button
            type="button"
            onClick={() => setPromoOpen(true)}
            className="mt-1 text-xs font-semibold transition hover:opacity-80"
            style={{ color: 'var(--brand-color, #D4622A)' }}
          >
            ¿Todavía no tenés tu menú digital? Conocé MenuQR →
          </button>
        </div>
      </div>

      {promoOpen && <PromoSheet onClose={() => setPromoOpen(false)} />}
    </div>
  )
}
