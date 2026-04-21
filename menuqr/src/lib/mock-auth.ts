import type { AuthUser } from '../types'

const SESSION_KEY = 'menuqr_demo_session'
const DEMO_EMAIL = 'demo@menuqr.com'
const DEMO_PASSWORD = 'demo1234'

export const DEMO_USER: AuthUser = {
  id: 'demo-user-1',
  email: DEMO_EMAIL,
}

export function isDemoMode(): boolean {
  return !import.meta.env.VITE_SUPABASE_URL
}

export async function loginDemo(
  email: string,
  password: string
): Promise<{ user: AuthUser } | { error: string }> {
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(DEMO_USER))
    return { user: DEMO_USER }
  }
  return { error: 'Email o contraseña incorrectos.' }
}

export function logoutDemo(): void {
  sessionStorage.removeItem(SESSION_KEY)
}

export function getDemoUser(): AuthUser | null {
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}
