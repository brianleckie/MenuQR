import { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useCreateBusiness } from '../../lib/queries'
import { APP_URL } from '../../lib/config'

const inputClass =
  'w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20'
const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500'

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function OnboardingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const createBusiness = useCreateBusiness()

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugManual, setSlugManual] = useState(false)
  const [color, setColor] = useState('#D4622A')
  const [whatsapp, setWhatsapp] = useState('')
  const [slugError, setSlugError] = useState('')

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setName(v)
    if (!slugManual) setSlug(slugify(v))
  }

  function handleSlugChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setSlug(v)
    setSlugManual(true)
    setSlugError('')
  }

  function handleColorChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setColor(v)
    document.documentElement.style.setProperty('--brand-color', v)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !slug || !user) return
    setSlugError('')

    createBusiness.mutate(
      {
        owner_id: user.id,
        name: name.trim(),
        slug,
        tagline: null,
        primary_color: color,
        whatsapp: whatsapp.trim() || null,
        address: null,
        hours: null,
        logo_url: null,
        cover_url: null,
      },
      {
        onSuccess: () => navigate('/admin'),
        onError: (err) => {
          const msg = err instanceof Error ? err.message : ''
          if (msg.includes('duplicate') || msg.includes('unique')) {
            setSlugError('Ese nombre de URL ya está en uso, elegí otro.')
          } else {
            setSlugError('Error al crear el negocio. Intentá de nuevo.')
          }
        },
      }
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg"
            style={{ background: 'var(--brand-color)' }}
          >
            🍽️
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-800">
            Bienvenido a MenuQR
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Configurá tu restaurante para empezar
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className={labelClass}>Nombre del restaurante *</label>
              <input
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                placeholder="La Estancia"
                className={inputClass}
                autoFocus
              />
            </div>

            {/* Slug */}
            <div>
              <label className={labelClass}>URL de tu menú</label>
              <input
                type="text"
                required
                value={slug}
                onChange={handleSlugChange}
                placeholder="la-estancia"
                className={inputClass}
              />
              {slugError ? (
                <p className="mt-1 text-xs text-red-500">{slugError}</p>
              ) : slug ? (
                <p className="mt-1 font-mono text-xs text-stone-400">
                  {APP_URL}/menu/{slug}
                </p>
              ) : null}
            </div>

            {/* Color */}
            <div>
              <label className={labelClass}>Color de marca</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                  className="h-10 w-10 cursor-pointer rounded-lg border border-stone-200 p-0.5"
                />
                <span className="font-mono text-sm text-stone-600">{color}</span>
                <div className="h-8 flex-1 rounded-lg" style={{ background: color }} />
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <label className={labelClass}>WhatsApp (opcional)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                placeholder="595981234567"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-stone-400">
                Número internacional sin espacios ni signos.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={createBusiness.isPending || !name.trim() || !slug}
              className="w-full rounded-xl py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
              style={{ background: 'var(--brand-color)' }}
            >
              {createBusiness.isPending ? 'Creando...' : 'Crear mi menú'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
