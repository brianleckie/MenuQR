import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SITE } from '../lib/site'

// ── Logo ──────────────────────────────────────────────────────────────────────
function LogoMark({ inverted = false, height = 30 }: { inverted?: boolean; height?: number }) {
  const tile    = inverted ? '#FBF4E2' : '#161310'
  const accent  = inverted ? '#E8B23A' : '#E54A24'
  const word    = inverted ? '#FBF4E2' : '#161310'
  const wAccent = inverted ? '#E8B23A' : '#E54A24'
  const bg      = inverted ? '#161310' : '#FBF4E2'
  return (
    <svg height={height} viewBox="0 0 168 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: 'auto' }}>
      <g>
        <rect x="0" y="2" width="11" height="11" rx="1.5" fill={tile}/>
        <rect x="2.5" y="4.5" width="6" height="6" fill={bg}/>
        <rect x="4.25" y="6.25" width="2.5" height="2.5" fill={tile}/>
        <rect x="17" y="2" width="11" height="11" rx="1.5" fill={tile}/>
        <rect x="19.5" y="4.5" width="6" height="6" fill={bg}/>
        <rect x="21.25" y="6.25" width="2.5" height="2.5" fill={tile}/>
        <rect x="0" y="19" width="11" height="11" rx="1.5" fill={accent}/>
        <rect x="2.5" y="21.5" width="6" height="6" fill={bg}/>
        <rect x="4.25" y="23.25" width="2.5" height="2.5" fill={accent}/>
        <rect x="14" y="15" width="3" height="3" fill={tile}/>
        <rect x="19" y="17" width="3" height="3" fill={tile}/>
        <rect x="14" y="20" width="3" height="3" fill={accent}/>
        <rect x="19" y="22" width="3" height="3" fill={tile}/>
        <rect x="24" y="17" width="4" height="4" fill={tile}/>
        <rect x="24" y="24" width="4" height="4" fill={tile}/>
        <rect x="19" y="27" width="3" height="3" fill={accent}/>
      </g>
      <text x="38" y="23" fontFamily='"Bricolage Grotesque",sans-serif' fontWeight={800} fontSize={22} letterSpacing="-0.04em" fill={word}>
        menu<tspan fill={wAccent}>qr</tspan>
      </text>
    </svg>
  )
}

// ── Start Modal ───────────────────────────────────────────────────────────────
interface StartModalProps { onClose: () => void; onLogin: () => void }
function StartModal({ onClose, onLogin }: StartModalProps) {
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hola! Quiero crear mi menú digital con MenuQR')}`
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(22,19,16,0.65)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 0 0' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 520, background: '#FFFCF4', border: '1.5px solid #161310', borderBottom: 'none', padding: '28px 24px 36px', position: 'relative', boxShadow: '0 -8px 32px rgba(22,19,16,0.15)' }}>
        <button onClick={onClose} aria-label="Cerrar" style={{ position: 'absolute', top: 14, right: 14, width: 32, height: 32, background: 'var(--butter)', border: '1px solid #D8C9A1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5A4E40' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h2 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 26, fontWeight: 700, color: '#161310', margin: '0 0 6px', letterSpacing: '-0.03em' }}>¡Empezá hoy!</h2>
        <p style={{ fontSize: 15, color: '#5A4E40', lineHeight: 1.5, margin: '0 0 20px' }}>Contactanos por WhatsApp y te configuramos el menú en el día.</p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', background: '#25D366', color: '#fff', border: '1.5px solid #161310', padding: '14px 20px', fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 16, fontFamily: '"Bricolage Grotesque",sans-serif', boxShadow: '3px 3px 0 #161310' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.571a.5.5 0 0 0 .609.61l5.801-1.525A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.724.977.993-3.63-.233-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          Quiero empezar por WhatsApp
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ flex: 1, height: 1, background: '#D8C9A1' }} />
          <span style={{ fontSize: 11, color: '#5A4E40', whiteSpace: 'nowrap', fontFamily: '"JetBrains Mono",monospace', letterSpacing: '0.1em' }}>o si ya tenés cuenta</span>
          <span style={{ flex: 1, height: 1, background: '#D8C9A1' }} />
        </div>
        <button onClick={() => { onClose(); onLogin() }} style={{ display: 'block', width: '100%', textAlign: 'center', fontSize: 14, fontWeight: 600, background: 'none', border: 'none', color: '#5A4E40', cursor: 'pointer', padding: 0 }}>
          Ingresar al panel →
        </button>
      </div>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const ink     = '#161310'
