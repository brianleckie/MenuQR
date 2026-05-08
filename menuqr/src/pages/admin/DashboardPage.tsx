import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useMyBusiness, useItems, useCategories } from '../../lib/queries'
import { menuUrl } from '../../lib/config'

function StatCard({
  label,
  value,
  sub,
}: {
  label: string
  value: string | number
  sub?: string
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100">
      <p className="mb-1 text-xs font-medium text-stone-400">{label}</p>
      <p className="font-serif text-2xl font-bold text-stone-800">{value}</p>
      {sub && <p className="mt-0.5 text-[11px] text-stone-400">{sub}</p>}
    </div>
  )
}

function FakeQR({ size = 130 }: { size?: number }) {
  const cells = 21
  const cell = size / cells
  const rects: React.ReactNode[] = []

  const isFixed = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7)
  const isHollow = (r: number, c: number) =>
    (r >= 1 && r <= 5 && c >= 1 && c <= 5) ||
    (r >= 1 && r <= 5 && c >= 15 && c <= 19) ||
    (r >= 15 && r <= 19 && c >= 1 && c <= 5)
  const isInner = (r: number, c: number) =>
    (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
    (r >= 2 && r <= 4 && c >= 16 && c <= 18) ||
    (r >= 16 && r <= 18 && c >= 2 && c <= 4)
  const isDark = (r: number, c: number) =>
    ((r * 31 + c) * 17 + r * c * 7) % 3 !== 0

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      let fill: string | null = null
      if (isFixed(r, c) && !isHollow(r, c)) fill = '#1C1410'
      else if (isInner(r, c)) fill = '#1C1410'
      else if (!isFixed(r, c) && !isHollow(r, c) && isDark(r, c)) fill = '#1C1410'
      if (fill) {
        rects.push(
          <rect
            key={`${r}-${c}`}
            x={c * cell}
            y={r * cell}
            width={cell - 0.5}
            height={cell - 0.5}
            fill={fill}
            rx="0.5"
          />
        )
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} display="block">
      <rect width={size} height={size} fill="#fff" />
      {rects}
    </svg>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: business, isLoading: bizLoading } = useMyBusiness(user?.id)
  const { data: items } = useItems(business?.id)
  const { data: categories } = useCategories(business?.id)

  useEffect(() => {
    if (business?.primary_color) {
      document.documentElement.style.setProperty('--brand-color', business.primary_color)
    }
  }, [business?.primary_color])

  if (bizLoading) {
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
          <p className="mb-1 font-serif text-lg font-bold text-amber-900">
            ¡Bienvenido a MenuQR!
          </p>
          <p className="mb-4 text-sm text-amber-700">
            Completá los datos de tu negocio en Ajustes para empezar.
          </p>
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

  const total = items?.length ?? 0
  const available = items?.filter(i => i.available).length ?? 0
  const cats = categories?.length ?? 0
  const soldOut = items?.filter(i => !i.available) ?? []
  const qrUrl = menuUrl(business.slug)

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="mb-1 font-serif text-2xl font-bold text-stone-800">
          Bienvenido, {business.name} 👋
        </h1>
        <p className="text-sm text-stone-500">
          Tu menú digital está activo y visible para tus clientes.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        <StatCard label="Platos" value={total} sub={`${available} disponibles`} />
        <StatCard label="Categorías" value={cats} sub="activas" />
        <StatCard label="Estado" value="✓ Online" sub="QR activo" />
      </div>

      {/* Analytics shortcut */}
      <div className="mb-6 flex items-center justify-end">
        <button
          onClick={() => navigate('/admin/analytics')}
          className="text-xs font-medium transition hover:underline"
          style={{ color: 'var(--brand-color)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          Ver analytics →
        </button>
      </div>

      {/* QR Panel */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
        <h3 className="mb-4 text-sm font-bold text-stone-800">Tu código QR</h3>
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-6">
          <div className="rounded-xl border-2 border-stone-100 p-3">
            <FakeQR size={130} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-sm leading-relaxed text-stone-600">
              Compartí este QR en tus mesas, mostrador o redes. Tus clientes lo escanean
              y ven tu menú al instante, sin descargar nada.
            </p>
            <p className="mb-4 break-all rounded-lg bg-stone-50 px-3 py-2 font-mono text-xs text-stone-500">
              {qrUrl}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigate('/admin/qr')}
                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold text-white"
                style={{ background: 'var(--brand-color)' }}
              >
                ↓ Descargar QR
              </button>
              <button
                onClick={() => navigate(`/menu/${business.slug}`)}
                className="flex items-center gap-1.5 rounded-lg bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-200 transition"
              >
                👁 Ver menú público
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sold-out alert */}
      {soldOut.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
          <span className="text-lg">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-orange-800">
              {soldOut.length} plato{soldOut.length > 1 ? 's' : ''} marcado{soldOut.length > 1 ? 's' : ''} como agotado{soldOut.length > 1 ? 's' : ''}
            </p>
            <p className="mt-0.5 text-xs text-orange-600">
              {soldOut.map(d => d.name).join(', ')}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
