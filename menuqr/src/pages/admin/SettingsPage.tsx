import { useState, type ChangeEvent } from 'react'
import { MOCK_BUSINESS } from '../../lib/mock-data'

interface SettingsForm {
  name: string
  tagline: string
  primary_color: string
  whatsapp: string
  address: string
  hours: string
}

const inputClass =
  'w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20'
const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500'

export function SettingsPage() {
  const [form, setForm] = useState<SettingsForm>({
    name: MOCK_BUSINESS.name,
    tagline: MOCK_BUSINESS.tagline ?? '',
    primary_color: MOCK_BUSINESS.primary_color,
    whatsapp: MOCK_BUSINESS.whatsapp ?? '',
    address: MOCK_BUSINESS.address ?? '',
    hours: MOCK_BUSINESS.hours ?? '',
  })
  const [saved, setSaved] = useState(false)

  const set = (k: keyof SettingsForm) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setSaved(false)
  }

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setForm((f) => ({ ...f, primary_color: color }))
    document.documentElement.style.setProperty('--brand-color', color)
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-6 font-serif text-2xl font-bold text-stone-800">Ajustes</h1>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Business info */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
          <h2 className="mb-5 text-sm font-bold text-stone-700">Información del negocio</h2>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Nombre del restaurante</label>
              <input
                type="text"
                value={form.name}
                onChange={set('name')}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={set('tagline')}
                placeholder="Ej: Cocina paraguaya con alma"
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
            <p className="font-serif text-base font-bold text-stone-800">{form.name}</p>
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
          className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
          style={{ background: saved ? '#4A8A4A' : 'var(--brand-color)' }}
        >
          {saved ? '✓ Guardado' : 'Guardar cambios'}
        </button>
        {saved && (
          <p className="text-sm text-stone-400">
            Cambios guardados en la demo.
          </p>
        )}
      </div>
    </div>
  )
}
