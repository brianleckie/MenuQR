import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useMenuData } from '../../lib/queries'

export function MenuPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, error } = useMenuData(slug ?? '')

  // Aplicar el color de marca del negocio como CSS var
  useEffect(() => {
    if (data?.business.primary_color) {
      document.documentElement.style.setProperty(
        '--brand-color',
        data.business.primary_color
      )
    }
    return () => {
      document.documentElement.style.removeProperty('--brand-color')
    }
  }, [data?.business.primary_color])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-[var(--brand-color,#D4622A)]" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 text-center">
        <p className="text-4xl">🍽️</p>
        <h1 className="mt-3 text-lg font-bold text-stone-700">
          Menú no encontrado
        </h1>
        <p className="mt-1 text-sm text-stone-400">
          Verificá que el enlace sea correcto.
        </p>
      </div>
    )
  }

  const { business, categories } = data

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Cover */}
      <div className="relative h-44 bg-stone-800">
        {business.cover_url && (
          <img
            src={business.cover_url}
            alt={business.name}
            className="h-full w-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

        {/* Logo + name */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end gap-3 p-4">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-white/30 font-bold text-white"
            style={{ background: 'var(--brand-color, #D4622A)' }}
          >
            {business.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight text-white">
              {business.name}
            </h1>
            {business.tagline && (
              <p className="text-xs italic text-white/75">{business.tagline}</p>
            )}
          </div>
        </div>
      </div>

      {/* Categories + items */}
      <div className="px-4 pb-16 pt-6">
        {categories.map((cat) => (
          <div key={cat.id} className="mb-8">
            <h2 className="mb-3 text-base font-bold text-stone-700">
              {cat.name}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {cat.items.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100"
                  style={{ opacity: item.available ? 1 : 0.65 }}
                >
                  <div className="relative aspect-[3/2] bg-stone-100">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        style={{ filter: item.available ? '' : 'grayscale(60%)' }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-stone-300 text-2xl">
                        🍽️
                      </div>
                    )}
                    {!item.available && (
                      <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white line-through">
                        AGOTADO
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold leading-snug text-stone-800">
                      {item.name}
                    </p>
                    {item.short_desc && (
                      <p className="mt-0.5 line-clamp-2 text-xs text-stone-500">
                        {item.short_desc}
                      </p>
                    )}
                    <p
                      className="mt-1.5 text-sm font-bold"
                      style={{ color: item.available ? 'var(--brand-color, #D4622A)' : '#9ca3af' }}
                    >
                      Gs. {item.price.toLocaleString('es-PY')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp FAB */}
      {business.whatsapp && (
        <a
          href={`https://wa.me/${business.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
          aria-label="Contactar por WhatsApp"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.571a.5.5 0 0 0 .609.61l5.801-1.525A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.724.977.993-3.63-.233-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
          </svg>
        </a>
      )}
    </div>
  )
}
