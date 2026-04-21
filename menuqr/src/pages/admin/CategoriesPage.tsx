import { MOCK_CATEGORIES, MOCK_ITEMS } from '../../lib/mock-data'

export function CategoriesPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-stone-800">Categorías</h1>
        <p className="mt-1 text-sm text-stone-500">
          {MOCK_CATEGORIES.length} secciones en tu menú
        </p>
      </div>

      <div className="grid gap-3">
        {MOCK_CATEGORIES.map((cat, i) => {
          const count = MOCK_ITEMS.filter((item) => item.category_id === cat.id).length
          const available = MOCK_ITEMS.filter(
            (item) => item.category_id === cat.id && item.available
          ).length

          return (
            <div
              key={cat.id}
              className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-stone-100"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white text-sm font-bold"
                  style={{ background: 'var(--brand-color)' }}
                >
                  {i + 1}
                </div>
                <div>
                  <p className="font-serif text-base font-semibold text-stone-800">
                    {cat.name}
                  </p>
                  <p className="text-xs text-stone-400">
                    {available} de {count} disponibles
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
                  {count} platos
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
