/**
 * src/lib/queries.ts — Un hook por entidad usando TanStack Query.
 *
 * Analogía Python: como tener un services.py con funciones que hacen
 * fetch a la DB. TanStack Query agrega cache, loading states y re-fetch
 * automático — como requests.Session con retry y caché incorporados.
 *
 * Nota Día 2: cuando el schema esté en Supabase y corras
 * `supabase gen types`, el cliente quedará tipado y estos `as Type`
 * se pueden eliminar.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from './supabase'
import type { Business, Category, Item, MenuData } from '../types'

// ── Query keys ────────────────────────────────────────────────────────────────
// Analogía: son como las claves de un dict de caché. Si invalidás la clave,
// el próximo render hace un fetch fresco desde Supabase.
export const qk = {
  myBusiness:     (uid: string) => ['myBusiness', uid] as const,
  business:       (id: string)  => ['business', id] as const,
  businessBySlug: (slug: string)=> ['business', 'slug', slug] as const,
  categories:     (bId: string) => ['categories', bId] as const,
  items:          (bId: string) => ['items', bId] as const,
  menuData:       (slug: string)=> ['menuData', slug] as const,
}

// ── Business ──────────────────────────────────────────────────────────────────

export function useMyBusiness(ownerId: string | undefined) {
  return useQuery({
    queryKey: qk.myBusiness(ownerId ?? ''),
    enabled: !!ownerId,
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('businesses')
        .select('*')
        .eq('owner_id', ownerId!)
        .maybeSingle()
      if (error) throw error
      return data as Business | null
    },
  })
}

export function useUpdateBusiness() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string
      updates: Partial<Omit<Business, 'id' | 'owner_id' | 'created_at'>>
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('businesses')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data as Business
    },
    onSuccess: (data: Business) => {
      qc.invalidateQueries({ queryKey: qk.business(data.id) })
      qc.invalidateQueries({ queryKey: qk.businessBySlug(data.slug) })
      qc.invalidateQueries({ queryKey: qk.myBusiness(data.owner_id) })
    },
  })
}

// ── Categories ────────────────────────────────────────────────────────────────

export function useCategories(businessId: string | undefined) {
  return useQuery({
    queryKey: qk.categories(businessId ?? ''),
    enabled: !!businessId,
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('categories')
        .select('*')
        .eq('business_id', businessId!)
        .order('sort_order')
      if (error) throw error
      return data as Category[]
    },
  })
}

export function useCreateCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Omit<Category, 'id' | 'created_at'>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('categories')
        .insert(payload)
        .select()
        .single()
      if (error) throw error
      return data as Category
    },
    onSuccess: (data: Category) => {
      qc.invalidateQueries({ queryKey: qk.categories(data.business_id) })
    },
  })
}

export function useDeleteCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, businessId }: { id: string; businessId: string }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from('categories').delete().eq('id', id)
      if (error) throw error
      return { businessId }
    },
    onSuccess: ({ businessId }: { businessId: string }) => {
      qc.invalidateQueries({ queryKey: qk.categories(businessId) })
      qc.invalidateQueries({ queryKey: qk.items(businessId) })
    },
  })
}

// ── Items ─────────────────────────────────────────────────────────────────────

export function useItems(businessId: string | undefined) {
  return useQuery({
    queryKey: qk.items(businessId ?? ''),
    enabled: !!businessId,
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('items')
        .select('*')
        .eq('business_id', businessId!)
        .order('sort_order')
      if (error) throw error
      return data as Item[]
    },
  })
}

export function useUpsertItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (
      payload: Omit<Item, 'created_at' | 'updated_at'>
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('items')
        .upsert({ ...payload, updated_at: new Date().toISOString() })
        .select()
        .single()
      if (error) throw error
      return data as Item
    },
    onSuccess: (data: Item) => {
      qc.invalidateQueries({ queryKey: qk.items(data.business_id) })
      qc.invalidateQueries({ queryKey: qk.menuData('') })
    },
  })
}

export function useDeleteItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, businessId }: { id: string; businessId: string }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from('items').delete().eq('id', id)
      if (error) throw error
      return { businessId }
    },
    onSuccess: ({ businessId }: { businessId: string }) => {
      qc.invalidateQueries({ queryKey: qk.items(businessId) })
    },
  })
}

export function useToggleItemAvailability() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      available,
      businessId,
    }: {
      id: string
      available: boolean
      businessId: string
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('items')
        .update({ available, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (error) throw error
      return { businessId }
    },
    onSuccess: ({ businessId }: { businessId: string }) => {
      qc.invalidateQueries({ queryKey: qk.items(businessId) })
    },
  })
}

// ── Public menu (denormalizado) ───────────────────────────────────────────────

export function useMenuData(slug: string) {
  return useQuery({
    queryKey: qk.menuData(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 min de cache en la vista pública
    queryFn: async (): Promise<MenuData> => {
      // 1. Negocio por slug
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: business, error: bizErr } = await (supabase as any)
        .from('businesses')
        .select('*')
        .eq('slug', slug)
        .single()
      if (bizErr) throw bizErr

      // 2. Categorías + items en una sola query (join automático de Supabase)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: categories, error: catErr } = await (supabase as any)
        .from('categories')
        .select('*, items(*)')
        .eq('business_id', (business as Business).id)
        .order('sort_order')
      if (catErr) throw catErr

      // 3. Ordenar items dentro de cada categoría
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const enriched = (categories as any[]).map((cat: any) => ({
        ...cat,
        items: ((cat.items ?? []) as Item[]).sort(
          (a, b) => a.sort_order - b.sort_order
        ),
      }))

      return {
        business: business as Business,
        categories: enriched as MenuData['categories'],
      }
    },
  })
}
