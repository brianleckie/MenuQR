import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Copy .env.example → .env.local and fill in the values.'
  )
}

/**
 * Supabase singleton client.
 *
 * Analogía Python: como `engine = create_engine(DATABASE_URL)` en SQLAlchemy —
 * se crea una vez al arrancar y se reutiliza en todo el proyecto.
 *
 * Nota: el genérico <Database> se activa en Día 2 cuando tengamos
 * el schema real y corramos `supabase gen types`.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})