const inkSoft = '#5A4E40'
const paper   = '#FFFCF4'
const line    = '#D8C9A1'

const eyebrow = (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--paprika)' }}>
    <span style={{ width: 24, height: 1.5, background: 'var(--paprika)', display: 'inline-block' }} />
  </span>
)
void eyebrow // suppress unused warning — used inline below

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: light ? 'var(--dijon)' : 'var(--paprika)', marginBottom: 18 }}>
      <span style={{ width: 24, height: 1.5, background: light ? 'var(--dijon)' : 'var(--paprika)', display: 'inline-block' }} />
      {children}
    </div>
  )
}

function CheckMark() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
}

// ── LandingPage ───────────────────────────────────────────────────────────────
export function LandingPage() {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const openModal = () => setShowModal(true)
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="mercado" style={{ fontFamily: '"Hanken Grotesk","Helvetica Neue",sans-serif', background: 'var(--butter)', color: ink, WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' }}>

      {/* ── TICKER ── */}
      <div style={{ background: 'var(--forest)', color: 'var(--butter)', padding: '8px 0', fontSize: 12, fontWeight: 500, overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '1px solid var(--forest-soft)' }}>
        <div className="lp-ticker-track">
          {Array.from({ length: 2 }).flatMap(() =>
            ['Hecho en Asunción 🇵🇾', '14 días gratis', 'Sin tarjeta de crédito', 'Pagás en guaraníes', 'Soporte en español']
          ).map((t, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, letterSpacing: '0.02em' }}>
              <span style={{ width: 5, height: 5, background: 'var(--dijon)', borderRadius: '50%', display: 'inline-block' }} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="lp-nav" style={{ background: 'var(--butter)', borderBottom: `1.5px solid ${ink}` }}>
        <a href="#" aria-label="MenuQR"><LogoMark height={28} /></a>
        <div className="lp-nav-links">
          {[['#como','Cómo funciona'],['#funciones','Funciones'],['#precio','Precio']].map(([h,l]) => (
            <a key={h} href={h} style={{ fontSize: 14, color: ink, fontWeight: 600, textDecoration: 'none' }}>{l}</a>
          ))}
          <a href={SITE.demoUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: ink, fontWeight: 600, textDecoration: 'none' }}>Ver demo</a>
        </div>
        <button
          onClick={() => scrollTo('precio')}
          style={{ padding: '9px 18px', border: `1.5px solid ${ink}`, background: ink, color: 'var(--butter)', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '3px 3px 0 var(--paprika)', whiteSpace: 'nowrap' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '5px 5px 0 var(--paprika)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '3px 3px 0 var(--paprika)' }}
        >Empezar →</button>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          {/* Left — copy */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', borderRadius: 99, background: 'var(--forest)', color: 'var(--butter)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>
              <span className="lp-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--dijon)' }} />
              Para restaurantes paraguayos
            </div>

            <h1 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 'clamp(44px,10vw,108px)', lineHeight: 0.92, letterSpacing: '-0.045em', color: ink, margin: '0 0 20px', fontWeight: 700 }}>
              Tu menú, en<br />
              <span style={{ color: 'var(--paprika)' }}>un escaneo.</span><br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                Cero papeles.
                <span style={{ position: 'absolute', left: '-2%', right: '-2%', bottom: '6%', height: '14%', background: 'var(--dijon)', zIndex: -1, borderRadius: 4, transform: 'rotate(-1deg)', display: 'block' }} />
              </span>
            </h1>

            <p style={{ fontSize: 'clamp(16px,4vw,19px)', lineHeight: 1.55, color: inkSoft, margin: '0 0 28px', fontWeight: 500, maxWidth: 500 }}>
              Tus clientes apuntan la cámara y ven tus platos con fotos, precios actualizados y un botón para pedir por WhatsApp. Vos cambiás el menú desde el celular.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
              <button
                onClick={() => scrollTo('precio')}
                style={{ padding: '16px 24px', border: `1.5px solid ${ink}`, background: 'var(--paprika)', color: paper, fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: `4px 4px 0 ${ink}`, textTransform: 'uppercase', letterSpacing: '0.04em' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `6px 6px 0 ${ink}` }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `4px 4px 0 ${ink}` }}
              >
                Empezar gratis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
              <a href={SITE.demoUrl} target="_blank" rel="noopener noreferrer"
                style={{ padding: '16px 22px', border: `1.5px solid ${ink}`, background: 'transparent', color: ink, fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Ver demo →
              </a>
            </div>

            <div className="lp-hero-meta" style={{ fontSize: 13, color: inkSoft, fontWeight: 500 }}>
              {['14 días gratis','Sin tarjeta','Listo en 5 min'].map((t) => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <CheckMark />{t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — collage (desktop only via CSS) */}
          <div className="lp-hero-collage">
            {/* Phone */}
            <div style={{ position: 'absolute', top: 0, right: 30, width: 300, background: '#1C1410', borderRadius: 46, padding: 7, boxShadow: '8px 8px 0 var(--paprika), 24px 30px 60px -10px rgba(22,19,16,0.35)', zIndex: 2, transform: 'rotate(2deg)' }}>
              <div style={{ background: '#FAFAF8', borderRadius: 38, overflow: 'hidden', height: 600, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 80, height: 18, background: '#1C1410', borderRadius: 99, zIndex: 10 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 22px 4px', fontSize: 11, fontWeight: 700, color: ink }}>
                  <span>9:41</span>
                  <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1"><rect x="0.5" y="0.5" width="18" height="9" rx="2"/><rect x="2" y="2" width="13" height="6" rx="1" fill="currentColor"/><rect x="20" y="3" width="1.5" height="4" rx="0.5" fill="currentColor"/></svg>
                </div>
                <div style={{ height: 128, position: 'relative', overflow: 'hidden', background: '#2A1810' }}>
                  <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.68 }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(28,16,8,0.78))' }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 14px 12px', display: 'flex', alignItems: 'flex-end', gap: 10, zIndex: 2 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--paprika)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: paper, fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 15, border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0 }}>TM</div>
                    <div>
                      <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>TuMenú</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.78)', fontStyle: 'italic', marginTop: 1 }}>Cocina paraguaya de barrio</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, padding: '12px 14px 10px', overflow: 'hidden', borderBottom: '1px solid #EDE9E3' }}>
                  {['Entradas','Principales','Postres','Bebi…'].map((p, i) => (
                    <div key={p} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: 99, fontSize: 11, fontWeight: 600, background: i === 0 ? 'var(--paprika)' : '#EDE9E3', color: i === 0 ? '#fff' : '#5A4A3A', whiteSpace: 'nowrap' }}>{p}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 14px 10px', fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 14, fontWeight: 700, color: ink }}>
                  Entradas<span style={{ flex: 1, height: 1, background: '#E8E0D6' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, padding: '0 14px 14px' }}>
                  {[
                    { img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', name: 'Empanadas', price: 'Gs. 18.000' },
                    { img: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?w=400&q=80', name: 'Mandioca frita', price: 'Gs. 15.000' },
                    { img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80', name: 'Tabla quesos', price: 'Gs. 42.000' },
                    { img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', name: 'Asado tira', price: 'Gs. 85.000', soldout: true },
                  ].map((d) => (
                    <div key={d.name} style={{ background: '#fff', borderRadius: 13, overflow: 'hidden', boxShadow: '0 2px 8px rgba(28,20,16,0.07)', opacity: d.soldout ? 0.72 : 1 }}>
                      <div style={{ position: 'relative', aspectRatio: '3/2', background: '#EDE9E3', overflow: 'hidden' }}>
                        <img src={d.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: d.soldout ? 'grayscale(70%)' : 'none' }} />
                        {d.soldout && <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(30,20,10,0.7)', color: '#fff', fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 99 }}>AGOTADO</div>}
                      </div>
                      <div style={{ padding: '8px 9px 10px' }}>
                        <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 11.5, fontWeight: 700, color: ink, lineHeight: 1.2 }}>{d.name}</div>
                        <div style={{ fontSize: 10.5, fontWeight: 800, color: d.soldout ? '#9E9E9E' : 'var(--paprika)', marginTop: 2 }}>{d.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 99, background: ink, color: '#fff', fontSize: 11, fontWeight: 700, boxShadow: '0 6px 14px rgba(22,19,16,0.35)', zIndex: 5 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
                  Pedido
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--paprika)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>2</span>
                </div>
              </div>
            </div>

            {/* Sticker */}
            <div className="lp-spin" style={{ position: 'absolute', top: 230, right: -10, width: 120, height: 120, borderRadius: '50%', background: 'var(--paprika)', color: paper, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 13, lineHeight: 1, border: `1.5px solid ${ink}`, boxShadow: `4px 4px 0 ${ink}`, zIndex: 3 }}>
              <span style={{ transform: 'rotate(-15deg)', padding: 10, display: 'block' }}>SIN<br/>APP ·<br/>SIN<br/>FRICCIÓN</span>
            </div>

            {/* QR card */}
            <div style={{ position: 'absolute', bottom: 20, left: 0, width: 220, background: paper, border: `1.5px solid ${ink}`, padding: 16, zIndex: 1, transform: 'rotate(-5deg)', boxShadow: '6px 6px 0 var(--forest)' }}>
              <div style={{ display: 'inline-block', background: 'var(--dijon)', color: ink, padding: '3px 9px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Tu QR</div>
              <svg width="130" height="130" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto 10px' }}>
                <rect width="21" height="21" fill={paper}/>
                <g fill={ink}><rect x="0" y="0" width="7" height="7"/><rect x="14" y="0" width="7" height="7"/><rect x="0" y="14" width="7" height="7"/></g>
                <g fill={paper}><rect x="1" y="1" width="5" height="5"/><rect x="15" y="1" width="5" height="5"/><rect x="1" y="15" width="5" height="5"/></g>
                <g fill={ink}><rect x="2" y="2" width="3" height="3"/><rect x="16" y="2" width="3" height="3"/><rect x="2" y="16" width="3" height="3"/><rect x="8" y="0" width="2" height="2"/><rect x="11" y="1" width="2" height="2"/><rect x="8" y="4" width="3" height="2"/><rect x="9" y="8" width="2" height="3"/><rect x="12" y="9" width="2" height="2"/><rect x="15" y="8" width="2" height="2"/><rect x="14" y="11" width="3" height="2"/><rect x="18" y="10" width="3" height="2"/><rect x="8" y="14" width="2" height="2"/><rect x="11" y="15" width="2" height="3"/><rect x="14" y="16" width="2" height="2"/><rect x="17" y="14" width="2" height="4"/></g>
                <rect x="9" y="3" width="2" height="2" fill="var(--paprika)"/><rect x="13" y="13" width="2" height="2" fill="var(--paprika)"/>
              </svg>
              <div style={{ textAlign: 'center', fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: ink }}>menuqr.py/<strong style={{ color: 'var(--paprika)' }}>tu-menu</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="lp-marquee-wrap" style={{ background: ink, borderTop: `1.5px solid ${ink}`, borderBottom: `1.5px solid ${ink}` }}>
        <div className="lp-marquee-track" style={{ color: 'var(--butter)' }}>
          {['Menú digital','✦','Sin imprimir nunca más','✦','QR + WhatsApp','✦','Tu marca, tu menú','✦',
            'Menú digital','✦','Sin imprimir nunca más','✦','QR + WhatsApp','✦','Tu marca, tu menú','✦'].map((t, i) => (
            <span key={i} style={{ color: t === '✦' ? 'var(--paprika)' : i % 2 === 0 ? 'var(--butter)' : 'var(--dijon)', fontStyle: t !== '✦' && i % 4 === 2 ? 'italic' : 'normal' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="lp-section" style={{ background: 'var(--butter)' }} id="como">
        <div className="lp-section-head" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Eyebrow>Cómo funciona</Eyebrow>
          <h2 className="lp-section-title" style={{ fontFamily: '"Bricolage Grotesque",sans-serif', lineHeight: 1, letterSpacing: '-0.04em', color: ink, fontWeight: 700, maxWidth: 780, margin: '0 0 16px' }}>
            Tres pasos.<br />Sin <em style={{ fontStyle: 'italic', color: 'var(--paprika)' }}>técnicos.</em>
          </h2>
          <p style={{ fontSize: 'clamp(15px,3vw,18px)', color: inkSoft, maxWidth: 520, lineHeight: 1.55, fontWeight: 500, margin: 0 }}>
            Cargás el menú una vez, lo actualizás cuando quieras. Tus clientes lo ven al instante, sin descargar nada.
          </p>
        </div>
        <div className="lp-steps-grid">
          {[
            { num: '01', title: 'Cargá tu menú', desc: 'Categorías, platos, fotos y precios. Todo desde tu celular o computadora — en minutos, no en días.', tag: '~ 10 minutos' },
            { num: '02', title: 'Imprimí tu QR', desc: 'Descargás el QR en PNG o PDF. Lo pegás en las mesas, mostrador o entrada del local.', tag: 'PNG · PDF · A4' },
            { num: '03', title: 'Recibí pedidos', desc: 'Tus clientes escanean, eligen y te mandan el pedido por WhatsApp con el total ya armado.', tag: '→ WhatsApp listo' },
          ].map((s) => (
            <div key={s.num} className="lp-step">
              <div className="lp-step-num" style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, color: 'var(--paprika)', lineHeight: 0.9, letterSpacing: '-0.05em' }}>{s.num}</div>
              <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 8, color: ink, letterSpacing: '-0.02em' }}>{s.title}</div>
              <div style={{ fontSize: 15, color: inkSoft, lineHeight: 1.6, fontWeight: 500 }}>{s.desc}</div>
              <div style={{ marginTop: 'auto', paddingTop: 20, fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: 'var(--forest)', fontWeight: 500 }}>{s.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FUNCIONES ── */}
      <section className="lp-section" style={{ background: 'var(--forest)', color: 'var(--butter)', position: 'relative', overflow: 'hidden' }} id="funciones">
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,178,58,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="lp-section-head" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Eyebrow light>Funciones</Eyebrow>
          <h2 className="lp-section-title" style={{ fontFamily: '"Bricolage Grotesque",sans-serif', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--butter)', fontWeight: 700, maxWidth: 780, margin: '0 0 16px' }}>
            Todo lo que <em style={{ fontStyle: 'italic', color: 'var(--dijon)' }}>necesitás.</em><br />Nada que sobre.
          </h2>
          <p style={{ fontSize: 'clamp(15px,3vw,18px)', color: 'rgba(251,244,226,0.65)', maxWidth: 520, lineHeight: 1.55, fontWeight: 500, margin: 0 }}>
            No es un Frankenstein de funciones que nadie usa. Es lo justo para vender más, sin marearte.
          </p>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', background: 'var(--butter)', border: `1.5px solid ${ink}`, color: ink, position: 'relative' }} className="lp-features-card">
          <div style={{ position: 'absolute', top: 8, left: 8, right: 8, bottom: 8, border: `1px solid ${ink}`, pointerEvents: 'none' }} />
          <div style={{ textAlign: 'center', paddingBottom: 20, marginBottom: 28, borderBottom: `1px solid ${ink}` }}>
            <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--paprika)', marginBottom: 6 }}>Especialidades de la casa</div>
            <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 'clamp(28px,6vw,42px)', fontWeight: 700, letterSpacing: '-0.03em', color: ink }}>MenuQR</div>
            <div style={{ fontSize: 13, color: inkSoft, marginTop: 4, fontStyle: 'italic' }}>— el menú digital, sin complicaciones —</div>
          </div>
          {[
            { label: 'Para tus clientes', items: [
              { icon: 'M5 2h14a2 2 0 0 1 2 2.5V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4.5A2 2 0 0 1 5 2z', name: 'Menú al instante', tag: '2 seg', desc: 'Apuntan la cámara, ven tu menú. Sin descargar nada, sin registrarse.' },
              { icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', name: 'Pedidos por WhatsApp', tag: '+ carrito', desc: 'Te mandan el pedido armado: productos, cantidades, total. Vos sólo confirmás.' },
              { icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.874-.875-1.125-1.125-2.25a1.64 1.64 0 0 1 1.668-1.668h2c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 16.461 2 12 2z', name: 'Tu identidad', tag: 'logo · color', desc: 'Tu logo, foto de portada y color de marca. No un template genérico.' },
            ]},
            { label: 'Para vos', items: [
              { icon: 'M23 4 23 10 17 10M20.49 15a9 9 0 1 1-2.12-9.36L23 10', name: 'Cambios en tiempo real', tag: 'en vivo', desc: '¿Se acabó el asado? Tocás "agotado" y tus clientes lo ven al toque.' },
              { icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', name: 'QR listo para imprimir', tag: 'PNG · PDF', desc: 'Descargás tu QR en alta calidad. Para mesas, mostrador o redes.' },
              { icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z', name: 'Soporte en español', tag: 'WhatsApp', desc: 'Escribís por WhatsApp y te respondemos. Sin tickets, sin formularios.' },
            ]},
          ].map((sec) => (
            <div key={sec.label} style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--paprika)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 40, height: 1, background: line, display: 'inline-block', flexShrink: 0 }} />{sec.label}
                <span style={{ flex: 1, height: 1, background: line, display: 'inline-block' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {sec.items.map((item) => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 38, height: 38, flexShrink: 0, background: paper, border: `1.5px solid ${ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--paprika)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={item.icon}/></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', gap: 6 }}>
                        <span style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 'clamp(16px,3vw,19px)', fontWeight: 700, color: ink }}>{item.name}</span>
                        <span style={{ flex: 1, borderBottom: `2px dotted ${line}`, margin: '0 4px', alignSelf: 'flex-end', height: 8, minWidth: 16 }} />
                        <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, fontWeight: 500, color: 'var(--forest)', whiteSpace: 'nowrap' }}>{item.tag}</span>
                      </div>
                      <div style={{ fontSize: 13.5, color: inkSoft, lineHeight: 1.5, marginTop: 3, fontWeight: 500 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRECIO ── */}
      <section className="lp-section" style={{ background: 'var(--butter)' }} id="precio">
        <div className="lp-section-head" style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><Eyebrow>Precio</Eyebrow></div>
          <h2 className="lp-section-title" style={{ fontFamily: '"Bricolage Grotesque",sans-serif', lineHeight: 1, letterSpacing: '-0.04em', color: ink, fontWeight: 700, margin: '0 auto 16px', textAlign: 'center' }}>
            Un plan.<br /><em style={{ fontStyle: 'italic', color: 'var(--paprika)' }}>Cero sorpresas.</em>
          </h2>
          <p style={{ fontSize: 'clamp(15px,3vw,18px)', color: inkSoft, margin: '0 auto', lineHeight: 1.55, fontWeight: 500, textAlign: 'center', maxWidth: 480 }}>
            Sin tarifas ocultas, sin dólares, sin contratos. Cancelás cuando quieras.
          </p>
        </div>

        <div className="lp-ticket-outer">
          <div style={{ background: paper, border: `1.5px solid ${ink}`, position: 'relative', boxShadow: `8px 8px 0 var(--paprika)` }}>
            <div className="lp-ticket-top" style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-block', background: 'var(--paprika)', color: paper, fontFamily: '"JetBrains Mono",monospace', fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16, border: `1.5px solid ${ink}`, transform: 'rotate(-2deg)', padding: '5px 14px' }}>14 días gratis</div>
              <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: inkSoft, marginBottom: 12 }}>Plan Restaurante</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
                <span className="lp-ticket-price-num" style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, color: ink, lineHeight: 0.9, letterSpacing: '-0.05em' }}>40.000</span>
                <span style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 22, fontWeight: 600, color: inkSoft }}>Gs.</span>
              </div>
              <div style={{ fontSize: 13, color: inkSoft, fontWeight: 500 }}>/mes · <strong style={{ color: 'var(--paprika)', fontWeight: 700 }}>en guaraníes</strong></div>
            </div>

            <div className="lp-ticket-mid" style={{ position: 'relative', borderTop: `1.5px dashed ${line}` }}>
              <div style={{ position: 'absolute', top: '50%', left: -10, width: 18, height: 18, borderRadius: '50%', background: 'var(--butter)', border: `1.5px solid ${ink}`, transform: 'translateY(-50%)' }} />
              <div style={{ position: 'absolute', top: '50%', right: -10, width: 18, height: 18, borderRadius: '50%', background: 'var(--butter)', border: `1.5px solid ${ink}`, transform: 'translateY(-50%)' }} />
              {[['Platos y categorías','ilimitados'],['Tu logo, color y portada','incluido'],['QR para imprimir','PNG + PDF'],['Pedidos por WhatsApp','con carrito'],['Cambios en tiempo real','en vivo'],['Soporte por WhatsApp','en español']].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 10, fontSize: 13 }}>
                  <span style={{ fontWeight: 600, color: ink, display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}><CheckMark />{l}</span>
                  <span style={{ flex: 1, borderBottom: `1.5px dotted ${line}`, margin: '0 6px', alignSelf: 'flex-end', height: 8 }} />
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, fontWeight: 600, color: 'var(--forest)', whiteSpace: 'nowrap' }}>{v}</span>
                </div>
              ))}
            </div>

            <div className="lp-ticket-bot" style={{ borderTop: `1.5px dashed ${line}` }}>
              <button onClick={openModal}
                style={{ width: '100%', padding: '16px 18px', border: `1.5px solid ${ink}`, background: 'var(--paprika)', color: paper, cursor: 'pointer', fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.06em', boxShadow: `3px 3px 0 ${ink}` }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `5px 5px 0 ${ink}` }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `3px 3px 0 ${ink}` }}
              >Empezar mis 14 días gratis</button>
              <div style={{ textAlign: 'center', fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: inkSoft, marginTop: 12, letterSpacing: '0.04em' }}>SIN TARJETA · TRANSFERENCIA O QR DE PAGO LOCAL</div>
            </div>
          </div>
        </div>

        <div className="lp-pricing-aside">
          {['Cancelás cuando quieras','Pago mensual o anual','Factura legal'].map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: inkSoft, fontWeight: 500 }}>
              <CheckMark />{t}
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOUTOUT ── */}
      <section className="lp-shoutout" style={{ background: 'var(--paprika)', color: paper, borderTop: `1.5px solid ${ink}`, borderBottom: `1.5px solid ${ink}` }}>
        <h2 className="lp-shoutout-title" style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, maxWidth: 900, margin: '0 auto 28px' }}>
          Imprimí menús<br /><em style={{ fontStyle: 'italic', color: 'var(--dijon)' }}>por última vez.</em>
        </h2>
        <a href={SITE.demoUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 28px', border: `1.5px solid ${paper}`, background: paper, color: ink, fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.06em', boxShadow: `5px 5px 0 ${ink}`, textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `7px 7px 0 ${ink}` }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `5px 5px 0 ${ink}` }}
        >
          Probar la demo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer" style={{ background: ink, color: 'var(--butter)' }}>
        <div className="lp-footer-grid">
          <div>
            <LogoMark inverted height={30} />
            <p style={{ fontSize: 14, color: 'rgba(251,244,226,0.6)', lineHeight: 1.55, maxWidth: 280, margin: '16px 0 0' }}>
              El menú digital para restaurantes paraguayos. Hecho desde Asunción, con cariño por la cocina de barrio.
            </p>
          </div>
          {[
            { title: 'Producto', links: [['#funciones','Funciones'],['#precio','Precio'],[SITE.demoUrl,'Demo en vivo']] },
            { title: 'Empresa', links: [['#como','Cómo funciona'],['#','Sobre nosotros'],['#','Términos']] },
            { title: 'Contacto', links: [[`https://wa.me/${SITE.whatsapp}`,'WhatsApp'],['mailto:hola@menuqr.py','hola@menuqr.py'],['#','Instagram']] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dijon)', margin: '0 0 12px' }}>{col.title}</h4>
              {col.links.map(([href, label]) => (
                <a key={label} href={href} style={{ display: 'block', fontSize: 14, color: 'rgba(251,244,226,0.7)', marginBottom: 8, textDecoration: 'none' }}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="lp-footer-bottom">
          <span>© 2026 MenuQR. Todos los derechos reservados.</span>
          <span>🇵🇾 Asunción, Paraguay</span>
        </div>
      </footer>

      {showModal && <StartModal onClose={() => setShowModal(false)} onLogin={() => navigate(SITE.loginUrl)} />}
    </div>
  )
}
