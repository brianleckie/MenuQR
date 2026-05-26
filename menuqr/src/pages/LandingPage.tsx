import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SITE } from '../lib/site'

// ── Logo ──────────────────────────────────────────────────────────────────────
function LogoMark({ inverted = false, height = 30 }: { inverted?: boolean; height?: number }) {
  const tile   = inverted ? '#FBF4E2' : '#161310'
  const accent = inverted ? '#E8B23A' : '#E54A24'
  const word   = inverted ? '#FBF4E2' : '#161310'
  const wAccent = inverted ? '#E8B23A' : '#E54A24'
  const bg     = inverted ? '#161310' : '#FBF4E2'
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
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(22,19,16,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 480, background: '#FFFCF4', border: '1.5px solid #161310', padding: 36, position: 'relative', boxShadow: '8px 8px 0 #161310' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, background: 'var(--butter)', border: '1px solid #D8C9A1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5A4E40', borderRadius: 0 }} aria-label="Cerrar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h2 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 28, fontWeight: 700, color: '#161310', margin: '0 0 8px', letterSpacing: '-0.03em' }}>¡Empezá hoy!</h2>
        <p style={{ fontSize: 15, color: '#5A4E40', lineHeight: 1.55, margin: '0 0 24px' }}>Contactanos por WhatsApp y te configuramos el menú en el día.</p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', background: '#25D366', color: '#fff', border: '1.5px solid #161310', padding: '14px 20px', fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 20, fontFamily: '"Bricolage Grotesque",sans-serif', letterSpacing: '0.02em', boxShadow: '4px 4px 0 #161310' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.571a.5.5 0 0 0 .609.61l5.801-1.525A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.724.977.993-3.63-.233-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          Quiero empezar por WhatsApp
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ flex: 1, height: 1, background: '#D8C9A1' }} />
          <span style={{ fontSize: 12, color: '#5A4E40', whiteSpace: 'nowrap', fontFamily: '"JetBrains Mono",monospace', letterSpacing: '0.1em' }}>o si ya tenés cuenta</span>
          <span style={{ flex: 1, height: 1, background: '#D8C9A1' }} />
        </div>
        <button onClick={() => { onClose(); onLogin() }} style={{ display: 'block', width: '100%', textAlign: 'center', fontSize: 14, fontWeight: 600, background: 'none', border: 'none', color: '#5A4E40', cursor: 'pointer', padding: 0 }}>
          Ingresar al panel →
        </button>
      </div>
    </div>
  )
}

