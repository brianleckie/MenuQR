import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  useMyBusiness,
  useItems,
  useCategories,
  useToggleItemAvailability,
  useDeleteItem,
  useReorderItems,
} from '../../lib/queries'
import { imgPresets } from '../../lib/cloudinary'
import { formatPrice } from '../../lib/mock-data'
import type { Item } from '../../types'
import { ItemForm } from '../../components/admin/ItemForm'
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableItem, DragHandle } from '../../components/ui/SortableItem'

// ── Toggle ────────────────────────────────────────────────────────────────────

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
      style={{ width: 44, height: 24, background: checked ? 'var(--brand-color)' : '#D4C9BC' }}
    >
      <span
        className="absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow transition-all duration-200"
        style={{ left: checked ? 23 : 3 }}
      />
    </button>
  )
}

// ── SortableTableRow — tr-based sortable for the desktop table ────────────────

interface SortableTableRowProps {
  id: string
  children: (dragHandleProps: React.HTMLAttributes<HTMLElement>) => React.ReactNode
  index: number
  total: number
}

function SortableTableRow({ id, children, index, total }: SortableTableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  return (
    <tr
      ref={setNodeRef}
      className="transition-colors hover:bg-stone-50"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        borderBottom: index < total - 1 ? '1px solid #F5F0EA' : 'none',
        zIndex: isDragging ? 999 : undefined,
      }}
    >
      {children({ ...attributes, ...listeners })}
    </tr>
  )
}

// ── MenuItemsPage ─────────────────────────────────────────────────────────────

