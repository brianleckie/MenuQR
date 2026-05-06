/**
 * Auto-generated types from Supabase schema.
 *
 * Día 2: una vez que ejecutes el SQL en el dashboard, corrés:
 *   npx supabase gen types typescript --project-id <id> > src/lib/database.types.ts
 *
 * Por ahora este placeholder mantiene TypeScript feliz.
 */
export type Database = {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string
          owner_id: string
          slug: string
          name: string
          tagline: string | null
          logo_url: string | null
          cover_url: string | null
          primary_color: string
          whatsapp: string | null
          address: string | null
          hours: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['businesses']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<Database['public']['Tables']['businesses']['Insert']>
      }
      categories: {
        Row: {
          id: string
          business_id: string
          name: string
          sort_order: number
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['categories']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      items: {
        Row: {
          id: string
          business_id: string
          category_id: string
          name: string
          short_desc: string | null
          description: string | null
          price: number
          image_url: string | null
          image_gravity: string | null
          available: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['items']['Row'],
          'id' | 'created_at' | 'updated_at'
        >
        Update: Partial<Database['public']['Tables']['items']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
