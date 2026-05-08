// ─────────────────────────────────────────────
//  Global types for MenuQR
// ─────────────────────────────────────────────

/** One registered business / restaurant */
export interface Business {
  id: string;
  owner_id: string;         // auth.users.id
  slug: string;             // e.g. "la-estancia" → /menu/la-estancia
  name: string;
  tagline: string | null;
  logo_url: string | null;
  cover_url: string | null;
  primary_color: string;    // hex, e.g. "#D4622A" — applied as --brand-color
  whatsapp: string | null;  // full international number, e.g. "595981234567"
  address: string | null;
  hours: string | null;
  created_at: string;
  updated_at: string;
}

/** Menu section / tab */
export interface Category {
  id: string;
  business_id: string;
  name: string;
  sort_order: number;
  created_at: string;
}

/** A single dish / menu item */
export interface Item {
  id: string;
  business_id: string;
  category_id: string;
  name: string;
  short_desc: string | null;   // one-liner shown on card
  description: string | null;  // full description shown in modal
  price: number;               // in local currency (Gs.)
  image_url: string | null;    // always Cloudinary URL
  image_gravity: string | null;
  available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/** Shape returned by the public menu query — denormalised for convenience */
export interface MenuData {
  business: Business;
  categories: Array<
    Category & {
      items: Item[];
    }
  >;
}

/** Auth session shape we expose through AuthContext */
export interface AuthUser {
  id: string;
  email: string | null;
}

/** Generic API / mutation result */
export type MutationResult<T> =
  | { data: T; error: null }
  | { data: null; error: string }

export interface PageView {
  id: string
  business_id: string
  slug: string
  device: 'mobile' | 'desktop'
  viewed_at: string
}

export interface ItemView {
  id: string
  business_id: string
  item_id: string
  viewed_at: string
}

export interface WhatsappClick {
  id: string
  business_id: string
  item_id: string | null
  clicked_at: string
}

export interface AnalyticsSummary {
  totalVisits: number
  visitsToday: number
  visitsThisWeek: number
  visitsThisMonth: number
  whatsappTotal: number
  whatsappThisWeek: number
  conversionRate: number
  topItems: {
    item_id: string
    name: string
    image_url: string | null
    views: number
    whatsapp_clicks: number
  }[]
  visitsByDay: {
    date: string
    visits: number
  }[]
  deviceSplit: {
    mobile: number
    desktop: number
  }
};
