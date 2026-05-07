// Cambiar estos valores cuando se compre dominio propio
export const SITE = {
  appUrl: import.meta.env.VITE_APP_URL ?? 'https://menu-qr-sigma.vercel.app',
  demoUrl: 'https://menu-qr-sigma.vercel.app/menu/la-burger-co',
  whatsapp: import.meta.env.VITE_CONTACT_WHATSAPP ?? '595991234567',
  loginUrl: '/admin/login',
} as const
