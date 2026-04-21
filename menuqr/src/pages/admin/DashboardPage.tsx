import { useAuth } from '../../contexts/AuthContext'
import { useMyBusiness } from '../../lib/queries'

export function DashboardPage() {
  const { user } = useAuth()
  const { data: business, isLoading } = useMyBusiness(user?.id)

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-[var(--brand-color)]" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="mb-1 font-serif text-2xl font-bold text-stone-800">
        Bienvenido 👋
      </h1>
      <p className="mb-8 text-sm text-stone-500">
        {business
          ? `Tu menú digital está activo en /menu/${business.slug}`
          : 'Completá los ajustes de tu negocio para empezar.'}
      </p>

      {/* Placeholder stats — se rellenan en Sprint 2 */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Platos', value: '—' },
          { label: 'Categorías', value: '—' },
          { label: 'Estado', value: '✓ Online' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100"
          >
            <p className="mb-1 text-xs font-medium text-stone-400">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
