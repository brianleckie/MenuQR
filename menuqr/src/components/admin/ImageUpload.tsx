import { useRef, useState } from 'react'

interface ImageUploadProps {
  value: string | null
  onUpload: (url: string) => void
  onClear: () => void
  /** CSS padding-bottom for the preview aspect ratio. Default: '66.67%' (3:2). Use '56.25%' for 16:9. */
  previewRatio?: string
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string
const MAX_BYTES = 5 * 1024 * 1024
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']

export function ImageUpload({ value, onUpload, onClear, previewRatio = '66.67%' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  async function handleFile(file: File) {
    setError(null)
    if (!ACCEPTED.includes(file.type)) {
      setError('Solo se aceptan JPG, PNG y WEBP.')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('La imagen no puede superar 5MB.')
      return
    }
    setIsUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('upload_preset', UPLOAD_PRESET)
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: fd }
      )
      if (!res.ok) throw new Error('Upload failed')
      const json = await res.json() as { secure_url: string }
      onUpload(json.secure_url)
    } catch {
      setError('Error al subir. Intentá de nuevo.')
    } finally {
      setIsUploading(false)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  if (value) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-stone-100" style={{ paddingBottom: previewRatio }}>
        <img
          src={value}
          alt="Vista previa"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition"
          aria-label="Quitar imagen"
        >
          ✕
        </button>
      </div>
    )
  }

  return (
    <div>
      <div
        onClick={() => !isUploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-8 transition-colors"
        style={{
          borderColor: isDragging ? 'var(--brand-color)' : '#D6CEC4',
          background: isDragging ? 'var(--brand-color)10' : '#FAFAF9',
          cursor: isUploading ? 'default' : 'pointer',
          pointerEvents: isUploading ? 'none' : 'auto',
        }}
      >
        {isUploading ? (
          <>
            <div className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
            <p className="text-sm text-stone-500">Subiendo...</p>
          </>
        ) : (
          <>
            <span className="mb-2 text-3xl">📷</span>
            <p className="text-sm text-stone-500">Arrastrá una foto o hacé clic</p>
            <p className="mt-1 text-xs text-stone-400">JPG, PNG o WEBP · máx 5MB</p>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
