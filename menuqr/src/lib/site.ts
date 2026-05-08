// VITE_APP_URL=https://menuqr.lat — actualizar en Vercel Dashboard → Settings → Environment Variables
export const SITE = {
  appUrl: 'https://menuqr.lat',
  demoUrl: 'https://menuqr.lat/menu/la-burger-co',
  whatsapp: import.meta.env.VITE_CONTACT_WHATSAPP ?? '595983763890',
  loginUrl: '/admin/login',
} as const
