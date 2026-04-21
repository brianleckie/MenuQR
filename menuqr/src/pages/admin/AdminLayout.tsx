import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const navItems = [
  { to: '/admin', label: 'Inicio', icon: '🏠', end: true },
  { to: '/admin/menu', label: 'Platos', icon: '🍽️', end: false },
  { to: '/admin/categories', label: 'Categorías', icon: '📋', end: false },
  { to: '/admin/qr', label: 'QR & Link', icon: '📷', end: false },
  { to: '/admin/settings', label: 'Ajustes', icon: '⚙️', end: false },
]

export function AdminLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="flex h-screen bg-stone-100 font-sans">
      {/* ── Sidebar ────────────────────────────────────────────────── */}
      <aside className="flex w-56 flex-col bg-stone-900 text-white">
        {/* Brand */}
        <div className="border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
              style={{ background: 'var(--brand-color, #D4622A)' }}
            >
              QR
            </div>
            <div>
              <p className="text-sm font-bold">MenuQR</p>
              <p className="text-xs text-white/40">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white/80',
                ].join(' ')
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Sign out */}
        <div className="border-t border-white/10 p-3">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-white/50 transition hover:text-white/80"
          >
            <span>🚪</span> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Main ───────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
