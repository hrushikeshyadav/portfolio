import { useRef, type CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Word-by-word clip reveal — words rise from a masked baseline with a stagger.
 * Editorial polish without a heavy split-text dependency.
 */
export default function RevealText({
  text,
  style,
  delay = 0,
  stagger = 0.035,
  as = 'div',
}: {
  text: string
  style?: CSSProperties
  delay?: number
  stagger?: number
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })
  const words = text.split(' ')
  const Tag = motion[as]

  return (
    <Tag
      ref={ref}
      style={{ ...style, display: 'inline-block' }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
