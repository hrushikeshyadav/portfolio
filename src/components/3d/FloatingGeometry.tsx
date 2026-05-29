import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Playful colorful low-poly sphere with glowing wireframe + orbiting rings
export default function FloatingGeometry({ style }: { style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = false

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 5.5

    // --- Main icosahedron with colored faces ---
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1)

    // Give each face a slightly different warm/orange tinted color
    const posAttr = icoGeo.attributes.position
    const colors: number[] = []
    const faceColors = [
      new THREE.Color('#ff4500'),
      new THREE.Color('#ff6a2a'),
      new THREE.Color('#ff3800'),
      new THREE.Color('#cc3700'),
      new THREE.Color('#ff5500'),
      new THREE.Color('#e03d00'),
    ]
    for (let i = 0; i < posAttr.count; i += 3) {
      const c = faceColors[Math.floor(Math.random() * faceColors.length)]
      const dim = 0.04 + Math.random() * 0.06
      colors.push(c.r * dim, c.g * dim, c.b * dim)
      colors.push(c.r * dim, c.g * dim, c.b * dim)
      colors.push(c.r * dim, c.g * dim, c.b * dim)
    }
    icoGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))

    const icoMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.85 })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    scene.add(ico)

    // --- Bright wireframe over the ico ---
    const wireGeo = new THREE.WireframeGeometry(icoGeo)
    const wireMat = new THREE.LineBasicMaterial({
      color: '#ff4500',
      transparent: true,
      opacity: 0.9,
    })
    const wire = new THREE.LineSegments(wireGeo, wireMat)
    scene.add(wire)

    // --- Outer glow shell ---
    const glowGeo = new THREE.IcosahedronGeometry(1.75, 1)
    const glowMat = new THREE.MeshBasicMaterial({
      color: '#ff4500',
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
      wireframe: false,
    })
    const glowMesh = new THREE.Mesh(glowGeo, glowMat)
    scene.add(glowMesh)

    // --- Orbiting ring 1 (horizontal-ish) ---
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.008, 4, 90)
    const ring1Mat = new THREE.MeshBasicMaterial({ color: '#ff4500', transparent: true, opacity: 0.35 })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI * 0.35
    ring1.rotation.y = Math.PI * 0.1
    scene.add(ring1)

    // --- Orbiting ring 2 (tilted differently) ---
    const ring2Geo = new THREE.TorusGeometry(2.55, 0.006, 4, 90)
    const ring2Mat = new THREE.MeshBasicMaterial({ color: '#ff6a2a', transparent: true, opacity: 0.2 })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.x = Math.PI * 0.6
    ring2.rotation.z = Math.PI * 0.3
    scene.add(ring2)

    // --- Small orbiting dots ---
    const NUM_ORBS = 6
    const orbs: THREE.Mesh[] = []
    const orbAngles: number[] = []
    for (let i = 0; i < NUM_ORBS; i++) {
      const g = new THREE.SphereGeometry(0.045, 8, 8)
      const m = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? '#ff4500' : '#ff6a2a',
        transparent: true, opacity: 0.9,
      })
      const mesh = new THREE.Mesh(g, m)
      scene.add(mesh)
      orbs.push(mesh)
      orbAngles.push((i / NUM_ORBS) * Math.PI * 2)
    }

    // --- Floating tiny triangles (decorative) ---
    const floaters: { mesh: THREE.Mesh; speed: number; radius: number; phase: number }[] = []
    for (let i = 0; i < 8; i++) {
      const g = new THREE.TetrahedronGeometry(0.07, 0)
      const m = new THREE.MeshBasicMaterial({
        color: '#ff4500', transparent: true, opacity: 0.5 + Math.random() * 0.4,
        wireframe: true,
      })
      const mesh = new THREE.Mesh(g, m)
      const radius = 2.0 + Math.random() * 0.8
      const angle = Math.random() * Math.PI * 2
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2.5,
        Math.sin(angle) * radius * 0.4,
      )
      scene.add(mesh)
      floaters.push({ mesh, speed: 0.3 + Math.random() * 0.5, radius, phase: Math.random() * Math.PI * 2 })
    }

    // Resize
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Mouse tilt
    let targetX = 0, targetY = 0, curX = 0, curY = 0
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetX = ((e.clientY - rect.top) / rect.height - 0.5) * -0.7
      targetY = ((e.clientX - rect.left) / rect.width - 0.5) * 1.0
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let frame = 0, raf: number
    const tick = () => {
      frame++
      const t = frame * 0.004

      // Smooth mouse tilt
      curX += (targetX - curX) * 0.04
      curY += (targetY - curY) * 0.04

      // Core rotation
      ico.rotation.y = t * 0.35 + curY
      ico.rotation.x = t * 0.18 + curX
      wire.rotation.copy(ico.rotation)
      glowMesh.rotation.copy(ico.rotation)

      // Float up/down
      const floatY = Math.sin(t * 0.9) * 0.12
      ico.position.y = floatY
      wire.position.y = floatY
      glowMesh.position.y = floatY

      // Rings counter-rotate
      ring1.rotation.z = t * 0.28
      ring2.rotation.z = -t * 0.18
      ring1.position.y = floatY
      ring2.position.y = floatY

      // Pulse wire opacity
      wireMat.opacity = 0.7 + Math.sin(t * 1.5) * 0.25

      // Glow pulse
      glowMat.opacity = 0.03 + Math.abs(Math.sin(t * 0.6)) * 0.05

      // Orb positions (orbit on ring1 plane-ish)
      orbs.forEach((orb, i) => {
        orbAngles[i] += 0.012 * (i % 2 === 0 ? 1 : -0.7)
        const a = orbAngles[i]
        const r = 2.2
        orb.position.set(
          Math.cos(a) * r,
          Math.sin(a) * r * Math.sin(ring1.rotation.x) + floatY,
          Math.sin(a) * r * Math.cos(ring1.rotation.x) * 0.4,
        )
      })

      // Floaters drift
      floaters.forEach(({ mesh, speed, phase }) => {
        mesh.rotation.x += 0.015
        mesh.rotation.y += 0.018
        mesh.position.y += Math.sin(t * speed + phase) * 0.003
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
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', ...style }} />
  )
}
