import { useRef } from 'react'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'
import { menuUrl } from '../../lib/config'
import { MOCK_BUSINESS } from '../../lib/mock-data'

const QR_URL = menuUrl(MOCK_BUSINESS.slug)

export function QRPage() {
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    const canvas = canvasContainerRef.current?.querySelector('canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `qr-${MOCK_BUSINESS.slug}.png`
    link.click()
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-6 font-serif text-2xl font-bold text-stone-800">Tu QR y enlace</h1>

      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100 md:p-8">
        <div className="flex flex-wrap items-start gap-8 md:gap-10">
          {/* QR display */}
          <div className="rounded-2xl border-2 border-stone-100 p-4">
            <QRCodeSVG
              value={QR_URL}
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
                {QR_URL}
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
              style={{ background: 'var(--brand-color)' }}
            >
              ↓ Descargar PNG
            </button>
          </div>
        </div>
      </div>

      {/* Hidden canvas used only for PNG export */}
      <div ref={canvasContainerRef} className="sr-only" aria-hidden="true">
        <QRCodeCanvas value={QR_URL} size={512} fgColor="#1C1410" bgColor="#ffffff" />
      </div>
    </div>
  )
}
