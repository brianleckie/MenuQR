import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from './supabase'
import type { Business, Category, Item, MenuData, AnalyticsSummary } from '../types'

// ── Query keys ────────────────────────────────────────────────────────────────
export const qk = {
  myBusiness:     (uid: string)  => ['myBusiness', uid] as const,
  business:       (id: string)   => ['business', id] as const,
  businessBySlug: (slug: string) => ['business', 'slug', slug] as const,
  categories:     (bId: string)  => ['categories', bId] as const,
  items:          (bId: string)  => ['items', bId] as const,
  menuData:       (slug: string) => ['menuData', slug] as const,
  analytics:      (businessId: string) => ['analytics', businessId] as const,
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

// ── Reorder ───────────────────────────────────────────────────────────────────

export function useReorderCategories() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      updates,
    }: {
      updates: { id: string; sort_order: number }[]
      businessId: string
    }) => {
      if (!supabase) throw new Error('Supabase not configured')
      const results = await Promise.all(
        updates.map(u =>
          supabase!.from('categories').update({ sort_order: u.sort_order }).eq('id', u.id)
        )
      )
      const failed = results.find(r => r.error)
      if (failed?.error) throw failed.error
    },
    onMutate: async ({ updates, businessId }) => {
      await qc.cancelQueries({ queryKey: qk.categories(businessId) })
      const prev = qc.getQueryData<Category[]>(qk.categories(businessId))
      const orderMap = new Map(updates.map(u => [u.id, u.sort_order]))
      qc.setQueryData<Category[]>(qk.categories(businessId), old =>
        old?.map(c => {
          const newOrder = orderMap.get(c.id)
          return newOrder !== undefined ? { ...c, sort_order: newOrder } : c
        })
      )
      return { prev }
    },
    onError: (err, { businessId }, ctx) => {
      console.error('Reorder categories failed:', err)
      if (ctx?.prev) qc.setQueryData(qk.categories(businessId), ctx.prev)
    },
  })
}

export function useReorderItems() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({
      updates,
    }: {
      updates: { id: string; sort_order: number }[]
      businessId: string
    }) => {
      if (!supabase) throw new Error('Supabase not configured')
      const results = await Promise.all(
        updates.map(u =>
          supabase!.from('items').update({ sort_order: u.sort_order }).eq('id', u.id)
        )
      )
      const failed = results.find(r => r.error)
      if (failed?.error) throw failed.error
    },
    onMutate: async ({ updates, businessId }) => {
      await qc.cancelQueries({ queryKey: qk.items(businessId) })
      const prev = qc.getQueryData<Item[]>(qk.items(businessId))
      const orderMap = new Map(updates.map(u => [u.id, u.sort_order]))
      qc.setQueryData<Item[]>(qk.items(businessId), old =>
        old?.map(item => {
          const newOrder = orderMap.get(item.id)
          return newOrder !== undefined ? { ...item, sort_order: newOrder } : item
        })
      )
      return { prev }
    },
    onError: (err, { businessId }, ctx) => {
      console.error('Reorder items failed:', err)
      if (ctx?.prev) qc.setQueryData(qk.items(businessId), ctx.prev)
    },
  })
}

// ── TRACK (fire-and-forget, nunca lanzan error al usuario) ──────

export async function trackPageView(businessId: string, slug: string) {
  if (!supabase) return
  const device = window.innerWidth < 768 ? 'mobile' : 'desktop'
  await supabase.from('page_views').insert({ business_id: businessId, slug, device })
}

export async function trackItemView(businessId: string, itemId: string) {
  if (!supabase) return
  await supabase.from('item_views').insert({ business_id: businessId, item_id: itemId })
}

