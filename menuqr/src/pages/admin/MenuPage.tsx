import { useState } from 'react'
import { MOCK_ITEMS, MOCK_CATEGORIES, formatPrice } from '../../lib/mock-data'
import type { Item } from '../../types'

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200"
      style={{
        width: 44,
        height: 24,
        background: checked ? 'var(--brand-color)' : '#D4C9BC',
      }}
    >
      <span
        className="absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow transition-all duration-200"
        style={{ left: checked ? 23 : 3 }}
      />
    </button>
  )
}

export function MenuItemsPage() {
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS)
  const [activeCat, setActiveCat] = useState(MOCK_CATEGORIES[0].id)

  const filtered = items.filter((d) => d.category_id === activeCat)

  const toggleAvail = (id: string) => {
    setItems((prev) =>
      prev.map((d) => (d.id === id ? { ...d, available: !d.available } : d))
    )
  }

  const noop = (action: string) =>
    alert(`${action} — disponible en la versión completa.`)

  return (
    <div className="p-8">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-stone-800">Platos</h1>
        <button
          onClick={() => noop('Nuevo plato')}
          className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white"
          style={{ background: 'var(--brand-color)' }}
        >
          + Nuevo plato
        </button>
      </div>

      {/* Category tabs */}
      <div className="mb-4 flex gap-1.5 overflow-x-auto pb-0.5">
        {MOCK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className="flex-shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-semibold transition"
            style={{
              background: activeCat === cat.id ? '#F5F1EC' : 'transparent',
              color: activeCat === cat.id ? 'var(--brand-color)' : '#8C7B6A',
              borderBottom: activeCat === cat.id ? '2px solid var(--brand-color)' : '2px solid transparent',
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100">
        {filtered.length === 0 ? (
          <div className="py-10 text-center text-sm text-stone-400">
            No hay platos en esta categoría aún.
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-stone-100">
                {['Plato', 'Precio', 'Disponible', ''].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11.5px] font-semibold uppercase tracking-wide text-stone-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((dish, i) => (
                <tr
                  key={dish.id}
                  className="transition-colors hover:bg-stone-50"
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid #F5F0EA' : 'none',
                  }}
                >
                  {/* Name + thumbnail */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-[34px] w-[46px] flex-shrink-0 overflow-hidden rounded-lg bg-stone-100"
                      >
                        {dish.image_url && (
                          <img
                            src={dish.image_url}
                            alt={dish.name}
                            className="h-full w-full object-cover"
                            style={{ filter: dish.available ? 'none' : 'grayscale(70%)' }}
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-serif text-sm font-semibold text-stone-800">
                          {dish.name}
                        </p>
                        {dish.short_desc && (
                          <p className="text-xs text-stone-400">{dish.short_desc}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td
                    className="whitespace-nowrap px-4 py-3 text-sm font-bold"
                    style={{ color: 'var(--brand-color)' }}
                  >
                    {formatPrice(dish.price)}
                  </td>

                  {/* Toggle */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Toggle
                        checked={dish.available}
                        onChange={() => toggleAvail(dish.id)}
                      />
                      <span
                        className="text-xs font-semibold"
                        style={{ color: dish.available ? '#4A8A4A' : '#9E9E9E' }}
                      >
                        {dish.available ? 'Disponible' : 'Agotado'}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => noop('Editar plato')}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-600 transition hover:bg-stone-200"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => noop('Eliminar plato')}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                        title="Eliminar"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
