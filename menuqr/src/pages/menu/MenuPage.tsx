import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useMenuData, trackPageView, trackItemView, trackWhatsappClick } from '../../lib/queries'
import { MOCK_MENU_DATA, formatPrice } from '../../lib/mock-data'
import type { Item, MenuData } from '../../types'
import { useCart } from '../../contexts/CartContext'
import { MenuQRLogo } from '../../components/ui/MenuQRLogo'
import { imgPresets, dishCardWithGravity, dishModalWithGravity, preloadImage } from '../../lib/cloudinary'

// ── Icons ─────────────────────────────────────────────────────────────────────

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.571a.5.5 0 0 0 .609.61l5.801-1.525A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.724.977.993-3.63-.233-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  )
}

function CartIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

// ── ItemCounter ───────────────────────────────────────────────────────────────

interface ItemCounterProps {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  small?: boolean
}

function ItemCounter({ quantity, onIncrement, onDecrement, small = false }: ItemCounterProps) {
  const size = small ? 'h-7 w-7 text-xs' : 'h-9 w-9 text-sm'
  const textSize = small ? 'w-5 text-xs' : 'w-7 text-sm'
  return (
    <div
      className="flex items-center gap-1 rounded-full border"
      style={{ borderColor: 'var(--brand-color)', background: 'white' }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onDecrement() }}
        className={`flex flex-shrink-0 items-center justify-center rounded-full font-bold transition hover:opacity-75 ${size}`}
        style={{ color: 'var(--brand-color)' }}
        aria-label="Quitar"
      >
        <MinusIcon />
      </button>
      <span className={`text-center font-bold ${textSize}`} style={{ color: 'var(--brand-color)' }}>
        {quantity}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); onIncrement() }}
        className={`flex flex-shrink-0 items-center justify-center rounded-full font-bold transition hover:opacity-75 ${size}`}
        style={{ color: 'var(--brand-color)' }}
        aria-label="Agregar"
      >
        <PlusIcon />
      </button>
    </div>
  )
}

// ── DishCard ──────────────────────────────────────────────────────────────────

interface DishCardProps {
  dish: Item
  cartQuantity: number
  onAdd: () => void
  onIncrement: () => void
  onDecrement: () => void
  onClick: (dish: Item) => void
}

