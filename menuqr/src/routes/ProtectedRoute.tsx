import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * Wrappea rutas que requieren autenticación.
 *
 * Analogía Python/Flask: es como el decorador @login_required.
 * Si no hay sesión → redirige a /admin/login.
 * Si todavía está cargando → muestra spinner (evita flash de redirect).
 *
 * Uso en el router:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/admin" element={<AdminLayout />} />
 *   </Route>
 */
export function ProtectedRoute() {
  const { user } = useAuth()

  // Todavía resolviendo sesión desde localStorage → no hacer nada todavía
  if (user === undefined) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-[var(--brand-color)]" />
      </div>
    )
  }

  // Sin sesión → al login
  if (user === null) {
    return <Navigate to="/admin/login" replace />
  }

  // Con sesión → renderizar el hijo (<Outlet /> = el componente de la ruta)
  return <Outlet />
}