export async function trackWhatsappClick(businessId: string, itemId: string | null) {
  if (!supabase) return
  await supabase.from('whatsapp_clicks').insert({ business_id: businessId, item_id: itemId })
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

// ── READ Analytics ───────────────────────────────────────────────────────────

export function useAnalytics(businessId: string | undefined) {
  return useQuery({
    queryKey: qk.analytics(businessId ?? ''),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 5,
    queryFn: async (): Promise<AnalyticsSummary> => {
      if (!supabase || !businessId) throw new Error('no supabase')

      const now = new Date()
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

      const [pvAll, pvToday, pvWeek, pvMonth, waAll, waWeek, itemViewsRaw, waItemsRaw, pvDays] =
        await Promise.all([
          supabase.from('page_views').select('id', { count: 'exact', head: true }).eq('business_id', businessId),
          supabase.from('page_views').select('id', { count: 'exact', head: true }).eq('business_id', businessId).gte('viewed_at', startOfToday),
          supabase.from('page_views').select('id', { count: 'exact', head: true }).eq('business_id', businessId).gte('viewed_at', sevenDaysAgo),
          supabase.from('page_views').select('id', { count: 'exact', head: true }).eq('business_id', businessId).gte('viewed_at', thirtyDaysAgo),
          supabase.from('whatsapp_clicks').select('id', { count: 'exact', head: true }).eq('business_id', businessId),
          supabase.from('whatsapp_clicks').select('id', { count: 'exact', head: true }).eq('business_id', businessId).gte('clicked_at', sevenDaysAgo),
          supabase.from('item_views').select('item_id').eq('business_id', businessId).gte('viewed_at', thirtyDaysAgo),
          supabase.from('whatsapp_clicks').select('item_id').eq('business_id', businessId).gte('clicked_at', thirtyDaysAgo),
          supabase.from('page_views').select('viewed_at, device').eq('business_id', businessId).gte('viewed_at', sevenDaysAgo),
        ])

      const viewCount: Record<string, number> = {}
      for (const v of itemViewsRaw.data ?? []) {
        if (v.item_id) viewCount[v.item_id] = (viewCount[v.item_id] ?? 0) + 1
      }
      const waCount: Record<string, number> = {}
      for (const w of waItemsRaw.data ?? []) {
        if (w.item_id) waCount[w.item_id] = (waCount[w.item_id] ?? 0) + 1
      }

      const topItemIds = Object.entries(viewCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id]) => id)

      const { data: itemsData } = topItemIds.length
        ? await supabase.from('items').select('id, name, image_url').in('id', topItemIds)
        : { data: [] }

      const topItems = topItemIds.map(id => ({
        item_id: id,
        name: itemsData?.find(i => i.id === id)?.name ?? 'Plato eliminado',
        image_url: itemsData?.find(i => i.id === id)?.image_url ?? null,
        views: viewCount[id] ?? 0,
        whatsapp_clicks: waCount[id] ?? 0,
      }))

      const dayMap: Record<string, number> = {}
      for (let i = 6; i >= 0; i--) {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        dayMap[d.toISOString().slice(0, 10)] = 0
      }
      for (const pv of pvDays.data ?? []) {
        const day = (pv.viewed_at as string).slice(0, 10)
        if (day in dayMap) dayMap[day]++
      }
      const visitsByDay = Object.entries(dayMap).map(([date, visits]) => ({ date, visits }))

      const allPvs = pvDays.data ?? []
      const mobileCount = allPvs.filter(p => p.device === 'mobile').length
      const desktopCount = allPvs.filter(p => p.device === 'desktop').length

      const visitsWeek = pvWeek.count ?? 0
      const waThisWeek = waWeek.count ?? 0

      return {
        totalVisits: pvAll.count ?? 0,
        visitsToday: pvToday.count ?? 0,
        visitsThisWeek: visitsWeek,
        visitsThisMonth: pvMonth.count ?? 0,
        whatsappTotal: waAll.count ?? 0,
        whatsappThisWeek: waThisWeek,
        conversionRate: visitsWeek > 0 ? Math.round((waThisWeek / visitsWeek) * 100) : 0,
        topItems,
        visitsByDay,
        deviceSplit: { mobile: mobileCount, desktop: desktopCount },
      }
    },
  })
}
