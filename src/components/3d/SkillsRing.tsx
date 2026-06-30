import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SKILLS = [
  'React', 'TypeScript', 'GraphQL', 'Next.js', 'Vite',
  'Tailwind', 'Three.js', 'AI SDK', 'Apollo', 'Turborepo',
  'Node.js', 'Cloudflare', 'Framer', 'shadcn/ui', 'Docker',
  'Sentry', 'TanStack', 'Zod',
]

export default function SkillsRing({ style }: { style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const w = canvas.clientWidth || 500
    const h = canvas.clientHeight || 500
    renderer.setSize(w, h, false)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
    camera.position.z = 280

    // Create sprite textures for each skill label
    const makeSprite = (text: string, highlight = false): THREE.Sprite => {
      const size = 256
      const c = document.createElement('canvas')
      c.width = size; c.height = 64
      const ctx = c.getContext('2d')!
      ctx.clearRect(0, 0, size, 64)

      // Background pill
      const bg = highlight ? 'rgba(255,69,0,0.18)' : 'rgba(255,255,255,0.04)'
      const border = highlight ? 'rgba(255,69,0,0.7)' : 'rgba(255,255,255,0.15)'
      ctx.fillStyle = bg
      ctx.strokeStyle = border
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(4, 10, size - 8, 44, 8)
      ctx.fill()
      ctx.stroke()

      // Text
      ctx.font = `500 18px "DM Mono", monospace`
      ctx.fillStyle = highlight ? '#ff6a2a' : 'rgba(245,240,235,0.7)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, size / 2, 32)

      const tex = new THREE.CanvasTexture(c)
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.9 })
      const sprite = new THREE.Sprite(mat)
      sprite.scale.set(60, 15, 1)
      return sprite
    }

    const group = new THREE.Group()
    scene.add(group)

    const radius = 110
    const spriteRefs: THREE.Sprite[] = []

    SKILLS.forEach((skill, i) => {
      const angle = (i / SKILLS.length) * Math.PI * 2
      const phi = Math.acos(-1 + (2 * i) / SKILLS.length)
      const theta = Math.sqrt(SKILLS.length * Math.PI) * phi

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      void angle

      const sprite = makeSprite(skill, i % 5 === 0)
      sprite.position.set(x, y, z)
      group.add(sprite)
      spriteRefs.push(sprite)
    })

    // Subtle sphere wireframe behind
    const sphereGeo = new THREE.SphereGeometry(105, 16, 12)
    const sphereWire = new THREE.WireframeGeometry(sphereGeo)
    const sphereMesh = new THREE.LineSegments(
      sphereWire,
      new THREE.LineBasicMaterial({ color: 0x1a1a1a, transparent: true, opacity: 0.25 })
    )
    group.add(sphereMesh)

    // Resize
    const resize = () => {
      const nw = canvas.clientWidth, nh = canvas.clientHeight
      renderer.setSize(nw, nh, false)
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Mouse
    let mouseX = 0, mouseY = 0
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) / rect.width - 0.5
      mouseY = (e.clientY - rect.top) / rect.height - 0.5
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let frame = 0, raf: number
    const tick = () => {
      frame++
      const t = frame * 0.003

      // Auto rotate
      group.rotation.y = t * 0.18
      group.rotation.x = Math.sin(t * 0.3) * 0.15

      // Mouse influence
      group.rotation.y += mouseX * 0.4
      group.rotation.x += mouseY * 0.2

      // Keep sprites facing camera
      spriteRefs.forEach((s) => {
        s.material.opacity = 0.6 + Math.sin(t + s.position.x * 0.02) * 0.3
      })

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', ...style }}
    />
  )
}
