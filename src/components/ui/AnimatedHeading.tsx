import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

/**
 * Section heading that reveals word-by-word — each word rises out of a clipped
 * mask with a spring stagger when it scrolls into view. Visible, deliberate
 * motion on every section title.
 */
export default function AnimatedHeading({
  text,
  style,
  delay = 0,
  as = 'h2',
}: {
  text: string
  style?: CSSProperties
  delay?: number
  as?: 'h1' | 'h2' | 'h3'
}) {
  const words = text.split(' ')
  const MotionTag = motion[as]
  return (
    <MotionTag
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.05em' }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            variants={{ hidden: { y: '115%' }, show: { y: 0 } }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
