import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { isDemoMode, loginDemo } from '../../lib/mock-auth'
import { supabase } from '../../lib/supabase'

function LogoMark({ height = 32 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 168 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: 'auto' }}>
      <g>
        <rect x="0" y="2" width="11" height="11" rx="1.5" fill="#FBF4E2"/>
        <rect x="2.5" y="4.5" width="6" height="6" fill="#1A3329"/>
        <rect x="4.25" y="6.25" width="2.5" height="2.5" fill="#FBF4E2"/>
        <rect x="17" y="2" width="11" height="11" rx="1.5" fill="#FBF4E2"/>
        <rect x="19.5" y="4.5" width="6" height="6" fill="#1A3329"/>
        <rect x="21.25" y="6.25" width="2.5" height="2.5" fill="#FBF4E2"/>
        <rect x="0" y="19" width="11" height="11" rx="1.5" fill="#E54A24"/>
        <rect x="2.5" y="21.5" width="6" height="6" fill="#1A3329"/>
        <rect x="4.25" y="23.25" width="2.5" height="2.5" fill="#E54A24"/>
        <rect x="14" y="15" width="3" height="3" fill="#FBF4E2"/>
        <rect x="19" y="17" width="3" height="3" fill="#FBF4E2"/>
        <rect x="14" y="20" width="3" height="3" fill="#E54A24"/>
        <rect x="19" y="22" width="3" height="3" fill="#FBF4E2"/>
        <rect x="24" y="17" width="4" height="4" fill="#FBF4E2"/>
        <rect x="24" y="24" width="4" height="4" fill="#FBF4E2"/>
        <rect x="19" y="27" width="3" height="3" fill="#E54A24"/>
      </g>
      <text x="38" y="23" fontFamily='"Bricolage Grotesque",sans-serif' fontWeight={800} fontSize={22} letterSpacing="-0.04em" fill="#FBF4E2">
        menu<tspan fill="#E8B23A">qr</tspan>
      </text>
    </svg>
  )
}

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function doLogin(loginEmail: string, loginPassword: string) {
    setError(null)
    setLoading(true)

    if (isDemoMode()) {
      const result = await loginDemo(loginEmail, loginPassword)
      if ('error' in result) {
        setError(result.error)
        setLoading(false)
        return
      }
      window.location.replace('/admin')
      return
    }

    const { error: authError } = await supabase!.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    })

    if (authError) {
      setError('Email o contraseña incorrectos.')
      setLoading(false)
      return
    }

    window.location.replace('/admin')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await doLogin(email, password)
  }

  const handleDemoLogin = () => doLogin('demo@menuqr.com', 'demo1234')

  const fieldInput: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    background: '#FFFCF4',
    border: '1.5px solid #161310',
    fontFamily: 'inherit', fontSize: 15, fontWeight: 500, color: '#161310',
    borderRadius: 0, outline: 'none',
    transition: 'box-shadow .12s',
    boxShadow: '3px 3px 0 #161310',
    boxSizing: 'border-box' as const,
  }

  return (
    <div className="mercado" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', fontFamily: '"Hanken Grotesk","Helvetica Neue",sans-serif' }}>

      {/* ── LEFT brand panel ── */}
      <aside style={{
        background: 'var(--forest)', color: 'var(--butter)',
        padding: '40px 56px',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        borderRight: '1.5px solid #161310',
      }}>
        {/* decorative gradients */}
        <div style={{ position: 'absolute', top: -200, right: -200, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,178,58,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -150, left: -150, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,74,36,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
          <Link to="/" aria-label="MenuQR"><LogoMark height={32} /></Link>
          <Link to="/" style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 12, color: 'rgba(251,244,226,0.6)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            ← volver al sitio
          </Link>
        </div>

        {/* middle */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2, padding: '48px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 99, background: 'rgba(232,178,58,0.16)', border: '1px solid rgba(232,178,58,0.3)', color: 'var(--dijon)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 28, width: 'fit-content' }}>
            <span className="lp-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--dijon)' }} />
            Panel del local
          </div>

          <h2 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 'clamp(40px,4.6vw,68px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: 20, color: 'var(--butter)', margin: '0 0 20px' }}>
            Tu cocina,<br />
            <em style={{ fontStyle: 'italic', color: 'var(--dijon)' }}>tu menú,</em><br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              tu ritmo.
              <span style={{ content: '""', position: 'absolute', left: '-2%', right: '-2%', bottom: '6%', height: '14%', background: 'var(--paprika)', zIndex: -1, borderRadius: 4, transform: 'rotate(-1deg)', display: 'block' }} />
            </span>
          </h2>

          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(251,244,226,0.72)', maxWidth: 440, fontWeight: 500, margin: '20px 0 0' }}>
            Cambiá precios, marcá platos como agotados y descargá tu QR — todo desde el mismo celular con el que mandás los pedidos.
          </p>

          {/* receipt */}
          <div style={{ marginTop: 36, maxWidth: 380, background: 'rgba(22,19,16,0.35)', border: '1px solid rgba(251,244,226,0.12)', padding: '20px 22px' }}>
            <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--dijon)', marginBottom: 14 }}>— En tu panel —</div>
            {[
              ['Platos del día', 'editar →'],
              ['QR para imprimir', 'PNG · PDF'],
              ['Pedidos por WhatsApp', 'en vivo'],
              ['Tu marca', 'logo · color'],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-end', fontSize: 13, color: 'rgba(251,244,226,0.85)', marginBottom: 8 }}>
                <span style={{ fontWeight: 500 }}>{label}</span>
                <span style={{ flex: 1, borderBottom: '1.5px dotted rgba(251,244,226,0.2)', margin: '0 8px', alignSelf: 'flex-end', height: 8 }} />
                <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, fontWeight: 600, color: 'var(--dijon)', whiteSpace: 'nowrap' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* bottom */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: 'rgba(251,244,226,0.4)', letterSpacing: '0.04em' }}>
          <span>© 2026 MenuQR</span>
          <span>🇵🇾 Hecho en Asunción</span>
        </div>
      </aside>

      {/* ── RIGHT form panel ── */}
      <section style={{ background: 'var(--butter)', padding: '56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* 14 días gratis stamp */}
        <div style={{ position: 'absolute', top: 32, left: 32, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'var(--dijon)', color: '#161310', fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', border: '1.5px solid #161310', transform: 'rotate(-3deg)', boxShadow: '3px 3px 0 #161310', zIndex: 5 }}>
          ✦ 14 días gratis
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 13.5, color: '#5A4E40', fontWeight: 500 }}>
          <span>¿Todavía no tenés cuenta?</span>
          <Link to="/" style={{ color: 'var(--paprika)', textDecoration: 'none', fontWeight: 700, marginLeft: 6 }}>Empezá gratis →</Link>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 420, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--paprika)', marginBottom: 16 }}>
            <span style={{ width: 24, height: 1.5, background: 'var(--paprika)', display: 'inline-block' }} />
            Acceso · Restaurante
          </div>

          <h1 style={{ fontFamily: '"Bricolage Grotesque",sans-serif', fontSize: 44, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.035em', marginBottom: 12, color: '#161310', margin: '0 0 12px' }}>
            Bienvenido<br />de vuelta.
          </h1>
          <p style={{ fontSize: 15.5, color: '#5A4E40', lineHeight: 1.5, marginBottom: 32, fontWeight: 500, margin: '0 0 32px' }}>
            Ingresá a tu panel para administrar tu menú, ver pedidos y bajar tu QR.
          </p>

          {error && (
            <div style={{ marginBottom: 16, padding: '12px 16px', background: '#FEF0EC', border: '1px solid #F5C6B0', borderRadius: 0, fontSize: 13.5, color: '#B43417', fontWeight: 500 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#161310', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                Email
              </label>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hola@turestaurante.com"
                autoComplete="email"
                style={fieldInput}
                onFocus={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 var(--paprika)' }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = '3px 3px 0 #161310' }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#161310', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Contraseña
                </label>
                <a href="#" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--paprika)', textDecoration: 'none' }}>¿La olvidaste?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  style={{ ...fieldInput, paddingRight: 48 }}
                  onFocus={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 var(--paprika)' }}
                  onBlur={(e) => { e.currentTarget.style.boxShadow = '3px 3px 0 #161310' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  aria-label="Mostrar/ocultar contraseña"
                  style={{ position: 'absolute', top: '50%', right: 14, transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#5A4E40', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{ width: '100%', padding: 17, border: '1.5px solid #161310', background: loading ? '#C0A090' : 'var(--paprika)', color: '#FFFCF4', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: '"Bricolage Grotesque",sans-serif', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', letterSpacing: '0.06em', transition: 'transform .12s, box-shadow .12s', boxShadow: '5px 5px 0 #161310', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '7px 7px 0 #161310' } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '5px 5px 0 #161310' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '2px 2px 0 #161310' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '7px 7px 0 #161310' }}
            >
              {loading ? 'Ingresando…' : (
                <>
                  Ingresar al panel
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0', fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: '#5A4E40', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              <span style={{ flex: 1, height: 1, background: '#D8C9A1' }} />
              o continuá con
              <span style={{ flex: 1, height: 1, background: '#D8C9A1' }} />
            </div>

            {/* Demo button */}
            <button
              type="button" disabled={loading}
              onClick={handleDemoLogin}
              style={{ width: '100%', padding: 14, border: '1.5px solid #161310', background: '#FFFCF4', cursor: loading ? 'not-allowed' : 'pointer', color: '#161310', fontFamily: 'inherit', fontWeight: 600, fontSize: 14.5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'background .15s, transform .12s, box-shadow .12s', boxShadow: '3px 3px 0 #161310' }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '4px 4px 0 #161310' } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '3px 3px 0 #161310' }}
            >
              Probar con cuenta demo
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 28, fontSize: 13.5, color: '#5A4E40', fontWeight: 500 }}>
            ¿Sos cliente y querés ver el menú?{' '}
            <Link to={`/menu/la-burger-co`} style={{ color: 'var(--paprika)', textDecoration: 'none', fontWeight: 700 }}>
              Andá al menú →
            </Link>
          </div>

          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5, color: '#5A4E40', textAlign: 'center', marginTop: 24, letterSpacing: '0.04em', lineHeight: 1.5 }}>
            AL INGRESAR ACEPTÁS NUESTROS{' '}
            <a href="#" style={{ color: '#161310', textDecoration: 'underline' }}>TÉRMINOS</a>
            {' · '}
            <a href="#" style={{ color: '#161310', textDecoration: 'underline' }}>PRIVACIDAD</a>
          </div>
        </div>
      </section>

      {/* Responsive collapse to 1 col on mobile */}
      <style>{`
        @media (max-width: 980px) {
          .mercado > aside,
          .mercado > section { padding: 32px 28px !important; }
          .mercado > aside { min-height: auto; }
        }
        @media (max-width: 980px) {
          div[style*="grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
