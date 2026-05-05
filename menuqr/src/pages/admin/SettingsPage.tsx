import { useEffect, useState, type ChangeEvent } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useMyBusiness, useCreateBusiness, useUpdateBusiness } from '../../lib/queries'
import { APP_URL } from '../../lib/config'
import { ImageUpload } from '../../components/admin/ImageUpload'

const inputClass =
  'w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20'
const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500'

interface SettingsForm {
  name: string
  slug: string
  tagline: string
  primary_color: string
  whatsapp: string
  address: string
  hours: string
  logo_url: string | null
  cover_url: string | null
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function isValidSlug(s: string): boolean {
  return /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(s) || /^[a-z0-9]$/.test(s)
}

export function SettingsPage() {
  const { user } = useAuth()
  const { data: business, isLoading } = useMyBusiness(user?.id)
  const createBusiness = useCreateBusiness()
  const updateBusiness = useUpdateBusiness()

  const [form, setForm] = useState<SettingsForm>({
    name: '',
    slug: '',
    tagline: '',
    primary_color: '#D4622A',
    whatsapp: '',
    address: '',
    hours: '',
    logo_url: null,
    cover_url: null,
  })
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [saved, setSaved] = useState(false)
  const [slugError, setSlugError] = useState('')

  useEffect(() => {
    if (business) {
      setForm({
        name: business.name,
        slug: business.slug,
        tagline: business.tagline ?? '',
        primary_color: business.primary_color,
        whatsapp: business.whatsapp ?? '',
        address: business.address ?? '',
        hours: business.hours ?? '',
        logo_url: business.logo_url,
        cover_url: business.cover_url,
      })
      setSlugManuallyEdited(true)
      document.documentElement.style.setProperty('--brand-color', business.primary_color)
    }
  }, [business])

  function set(k: keyof SettingsForm) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      setSaved(false)
      if (k === 'name' && !slugManuallyEdited) {
        setForm(f => ({ ...f, name: v, slug: slugify(v) }))
      } else {
        setForm(f => ({ ...f, [k]: v }))
      }
    }
  }

  function handleColorChange(e: ChangeEvent<HTMLInputElement>) {
    const color = e.target.value
    setForm(f => ({ ...f, primary_color: color }))
    document.documentElement.style.setProperty('--brand-color', color)
    setSaved(false)
  }

  function handleSlugChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setForm(f => ({ ...f, slug: v }))
    setSlugManuallyEdited(true)
    setSaved(false)
    setSlugError('')
  }

  async function handleSave() {
    if (!form.name.trim()) return
    if (!isValidSlug(form.slug)) {
      setSlugError('El slug solo puede contener minúsculas, números y guiones.')
      return
    }
    setSlugError('')

    const payload = {
      name: form.name.trim(),
      slug: form.slug,
      tagline: form.tagline.trim() || null,
      primary_color: form.primary_color,
      whatsapp: form.whatsapp.trim() || null,
      address: form.address.trim() || null,
      hours: form.hours.trim() || null,
      logo_url: form.logo_url,
      cover_url: form.cover_url,
    }

    if (business) {
      updateBusiness.mutate(
        { id: business.id, updates: payload },
        {
          onSuccess: () => {
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
          },
        }
      )
    } else {
      createBusiness.mutate(
        { owner_id: user!.id, ...payload },
        {
          onSuccess: () => {
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
          },
        }
      )
    }
  }

  const isPending = createBusiness.isPending || updateBusiness.isPending
  const mutError = createBusiness.error?.message ?? updateBusiness.error?.message ?? null

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-2 font-serif text-2xl font-bold text-stone-800">Ajustes</h1>
      {!business && (
        <p className="mb-6 text-sm text-stone-500">
          Completá los datos de tu negocio para activar tu menú digital.
        </p>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Business info */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
          <h2 className="mb-5 text-sm font-bold text-stone-700">Información del negocio</h2>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Nombre del restaurante *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={set('name')}
                className={inputClass}
                placeholder="La Estancia"
              />
            </div>

            <div>
              <label className={labelClass}>Slug (URL)</label>
              <input
                type="text"
                value={form.slug}
                onChange={handleSlugChange}
                className={inputClass}
                placeholder="la-estancia"
              />
              {slugError && (
                <p className="mt-1 text-xs text-red-500">{slugError}</p>
              )}
              {form.slug && !slugError && (
                <p className="mt-1 font-mono text-xs text-stone-400">
                  {APP_URL}/menu/{form.slug}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={set('tagline')}
                placeholder="Cocina paraguaya con alma"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>WhatsApp (número internacional)</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={set('whatsapp')}
                placeholder="595981234567"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Dirección</label>
              <input
                type="text"
                value={form.address}
                onChange={set('address')}
                placeholder="Mcal. López 1250, Asunción"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Horarios</label>
              <input
                type="text"
                value={form.hours}
                onChange={set('hours')}
                placeholder="Lun–Sáb 11:00–23:00"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
          <h2 className="mb-5 text-sm font-bold text-stone-700">Marca</h2>

          <div className="mb-5">
            <label className={labelClass}>Color de marca</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="color"
                value={form.primary_color}
                onChange={handleColorChange}
                className="h-10 w-10 cursor-pointer rounded-lg border border-stone-200 p-0.5"
              />
              <span className="font-mono text-sm text-stone-600">{form.primary_color}</span>
              <div
                className="h-8 flex-1 rounded-lg"
                style={{ background: form.primary_color }}
              />
            </div>
            <p className="mt-2 text-xs text-stone-400">
              El cambio de color se aplica en tiempo real en toda la interfaz.
            </p>
          </div>

          {/* Logo */}
          <div className="mb-5">
            <label className={labelClass}>Logo del restaurante</label>
            <p className="mb-2 text-xs text-stone-400">
              Se muestra en el menú público. Recomendado: imagen cuadrada, mínimo 200×200px.
            </p>
            <div className="flex items-center gap-4">
              {/* Circular preview */}
              <div
                className="flex h-16 w-16 flex-shrink-0 overflow-hidden items-center justify-center rounded-full border-2 border-stone-200 font-serif text-lg font-bold text-white"
                style={{ background: form.logo_url ? 'transparent' : 'var(--brand-color)' }}
              >
                {form.logo_url ? (
                  <img src={form.logo_url} alt="Logo" className="h-full w-full object-cover" />
                ) : (
                  <span>{form.name ? form.name.slice(0, 2).toUpperCase() : '?'}</span>
                )}
              </div>
              <div className="flex-1">
                <ImageUpload
                  value={form.logo_url}
                  onUpload={url => { setForm(f => ({ ...f, logo_url: url })); setSaved(false) }}
                  onClear={() => { setForm(f => ({ ...f, logo_url: null })); setSaved(false) }}
                />
              </div>
            </div>
          </div>

          {/* Cover */}
          <div className="mb-5">
            <label className={labelClass}>Foto de portada</label>
            <p className="mb-2 text-xs text-stone-400">
              Imagen de fondo del header en el menú público. Recomendado: 1200×400px o más ancho.
            </p>
            <ImageUpload
              value={form.cover_url}
              onUpload={url => { setForm(f => ({ ...f, cover_url: url })); setSaved(false) }}
              onClear={() => { setForm(f => ({ ...f, cover_url: null })); setSaved(false) }}
              previewRatio="56.25%"
            />
          </div>

          {/* Preview */}
          <div className="rounded-xl border border-stone-100 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-400">
              Preview
            </p>
            <div
              className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ background: 'var(--brand-color)' }}
            >
              QR
            </div>
            <p className="font-serif text-base font-bold text-stone-800">
              {form.name || 'Tu negocio'}
            </p>
            {form.tagline && (
              <p className="text-xs italic text-stone-400">{form.tagline}</p>
            )}
            <button
              className="mt-3 rounded-lg px-4 py-1.5 text-xs font-bold text-white"
              style={{ background: 'var(--brand-color)' }}
            >
              Ver menú
            </button>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
          style={{ background: saved ? '#4A8A4A' : 'var(--brand-color)' }}
        >
          {isPending ? 'Guardando...' : saved ? '✓ Guardado' : business ? 'Guardar cambios' : 'Crear negocio'}
        </button>
        {mutError && (
          <p className="text-sm text-red-500">{mutError}</p>
        )}
      </div>
    </div>
  )
}