// ── LandingPage ───────────────────────────────────────────────────────────────
export function LandingPage() {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const openModal = () => setShowModal(true)
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const btnPaprika: React.CSSProperties = {
    padding: '18px 30px', border: '1.5px solid #161310', borderRadius: 0, cursor: 'pointer',
    background: 'var(--paprika)', color: '#FFFCF4',
    fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 16,
    display: 'inline-flex', alignItems: 'center', gap: 10,
    transition: 'transform .12s, box-shadow .12s',
    boxShadow: '5px 5px 0 #161310',
    textTransform: 'uppercase' as const, letterSpacing: '0.04em', textDecoration: 'none',
  }
  const btnGhost: React.CSSProperties = {
    padding: '18px 26px', border: '1.5px solid #161310', borderRadius: 0, cursor: 'pointer',
    background: 'transparent', color: '#161310',
    fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 16,
    display: 'inline-flex', alignItems: 'center', gap: 8,
    transition: 'background .15s',
    textTransform: 'uppercase' as const, letterSpacing: '0.04em', textDecoration: 'none',
  }

  return (
    <div className="mercado" style={{ fontFamily: '"Hanken Grotesk","Helvetica Neue",sans-serif', background: 'var(--butter)', color: 'var(--ink)', WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' }}>

      {/* ── TOP TICKER ── */}
      <div style={{ background: 'var(--forest)', color: 'var(--butter)', padding: '8px 0', fontSize: 12, fontWeight: 500, overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '1px solid var(--forest-soft)' }}>
        <div className="lp-ticker-track">
          {['Hecho en Asunción 🇵🇾', '14 días gratis', 'Sin tarjeta de crédito', 'Pagás en guaraníes', 'Soporte en español',
            'Hecho en Asunción 🇵🇾', '14 días gratis', 'Sin tarjeta de crédito', 'Pagás en guaraníes', 'Soporte en español'].map((t, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, letterSpacing: '0.02em' }}>
              <span style={{ width: 5, height: 5, background: 'var(--dijon)', borderRadius: '50%', display: 'inline-block' }} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── NAV ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--butter)', borderBottom: '1.5px solid #161310', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" aria-label="MenuQR" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LogoMark height={30} />
        </a>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {[['#como','Cómo funciona'], ['#funciones','Funciones'], ['#precio','Precio']].map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize: 14, color: '#161310', fontWeight: 600, textDecoration: 'none' }}>{label}</a>
          ))}
          <a href={SITE.demoUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#161310', fontWeight: 600, textDecoration: 'none' }}>Ver demo</a>
        </div>
        <button
          onClick={() => scrollTo('precio')}
          style={{ padding: '10px 22px', borderRadius: 0, border: '1.5px solid #161310', background: '#161310', color: 'var(--butter)', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'transform .12s, box-shadow .12s', boxShadow: '4px 4px 0 var(--paprika)' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 var(--paprika)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 var(--paprika)' }}
        >Empezar →</button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: '64px 32px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', borderRadius: 99, background: 'var(--forest)', color: 'var(--butter)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28 }}>
              <span className="lp-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--dijon)' }} />
              Para restaurantes paraguayos
            </div>

            <h1 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 'clamp(48px,7.5vw,108px)', lineHeight: 0.92, letterSpacing: '-0.045em', color: '#161310', margin: '0 0 24px', fontWeight: 700 }}>
              Tu menú, en<br />
              <span style={{ color: 'var(--paprika)' }}>un escaneo.</span><br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                Cero papeles.
                <span style={{ position: 'absolute', left: '-2%', right: '-2%', bottom: '6%', height: '14%', background: 'var(--dijon)', zIndex: -1, borderRadius: 4, transform: 'rotate(-1deg)', display: 'block' }} />
              </span>
            </h1>

            <p style={{ fontSize: 19, lineHeight: 1.5, color: '#5A4E40', maxWidth: 480, margin: '0 0 36px', fontWeight: 500 }}>
              Tus clientes apuntan la cámara y ven tus platos con fotos, precios actualizados y un botón para pedir por WhatsApp. Vos cambiás el menú desde el celular.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
              <button
                onClick={() => scrollTo('precio')}
                style={btnPaprika}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '7px 7px 0 #161310' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '5px 5px 0 #161310' }}
              >
                Empezar gratis
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
              <a href={SITE.demoUrl} target="_blank" rel="noopener noreferrer" style={btnGhost}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#161310'; e.currentTarget.style.color = '#FFFCF4' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#161310' }}
              >
                Ver demo →
              </a>
            </div>

            <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', fontSize: 13.5, color: '#5A4E40', fontWeight: 500 }}>
              {['14 días gratis', 'Sin tarjeta', 'Listo en 5 min'].map((t) => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — collage */}
          <div style={{ position: 'relative', height: 620 }}>
            {/* Phone */}
            <div style={{ position: 'absolute', top: 0, right: 30, width: 300, background: '#1C1410', borderRadius: 46, padding: 7, boxShadow: '8px 8px 0 var(--paprika), 24px 30px 60px -10px rgba(22,19,16,0.35)', zIndex: 2, transform: 'rotate(2deg)' }}>
              <div style={{ background: '#FAFAF8', borderRadius: 38, overflow: 'hidden', height: 600, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {/* Notch */}
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 80, height: 18, background: '#1C1410', borderRadius: 99, zIndex: 10 }} />
                {/* Status bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 22px 4px', fontSize: 11, fontWeight: 700, color: '#161310' }}>
                  <span>9:41</span>
                  <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1"><rect x="0.5" y="0.5" width="18" height="9" rx="2"/><rect x="2" y="2" width="13" height="6" rx="1" fill="currentColor"/><rect x="20" y="3" width="1.5" height="4" rx="0.5" fill="currentColor"/></svg>
                </div>
                {/* Cover */}
                <div style={{ height: 128, position: 'relative', overflow: 'hidden', background: '#2A1810' }}>
                  <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.68 }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(28,16,8,0.78))' }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 14px 12px', display: 'flex', alignItems: 'flex-end', gap: 10, zIndex: 2 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--paprika)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFCF4', fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 15, border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0 }}>TM</div>
                    <div>
                      <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>TuMenú</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.78)', fontStyle: 'italic', marginTop: 1 }}>Cocina paraguaya de barrio</div>
                    </div>
                  </div>
                </div>
                {/* Pills */}
                <div style={{ display: 'flex', gap: 6, padding: '12px 14px 10px', overflow: 'hidden', borderBottom: '1px solid #EDE9E3' }}>
                  {['Entradas','Principales','Postres','Bebi…'].map((p, i) => (
                    <div key={p} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: 99, fontSize: 11, fontWeight: 600, background: i === 0 ? 'var(--paprika)' : '#EDE9E3', color: i === 0 ? '#fff' : '#5A4A3A', whiteSpace: 'nowrap' }}>{p}</div>
                  ))}
                </div>
                {/* Section title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 14px 10px', fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 14, fontWeight: 700, color: '#161310' }}>
                  Entradas
                  <span style={{ flex: 1, height: 1, background: '#E8E0D6' }} />
                </div>
                {/* Dish grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, padding: '0 14px 14px' }}>
                  {[
                    { img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', name: 'Empanadas', price: 'Gs. 18.000' },
                    { img: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?w=400&q=80', name: 'Mandioca frita', price: 'Gs. 15.000' },
                    { img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80', name: 'Tabla de quesos', price: 'Gs. 42.000' },
                    { img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', name: 'Asado de tira', price: 'Gs. 85.000', soldout: true },
                  ].map((d) => (
                    <div key={d.name} style={{ background: '#fff', borderRadius: 13, overflow: 'hidden', boxShadow: '0 2px 8px rgba(28,20,16,0.07)', opacity: d.soldout ? 0.72 : 1 }}>
                      <div style={{ position: 'relative', aspectRatio: '3/2', background: '#EDE9E3', overflow: 'hidden' }}>
                        <img src={d.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: d.soldout ? 'grayscale(70%)' : 'none' }} />
                        {d.soldout && <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(30,20,10,0.7)', color: '#fff', fontSize: 8, fontWeight: 700, letterSpacing: '0.04em', padding: '2px 6px', borderRadius: 99, textDecoration: 'line-through', textDecorationColor: 'rgba(255,255,255,0.5)' }}>AGOTADO</div>}
                      </div>
                      <div style={{ padding: '8px 9px 10px' }}>
                        <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 11.5, fontWeight: 700, color: '#161310', lineHeight: 1.2 }}>{d.name}</div>
                        <div style={{ fontSize: 10.5, fontWeight: 800, color: d.soldout ? '#9E9E9E' : 'var(--paprika)', marginTop: 2, textDecoration: d.soldout ? 'line-through' : 'none' }}>{d.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Cart FAB */}
                <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 99, background: '#161310', color: '#fff', fontSize: 11, fontWeight: 700, boxShadow: '0 6px 14px rgba(22,19,16,0.35)', zIndex: 5 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
                  Pedido
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--paprika)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>2</span>
                </div>
              </div>
            </div>

            {/* Spinning sticker */}
            <div className="lp-spin" style={{ position: 'absolute', top: 230, right: -10, width: 120, height: 120, borderRadius: '50%', background: 'var(--paprika)', color: '#FFFCF4', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 14, lineHeight: 1, letterSpacing: '-0.01em', border: '1.5px solid #161310', boxShadow: '4px 4px 0 #161310', zIndex: 3 }}>
              <span style={{ transform: 'rotate(-15deg)', padding: 12, display: 'block' }}>SIN<br />APP ·<br />SIN<br />FRICCIÓN</span>
            </div>

            {/* QR card */}
            <div style={{ position: 'absolute', bottom: 20, left: 0, width: 230, background: '#FFFCF4', border: '1.5px solid #161310', padding: 18, zIndex: 1, transform: 'rotate(-5deg)', boxShadow: '6px 6px 0 var(--forest)' }}>
              <div style={{ display: 'inline-block', background: 'var(--dijon)', color: '#161310', padding: '3px 9px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Tu QR</div>
              <svg width="140" height="140" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto 12px' }}>
                <rect width="21" height="21" fill="#FFFCF4"/>
                <g fill="#161310">
                  <rect x="0" y="0" width="7" height="7"/><rect x="14" y="0" width="7" height="7"/><rect x="0" y="14" width="7" height="7"/>
                </g>
                <g fill="#FFFCF4">
                  <rect x="1" y="1" width="5" height="5"/><rect x="15" y="1" width="5" height="5"/><rect x="1" y="15" width="5" height="5"/>
                </g>
                <g fill="#161310">
                  <rect x="2" y="2" width="3" height="3"/><rect x="16" y="2" width="3" height="3"/><rect x="2" y="16" width="3" height="3"/>
                  <rect x="8" y="0" width="2" height="2"/><rect x="11" y="1" width="2" height="2"/><rect x="8" y="4" width="3" height="2"/>
                  <rect x="9" y="8" width="2" height="3"/><rect x="12" y="9" width="2" height="2"/><rect x="15" y="8" width="2" height="2"/>
                  <rect x="14" y="11" width="3" height="2"/><rect x="18" y="10" width="3" height="2"/>
                  <rect x="8" y="14" width="2" height="2"/><rect x="11" y="15" width="2" height="3"/><rect x="14" y="16" width="2" height="2"/><rect x="17" y="14" width="2" height="4"/>
                </g>
                <rect x="9" y="3" width="2" height="2" fill="#E54A24"/><rect x="13" y="13" width="2" height="2" fill="#E54A24"/>
              </svg>
              <div style={{ textAlign: 'center', fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: '#161310', fontWeight: 500 }}>
                menuqr.py/<strong style={{ color: 'var(--paprika)' }}>tu-menu</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: '#161310', color: 'var(--butter)', padding: '24px 0', overflow: 'hidden', borderTop: '1.5px solid #161310', borderBottom: '1.5px solid #161310' }}>
        <div className="lp-marquee-track" style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 42, fontWeight: 700, letterSpacing: '-0.02em' }}>
          {['Menú digital', '✦', 'Sin imprimir nunca más', '✦', 'QR + WhatsApp', '✦', 'Tu marca, tu menú', '✦',
            'Menú digital', '✦', 'Sin imprimir nunca más', '✦', 'QR + WhatsApp', '✦', 'Tu marca, tu menú', '✦'].map((t, i) => (
            <span key={i} style={{ color: t === '✦' ? 'var(--paprika)' : (i % 4 === 2 || i % 4 === 14-2 ? 'var(--dijon)' : 'inherit'), fontStyle: (i === 2 || i === 6 || i === 10 || i === 14) ? 'italic' : 'normal' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── CÓMO FUNCIONA ── */}
      <section style={{ background: 'var(--butter)', padding: '96px 32px' }} id="como">
        <div style={{ maxWidth: 1100, margin: '0 auto 64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--paprika)', marginBottom: 18 }}>
            <span style={{ width: 24, height: 1.5, background: 'var(--paprika)', display: 'inline-block' }} />
            Cómo funciona
          </div>
          <h2 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 'clamp(36px,5.5vw,72px)', lineHeight: 1, letterSpacing: '-0.04em', color: '#161310', fontWeight: 700, maxWidth: 780, margin: '0 0 20px' }}>
            Tres pasos.<br />Sin <em style={{ fontStyle: 'italic', color: 'var(--paprika)' }}>técnicos.</em>
          </h2>
          <p style={{ fontSize: 18, color: '#5A4E40', maxWidth: 520, lineHeight: 1.55, fontWeight: 500, margin: 0 }}>
            Cargás el menú una vez, lo actualizás cuando quieras. Tus clientes lo ven al instante, sin descargar nada.
          </p>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1.5px solid #161310', background: '#FFFCF4' }}>
          {[
            { num: '01', title: 'Cargá tu menú', desc: 'Categorías, platos, fotos y precios. Todo desde tu celular o computadora — en minutos, no en días.', tag: '~ 10 minutos' },
            { num: '02', title: 'Imprimí tu QR', desc: 'Descargás el QR en PNG o PDF. Lo pegás en las mesas, mostrador o entrada del local.', tag: 'PNG · PDF · A4' },
            { num: '03', title: 'Recibí pedidos', desc: 'Tus clientes escanean, eligen y te mandan el pedido por WhatsApp con el total ya armado.', tag: '→ WhatsApp listo' },
          ].map((s, i) => (
            <div key={s.num} style={{ padding: '36px 32px', position: 'relative', borderRight: i < 2 ? '1.5px solid #161310' : 'none', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 72, fontWeight: 700, color: 'var(--paprika)', lineHeight: 0.9, marginBottom: 32, letterSpacing: '-0.05em' }}>{s.num}</div>
              <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 10, color: '#161310', letterSpacing: '-0.02em' }}>{s.title}</div>
              <div style={{ fontSize: 15, color: '#5A4E40', lineHeight: 1.6, fontWeight: 500 }}>{s.desc}</div>
              <div style={{ marginTop: 'auto', paddingTop: 24, fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: 'var(--forest)', fontWeight: 500 }}>{s.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FUNCIONES ── */}
      <section style={{ background: 'var(--forest)', padding: '96px 32px', color: 'var(--butter)', position: 'relative', overflow: 'hidden' }} id="funciones">
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,178,58,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto 64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dijon)', marginBottom: 18 }}>
            <span style={{ width: 24, height: 1.5, background: 'var(--dijon)', display: 'inline-block' }} />
            Funciones
          </div>
          <h2 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 'clamp(36px,5.5vw,72px)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--butter)', fontWeight: 700, maxWidth: 780, margin: '0 0 20px' }}>
            Todo lo que <em style={{ fontStyle: 'italic', color: 'var(--dijon)' }}>necesitás.</em><br />Nada que sobre.
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(251,244,226,0.65)', maxWidth: 520, lineHeight: 1.55, fontWeight: 500, margin: 0 }}>
            No es un Frankenstein de funciones que nadie usa. Es lo justo para vender más, sin marearte.
          </p>
        </div>

        {/* Menu card */}
        <div style={{ maxWidth: 1100, margin: '0 auto', background: 'var(--butter)', padding: '48px 56px', border: '1.5px solid #161310', color: '#161310', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 8, left: 8, right: 8, bottom: 8, border: '1px solid #161310', pointerEvents: 'none' }} />
          <div style={{ textAlign: 'center', paddingBottom: 24, marginBottom: 32, borderBottom: '1px solid #161310' }}>
            <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--paprika)', marginBottom: 8 }}>Especialidades de la casa</div>
            <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 42, fontWeight: 700, letterSpacing: '-0.03em', color: '#161310' }}>MenuQR</div>
            <div style={{ fontSize: 13, color: '#5A4E40', marginTop: 6, fontStyle: 'italic' }}>— el menú digital, sin complicaciones —</div>
          </div>

          {[
            { title: 'Para tus clientes', items: [
              { icon: 'M5 2h14a2 2 0 0 1 2 2.5V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4.5A2 2 0 0 1 5 2zM12 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2z', name: 'Menú al instante', tag: '2 seg', desc: 'Apuntan la cámara, ven tu menú. Sin descargar nada, sin registrarse, sin nada.' },
              { icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', name: 'Pedidos por WhatsApp', tag: '+ carrito', desc: 'Te mandan el pedido armado: productos, cantidades, total. Vos sólo confirmás.' },
              { icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125C12.52 18.887 12 18 12 18h2c3.051 0 5.555-2.503 5.555-5.554C19.965 6.012 16.461 2 12 2z', name: 'Tu identidad', tag: 'logo · color', desc: 'Tu logo, foto de portada y color de marca. No un template genérico de internet.' },
            ]},
            { title: 'Para vos', items: [
              { icon: 'M23 4 23 10 17 10M20.49 15a9 9 0 1 1-2.12-9.36L23 10', name: 'Cambios en tiempo real', tag: 'en vivo', desc: '¿Se acabó el asado? Tocás "agotado" y tus clientes lo ven al toque. No reimprimís nada.' },
              { icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', name: 'QR listo para imprimir', tag: 'PNG · PDF', desc: 'Descargás tu QR en alta calidad. Lo pegás en mesas, mostrador, instagram o el frente.' },
              { icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z', name: 'Soporte en español', tag: 'WhatsApp', desc: 'Si tenés una duda, escribís por WhatsApp y te respondemos. Sin tickets, sin formularios.' },
            ]},
          ].map((section) => (
            <div key={section.title} style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--paprika)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flex: '0 0 60px', height: 1, background: '#D8C9A1', display: 'inline-block' }} />
                {section.title}
                <span style={{ flex: 1, height: 1, background: '#D8C9A1', display: 'inline-block' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {section.items.map((item) => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                    <div style={{ width: 42, height: 42, flexShrink: 0, background: '#FFFCF4', border: '1.5px solid #161310', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--paprika)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={item.icon}/></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', gap: 8 }}>
                        <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 19, fontWeight: 700, color: '#161310', letterSpacing: '-0.01em' }}>{item.name}</div>
                        <span style={{ flex: 1, borderBottom: '2px dotted #D8C9A1', margin: '0 8px', alignSelf: 'flex-end', height: 8 }} />
                        <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, fontWeight: 500, color: 'var(--forest)', whiteSpace: 'nowrap' }}>{item.tag}</div>
                      </div>
                      <div style={{ fontSize: 14.5, color: '#5A4E40', lineHeight: 1.55, marginTop: 4, fontWeight: 500 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRECIO ── */}
      <section style={{ background: 'var(--butter)', padding: '96px 32px' }} id="precio">
        <div style={{ maxWidth: 1100, margin: '0 auto 48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--paprika)', marginBottom: 18, justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1.5, background: 'var(--paprika)', display: 'inline-block' }} />
            Precio
          </div>
          <h2 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 'clamp(36px,5.5vw,72px)', lineHeight: 1, letterSpacing: '-0.04em', color: '#161310', fontWeight: 700, margin: '0 auto', textAlign: 'center' }}>
            Un plan.<br /><em style={{ fontStyle: 'italic', color: 'var(--paprika)' }}>Cero sorpresas.</em>
          </h2>
          <p style={{ fontSize: 18, color: '#5A4E40', margin: '20px auto 0', lineHeight: 1.55, fontWeight: 500, textAlign: 'center', maxWidth: 520 }}>
            Sin tarifas ocultas, sin dólares, sin contratos largos. Cancelás cuando quieras.
          </p>
        </div>

        {/* Ticket */}
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ background: '#FFFCF4', border: '1.5px solid #161310', position: 'relative', boxShadow: '10px 10px 0 var(--paprika)' }}>
            <div style={{ padding: '28px 36px 24px', textAlign: 'center' }}>
              <div style={{ display: 'inline-block', background: 'var(--paprika)', color: '#FFFCF4', padding: '5px 14px', fontFamily: '"JetBrains Mono",monospace', fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18, border: '1.5px solid #161310', transform: 'rotate(-2deg)' }}>
                14 días gratis
              </div>
              <div style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#5A4E40', marginBottom: 14 }}>Plan Restaurante</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 96, fontWeight: 700, color: '#161310', lineHeight: 0.9, letterSpacing: '-0.05em' }}>40.000</span>
                <span style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 24, fontWeight: 600, color: '#5A4E40' }}>Gs.</span>
              </div>
              <div style={{ fontSize: 14, color: '#5A4E40', fontWeight: 500 }}>
                /mes · <strong style={{ color: 'var(--paprika)', fontWeight: 700 }}>pago en guaraníes</strong>
              </div>
            </div>

            <div style={{ padding: '24px 36px', position: 'relative', borderTop: '1.5px dashed #D8C9A1' }}>
              <div style={{ position: 'absolute', top: '50%', left: -10, width: 18, height: 18, borderRadius: '50%', background: 'var(--butter)', border: '1.5px solid #161310', transform: 'translateY(-50%)' }} />
              <div style={{ position: 'absolute', top: '50%', right: -10, width: 18, height: 18, borderRadius: '50%', background: 'var(--butter)', border: '1.5px solid #161310', transform: 'translateY(-50%)' }} />
              {[
                ['Platos y categorías', 'ilimitados'],
                ['Tu logo, color y portada', 'incluido'],
                ['QR para imprimir', 'PNG + PDF'],
                ['Pedidos por WhatsApp', 'con carrito'],
                ['Cambios en tiempo real', 'en vivo'],
                ['Soporte por WhatsApp', 'en español'],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 12, fontSize: 13.5 }}>
                  <div style={{ fontWeight: 600, color: '#161310', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {label}
                  </div>
                  <span style={{ flex: 1, borderBottom: '1.5px dotted #D8C9A1', margin: '0 8px', alignSelf: 'flex-end', height: 8 }} />
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, fontWeight: 600, color: 'var(--forest)', whiteSpace: 'nowrap' }}>{val}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: '24px 36px 32px', borderTop: '1.5px dashed #D8C9A1' }}>
              <button
                onClick={openModal}
                style={{ width: '100%', padding: 18, border: '1.5px solid #161310', background: 'var(--paprika)', color: '#FFFCF4', cursor: 'pointer', fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', letterSpacing: '0.06em', transition: 'transform .12s, box-shadow .12s', boxShadow: '4px 4px 0 #161310' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 #161310' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 #161310' }}
              >
                Empezar mis 14 días gratis
              </button>
              <div style={{ textAlign: 'center', fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: '#5A4E40', marginTop: 14, letterSpacing: '0.04em' }}>
                SIN TARJETA · TRANSFERENCIA O QR DE PAGO LOCAL
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          {['Cancelás cuando quieras', 'Pago mensual o anual', 'Factura legal'].map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#5A4E40', fontWeight: 500 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOUTOUT ── */}
      <section style={{ background: 'var(--paprika)', color: '#FFFCF4', padding: '120px 32px', textAlign: 'center', borderTop: '1.5px solid #161310', borderBottom: '1.5px solid #161310', position: 'relative', overflow: 'hidden' }}>
        <h2 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 'clamp(40px,6vw,84px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, maxWidth: 980, margin: '0 auto 32px' }}>
          Imprimí menús<br />
          <em style={{ fontStyle: 'italic', color: 'var(--dijon)' }}>por última vez.</em>
        </h2>
        <a href={SITE.demoUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '20px 36px', border: '1.5px solid #FFFCF4', background: '#FFFCF4', color: '#161310', fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'transform .12s, box-shadow .12s', boxShadow: '6px 6px 0 #161310', cursor: 'pointer', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '8px 8px 0 #161310' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '6px 6px 0 #161310' }}
        >
          Probar la demo
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#161310', color: 'var(--butter)', padding: '56px 32px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 40, borderBottom: '1px solid rgba(251,244,226,0.1)' }}>
          <div>
            <LogoMark inverted height={32} />
            <p style={{ fontSize: 14, color: 'rgba(251,244,226,0.6)', lineHeight: 1.55, maxWidth: 280, margin: '18px 0 0' }}>
              El menú digital para restaurantes paraguayos. Hecho desde Asunción, con cariño por la cocina de barrio.
            </p>
          </div>
          {[
            { title: 'Producto', links: [['#funciones','Funciones'], ['#precio','Precio'], [SITE.demoUrl,'Demo en vivo']] },
            { title: 'Empresa', links: [['#como','Cómo funciona'], ['#','Sobre nosotros'], ['#','Términos']] },
            { title: 'Contacto', links: [[`https://wa.me/${SITE.whatsapp}`,'WhatsApp'], ['mailto:hola@menuqr.py','hola@menuqr.py'], ['#','Instagram']] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dijon)', marginBottom: 14, margin: '0 0 14px' }}>{col.title}</h4>
              {col.links.map(([href, label]) => (
                <a key={label} href={href} style={{ display: 'block', fontSize: 14, color: 'rgba(251,244,226,0.7)', marginBottom: 8, textDecoration: 'none' }}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1200, margin: '24px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'rgba(251,244,226,0.4)', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2026 MenuQR. Todos los derechos reservados.</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>🇵🇾 Asunción, Paraguay</span>
        </div>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 980px) {
          .mercado nav > div { display: none !important; }
        }
        @media (max-width: 980px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(3,1fr)"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(3,1fr)"] > div { border-right: none !important; border-bottom: 1.5px solid #161310 !important; }
          div[style*="grid-template-columns: 2fr 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          div[style*="height: 620px"] { height: 500px !important; }
        }
        @media (max-width: 640px) {
          section { padding-left: 18px !important; padding-right: 18px !important; }
          footer { padding-left: 18px !important; padding-right: 18px !important; }
          nav { padding: 12px 18px !important; }
          div[style*="padding: '48px 56px'"] { padding: 32px 24px !important; }
          div[style*="height: 620px"] { display: none !important; }
          div[style*="grid-template-columns: 2fr 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Modal */}
      {showModal && <StartModal onClose={() => setShowModal(false)} onLogin={() => navigate(SITE.loginUrl)} />}
    </div>
  )
}
