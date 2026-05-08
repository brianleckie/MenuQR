import { useAuth } from '../../contexts/AuthContext'
import { useMyBusiness, useAnalytics } from '../../lib/queries'

// ── Helpers ───────────────────────────────────────────────────────────────────

const DAY_LABELS: Record<number, string> = { 0: 'Dom', 1: 'Lun', 2: 'Mar', 3: 'Mié', 4: 'Jue', 5: 'Vie', 6: 'Sáb' }

function dayLabel(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return DAY_LABELS[d.getDay()] ?? dateStr.slice(5)
}

// ── StatCard ──────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #EEE9E2', boxShadow: '0 1px 3px rgba(28,20,16,0.06)', flex: 1, minWidth: 0 }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: '#8C7B6A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
      <p style={{ fontFamily: 'Lora, Georgia, serif', fontSize: 28, fontWeight: 700, color: '#1C1410', lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: '#B09A88', marginTop: 4 }}>{sub}</p>}
    </div>
  )
}

// ── VisitsChart ───────────────────────────────────────────────────────────────

function VisitsChart({ data }: { data: { date: string; visits: number }[] }) {
  const maxVisits = Math.max(...data.map(d => d.visits), 1)

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
      {data.map(({ date, visits }) => {
        const barHeight = Math.max((visits / maxVisits) * 120, visits > 0 ? 4 : 0)
        return (
          <div key={date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
            {visits > 0 && (
              <span style={{ fontSize: 11, fontWeight: 700, color: '#5A4A3A' }}>{visits}</span>
            )}
            <div style={{ width: '100%', position: 'relative', height: 120, display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ width: '100%', height: 120, background: 'var(--brand-color, #D4622A)', opacity: 0.12, borderRadius: 4, position: 'absolute', bottom: 0 }} />
              <div style={{ width: '100%', height: barHeight, background: 'var(--brand-color, #D4622A)', borderRadius: 4, position: 'relative', zIndex: 1 }} />
            </div>
            <span style={{ fontSize: 11, color: '#9E9E9E', marginTop: 4 }}>{dayLabel(date)}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── TopItems ──────────────────────────────────────────────────────────────────

function TopItems({ items }: { items: { item_id: string; name: string; image_url: string | null; views: number; whatsapp_clicks: number }[] }) {
  const maxViews = items[0]?.views ?? 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {items.map(item => (
        <div key={item.item_id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: '#EDE9E3' }}>
            {item.image_url ? (
              <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🍽️</div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#1C1410', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
            <div style={{ height: 4, borderRadius: 2, background: '#EDE9E3', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(item.views / maxViews) * 100}%`, background: 'var(--brand-color, #D4622A)', borderRadius: 2 }} />
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1C1410' }}>{item.views}</p>
            {item.whatsapp_clicks > 0 && (
              <p style={{ fontSize: 11, color: '#25D366', display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.571a.5.5 0 0 0 .609.61l5.801-1.525A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.724.977.993-3.63-.233-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
                {item.whatsapp_clicks}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── AnalyticsPage ─────────────────────────────────────────────────────────────

export function AnalyticsPage() {
  const { user } = useAuth()
  const { data: business } = useMyBusiness(user?.id)
  const { data, isLoading } = useAnalytics(business?.id)

  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: 200, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', border: '3px solid #e5e5e5', borderTopColor: 'var(--brand-color, #D4622A)', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  const isEmpty = !data || (data.totalVisits === 0 && data.whatsappTotal === 0)

  return (
    <div style={{ padding: '24px 24px 48px', maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: 26, fontWeight: 700, color: '#1C1410', marginBottom: 4 }}>Analytics</h1>
        <p style={{ fontSize: 13, color: '#9E9E9E' }}>Últimos 30 días · se actualiza cada 5 minutos</p>
      </div>

      {isEmpty ? (
        <div style={{ background: '#fff', borderRadius: 16, padding: '48px 32px', textAlign: 'center', border: '1px solid #EEE9E2', boxShadow: '0 1px 3px rgba(28,20,16,0.06)' }}>
          <p style={{ fontSize: 40, marginBottom: 16 }}>📊</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#1C1410', marginBottom: 8 }}>Todavía no hay visitas registradas.</p>
          <p style={{ fontSize: 14, color: '#9E9E9E' }}>Compartí tu menú para empezar a ver datos aquí.</p>
        </div>
      ) : (
        <>
          {/* Row 1 — Stat cards */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <StatCard label="Visitas hoy" value={data.visitsToday} />
            <StatCard label="Esta semana" value={data.visitsThisWeek} sub="últimos 7 días" />
            <StatCard label="Este mes" value={data.visitsThisMonth} sub="últimos 30 días" />
            <StatCard
              label="WhatsApp esta semana"
              value={data.whatsappThisWeek}
              sub={`${data.conversionRate}% de conversión`}
            />
          </div>

          {/* Row 2 — Visits chart */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #EEE9E2', boxShadow: '0 1px 3px rgba(28,20,16,0.06)', marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#8C7B6A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>Visitas últimos 7 días</p>
            <VisitsChart data={data.visitsByDay} />
          </div>

          {/* Row 3 — Two columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

            {/* Top items */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #EEE9E2', boxShadow: '0 1px 3px rgba(28,20,16,0.06)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#8C7B6A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>Top 5 platos más vistos</p>
              {data.topItems.length > 0 ? (
                <TopItems items={data.topItems} />
              ) : (
                <p style={{ fontSize: 13, color: '#9E9E9E' }}>Sin datos de vistas de platos aún.</p>
              )}
            </div>

            {/* Conversion */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #EEE9E2', boxShadow: '0 1px 3px rgba(28,20,16,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#8C7B6A',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}>
                  Tasa de contacto
                </p>
                <p style={{
                  fontFamily: 'Lora, serif',
                  fontSize: 36,
                  fontWeight: 700,
                  color: '#1C1410',
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  {data.conversionRate > 0 ? `${data.conversionRate}%` : '—'}
                </p>
                <p style={{ fontSize: 12, color: '#B09A88' }}>
                  de visitantes te escribieron por WhatsApp
                </p>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  )
}