function DishCard({ dish, cartQuantity, onAdd, onIncrement, onDecrement, onClick }: DishCardProps) {
  const [imgErr, setImgErr] = useState(false)

  return (
    <div
      onClick={() => dish.available && onClick(dish)}
      onMouseEnter={() => {
        if (dish.available) {
          preloadImage(dishModalWithGravity(dish.image_url, dish.image_gravity))
        }
      }}
      onTouchStart={() => {
        if (dish.available) {
          preloadImage(dishModalWithGravity(dish.image_url, dish.image_gravity))
        }
      }}
      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 transition-transform"
      style={{
        opacity: dish.available ? 1 : 0.72,
        cursor: dish.available ? 'pointer' : 'default',
      }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden bg-stone-100" style={{ paddingBottom: '66.67%' }}>
        {!imgErr && dish.image_url ? (
          <img
            src={dishCardWithGravity(dish.image_url, dish.image_gravity) ?? dish.image_url}
            alt={dish.name}
            onError={() => setImgErr(true)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: dish.available ? 'none' : 'grayscale(60%)' }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
            <span className="text-2xl text-stone-300">🍽️</span>
          </div>
        )}
        {!dish.available && (
          <div className="absolute left-2 top-2">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-stone-200 line-through"
              style={{ background: 'rgba(30,20,10,0.65)', letterSpacing: '0.04em' }}
            >
              AGOTADO
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 pb-3.5">
        <p className="mb-0.5 font-serif text-sm font-semibold leading-snug text-stone-800">
          {dish.name}
        </p>
        {dish.short_desc && (
          <p
            className="mb-2 text-[11.5px] leading-snug text-stone-400"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {dish.short_desc}
          </p>
        )}

        <div className="flex items-center justify-between gap-1">
          <p
            className="text-sm font-bold"
            style={{
              color: dish.available ? 'var(--brand-color)' : '#9E9E9E',
              textDecoration: dish.available ? 'none' : 'line-through',
            }}
          >
            {formatPrice(dish.price)}
          </p>

          {dish.available && (
            cartQuantity === 0 ? (
              <button
                onClick={(e) => { e.stopPropagation(); onAdd() }}
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-white transition hover:opacity-80"
                style={{ background: 'var(--brand-color)' }}
                aria-label={`Agregar ${dish.name}`}
              >
                <PlusIcon />
              </button>
            ) : (
              <ItemCounter
                quantity={cartQuantity}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                small
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}

// ── DishModal ─────────────────────────────────────────────────────────────────

interface DishModalProps {
  dish: Item
  whatsapp: string | null
  cartQuantity: number
  onAdd: () => void
  onIncrement: () => void
  onDecrement: () => void
  onClose: () => void
  onWhatsappClick?: () => void
}

function DishModal({ dish, whatsapp, cartQuantity, onAdd, onIncrement, onDecrement, onClose, onWhatsappClick }: DishModalProps) {
  const [imgErr, setImgErr] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const waUrl = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hola! Quiero pedir: ${dish.name}`)}`
    : null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: 'rgba(28,20,16,0.55)', backdropFilter: 'blur(4px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up w-full overflow-auto rounded-t-3xl bg-stone-50"
        style={{ maxHeight: '88vh' }}
      >
        {/* Handle */}
        <div className="flex justify-center pb-1 pt-3">
          <div className="h-1 w-9 rounded-full bg-stone-300" />
        </div>

        {/* Photo */}
        <div className="relative mx-4 overflow-hidden rounded-2xl bg-stone-100" style={{ paddingBottom: '56%' }}>
          {!imgErr && dish.image_url ? (
            <>
              {!imgLoaded && (
                <div className="absolute inset-0 animate-pulse bg-stone-200" />
              )}
              <img
                src={dishModalWithGravity(dish.image_url, dish.image_gravity) ?? dish.image_url}
                alt={dish.name}
                onError={() => setImgErr(true)}
                onLoad={() => setImgLoaded(true)}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  backgroundImage: `url(${dishCardWithGravity(dish.image_url, dish.image_gravity) ?? ''})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl text-stone-300">
              🍽️
            </div>
          )}
          {!dish.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-lg font-bold tracking-widest text-white">AGOTADO</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full text-white"
            style={{ background: 'rgba(28,20,16,0.5)', backdropFilter: 'blur(8px)' }}
          >
            <XIcon size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pb-8 pt-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h2 className="flex-1 font-serif text-xl font-bold leading-snug text-stone-800">
              {dish.name}
            </h2>
            <span
              className="whitespace-nowrap text-lg font-extrabold"
              style={{
                color: dish.available ? 'var(--brand-color)' : '#9E9E9E',
                textDecoration: dish.available ? 'none' : 'line-through',
              }}
            >
              {formatPrice(dish.price)}
            </span>
          </div>

          {dish.description && (
            <p className="text-[14.5px] leading-relaxed text-stone-600">
              {dish.description}
            </p>
          )}

          {dish.available && (
            <div className="mt-6 space-y-3">
              {cartQuantity === 0 ? (
                <button
                  onClick={onAdd}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white"
                  style={{ background: 'var(--brand-color)' }}
                >
                  <PlusIcon /> Agregar al carrito
                </button>
              ) : (
                <div className="flex items-center justify-between rounded-2xl border px-5 py-3" style={{ borderColor: 'var(--brand-color)' }}>
                  <span className="text-sm font-semibold" style={{ color: 'var(--brand-color)' }}>
                    En tu carrito
                  </span>
                  <ItemCounter
                    quantity={cartQuantity}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                  />
                </div>
              )}

              {waUrl && (
                <div className="flex justify-center">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onWhatsappClick}
                    className="flex items-center gap-1.5 text-xs text-stone-400 no-underline transition hover:text-stone-600"
                  >
                    <WhatsAppIcon size={12} />
                    ¿Preferís pedir directo? WhatsApp →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── CartSheet ─────────────────────────────────────────────────────────────────

interface CartSheetProps {
  whatsapp: string | null
  businessName: string
  onClose: () => void
}

function CartSheet({ whatsapp, businessName, onClose }: CartSheetProps) {
  const { items, increment, decrement, total, count } = useCart()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  function buildWhatsAppUrl() {
    const lines = [
      `Hola! Quiero hacer el siguiente pedido en ${businessName}:`,
      ...items.map(
        item =>
          `• ${item.quantity}x ${item.name} — Gs. ${(item.price * item.quantity).toLocaleString('es-PY')}`
      ),
      '',
      `*Total: Gs. ${total.toLocaleString('es-PY')}*`,
    ]
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: 'rgba(28,20,16,0.55)', backdropFilter: 'blur(4px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up w-full rounded-t-3xl bg-white"
        style={{ maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
          <h2 className="font-serif text-lg font-bold text-stone-800">Tu pedido</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition hover:bg-stone-200"
          >
            <XIcon size={15} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {count === 0 ? (
            <p className="py-8 text-center text-sm text-stone-400">Tu carrito está vacío</p>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-stone-800">{item.name}</p>
                    <p className="text-xs font-bold" style={{ color: 'var(--brand-color)' }}>
                      Gs. {(item.price * item.quantity).toLocaleString('es-PY')}
                    </p>
                  </div>
                  <ItemCounter
                    quantity={item.quantity}
                    onIncrement={() => increment(item.id)}
                    onDecrement={() => decrement(item.id)}
                    small
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-100 px-5 pb-6 pt-4" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))' }}>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-stone-600">Total</span>
            <span className="text-lg font-extrabold text-stone-800">
              Gs. {total.toLocaleString('es-PY')}
            </span>
          </div>

          {whatsapp && count > 0 && (
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white no-underline"
              style={{ background: '#25D366' }}
            >
              <WhatsAppIcon size={16} /> Pedir por WhatsApp
            </a>
          )}
          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-stone-200 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
          >
            Seguir viendo el menú
          </button>
        </div>
      </div>
    </div>
  )
}

// ── MenuQRPromoSheet ──────────────────────────────────────────────────────────

interface MenuQRPromoSheetProps {
  restaurantName: string
  onClose: () => void
}

function MenuQRPromoSheet({ restaurantName, onClose }: MenuQRPromoSheetProps) {
  const contactWhatsapp =
    import.meta.env.VITE_CONTACT_WHATSAPP ?? '595991234567'

  const message = `Hola! Vi el menú de ${restaurantName} y me interesa tener un menú digital para mi negocio. ¿Pueden darme más info?`
  const contactUrl = `https://wa.me/${contactWhatsapp}?text=${encodeURIComponent(message)}`

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const perks = [
    'Menú siempre actualizado',
    'Carrito y pedidos por WhatsApp',
    'Tu logo y colores propios',
    'QR descargable para mesas',
    'Sin app, sin comisiones',
  ]

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: 'rgba(28,20,16,0.45)', backdropFilter: 'blur(4px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up w-full rounded-t-3xl bg-white px-6 pb-8 pt-5"
        style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}
      >
        {/* Handle */}
        <div className="mb-4 flex justify-center">
          <div className="h-1 w-9 rounded-full bg-stone-200" />
        </div>

        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <MenuQRLogo size={28} showText className="mb-1 text-stone-800" />
            <h2 className="font-serif text-xl font-bold text-stone-800">
              Menú digital con QR<br />para tu restaurante
            </h2>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition hover:bg-stone-200"
          >
            <XIcon size={15} />
          </button>
        </div>

        {/* Perks */}
        <ul className="mb-6 space-y-2.5">
          {perks.map(perk => (
            <li key={perk} className="flex items-center gap-2.5 text-sm text-stone-700">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckIcon />
              </span>
              {perk}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white no-underline"
          style={{ background: '#25D366' }}
        >
          <WhatsAppIcon size={16} /> Quiero mi menú digital
        </a>
      </div>
    </div>
  )
}

// ── Public MenuPage ───────────────────────────────────────────────────────────

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function MenuPage() {
  const { slug } = useParams<{ slug: string }>()

  const isDemo = !import.meta.env.VITE_SUPABASE_URL
  const queryResult = useMenuData(isDemo ? '' : (slug ?? ''))

  const data: MenuData | undefined = isDemo ? MOCK_MENU_DATA : queryResult.data
  const isLoading = isDemo ? false : queryResult.isLoading
  const error = isDemo ? null : queryResult.error

  const [activeCategory, setActiveCategory] = useState<string>('')
  const [selectedDish, setSelectedDish] = useState<Item | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [promoOpen, setPromoOpen] = useState(false)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const pillsRef = useRef<HTMLDivElement>(null)

  const { add, increment, decrement, items: cartItems, count, total } = useCart()

  useEffect(() => {
    if (data?.business.primary_color) {
      document.documentElement.style.setProperty('--brand-color', data.business.primary_color)
    }
    return () => {
      document.documentElement.style.removeProperty('--brand-color')
    }
  }, [data?.business.primary_color])

  // SEO meta tags
  useEffect(() => {
    if (!data) return
    const { business } = data
    document.title = `${business.name} | MenuQR`
    setMetaProperty('og:title', business.name)
    setMetaProperty('og:description', business.tagline ?? 'Mirá nuestro menú digital')
    setMetaProperty('og:type', 'website')
    if (business.cover_url) setMetaProperty('og:image', business.cover_url)
    return () => { document.title = 'MenuQR' }
  }, [data])

  useEffect(() => {
    if (data?.categories.length && !activeCategory) {
      setActiveCategory(data.categories[0].id)
    }
  }, [data, activeCategory])

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    if (!data) return
    const observers: IntersectionObserver[] = []
    data.categories.forEach((cat) => {
      const el = sectionRefs.current[cat.id]
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveCategory(cat.id) },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [data])

  // Auto-scroll active pill into view
  useEffect(() => {
    if (!activeCategory) return
    const pill = pillsRef.current?.querySelector(`[data-cat="${activeCategory}"]`)
    pill?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeCategory])

  useEffect(() => {
    if (!data) return
    const activeCategoryData = data.categories.find(c => c.id === activeCategory)
    if (!activeCategoryData) return

    const timeout = setTimeout(() => {
      activeCategoryData.items
        .filter(item => item.available && item.image_url)
        .forEach(item => {
          preloadImage(dishModalWithGravity(item.image_url, item.image_gravity))
        })
    }, 500)

    return () => clearTimeout(timeout)
  }, [activeCategory, data])

  // Track page view on mount (fire-and-forget)
  useEffect(() => {
    if (data?.business?.id) {
      trackPageView(data.business.id, slug ?? '')
    }
  }, [data?.business?.id, slug])

  const scrollToCategory = (id: string) => {
    setActiveCategory(id)
    const el = sectionRefs.current[id]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDishClick = (dish: Item) => {
    setSelectedDish(dish)
    if (data?.business?.id) {
      trackItemView(data.business.id, dish.id)
    }
  }

  function getCartQuantity(dishId: string) {
    return cartItems.find(i => i.id === dishId)?.quantity ?? 0
  }

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
        <p className="text-5xl">🍽️</p>
        <h1 className="mt-4 font-serif text-xl font-bold text-stone-700">Menú no encontrado</h1>
        <p className="mt-2 text-sm text-stone-400">Este restaurante no existe o fue removido.</p>
        <a
          href="/"
          className="mt-6 rounded-xl px-5 py-2.5 text-sm font-bold text-white"
          style={{ background: '#D4622A' }}
        >
          Volver al inicio
        </a>
      </div>
    )
  }

  const { business, categories } = data

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Cover */}
      <div className="relative" style={{ height: 180, background: '#2A1810', overflow: 'hidden' }}>
        {business.cover_url ? (
          <img
            src={imgPresets.cover(business.cover_url) ?? business.cover_url}
            alt={business.name}
            className="h-full w-full object-cover"
            style={{ opacity: 0.65 }}
          />
        ) : (
          <div className="h-full w-full bg-stone-800" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(28,16,8,0.7))' }}
        />

        {/* Logo + name overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end gap-3 p-4">
          <div
            className="flex h-14 w-14 flex-shrink-0 overflow-hidden items-center justify-center rounded-2xl border-2 font-serif text-lg font-bold text-white"
            style={{ background: 'var(--brand-color)', borderColor: 'rgba(255,255,255,0.3)' }}
          >
            {business.logo_url ? (
              <img src={imgPresets.logo(business.logo_url) ?? business.logo_url} alt={business.name} className="h-full w-full object-cover" />
            ) : (
              <span>{business.name.slice(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold leading-tight text-white">{business.name}</h1>
            {business.tagline && (
              <p className="text-xs italic text-white/75">{business.tagline}</p>
            )}
          </div>
        </div>
      </div>

      {/* Info bar */}
      {(business.hours || business.whatsapp) && (
        <div className="flex items-center justify-between px-4 pt-2.5">
          {business.hours && (
            <div className="flex items-center gap-1.5 text-[11.5px] text-stone-500">
              <ClockIcon />
              {business.hours}
            </div>
          )}
          {business.whatsapp && (
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick(business.id, null)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white no-underline"
              style={{ background: '#25D366' }}
            >
              <WhatsAppIcon size={12} /> WhatsApp
            </a>
          )}
        </div>
      )}

      {/* Sticky category pills */}
      <div className="sticky top-0 z-10 border-b border-stone-100 bg-stone-50 pb-3 pt-3">
        <div ref={pillsRef} className="flex gap-2 overflow-x-auto px-4" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-cat={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className="flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition"
              style={{
                background: activeCategory === cat.id ? 'var(--brand-color)' : '#EDE9E3',
                color: activeCategory === cat.id ? '#fff' : '#5A4A3A',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category sections */}
      <div className="px-4 pb-32 pt-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            ref={(el) => { sectionRefs.current[cat.id] = el }}
            className="mt-6"
          >
            <h2 className="mb-3 flex items-center gap-3 font-serif text-lg font-bold text-stone-800">
              {cat.name}
              <span className="h-px flex-1 bg-stone-200" />
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {cat.items.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  cartQuantity={getCartQuantity(dish.id)}
                  onAdd={() => add({ id: dish.id, name: dish.name, price: dish.price, image_url: dish.image_url })}
                  onIncrement={() => increment(dish.id)}
                  onDecrement={() => decrement(dish.id)}
                  onClick={handleDishClick}
                />
              ))}
            </div>
          </div>
        ))}

        {/* MenuQR promo — inline at end of menu */}
        <button
          onClick={() => setPromoOpen(true)}
          className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white py-3.5 text-sm text-stone-500 shadow-sm transition hover:bg-stone-50"
        >
          <MenuQRLogo size={18} showText={false} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>
            Creado con <span style={{ color: 'var(--brand-color)' }}>MenuQR</span> · ¿Querés tu menú digital?
          </span>
        </button>
      </div>

      {/* FAB: cart when items > 0, WhatsApp otherwise */}
      {count > 0 ? (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 left-4 right-4 z-30 flex items-center justify-between rounded-2xl px-5 py-3.5 text-white shadow-xl transition hover:opacity-95"
          style={{ background: 'var(--brand-color)' }}
        >
          <div className="flex items-center gap-2 font-bold">
            <CartIcon size={20} />
            <span>Ver pedido · {count} item{count !== 1 ? 's' : ''}</span>
          </div>
          <span className="font-bold">Gs. {total.toLocaleString('es-PY')}</span>
        </button>
      ) : (
        business.whatsapp && (
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsappClick(business.id, null)}
            className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105"
            style={{ background: '#25D366' }}
            aria-label="Contactar por WhatsApp"
          >
            <WhatsAppIcon size={26} />
          </a>
        )
      )}

      {/* Dish modal */}
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          whatsapp={business.whatsapp}
          cartQuantity={getCartQuantity(selectedDish.id)}
          onAdd={() => add({ id: selectedDish.id, name: selectedDish.name, price: selectedDish.price, image_url: selectedDish.image_url })}
          onIncrement={() => increment(selectedDish.id)}
          onDecrement={() => decrement(selectedDish.id)}
          onClose={() => setSelectedDish(null)}
          onWhatsappClick={() => trackWhatsappClick(business.id, selectedDish.id)}
        />
      )}

      {/* Cart sheet */}
      {cartOpen && (
        <CartSheet
          whatsapp={business.whatsapp}
          businessName={business.name}
          onClose={() => setCartOpen(false)}
        />
      )}

      {/* MenuQR promo sheet */}
      {promoOpen && (
        <MenuQRPromoSheet
          restaurantName={business.name}
          onClose={() => setPromoOpen(false)}
        />
      )}
    </div>
  )
}
