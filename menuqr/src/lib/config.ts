export const APP_URL = import.meta.env.VITE_APP_URL ?? 'http://localhost:5173'

export function menuUrl(slug: string): string {
  return `${APP_URL}/menu/${slug}`
}
