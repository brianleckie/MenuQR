import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { AuthUser } from '../types'

// ─── Shape del contexto ───────────────────────────────────────────────────────
interface AuthContextValue {
  /** null = sin sesión, undefined = cargando todavía */
  user: AuthUser | null | undefined
  session: Session | null
  signOut: () => Promise<void>
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
/**
 * Analogía Python: esto es como un "middleware" que wrappea toda la app.
 * Cualquier componente hijo puede "importar" la sesión sin pasarla por props.
 *
 * En Python sería algo como un objeto global `current_user` que Flask/FastAPI
 * populan por vos en cada request.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  // undefined = todavía cargando; null = sin sesión; AuthUser = logueado
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined)

  useEffect(() => {
    // 1. Obtener sesión inicial (puede estar en localStorage)
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user
        ? { id: data.session.user.id, email: data.session.user.email ?? null }
        : null
      )
    })

    // 2. Suscribirse a cambios (login, logout, token refresh)
    //    Analogía: es como un event listener en Python — "cuando cambie la
    //    sesión, ejecutá este callback".
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession)
        setUser(newSession?.user
          ? { id: newSession.user.id, email: newSession.user.email ?? null }
          : null
        )
      }
    )

    // Cleanup: cancelar suscripción al desmontar
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return ctx
}
