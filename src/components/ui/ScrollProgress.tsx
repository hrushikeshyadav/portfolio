import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Hairline reading-progress bar pinned to the very top of the viewport. Driven
 * by document scroll progress and eased with a light spring so it glides rather
 * than jitters. Sits just under the custom cursor (z 99999) and the film grain.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 2.5,
        transformOrigin: '0% 50%', scaleX,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
        boxShadow: '0 0 10px -1px rgba(var(--accent-rgb),0.55)',
        zIndex: 9998, pointerEvents: 'none',
      }}
    />
  )
}
