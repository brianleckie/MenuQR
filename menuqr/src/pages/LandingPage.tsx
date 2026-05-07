import { Link, useNavigate } from 'react-router-dom'
import { SITE } from '../lib/site'
import styles from './LandingPage.module.css'

// Logo SVG inline — reemplazar cuando haya logo definitivo
const LogoSVG = () => (
  <svg width="120" height="65" viewBox="0 0 1380 752" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0,752) scale(0.1,-0.1)" fill="currentColor" stroke="none">
      <path d="M3475 5130 c-65 -8 -133 -25 -142 -34 -10 -10 23 -7 52 4 36 14 455 20 530 8 77 -12 101 -35 126 -124 l19 -69 -6 55 c-14 142 -52 161 -329 165 -104 2 -217 0 -250 -5z"/>
      <path d="M3392 4550 c12 -37 58 -72 118 -91 58 -18 260 -18 315 1 42 14 105 56 105 71 0 5 -9 0 -20 -11 -29 -29 -63 -40 -154 -50 -94 -11 -253 3 -297 26 -17 8 -40 31 -51 50 -25 42 -30 43 -16 4z"/>
      <path d="M4680 3149 c-115 -14 -225 -87 -294 -198 -14 -22 -26 -44 -26 -48 0 -5 11 9 24 31 80 129 202 197 344 192 80 -3 179 -30 208 -56 30 -29 41 -24 13 6 -56 61 -153 87 -269 73z"/>
      <path d="M3406 3134 c-65 -20 -53 -27 25 -14 37 6 153 10 274 8 201 -3 212 -4 259 -28 26 -13 54 -34 62 -45 10 -14 14 -15 14 -5 -1 37 -44 66 -129 86 -81 19 -439 18 -505 -2z"/>
      <path d="M5318 3135 c-76 -19 -140 -50 -169 -82 l-24 -27 32 22 c17 12 71 35 120 51 77 26 101 29 193 27 124 -2 209 -29 252 -81 10 -11 17 -15 18 -10 0 21 -32 55 -78 82 -43 26 -56 28 -167 30 -78 2 -140 -3 -177 -12z"/>
    </g>
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export function LandingPage() {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: pasar nombre como query param cuando el onboarding lo soporte
    navigate(SITE.loginUrl)
  }

  const scrollToPricing = () => {
    document.getElementById('precio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.page}>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <LogoSVG />
        </div>
        <div className={styles.navLinks}>
          <a href="#como">Cómo funciona</a>
          <a href="#funciones">Funciones</a>
          <a href="#precio">Precio</a>
          <a href="#demo">Demo</a>
        </div>
        <button className={styles.btnNav} onClick={scrollToPricing}>Empezar</button>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>Hecho en Paraguay · 100% en guaraníes</div>

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
            Generar mi QR
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

        {/* ── DEMO STAGE ── */}
        <div className={styles.demoStage} id="demo">
          <div className={styles.demoPaper} />

          <div className={styles.demoPhone}>
            <div className={styles.demoPhoneScreen}>
              <div className={styles.dpCover} />
              <div className={styles.dpHeader}>
                <div className={styles.dpLogo}>L</div>
                <div className={styles.dpName}>La Estancia</div>
              </div>
              <div className={styles.dpPills}>
                <div className={`${styles.dpPill} ${styles.dpPillActive}`}>Entradas</div>
                <div className={styles.dpPill}>Principales</div>
                <div className={styles.dpPill}>Postres</div>
              </div>
              <div className={styles.dpGrid}>
                <div className={styles.dpCard}>
                  <div className={styles.dpCardImg}>
                    <img src="https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=200&q=60" alt="" />
                  </div>
                  <div className={styles.dpCardBody}>
                    <div className={styles.dpCardName}>Empanadas</div>
                    <div className={styles.dpCardPrice}>Gs. 18.000</div>
                  </div>
                </div>
                <div className={styles.dpCard}>
                  <div className={styles.dpCardImg}>
                    <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=60" alt="" />
                  </div>
                  <div className={styles.dpCardBody}>
                    <div className={styles.dpCardName}>Sopa Paraguaya</div>
                    <div className={styles.dpCardPrice}>Gs. 12.000</div>
                  </div>
                </div>
                <div className={styles.dpCard}>
                  <div className={styles.dpCardImg}>
                    <img src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&q=60" alt="" />
                  </div>
                  <div className={styles.dpCardBody}>
                    <div className={styles.dpCardName}>Mandioca</div>
                    <div className={styles.dpCardPrice}>Gs. 15.000</div>
                  </div>
                </div>
                <div className={styles.dpCard}>
                  <div className={styles.dpCardImg}>
                    <img src="https://images.unsplash.com/photo-1558030006-450675393462?w=200&q=60" alt="" />
                  </div>
                  <div className={styles.dpCardBody}>
                    <div className={styles.dpCardName}>Asado de Tira</div>
                    <div className={styles.dpCardPrice}>Gs. 85.000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.demoQr}>
            <div className={styles.demoQrLabel}>Tu QR</div>
            <div className={styles.demoQrCode}>
              <svg width="124" height="124" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <rect width="21" height="21" fill="#fff"/>
                <g fill="#5C6D7E">
                  <rect x="0" y="0" width="7" height="7"/>
                  <rect x="14" y="0" width="7" height="7"/>
                  <rect x="0" y="14" width="7" height="7"/>
                </g>
                <g fill="#fff">
                  <rect x="1" y="1" width="5" height="5"/>
                  <rect x="15" y="1" width="5" height="5"/>
                  <rect x="1" y="15" width="5" height="5"/>
                </g>
                <g fill="#5C6D7E">
                  <rect x="2" y="2" width="3" height="3"/>
                  <rect x="16" y="2" width="3" height="3"/>
                  <rect x="2" y="16" width="3" height="3"/>
                  <rect x="8" y="0" width="2" height="2"/>
                  <rect x="11" y="1" width="2" height="2"/>
                  <rect x="8" y="4" width="3" height="2"/>
                  <rect x="9" y="8" width="2" height="3"/>
                  <rect x="12" y="9" width="2" height="2"/>
                  <rect x="15" y="8" width="2" height="2"/>
                  <rect x="14" y="11" width="3" height="2"/>
                  <rect x="18" y="10" width="3" height="2"/>
                  <rect x="8" y="14" width="2" height="2"/>
                  <rect x="11" y="15" width="2" height="3"/>
                  <rect x="14" y="16" width="2" height="2"/>
                  <rect x="17" y="14" width="2" height="4"/>
                </g>
                <rect x="9" y="3" width="2" height="2" fill="#C99458"/>
                <rect x="13" y="13" width="2" height="2" fill="#C99458"/>
              </svg>
            </div>
            <div className={styles.demoQrUrl}>menuqr.py/la-estancia</div>
          </div>
        </div>
      </section>

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
            Probalo <strong style={{ color: 'var(--slate-deep)' }}>14 días gratis</strong> · sin tarjeta de crédito
          </div>

          <ul className={styles.priceFeatures}>
            <li><CheckIcon />Platos y categorías ilimitadas</li>
            <li><CheckIcon />Tu logo, color de marca y foto de portada</li>
            <li><CheckIcon />QR descargable en PNG y PDF imprimible</li>
            <li><CheckIcon />Pedidos por WhatsApp con carrito armado</li>
            <li><CheckIcon />Cambios en tiempo real desde tu celular</li>
            <li><CheckIcon />Soporte por WhatsApp en español</li>
          </ul>

          <Link to={SITE.loginUrl} className={styles.priceCta}>
            Empezar mis 14 días gratis
          </Link>
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
          <span className={styles.comment}># Tu URL queda así</span><br />
          <span className={styles.url}>menuqr.py/<strong>tu-restaurante</strong></span><br /><br />
          <span className={styles.comment}># Tu QR apunta acá</span><br />
          <span>⬛⬜⬛⬛⬜⬛⬛<br />⬜⬛⬜⬜⬛⬜⬛<br />⬛⬛⬜⬛⬜⬛⬜<br />⬜⬛⬛⬜⬛⬛⬛</span>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <LogoSVG />
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

    </div>
  )
}
