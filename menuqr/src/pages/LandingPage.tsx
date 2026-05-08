import { useState, type FormEvent } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useNavigate } from 'react-router-dom'
import { SITE } from '../lib/site'
import styles from './LandingPage.module.css'

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

interface BrandLogoProps { qrSize?: number; fontSize?: number }
const BrandLogo = ({ qrSize = 30, fontSize = 19 }: BrandLogoProps) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
    <svg width={qrSize} height={qrSize} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--mq-ink)', flexShrink: 0 }}>
      <rect x="1" y="1" width="7" height="7" rx="1" fill="currentColor"/>
      <rect x="2.5" y="2.5" width="4" height="4" rx="0.4" fill="var(--mq-cream)"/>
      <rect x="3.5" y="3.5" width="2" height="2" fill="currentColor"/>
      <rect x="13" y="1" width="7" height="7" rx="1" fill="currentColor"/>
      <rect x="14.5" y="2.5" width="4" height="4" rx="0.4" fill="var(--mq-cream)"/>
      <rect x="15.5" y="3.5" width="2" height="2" fill="currentColor"/>
      <rect x="1" y="13" width="7" height="7" rx="1" fill="currentColor"/>
      <rect x="2.5" y="14.5" width="4" height="4" rx="0.4" fill="var(--mq-cream)"/>
      <rect x="3.5" y="15.5" width="2" height="2" fill="currentColor"/>
      <rect x="10" y="1" width="2" height="2" fill="currentColor"/>
      <rect x="10" y="4" width="2" height="2" fill="currentColor"/>
      <rect x="10" y="7" width="2" height="2" fill="currentColor"/>
      <rect x="13" y="10" width="2" height="2" fill="currentColor"/>
      <rect x="16" y="10" width="2" height="2" fill="currentColor"/>
      <rect x="19" y="10" width="1" height="2" fill="currentColor"/>
      <rect x="1"  y="10" width="2" height="2" fill="currentColor"/>
      <rect x="4"  y="10" width="2" height="2" fill="currentColor"/>
      <rect x="13" y="13" width="2" height="2" fill="currentColor"/>
      <rect x="16" y="16" width="2" height="2" fill="currentColor"/>
      <rect x="13" y="16" width="2" height="2" fill="currentColor"/>
      <rect x="16" y="13" width="2" height="2" fill="currentColor"/>
      <rect x="19" y="16" width="1" height="2" fill="currentColor"/>
      <rect x="19" y="19" width="1" height="1" fill="currentColor"/>
      <rect x="13" y="19" width="2" height="1" fill="currentColor"/>
      <rect x="10" y="10" width="2" height="2" fill="currentColor"/>
      <rect x="10" y="13" width="2" height="2" fill="currentColor"/>
      <rect x="10" y="16" width="2" height="2" fill="currentColor"/>
      <rect x="10" y="19" width="2" height="1" fill="currentColor"/>
    </svg>
    <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--mq-ink)', lineHeight: 1 }}>
      MenuQR<sup style={{ fontSize: '0.45em', verticalAlign: 'super', fontWeight: 700, letterSpacing: 0 }}>™</sup>
    </span>
  </div>
)

// ── Modal "Quiero empezar" ─────────────────────────────────────────────────────

interface StartModalProps { onClose: () => void; onLogin: () => void }

