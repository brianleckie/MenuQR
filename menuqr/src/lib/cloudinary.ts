type GravityOption =
  | 'auto' | 'face' | 'center'
  | 'north' | 'south' | 'east' | 'west'
  | 'north_east' | 'north_west' | 'south_east' | 'south_west'

/**
 * Inserta transformaciones de Cloudinary en una URL existente.
 * Solo actúa sobre URLs de Cloudinary — devuelve la URL original intacta
 * si es de otro origen (Unsplash, etc.) o si es null.
 */
export function optimizeImage(
  url: string | null,
  options?: {
    width?: number
    height?: number
    crop?: 'fill' | 'fit' | 'thumb'
    gravity?: GravityOption
  }
): string | null {
  if (!url || !url.includes('cloudinary.com')) return url

  const {
    width = 600,
    height,
    crop = 'fill',
    gravity = 'auto',
  } = options ?? {}

  const transforms = [
    'f_auto',
    'q_auto',
    `w_${width}`,
    height ? `h_${height}` : null,
    `c_${crop}`,
    `g_${gravity}`,
  ]
    .filter(Boolean)
    .join(',')

  return url.replace('/upload/', `/upload/${transforms}/`)
}

/** Presets listos para usar en el proyecto */
export const imgPresets = {
  /** Cards de platos — 3:2, 600×400 */
  dishCard: (url: string | null) =>
    optimizeImage(url, { width: 600, height: 400, crop: 'fill', gravity: 'auto' }),

  /** Modal de plato — 16:9, 800×450 */
  dishModal: (url: string | null) =>
    optimizeImage(url, { width: 800, height: 450, crop: 'fill', gravity: 'auto' }),

  /** Cover del negocio — ancho completo, 1200×400 */
  cover: (url: string | null) =>
    optimizeImage(url, { width: 1200, height: 400, crop: 'fill', gravity: 'auto' }),

  /** Logo del negocio — cuadrado 200×200 */
  logo: (url: string | null) =>
    optimizeImage(url, { width: 200, height: 200, crop: 'thumb', gravity: 'face' }),

  /** Thumbnail en tabla admin — 92×68 */
  adminThumb: (url: string | null) =>
    optimizeImage(url, { width: 92, height: 68, crop: 'fill', gravity: 'auto' }),
}

/** Card de plato respetando el gravity configurado por el dueño */
export function dishCardWithGravity(
  url: string | null,
  gravity: string | null | undefined
): string | null {
  return optimizeImage(url, {
    width: 600,
    height: 400,
    crop: 'fill',
    gravity: (gravity as GravityOption) ?? 'auto',
  })
}

/** Modal de plato respetando el gravity configurado por el dueño */
export function dishModalWithGravity(
  url: string | null,
  gravity: string | null | undefined
): string | null {
  return optimizeImage(url, {
    width: 800,
    height: 450,
    crop: 'fill',
    gravity: (gravity as GravityOption) ?? 'auto',
  })
}

/**
 * Precarga una imagen en el cache del browser sin mostrarla.
 * Llamar en hover/touchstart para que cuando abra el modal ya esté lista.
 */
export function preloadImage(url: string | null): void {
  if (!url) return
  const img = new Image()
  img.src = url
}