export function MenuItemsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: business, isLoading: bizLoading } = useMyBusiness(user?.id)
  const { data: items, isLoading: itemsLoading } = useItems(business?.id)
  const { data: categories } = useCategories(business?.id)

  const toggleAvailability = useToggleItemAvailability()
  const deleteItem = useDeleteItem()
  const reorderItems = useReorderItems()

  const [activeCat, setActiveCat] = useState<string | null>(null)
  const [drawerItem, setDrawerItem] = useState<Item | null | undefined>(undefined)
  const [localItems, setLocalItems] = useState<Item[]>([])
  const seeded = useRef(false)

  const cats = categories ?? []
  const currentCat = activeCat ?? cats[0]?.id ?? null

  // Reset seed when category tab changes so we re-seed from server for the new category
  useEffect(() => {
    seeded.current = false
  }, [activeCat])

  // Seed local state once per category from server; after that, local state owns the order
  useEffect(() => {
    if (!seeded.current && items !== undefined && currentCat !== null) {
      setLocalItems(items.filter(d => d.category_id === currentCat))
      seeded.current = true
    }
  }, [items, currentCat])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id || !business) return
    const oldIndex = localItems.findIndex(d => d.id === active.id)
    const newIndex = localItems.findIndex(d => d.id === over.id)
    const reordered = arrayMove(localItems, oldIndex, newIndex)
    setLocalItems(reordered)
    reorderItems.mutate({
      updates: reordered.map((item, i) => ({ id: item.id, sort_order: (i + 1) * 10 })),
      businessId: business.id,
    })
  }

  function handleToggle(item: Item) {
    if (!business) return
    toggleAvailability.mutate({ id: item.id, available: !item.available, businessId: business.id })
  }

  function handleDelete(item: Item) {
    if (!business) return
    if (!window.confirm(`¿Eliminar "${item.name}"?`)) return
    seeded.current = false
    deleteItem.mutate({ id: item.id, businessId: business.id })
  }

  if (bizLoading || itemsLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
      </div>
    )
  }

  if (!business) {
    return (
      <div className="p-4 md:p-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-1 font-serif text-lg font-bold text-amber-900">Sin negocio configurado</p>
          <p className="mb-4 text-sm text-amber-700">Primero configurá tu negocio en Ajustes.</p>
          <button
            onClick={() => navigate('/admin/settings')}
            className="rounded-xl px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
            style={{ background: 'var(--brand-color)' }}
          >
            Ir a Ajustes →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-stone-800">Platos</h1>
        <button
          onClick={() => setDrawerItem(null)}
          className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white"
          style={{ background: 'var(--brand-color)' }}
        >
          + Nuevo plato
        </button>
      </div>

      {/* Category tabs */}
      {cats.length > 0 && (
        <div className="mb-4 flex gap-1.5 overflow-x-auto pb-0.5">
          {cats.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className="flex-shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-semibold transition"
              style={{
                background: currentCat === cat.id ? '#F5F1EC' : 'transparent',
                color: currentCat === cat.id ? 'var(--brand-color)' : '#8C7B6A',
                borderBottom: currentCat === cat.id ? '2px solid var(--brand-color)' : '2px solid transparent',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {cats.length === 0 && (
        <div className="rounded-2xl bg-white py-10 text-center shadow-sm ring-1 ring-stone-100">
          <p className="mb-3 text-sm text-stone-400">No hay categorías. Crealas primero.</p>
          <button
            onClick={() => navigate('/admin/categories')}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
            style={{ background: 'var(--brand-color)' }}
          >
            Ir a Categorías
          </button>
        </div>
      )}

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={localItems.map(d => d.id)} strategy={verticalListSortingStrategy}>

          {/* Mobile cards */}
          {cats.length > 0 && (
            <div className="md:hidden">
              {localItems.length === 0 ? (
                <div className="py-10 text-center text-sm text-stone-400">
                  No hay platos en esta categoría aún.
                </div>
              ) : (
                <div className="grid gap-3">
                  {localItems.map(dish => (
                    <SortableItem key={dish.id} id={dish.id}>
                      {(dragHandleProps) => (
                        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100">
                          <div className="flex gap-3">
                            <DragHandle {...dragHandleProps} />
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
                              {dish.image_url && (
                                <img
                                  src={imgPresets.adminThumb(dish.image_url) ?? dish.image_url}
                                  alt={dish.name}
                                  className="h-full w-full object-cover"
                                  style={{ filter: dish.available ? 'none' : 'grayscale(70%)' }}
                                />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-serif text-sm font-semibold text-stone-800">{dish.name}</p>
                              {dish.short_desc && (
                                <p className="line-clamp-1 text-xs text-stone-400">{dish.short_desc}</p>
                              )}
                              <p className="mt-0.5 text-sm font-bold" style={{ color: 'var(--brand-color)' }}>
                                {formatPrice(dish.price)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3">
                            <div className="flex items-center gap-2">
                              <Toggle checked={dish.available} onChange={() => handleToggle(dish)} />
                              <span
                                className="text-xs font-semibold"
                                style={{ color: dish.available ? '#4A8A4A' : '#9E9E9E' }}
                              >
                                {dish.available ? 'Disponible' : 'Agotado'}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => setDrawerItem(dish)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-600"
                                title="Editar"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDelete(dish)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500"
                                title="Eliminar"
                              >
                                🗑
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </SortableItem>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Desktop table */}
          {cats.length > 0 && (
            <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 md:block">
              {localItems.length === 0 ? (
                <div className="py-10 text-center text-sm text-stone-400">
                  No hay platos en esta categoría aún.
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-stone-100">
                      <th className="w-8 px-3 py-3" />
                      {['Plato', 'Precio', 'Disponible', ''].map(h => (
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
                    {localItems.map((dish, i) => (
                      <SortableTableRow key={dish.id} id={dish.id} index={i} total={localItems.length}>
                        {(dragHandleProps) => (
                          <>
                            <td className="px-3 py-3">
                              <DragHandle {...dragHandleProps} />
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="h-[34px] w-[46px] flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
                                  {dish.image_url && (
                                    <img
                                      src={imgPresets.adminThumb(dish.image_url) ?? dish.image_url}
                                      alt={dish.name}
                                      className="h-full w-full object-cover"
                                      style={{ filter: dish.available ? 'none' : 'grayscale(70%)' }}
                                    />
                                  )}
                                </div>
                                <div>
                                  <p className="font-serif text-sm font-semibold text-stone-800">{dish.name}</p>
                                  {dish.short_desc && (
                                    <p className="text-xs text-stone-400">{dish.short_desc}</p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-sm font-bold" style={{ color: 'var(--brand-color)' }}>
                              {formatPrice(dish.price)}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Toggle checked={dish.available} onChange={() => handleToggle(dish)} />
                                <span className="text-xs font-semibold" style={{ color: dish.available ? '#4A8A4A' : '#9E9E9E' }}>
                                  {dish.available ? 'Disponible' : 'Agotado'}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <button
                                  onClick={() => setDrawerItem(dish)}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-600 transition hover:bg-stone-200"
                                  title="Editar"
                                >
                                  ✏️
                                </button>
                                <button
                                  onClick={() => handleDelete(dish)}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                                  title="Eliminar"
                                >
                                  🗑
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </SortableTableRow>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

        </SortableContext>
      </DndContext>

      {/* Item drawer */}
      {drawerItem !== undefined && (
        <ItemForm
          item={drawerItem}
          businessId={business.id}
          categories={cats}
          onClose={() => {
            seeded.current = false
            setDrawerItem(undefined)
          }}
        />
      )}
    </div>
  )
}
