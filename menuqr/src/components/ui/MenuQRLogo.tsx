import logoUrl from '../../assets/menuqr-logo.svg'

interface MenuQRLogoProps {
  size?: number
  showText?: boolean
  className?: string
  /** Render the brand logo image instead of the icon+text mark */
  logoOnly?: boolean
  /** Width in px when logoOnly=true (default 140) */
  width?: number
}

export function MenuQRLogo({
  size = 32,
  showText = true,
  className = '',
  logoOnly = false,
  width = 140,
}: MenuQRLogoProps) {
  if (logoOnly) {
    return (
      <img
        src={logoUrl}
        alt="MenuQR"
        width={width}
        className={className}
        style={{ display: 'block' }}
      />
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        {/* Top-left finder pattern */}
        <rect x="1" y="1" width="13" height="13" rx="2.5" fill="var(--brand-color, #D4622A)" />
        <rect x="3" y="3" width="9" height="9" rx="1.5" fill="white" />
        <rect x="5" y="5" width="5" height="5" rx="1" fill="var(--brand-color, #D4622A)" />

        {/* Top-right finder pattern */}
        <rect x="26" y="1" width="13" height="13" rx="2.5" fill="var(--brand-color, #D4622A)" />
        <rect x="28" y="3" width="9" height="9" rx="1.5" fill="white" />
        <rect x="30" y="5" width="5" height="5" rx="1" fill="var(--brand-color, #D4622A)" />

        {/* Bottom-left finder pattern */}
        <rect x="1" y="26" width="13" height="13" rx="2.5" fill="var(--brand-color, #D4622A)" />
        <rect x="3" y="28" width="9" height="9" rx="1.5" fill="white" />
        <rect x="5" y="30" width="5" height="5" rx="1" fill="var(--brand-color, #D4622A)" />

        {/* Scattered data dots — top band */}
        <rect x="16" y="1" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.9" />
        <rect x="21" y="1" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.5" />
        <rect x="16" y="6" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.45" />
        <rect x="21" y="6" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.8" />

        {/* Left column dots */}
        <rect x="1" y="16" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.5" />
        <rect x="6" y="16" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.85" />
        <rect x="1" y="21" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.85" />
        <rect x="6" y="21" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.4" />

        {/* Center dots */}
        <rect x="16" y="16" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.35" />
        <rect x="21" y="21" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.35" />
        <rect x="16" y="21" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.6" />
        <rect x="21" y="16" width="3.5" height="3.5" rx="1" fill="var(--brand-color, #D4622A)" opacity="0.6" />

        {/* Fork — bottom-right (replaces 4th QR corner, the Q tail) */}
        <g fill="var(--brand-color, #D4622A)">
          {/* Three tines */}
          <rect x="27" y="26" width="2" height="6.5" rx="1" />
          <rect x="31" y="26" width="2" height="6.5" rx="1" />
          <rect x="35" y="26" width="2" height="6.5" rx="1" />
          {/* Crossbar connecting tines */}
          <rect x="27" y="32" width="10" height="1.5" rx="0.75" />
          {/* Handle */}
          <rect x="30.5" y="33.5" width="3" height="5.5" rx="1.5" />
        </g>
      </svg>

      {showText && (
        <span
          style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: size * 0.45,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'inherit',
          }}
        >
          Menu<span style={{ color: 'var(--brand-color, #D4622A)' }}>QR</span>
        </span>
      )}
    </div>
  )
}
