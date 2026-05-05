import { useEffect, useState } from 'react'
import type { Category, Item } from '../../types'
import { useUpsertItem } from '../../lib/queries'
import { ImageUpload } from './ImageUpload'

interface ItemFormProps {
  item: Item | null
  businessId: string
  categories: Category[]
  onClose: () => void
}

const inputClass =
  'w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 outline-none transition focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20'
const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-500'

interface FormState {
  name: string
  short_desc: string
  description: string
  price: string
  category_id: string
  available: boolean
  image_url: string | null
}

function buildInitial(item: Item | null, categories: Category[]): FormState {
  if (item) {
    return {
      name: item.name,
      short_desc: item.short_desc ?? '',
      description: item.description ?? '',
      price: String(item.price),
      category_id: item.category_id,
      available: item.available,
      image_url: item.image_url,
    }
  }
  return {
    name: '',
    short_desc: '',
    description: '',
    price: '',
    category_id: categories[0]?.id ?? '',
    available: true,
    image_url: null,
  }
}

export function ItemForm({ item, businessId, categories, onClose }: ItemFormProps) {
  const [form, setForm] = useState<FormState>(() => buildInitial(item, categories))
  const [visible, setVisible] = useState(false)
  const upsert = useUpsertItem()

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  function close() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload: Omit<Item, 'created_at' | 'updated_at'> = {
      id: item?.id ?? crypto.randomUUID(),
      business_id: businessId,
      category_id: form.category_id,
      name: form.name.trim(),
      short_desc: form.short_desc.trim() || null,
      description: form.description.trim() || null,
      price: Number(form.price),
      image_url: form.image_url,
      available: form.available,
      sort_order: item?.sort_order ?? 0,
    }
    upsert.mutate(payload, { onSuccess: close })
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={close}
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-2xl transition-transform duration-300 md:w-[480px]"
        style={{ transform: visible ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
          <h2 className="font-serif text-lg font-bold text-stone-800">
            {item ? 'Editar plato' : 'Nuevo plato'}
          </h2>
          <button
            type="button"
            onClick={close}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex-1 space-y-5 px-6 py-5">
            {/* Imagen */}
            <div>
              <label className={labelClass}>Foto del plato</label>
              <ImageUpload
                value={form.image_url}
                onUpload={url => set('image_url', url)}
                onClear={() => set('image_url', null)}
              />
            </div>

            {/* Nombre */}
            <div>
              <label className={labelClass}>Nombre *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => set('name', e.target.value)}
                className={inputClass}
                placeholder="Ej: Asado de Tira"
              />
            </div>

            {/* Descripción corta */}
            <div>
              <label className={labelClass}>
                Descripción corta
                <span className="ml-1 font-normal normal-case text-stone-400">
                  ({form.short_desc.length}/80)
                </span>
              </label>
              <input
                type="text"
                maxLength={80}
                value={form.short_desc}
                onChange={e => set('short_desc', e.target.value)}
                className={inputClass}
                placeholder="Una línea que aparece en la tarjeta"
              />
            </div>

            {/* Descripción completa */}
            <div>
              <label className={labelClass}>Descripción completa</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={e => set('description', e.target.value)}
                className={inputClass + ' resize-none'}
                placeholder="Descripción detallada para el modal..."
              />
            </div>

            {/* Precio */}
            <div>
              <label className={labelClass}>Precio en Gs. *</label>
              <input
                type="number"
                required
                min={0}
                step={500}
                value={form.price}
                onChange={e => set('price', e.target.value)}
                className={inputClass}
                placeholder="85000"
              />
            </div>

            {/* Categoría */}
            <div>
              <label className={labelClass}>Categoría *</label>
              <select
                required
                value={form.category_id}
                onChange={e => set('category_id', e.target.value)}
                className={inputClass}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Disponible */}
            <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-stone-800">Disponible</p>
                <p className="text-xs text-stone-400">Visible y ordenable por los clientes</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.available}
                onClick={() => set('available', !form.available)}
                className="relative flex-shrink-0 rounded-full transition-colors duration-200"
                style={{
                  width: 44,
                  height: 24,
                  background: form.available ? 'var(--brand-color)' : '#D4C9BC',
                }}
              >
                <span
                  className="absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow transition-all duration-200"
                  style={{ left: form.available ? 23 : 3 }}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-stone-100 px-6 py-4">
            {upsert.isError && (
              <p className="mb-3 text-xs text-red-500">
                Error al guardar. Verificá los datos e intentá de nuevo.
              </p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={close}
                className="flex-1 rounded-xl border border-stone-200 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={upsert.isPending}
                className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                style={{ background: 'var(--brand-color)' }}
              >
                {upsert.isPending ? 'Guardando...' : item ? 'Guardar cambios' : 'Crear plato'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
