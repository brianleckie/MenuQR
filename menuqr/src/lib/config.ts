export const APP_URL = import.meta.env.VITE_APP_URL ?? 'https://menuqr.lat'

export function menuUrl(slug: string): string {
  return `${APP_URL}/menu/${slug}`
}
