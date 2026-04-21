import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { isDemoMode, getDemoUser, logoutDemo } from '../lib/mock-auth'
import type { AuthUser } from '../types'

interface AuthContextValue {
  /** null = sin sesión, undefined = cargando todavía */
  user: AuthUser | null | undefined
  session: Session | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined)

  useEffect(() => {
    if (isDemoMode()) {
      setUser(getDemoUser())
      setSession(null)
      return
    }

    supabase!.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(
        data.session?.user
          ? { id: data.session.user.id, email: data.session.user.email ?? null }
          : null
      )
    })

    const {
      data: { subscription },
    } = supabase!.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(
        newSession?.user
          ? { id: newSession.user.id, email: newSession.user.email ?? null }
          : null
      )
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    if (isDemoMode()) {
      logoutDemo()
      setUser(null)
      return
    }
    await supabase!.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return ctx
}
