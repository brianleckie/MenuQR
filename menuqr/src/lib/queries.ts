import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from './supabase'
import type { Business, Category, Item, MenuData } from '../types'

// ── Query keys ────────────────────────────────────────────────────────────────
export const qk = {
  myBusiness:     (uid: string)  => ['myBusiness', uid] as const,
  business:       (id: string)   => ['business', id] as const,
  businessBySlug: (slug: string) => ['business', 'slug', slug] as const,
  categories:     (bId: string)  => ['categories', bId] as const,
  items:          (bId: string)  => ['items', bId] as const,
  menuData:       (slug: string) => ['menuData', slug] as const,
}

// ── Business ──────────────────────────────────────────────────────────────────

export function useMyBusiness(ownerId: string | undefined) {
  return useQuery({
    queryKey: qk.myBusiness(ownerId ?? ''),
    enabled: !!ownerId,
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
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
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
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

export function useCreateBusiness() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Omit<Business, 'id' | 'created_at' | 'updated_at'>) => {
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
        .from('businesses')
        .insert(payload)
        .select()
        .single()
      if (error) throw error
      return data as Business
    },
    onSuccess: (data: Business) => {
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
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
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
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
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
      if (!supabase) throw new Error('Supabase not configured')
      const { error } = await supabase.from('categories').delete().eq('id', id)
      if (error) throw error
      return { businessId }
    },
    onSuccess: ({ businessId }: { businessId: string }) => {
      qc.invalidateQueries({ queryKey: qk.categories(businessId) })
      qc.invalidateQueries({ queryKey: qk.items(businessId) })
    },
  })
}

export function useUpdateCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      name,
      businessId: _businessId,
    }: {
      id: string
      name: string
      businessId: string
    }) => {
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
        .from('categories')
        .update({ name })
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data as Category
    },
    onSuccess: (_data, { businessId }) => {
      qc.invalidateQueries({ queryKey: qk.categories(businessId) })
    },
  })
}

// ── Items ─────────────────────────────────────────────────────────────────────

export function useItems(businessId: string | undefined) {
  return useQuery({
    queryKey: qk.items(businessId ?? ''),
    enabled: !!businessId,
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
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
    mutationFn: async (payload: Omit<Item, 'created_at' | 'updated_at'>) => {
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
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
      if (!supabase) throw new Error('Supabase not configured')
      const { error } = await supabase.from('items').delete().eq('id', id)
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
      if (!supabase) throw new Error('Supabase not configured')
      const { error } = await supabase
        .from('items')
        .update({ available, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (error) throw error
      return { businessId }
    },
    onMutate: async ({ id, available, businessId }) => {
      await qc.cancelQueries({ queryKey: qk.items(businessId) })
      const prev = qc.getQueryData(qk.items(businessId))
      qc.setQueryData(qk.items(businessId), (old: Item[] | undefined) =>
        old?.map(item => item.id === id ? { ...item, available } : item)
      )
      return { prev }
    },
    onError: (_err, { businessId }, ctx) => {
      qc.setQueryData(qk.items(businessId), ctx?.prev)
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
    staleTime: 1000 * 60 * 5,
    queryFn: async (): Promise<MenuData> => {
      if (!supabase) throw new Error('Supabase not configured')

      const { data: business, error: bizErr } = await supabase
        .from('businesses')
        .select('*')
        .eq('slug', slug)
        .single()
      if (bizErr) throw bizErr

      const { data: categories, error: catErr } = await supabase
        .from('categories')
        .select('*, items(*)')
        .eq('business_id', (business as Business).id)
        .order('sort_order')
      if (catErr) throw catErr

      const enriched = (categories as Array<Category & { items: Item[] }>).map((cat) => ({
        ...cat,
        items: (cat.items ?? []).sort((a, b) => a.sort_order - b.sort_order),
      }))

      return {
        business: business as Business,
        categories: enriched,
      }
    },
  })
}
