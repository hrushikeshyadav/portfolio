import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const COUNT = 180
const MAX_DIST = 120
const REPEL_RADIUS = 100
const REPEL_FORCE = 0.4

interface Particle {
  x: number; y: number; z: number
  vx: number; vy: number; vz: number
  phase: number
}

export default function ParticleField({ style }: { style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 1, 2000)
    camera.position.z = 550

    // Resize first so we know W/H for particle distribution
    let W = canvas.clientWidth || 800
    let H = canvas.clientHeight || 600
    renderer.setSize(W, H, false)
    camera.aspect = W / H
    camera.updateProjectionMatrix()

    // Spread particles evenly across the visible viewport area
    const spawnParticle = (): Particle => ({
      x: (Math.random() - 0.5) * W * 1.1,
      y: (Math.random() - 0.5) * H * 1.1,
      z: (Math.random() - 0.5) * 180,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      vz: (Math.random() - 0.5) * 0.06,
      phase: Math.random() * Math.PI * 2,
    })

    const particles: Particle[] = Array.from({ length: COUNT }, spawnParticle)

    // Points
    const ptGeo = new THREE.BufferGeometry()
    const ptPos = new Float32Array(COUNT * 3)
    const ptAlpha = new Float32Array(COUNT)
    particles.forEach((p, i) => {
      ptPos[i * 3] = p.x; ptPos[i * 3 + 1] = p.y; ptPos[i * 3 + 2] = p.z
      ptAlpha[i] = 0.4 + Math.random() * 0.4
    })
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3))

    // Circular sprite for points
    const ptCanvas = document.createElement('canvas')
    ptCanvas.width = 16; ptCanvas.height = 16
    const ptCtx = ptCanvas.getContext('2d')!
    const grad = ptCtx.createRadialGradient(8, 8, 0, 8, 8, 8)
    grad.addColorStop(0, 'rgba(255,100,40,0.9)')
    grad.addColorStop(0.4, 'rgba(255,69,0,0.4)')
    grad.addColorStop(1, 'rgba(255,69,0,0)')
    ptCtx.fillStyle = grad
    ptCtx.fillRect(0, 0, 16, 16)
    const ptTex = new THREE.CanvasTexture(ptCanvas)

    const ptMat = new THREE.PointsMaterial({
      size: 5,
      map: ptTex,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
    })
    const ptMesh = new THREE.Points(ptGeo, ptMat)
    scene.add(ptMesh)

    // Lines
    const MAX_LINES = 300
    const lineGeo = new THREE.BufferGeometry()
    const linePos = new Float32Array(MAX_LINES * 6)
    const lineCol = new Float32Array(MAX_LINES * 6)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineCol, 3))
    const lineSegs = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.25, depthWrite: false })
    )
    scene.add(lineSegs)

    // Resize
    const resize = () => {
      W = canvas.clientWidth; H = canvas.clientHeight
      renderer.setSize(W, H, false)
      camera.aspect = W / H
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Mouse
    let mx = 0, my = 0
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mx = ((e.clientX - r.left) / r.width - 0.5) * W
      my = -((e.clientY - r.top) / r.height - 0.5) * H
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let frame = 0, raf: number
    const tick = () => {
      frame++
      const t = frame * 0.002

      let lineIdx = 0
      const halfW = W * 0.55, halfH = H * 0.55

      particles.forEach((p, i) => {
        // Gentle organic drift
        p.vx += Math.sin(t * 0.7 + p.phase) * 0.008
        p.vy += Math.cos(t * 0.5 + p.phase * 1.3) * 0.008
        p.vz += Math.sin(t * 0.3 + p.phase * 0.7) * 0.003

        // Mouse repulsion
        const dx = p.x - mx, dy = p.y - my
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < REPEL_RADIUS && d > 0) {
          const f = (1 - d / REPEL_RADIUS) * REPEL_FORCE
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }

        // Damping
        p.vx *= 0.96; p.vy *= 0.96; p.vz *= 0.97

        p.x += p.vx; p.y += p.vy; p.z += p.vz

        // Soft wrap
        if (p.x > halfW) p.x = -halfW
        if (p.x < -halfW) p.x = halfW
        if (p.y > halfH) p.y = -halfH
        if (p.y < -halfH) p.y = halfH
        if (p.z > 90) p.z = -90
        if (p.z < -90) p.z = 90

        ptPos[i * 3] = p.x; ptPos[i * 3 + 1] = p.y; ptPos[i * 3 + 2] = p.z
      })

      // Build lines (only nearby pairs)
      for (let i = 0; i < particles.length && lineIdx < MAX_LINES; i++) {
        for (let j = i + 1; j < particles.length && lineIdx < MAX_LINES; j++) {
          const pi = particles[i], pj = particles[j]
          const dx = pi.x - pj.x, dy = pi.y - pj.y, dz = pi.z - pj.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < MAX_DIST) {
            const strength = 1 - dist / MAX_DIST
            const b = lineIdx * 6
            linePos[b] = pi.x; linePos[b + 1] = pi.y; linePos[b + 2] = pi.z
            linePos[b + 3] = pj.x; linePos[b + 4] = pj.y; linePos[b + 5] = pj.z
            // Warm orange-white gradient
            lineCol[b] = 0.9; lineCol[b + 1] = 0.45 * strength; lineCol[b + 2] = 0.1 * strength
            lineCol[b + 3] = 0.9; lineCol[b + 4] = 0.45 * strength; lineCol[b + 5] = 0.1 * strength
            lineIdx++
          }
        }
      }

      ptGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.color.needsUpdate = true
      lineGeo.setDrawRange(0, lineIdx * 2)

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      ptTex.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}
    />
  )
}
