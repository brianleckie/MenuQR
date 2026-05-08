import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'
import { menuUrl } from '../../lib/config'
import { useAuth } from '../../contexts/AuthContext'
import { useMyBusiness } from '../../lib/queries'

export function QRPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: business, isLoading } = useMyBusiness(user?.id)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
      </div>
    )
  }

  if (!business) {
    return (
      <div className="p-4 md:p-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-1 font-serif text-lg font-bold text-amber-900">Sin negocio configurado</p>
          <p className="mb-4 text-sm text-amber-700">
            Configurá tu negocio en Ajustes para generar el QR.
          </p>
          <button
            onClick={() => navigate('/admin/settings')}
            className="rounded-xl px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
            style={{ background: 'var(--brand-color)' }}
          >
            Ir a Ajustes →
          </button>
        </div>
      </div>
    )
  }

  const qrUrl = menuUrl(business.slug)

  const handleDownload = () => {
    const canvas = canvasContainerRef.current?.querySelector('canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `qr-${business.slug}.png`
    link.click()
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-6 font-serif text-2xl font-bold text-[#1C1410]">Tu QR y enlace</h1>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-[#EEE9E2] shadow-[0_1px_3px_rgba(28,20,16,0.06)] md:p-8">
        <div className="flex flex-wrap items-start gap-8 md:gap-10">
          {/* QR display */}
          <div className="rounded-xl border border-[#EEE9E2] p-3">
            <QRCodeSVG
              value={qrUrl}
              size={180}
              fgColor="#1C1410"
              bgColor="#ffffff"
            />
          </div>

          {/* Info + actions */}
          <div className="flex-1 min-w-0">
            <h2 className="mb-2 font-serif text-xl font-bold text-stone-800">
              Descargá tu QR
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-stone-500">
              Imprimilo y pegalo en tus mesas, mostrador, o en el frente del local.
              Recomendamos tamaño mínimo 5×5 cm para buena lectura.
            </p>

            <div className="mb-5 rounded-xl bg-stone-50 px-4 py-3">
              <p className="mb-1 text-xs text-stone-400">Enlace directo</p>
              <p
                className="break-all font-mono text-sm"
                style={{ color: 'var(--brand-color)' }}
              >
                {qrUrl}
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_2px_8px_rgba(212,98,42,0.25)] transition hover:opacity-90"
              style={{ background: 'var(--brand-color)' }}
            >
              ↓ Descargar PNG
            </button>
          </div>
        </div>
      </div>

      {/* Hidden canvas used only for PNG export */}
      <div ref={canvasContainerRef} className="sr-only" aria-hidden="true">
        <QRCodeCanvas value={qrUrl} size={512} fgColor="#1C1410" bgColor="#ffffff" />
      </div>
    </div>
  )
}
