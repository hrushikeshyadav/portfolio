import type { CSSProperties, ReactNode, HTMLAttributes } from 'react'

/**
 * Apple Liquid Glass material.
 *
 * Renders a translucent surface with a frosted+saturated backdrop, a bright
 * specular top edge, an optional moving sheen, a curved rim light, and — where
 * the browser supports it — real lensing via the #liquid-glass SVG filter.
 *
 * Mount <GlassFilterDefs /> once near the root so `refract` has a filter to
 * reference.
 */
interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  /** Corner radius in px (default 18). */
  radius?: number
  /** Backdrop blur in px (default 16). */
  blur?: number
  /** Lift + brighten on hover. */
  interactive?: boolean
  /** Slow specular sweep across the surface. */
  sheen?: boolean
  /** Enable real backdrop lensing (Chromium). */
  refract?: boolean
  /** Orange-accent glass for CTAs. */
  warm?: boolean
  className?: string
  style?: CSSProperties
}

export function LiquidGlass({
  children,
  radius = 18,
  blur = 16,
  interactive = false,
  sheen = false,
  refract = false,
  warm = false,
  className = '',
  style,
  ...rest
}: LiquidGlassProps) {
  const classes = [
    'glass',
    'glass-rim',
    interactive && 'glass-interactive',
    sheen && 'glass-sheen',
    refract && 'glass-refract',
    warm && 'glass-warm',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      style={{
        ['--glass-radius' as string]: `${radius}px`,
        ['--glass-blur' as string]: `${blur}px`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

/**
 * The SVG displacement filter that bends the backdrop behind `.glass-refract`
 * surfaces. feTurbulence builds a smooth noise field; feDisplacementMap uses it
 * to offset each backdrop pixel, producing the liquid lens distortion. Render
 * exactly once per document.
 */
export function GlassFilterDefs() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
    >
      <filter
        id="liquid-glass"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.014 0.018"
          numOctaves="2"
          seed="7"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="3" result="softNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softNoise"
          scale="20"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}

export default LiquidGlass