function StartModal({ onClose, onLogin }: StartModalProps) {
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hola! Quiero crear mi menú digital con MenuQR')}`

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(30,35,40,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 480,
          background: '#fff', borderRadius: 20,
          padding: 36, position: 'relative',
          boxShadow: '0 24px 48px -8px rgba(30,35,40,0.18)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--mq-cream-soft)', border: '1px solid var(--mq-line)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--mq-ink-soft)',
          }}
          aria-label="Cerrar"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: 26, fontWeight: 600, color: 'var(--mq-ink)', marginBottom: 8, lineHeight: 1.2, marginTop: 0 }}>
          ¡Empezá hoy!
        </h2>
        <p style={{ fontSize: 15, color: 'var(--mq-ink-soft)', lineHeight: 1.55, marginBottom: 24, marginTop: 0 }}>
          Contactanos por WhatsApp y te configuramos el menú en el día.
        </p>

        {/* WhatsApp CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 10, width: '100%', background: '#25D366', color: '#fff',
            borderRadius: 14, padding: '14px 20px',
            fontSize: 15, fontWeight: 600, textDecoration: 'none',
            marginBottom: 20,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.571a.5.5 0 0 0 .609.61l5.801-1.525A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.724.977.993-3.63-.233-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
          </svg>
          Quiero empezar por WhatsApp
        </a>

        {/* Separator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--mq-line)' }} />
          <span style={{ fontSize: 12, color: 'var(--mq-ink-soft)', whiteSpace: 'nowrap' }}>o si ya tenés cuenta</span>
          <div style={{ flex: 1, height: 1, background: 'var(--mq-line)' }} />
        </div>

        {/* Login link */}
        <button
          onClick={() => { onClose(); onLogin() }}
          style={{
            display: 'block', width: '100%', textAlign: 'center',
            fontSize: 14, fontWeight: 500, background: 'none', border: 'none',
            color: 'var(--mq-slate-deep)', cursor: 'pointer', padding: 0,
          }}
        >
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: pasar nombre como query param cuando el onboarding lo soporte
    openModal()
  }

  return (
    <div className={styles.page}>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <BrandLogo qrSize={32} fontSize={20} />
        </div>
        <div className={styles.navLinks}>
          <a href="#como">Cómo funciona</a>
          <a href="#funciones">Funciones</a>
          <a href="#precio">Precio</a>
          <a href="#demo">Demo</a>
        </div>
        <button className={styles.btnNav} onClick={openModal}>Empezar</button>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          El menú de tu local,<br />
          <span className={styles.accent}>en un solo escaneo.</span>
        </h1>
        <div className={styles.heroNote}>14 días gratis · después Gs. 40.000/mes</div>

        <p className={styles.heroSub}>
          Tus clientes apuntan la cámara, ven tus platos con fotos y precios actualizados, y piden por WhatsApp. Vos no imprimís nada nunca más.
        </p>

        <form className={styles.qrBuilder} onSubmit={handleSubmit}>
          <div className={styles.qrBuilderInput}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/>
              <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>
            </svg>
            <input
              type="text"
              placeholder="Nombre de tu restaurante..."
              aria-label="Nombre del restaurante"
            />
          </div>
          <button className={styles.qrBuilderCta} type="submit">
            Generar mi QR gratis
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </button>
        </form>

        <div className={styles.heroMeta}>
          <span>Sin tarjeta</span>
          <span>Sin app para tus clientes</span>
          <span>Listo en 5 minutos</span>
        </div>
      </section>

      {/* ── PHONE SECTION ── */}
      <div className={styles.phoneSectionOuter} id="demo">
        <div className={styles.phoneSection}>
          <div className={styles.phoneCols}>

            {/* Text */}
            <div className={styles.phoneText}>
              <div className={styles.phoneTextEyebrow}>Vista del cliente</div>
              <h2 className={styles.phoneTextTitle}>
                Lo que ven tus clientes al escanear
              </h2>
              <p className={styles.phoneTextDesc}>
                Sin descargar nada. Sin registrarse. Solo apuntan la cámara y ven tu menú al instante.
              </p>
              <a
                href={SITE.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.phoneTextLink}
              >
                {SITE.demoUrl.replace('https://', '')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </a>
            </div>

            {/* Phone mockup */}
            <div className={styles.phoneDevice}>
              {/* Phone frame */}
              <div style={{
                width: 280, borderRadius: 40, background: '#111',
                padding: 10,
                boxShadow: '0 32px 64px rgba(0,0,0,0.25)',
              }}>
                {/* Notch */}
                <div style={{
                  height: 28, background: '#111',
                  borderRadius: '30px 30px 0 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#333' }} />
                </div>
                {/* Screen */}
                <div style={{
                  borderRadius: 32, overflow: 'hidden', background: '#FAFAF8',
                  height: 520, overflowY: 'auto',
                  scrollbarWidth: 'none',
                }}>
                  {/* Cover */}
                  <div style={{ position: 'relative', height: 110 }}>
                    <img
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=70"
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55))',
                    }} />
                    {/* Header overlay */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '0 12px 10px',
                      display: 'flex', alignItems: 'flex-end', gap: 8,
                    }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 10,
                        background: 'var(--mq-slate)', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Lora, Georgia, serif', color: '#fff', fontWeight: 700, fontSize: 18,
                      }}>L</div>
                      <div>
                        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>La Estancia</div>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, lineHeight: 1.3 }}>Cocina paraguaya</div>
                      </div>
                    </div>
                  </div>
                  {/* Pills */}
                  <div style={{ display: 'flex', gap: 6, padding: '10px 12px', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {['Entradas', 'Principales', 'Postres', 'Bebidas'].map((cat, i) => (
                      <div key={cat} style={{
                        padding: '5px 12px', borderRadius: 99, fontSize: 11, whiteSpace: 'nowrap',
                        background: i === 0 ? 'var(--mq-slate-deep)' : '#EDE9E3',
                        color: i === 0 ? '#fff' : 'var(--mq-ink-soft)',
                        fontWeight: 500,
                      }}>{cat}</div>
                    ))}
                  </div>
                  {/* Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '0 10px 16px' }}>
                    {[
                      { img: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=200&q=60', name: 'Empanadas de Carne', price: 'Gs. 18.000' },
                      { img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=60', name: 'Sopa Paraguaya', price: 'Gs. 12.000' },
                      { img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&q=60', name: 'Mandioca Frita', price: 'Gs. 15.000' },
                      { img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=200&q=60', name: 'Asado de Tira', price: 'Gs. 85.000' },
                    ].map((item) => (
                      <div key={item.name} style={{
                        background: '#fff', borderRadius: 10, overflow: 'hidden',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                      }}>
                        <img src={item.img} alt="" style={{ width: '100%', height: 58, objectFit: 'cover', display: 'block' }} />
                        <div style={{ padding: '6px 8px' }}>
                          <div style={{ fontFamily: 'Lora, Georgia, serif', fontSize: 9.5, fontWeight: 700, color: '#1C1410', marginBottom: 2 }}>{item.name}</div>
                          <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--mq-slate-deep)' }}>{item.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── CÓMO FUNCIONA ── */}
      <section className={styles.howSection} id="como">
        <div className={styles.sectionHead}>
          <div className={styles.sectionEyebrow}>Cómo funciona</div>
          <h2 className={`${styles.sectionTitle} ${styles.serif}`}>
            Tres pasos. <span className={styles.accent}>Sin técnicos.</span>
          </h2>
          <p className={styles.sectionSub}>
            Cargás tu menú una vez. Lo actualizás cuando quieras. Tus clientes lo ven al instante.
          </p>
        </div>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={`${styles.stepNum} ${styles.serif}`}>01<sup>·</sup></div>
            <div className={styles.stepTitle}>Cargá tu menú</div>
            <div className={styles.stepDesc}>Categorías, platos, fotos y precios. Todo desde tu celular o computadora, en minutos.</div>
          </div>
          <div className={styles.step}>
            <div className={`${styles.stepNum} ${styles.serif}`}>02<sup>·</sup></div>
            <div className={styles.stepTitle}>Imprimí tu QR</div>
            <div className={styles.stepDesc}>Descargás el QR en PNG o PDF. Lo pegás en las mesas, mostrador o el frente del local.</div>
          </div>
          <div className={styles.step}>
            <div className={`${styles.stepNum} ${styles.serif}`}>03<sup>·</sup></div>
            <div className={styles.stepTitle}>Recibí pedidos</div>
            <div className={styles.stepDesc}>Tus clientes escanean, eligen y te mandan el pedido por WhatsApp con el total armado.</div>
          </div>
        </div>
      </section>

      {/* ── FUNCIONES ── */}
      <section className={styles.featuresSection} id="funciones">
        <div className={styles.sectionHead}>
          <div className={styles.sectionEyebrow}>Funciones</div>
          <h2 className={`${styles.sectionTitle} ${styles.serif}`}>
            Lo que <span className={styles.accent}>de verdad</span> necesitás.
          </h2>
          <p className={styles.sectionSub}>
            Nada de funciones que sólo confunden. Todo lo justo para vender más sin complicarte.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <div className={styles.featureTitle}>Menú al instante</div>
            <div className={styles.featureDesc}>Tus clientes apuntan la cámara y ven tus platos en 2 segundos. Sin descargar nada.</div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </div>
            <div className={styles.featureTitle}>Cambios al toque</div>
            <div className={styles.featureDesc}>¿Se agotó algo? Lo marcás y tus clientes lo ven al instante. No reimprimís nada.</div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div className={styles.featureTitle}>Pedidos por WhatsApp</div>
            <div className={styles.featureDesc}>Tus clientes te mandan el pedido armado, con productos y total. Vos sólo confirmás.</div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/>
                <circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
              </svg>
            </div>
            <div className={styles.featureTitle}>Tu identidad</div>
            <div className={styles.featureDesc}>Logo, foto de portada y color de marca propio. No un template genérico.</div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
            </div>
            <div className={styles.featureTitle}>QR para imprimir</div>
            <div className={styles.featureDesc}>Descargá tu QR en PNG o PDF, listo para mesas, mostrador o redes sociales.</div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <div className={styles.featureTitle}>Soporte en español</div>
            <div className={styles.featureDesc}>Si tenés una duda, te respondemos por WhatsApp. Sin tickets, sin formularios.</div>
          </div>
        </div>
      </section>

      {/* ── ANALYTICS ── */}
      <section className={styles.analyticsSection} id="analytics">
        <div className={styles.sectionHead}>
          <div className={styles.sectionEyebrow}>Analytics</div>
          <h2 className={`${styles.sectionTitle} ${styles.serif}`}>
            Sabé exactamente <span className={styles.accent}>qué funciona</span> en tu menú
          </h2>
          <p className={styles.sectionSub}>
            Mirá cuánta gente visita tu menú, qué platos ven más y cuántos te contactaron por WhatsApp. Todo en tu panel.
          </p>
        </div>

        <div className={styles.analyticsCols}>
          {/* Features */}
          <div className={styles.analyticsFeatures}>
            <div className={styles.analyticsFeature}>
              <div className={styles.analyticsFeatureIcon}>👁</div>
              <div>
                <div className={styles.analyticsFeatureTitle}>Visitas en tiempo real</div>
                <div className={styles.analyticsFeatureDesc}>Cuánta gente entró a tu menú hoy, esta semana y este mes.</div>
              </div>
            </div>
            <div className={styles.analyticsFeature}>
              <div className={styles.analyticsFeatureIcon}>🍽</div>
              <div>
                <div className={styles.analyticsFeatureTitle}>Platos más vistos</div>
                <div className={styles.analyticsFeatureDesc}>Sabés qué le llama la atención a tus clientes antes de que pidan.</div>
              </div>
            </div>
            <div className={styles.analyticsFeature}>
              <div className={styles.analyticsFeatureIcon}>💬</div>
              <div>
                <div className={styles.analyticsFeatureTitle}>Clicks a WhatsApp</div>
                <div className={styles.analyticsFeatureDesc}>Cuántos visitantes pasaron a la acción y te contactaron.</div>
              </div>
            </div>
          </div>

          {/* Mockup */}
          <div className={styles.analyticsMockup}>
            <div className={styles.analyticsMockupCard}>
              <div className={styles.analyticsMockupHeader}>
                <span className={styles.analyticsMockupTitle}>Analytics</span>
                <span className={styles.analyticsMockupSub}>Últimos 30 días</span>
              </div>
              <div className={styles.analyticsMockupStats}>
                <div className={styles.analyticsStat}>
                  <div className={styles.analyticsStatNum}>847</div>
                  <div className={styles.analyticsStatLabel}>visitas este mes</div>
                </div>
                <div className={styles.analyticsStat}>
                  <div className={styles.analyticsStatNum}>23%</div>
                  <div className={styles.analyticsStatLabel}>conversión</div>
                </div>
                <div className={styles.analyticsStat}>
                  <div className={styles.analyticsStatNum}>5</div>
                  <div className={styles.analyticsStatLabel}>platos top</div>
                </div>
              </div>
              {/* Mini bar chart */}
              <div className={styles.analyticsMiniChart}>
                {[40, 65, 50, 80, 55, 95, 70].map((h, i) => (
                  <div key={i} className={styles.analyticsMiniBar} style={{ height: h * 0.6 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRECIO ── */}
      <section className={styles.pricingSection} id="precio">
        <div className={styles.sectionHead}>
          <div className={styles.sectionEyebrow}>Precio</div>
          <h2 className={`${styles.sectionTitle} ${styles.serif}`}>
            Un solo plan, <span className={styles.accent}>todo incluido.</span>
          </h2>
          <p className={styles.sectionSub}>Sin tarifas ocultas, sin dólares, sin sorpresas. Cancelás cuando quieras.</p>
        </div>

        <div className={styles.priceCard}>
          <div className={styles.priceRibbon}>14 días gratis</div>
          <div className={styles.priceName}>Plan Restaurante</div>
          <div className={styles.priceAmount}>
            <span className={styles.num}>40.000</span>
            <span className={styles.currency}>Gs. / mes</span>
          </div>
          <div className={styles.pricePeriod}>
            Probalo <strong style={{ color: 'var(--mq-slate-deep)' }}>14 días gratis</strong> · sin tarjeta de crédito
          </div>

          <ul className={styles.priceFeatures}>
            <li><CheckIcon />Platos y categorías ilimitadas</li>
            <li><CheckIcon />Tu logo, color de marca y foto de portada</li>
            <li><CheckIcon />QR descargable en PNG y PDF imprimible</li>
            <li><CheckIcon />Pedidos por WhatsApp con carrito armado</li>
            <li><CheckIcon />Cambios en tiempo real desde tu celular</li>
            <li><CheckIcon />Soporte por WhatsApp en español</li>
          </ul>

          <button className={styles.priceCta} onClick={openModal}>
            Empezar mis 14 días gratis
          </button>
          <p className={styles.priceNote}>Después: Gs. 40.000/mes · Pago por transferencia o QR local</p>
        </div>
      </section>

      {/* ── DEMO CTA ── */}
      <section className={styles.demoCta}>
        <div className={styles.demoCtaText}>
          <div className={styles.sectionEyebrow}>Ver en acción</div>
          <h2 className={`${styles.sectionTitle} ${styles.serif}`}>
            Probá la <span className={styles.accent}>demo real</span> antes de crear tu cuenta.
          </h2>
          <p>Es un menú vivo, con carrito, fotos y todo. Como lo vería tu cliente al escanear el QR de tu mesa.</p>
          <a className={styles.demoCtaLink} href={SITE.demoUrl} target="_blank" rel="noopener noreferrer">
            Abrir la demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </a>
        </div>
        <div className={styles.demoCtaVisual}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: 24,
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            border: '1px solid var(--mq-line)',
          }}>
            <QRCodeSVG
              value={SITE.demoUrl}
              size={160}
              fgColor="var(--mq-slate-deep)"
              bgColor="#ffffff"
              level="M"
            />
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--mq-ink-soft)' }}>
              menuqr.lat/la-burger-co
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <BrandLogo qrSize={26} fontSize={17} />
        </div>
        <div className={styles.footLinks}>
          <a href="#como">Cómo funciona</a>
          <a href="#funciones">Funciones</a>
          <a href="#precio">Precio</a>
          <a href={SITE.demoUrl} target="_blank" rel="noopener noreferrer">Demo</a>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <div className={styles.footCopy}>© 2026 MenuQR · Asunción, Paraguay</div>
      </footer>

      {/* ── MODAL ── */}
      {showModal && <StartModal onClose={() => setShowModal(false)} onLogin={() => navigate(SITE.loginUrl)} />}

    </div>
  )
}
