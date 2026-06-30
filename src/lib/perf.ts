/**
 * Adaptive performance mode — graduated, so we never strip more than we must.
 *
 * The two expensive things on this page are (1) the full-screen WebGL ambient
 * scene that animates every frame, and (2) the many translucent
 * `backdrop-filter` glass surfaces. They compound: a *moving* backdrop forces
 * every glass surface to recomposite each frame. The fix is layered:
 *
 *   Tier 0 — full:      WebGL ambient scene + glass blur (capable desktops).
 *   Tier 1 — scene off: drop the moving canvas, keep the glass blur. Once the
 *                       backdrop is static, blur is cheap again. Triggered by a
 *                       live FPS probe — this is the common, gentle downgrade.
 *   Tier 2 — perf-lite: also drop the glass blur. Only for clearly weak devices
 *                       (reduced-motion, low memory / core count), decided up
 *                       front so there is no visible downgrade flash.
 *
 * A lightweight CSS/transform aurora (see AuroraBackground) runs in every tier,
 * so the page is never visually dead — including on phones, where the WebGL
 * scene has always been disabled.
 */

const PERF_LITE_EVENT = 'perflite'   // Tier 2 — also strips glass blur
const SCENE_OFF_EVENT = 'sceneoff'   // Tier 1 — drop the WebGL ambient scene only

/** Tier 2. Cheap, synchronous capability check — safe before React renders. */
export function applyStaticPerfMode() {
  const root = document.documentElement
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('perf-lite')
    return
  }
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const cores = navigator.hardwareConcurrency
  if ((mem && mem <= 4) || (cores && cores <= 4)) {
    root.classList.add('perf-lite')
  }
}

/** Tier 1. Live FPS probe — if frames are being dropped, drop the WebGL scene
 *  (but keep the glass). Capable machines never trip this. */
export function startPerfProbe() {
  // perf-lite already implies the scene is off, nothing to probe.
  if (document.documentElement.classList.contains('perf-lite')) return

  const begin = () => {
    let frames = 0
    let start = 0
    const tick = (t: number) => {
      if (!start) start = t
      frames++
      const elapsed = t - start
      if (elapsed >= 1400) {
        const fps = (frames / elapsed) * 1000
        // 38 is conservative: real 60fps machines stay well clear, so we only
        // pull the scene on devices that genuinely can't sustain it.
        if (fps < 38) window.dispatchEvent(new CustomEvent(SCENE_OFF_EVENT, { detail: { fps } }))
        return
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  // Let the heavy chunks parse + WebGL warm up before sampling (the first
  // second is always janky and would false-positive).
  window.setTimeout(begin, 2000)
}

/** Subscribe to Tier 1 (drop the WebGL scene). Returns an unsubscribe fn. */
export function onSceneOff(cb: () => void) {
  window.addEventListener(SCENE_OFF_EVENT, cb)
  return () => window.removeEventListener(SCENE_OFF_EVENT, cb)
}

/** Subscribe to Tier 2 (full perf-lite). Returns an unsubscribe fn. */
export function onPerfLite(cb: () => void) {
  window.addEventListener(PERF_LITE_EVENT, cb)
  return () => window.removeEventListener(PERF_LITE_EVENT, cb)
}

export function isPerfLite() {
  return document.documentElement.classList.contains('perf-lite')
}
