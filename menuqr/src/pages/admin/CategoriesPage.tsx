import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  useMyBusiness,
  useCategories,
  useItems,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useReorderCategories,
} from '../../lib/queries'
import type { Category } from '../../types'
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
} from '@dnd-kit/sortable'
import { SortableItem, DragHandle } from '../../components/ui/SortableItem'

export function CategoriesPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: business, isLoading: bizLoading } = useMyBusiness(user?.id)
  const { data: categories, isLoading: catsLoading } = useCategories(business?.id)
  const { data: items } = useItems(business?.id)

  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()
  const reorderCategories = useReorderCategories()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [addingNew, setAddingNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [localCategories, setLocalCategories] = useState<Category[]>([])
  const newInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalCategories(categories ?? [])
  }, [categories])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id || !business) return
    const oldIndex = localCategories.findIndex(c => c.id === active.id)
    const newIndex = localCategories.findIndex(c => c.id === over.id)
    const reordered = arrayMove(localCategories, oldIndex, newIndex)
    setLocalCategories(reordered)
    reorderCategories.mutate({
      updates: reordered.map((cat, i) => ({ id: cat.id, sort_order: (i + 1) * 10 })),
      businessId: business.id,
    })
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id)
    setEditingName(cat.name)
  }

  function saveEdit(cat: Category) {
    const name = editingName.trim()
    if (name && name !== cat.name && business) {
      updateCategory.mutate({ id: cat.id, name, businessId: business.id })
    }
    setEditingId(null)
  }

  function handleEditKeyDown(e: React.KeyboardEvent, cat: Category) {
    if (e.key === 'Enter') saveEdit(cat)
    if (e.key === 'Escape') setEditingId(null)
  }

  function startAddNew() {
    setAddingNew(true)
    setNewName('')
    setTimeout(() => newInputRef.current?.focus(), 50)
  }

  function saveNew() {
    const name = newName.trim()
    if (name && business) {
      createCategory.mutate(
        {
          business_id: business.id,
          name,
          sort_order: (localCategories.length + 1) * 10,
        },
        { onSuccess: () => { setAddingNew(false); setNewName('') } }
      )
    } else {
      setAddingNew(false)
      setNewName('')
    }
  }

  function handleNewKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') saveNew()
    if (e.key === 'Escape') { setAddingNew(false); setNewName('') }
  }

  function handleDelete(cat: Category) {
    if (!business) return
    if (!window.confirm(`¿Eliminar la categoría "${cat.name}"? Se borrarán todos sus platos.`)) return
    deleteCategory.mutate({ id: cat.id, businessId: business.id })
  }

  if (bizLoading || catsLoading) {
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-800">Categorías</h1>
          <p className="mt-1 text-sm text-stone-500">
            {localCategories.length} sección{localCategories.length !== 1 ? 'es' : ''} en tu menú
          </p>
        </div>
        <button
          onClick={startAddNew}
          className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white"
          style={{ background: 'var(--brand-color)' }}
        >
          + Nueva categoría
        </button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext
          items={localCategories.map(c => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-3">
            {localCategories.map((cat, i) => {
              const count = items?.filter(item => item.category_id === cat.id).length ?? 0
              const avail = items?.filter(item => item.category_id === cat.id && item.available).length ?? 0
              const isEditing = editingId === cat.id

              return (
                <SortableItem key={cat.id} id={cat.id}>
                  {(dragHandleProps) => (
                    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-stone-100">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <DragHandle {...dragHandleProps} />
                        <div
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                          style={{ background: 'var(--brand-color)' }}
                        >
                          {i + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          {isEditing ? (
                            <input
                              autoFocus
                              value={editingName}
                              onChange={e => setEditingName(e.target.value)}
                              onBlur={() => saveEdit(cat)}
                              onKeyDown={e => handleEditKeyDown(e, cat)}
                              className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3 py-1.5 font-serif text-base font-semibold text-stone-800 outline-none focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20"
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => startEdit(cat)}
                              className="text-left font-serif text-base font-semibold text-stone-800 hover:text-[var(--brand-color)] transition-colors"
                              title="Clic para editar"
                            >
                              {cat.name}
                            </button>
                          )}
                          <p className="text-xs text-stone-400">
                            {avail} de {count} disponibles
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
                          {count} platos
                        </span>
                        <button
                          onClick={() => handleDelete(cat)}
                          disabled={deleteCategory.isPending}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-50"
                          title="Eliminar categoría"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  )}
                </SortableItem>
              )
            })}

            {/* Inline new category */}
            {addingNew && (
              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm ring-2 ring-[var(--brand-color)]/30">
                <div className="w-4 flex-shrink-0" />
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ background: 'var(--brand-color)' }}
                >
                  {localCategories.length + 1}
                </div>
                <input
                  ref={newInputRef}
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onBlur={saveNew}
                  onKeyDown={handleNewKeyDown}
                  placeholder="Nombre de la categoría..."
                  className="flex-1 rounded-lg border border-stone-300 bg-stone-50 px-3 py-1.5 font-serif text-base font-semibold text-stone-800 outline-none focus:border-[var(--brand-color)] focus:ring-2 focus:ring-[var(--brand-color)]/20"
                />
                {createCategory.isPending && (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
                )}
              </div>
            )}

            {localCategories.length === 0 && !addingNew && (
              <div className="rounded-2xl bg-white py-10 text-center shadow-sm ring-1 ring-stone-100">
                <p className="text-sm text-stone-400">
                  No hay categorías aún. Crea la primera para organizar tu menú.
                </p>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
