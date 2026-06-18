import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Html } from '@react-three/drei'
import * as THREE from 'three'

/** My stack — these orbit the hero core as little glass chips. */
const TECH = [
  { name: 'React', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Node.js', color: '#3c873a' },
  { name: 'GraphQL', color: '#e535ab' },
  { name: 'Next.js', color: '#e6edff' },
  { name: 'Firebase', color: '#ffca28' },
  { name: 'MongoDB', color: '#10aa50' },
  { name: 'PostgreSQL', color: '#5a8cff' },
  { name: 'Apollo', color: '#a45bff' },
  { name: 'Express', color: '#cfd8dc' },
  { name: 'Vercel', color: '#e6edff' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'REST', color: '#5a8cff' },
  { name: 'MySQL', color: '#00758f' },
  { name: 'Firestore', color: '#ffa000' },
  { name: 'Git', color: '#f1502f' },
]

function OrbitingTech() {
  const g = useRef<THREE.Group>(null)
  // even spread on a sphere (fibonacci) so chips never clump
  const pts = useMemo(() => {
    const n = TECH.length
    return TECH.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const phi = i * Math.PI * (3 - Math.sqrt(5))
      return [Math.cos(phi) * r, y * 0.85, Math.sin(phi) * r] as const
    })
  }, [])

  useFrame((state, dt) => {
    if (!g.current) return
    g.current.rotation.y += dt * 0.14
    g.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.12
  })

  const R = 2.9
  return (
    <group ref={g}>
      {TECH.map((t, i) => (
        <Html
          key={t.name}
          position={[pts[i][0] * R, pts[i][1] * R, pts[i][2] * R]}
          center
          zIndexRange={[1, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div className="glass glass-rim" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            ['--glass-radius' as string]: '999px',
            ['--glass-blur' as string]: '6px',
            padding: '0.28rem 0.7rem',
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.62rem', letterSpacing: '0.02em',
            color: 'var(--text)', whiteSpace: 'nowrap',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.color, boxShadow: `0 0 8px ${t.color}`, flexShrink: 0 }} />
            {t.name}
          </div>
        </Html>
      ))}
    </group>
  )
}

/**
 * Hero centerpiece — a single premium, mouse-reactive distorting object with a
 * counter-rotating wireframe shell and a sparse particle halo. Contained to the
 * hero (NOT a full-page background). Skipped on reduced-motion / small screens.
 */

const mouse = { x: 0, y: 0 }

function Core() {
  const group = useRef<THREE.Group>(null)
  const wire = useRef<THREE.Mesh>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const distortRef = useRef<any>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      // ease toward cursor
      group.current.rotation.y += (mouse.x * 0.5 - group.current.rotation.y) * 0.05
      group.current.rotation.x += (-mouse.y * 0.35 - group.current.rotation.x) * 0.05
    }
    if (wire.current) {
      wire.current.rotation.x -= dt * 0.18
      wire.current.rotation.y += dt * 0.12
      wire.current.rotation.z = Math.sin(t * 0.2) * 0.1
    }
    if (distortRef.current) {
      const target = hovered ? 0.55 : 0.38
      distortRef.current.distort += (target - distortRef.current.distort) * 0.06
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Distorting core */}
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={1.55}
        >
          <icosahedronGeometry args={[1, 12]} />
          <MeshDistortMaterial
            ref={distortRef}
            color="#0a1230"
            emissive="#5a8cff"
            emissiveIntensity={0.36}
            roughness={0.18}
            metalness={0.85}
            distort={0.38}
            speed={2.4}
          />
        </mesh>

        {/* Counter-rotating wireframe shell */}
        <mesh ref={wire} scale={2.05}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#7aa2ff" wireframe transparent opacity={0.18} />
        </mesh>
      </Float>
    </group>
  )
}

function Halo({ count = 280 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th)
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      arr[i * 3 + 2] = r * Math.cos(ph)
    }
    return arr
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.04
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.022} color="#ff8fb4" transparent opacity={0.55} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

/** Two slim, tilted orbital rings sweeping the core — cheap geometry, big vibe. */
function Rings() {
  const a = useRef<THREE.Mesh>(null)
  const b = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (a.current) { a.current.rotation.z += dt * 0.25; a.current.rotation.x = 1.2 }
    if (b.current) { b.current.rotation.z -= dt * 0.18; b.current.rotation.x = 1.9; b.current.rotation.y = 0.6 }
  })
  return (
    <group>
      <mesh ref={a} scale={3.3}>
        <torusGeometry args={[1, 0.006, 8, 120]} />
        <meshBasicMaterial color="#7aa2ff" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={b} scale={3.9}>
        <torusGeometry args={[1, 0.005, 8, 120]} />
        <meshBasicMaterial color="#ff8fb4" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

function Lights() {
  const p = useRef<THREE.PointLight>(null)
  useFrame((s) => {
    if (p.current) p.current.intensity = 2.2 + Math.sin(s.clock.elapsedTime * 0.9) * 0.5
  })
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight ref={p} position={[2, 1, 4]} color="#5a8cff" intensity={2.2} distance={18} />
      <pointLight position={[-4, 2, -2]} color="#ff8fb4" intensity={1.1} distance={16} />
      <pointLight position={[0, -3, 2]} color="#ffffff" intensity={0.5} />
    </>
  )
}

export default function HeroScene() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // shown on every viewport; chips render *behind* the headline (zIndexRange)
    // and the container is repositioned per breakpoint in CSS (.hero-3d).
    if (reduce) return
    setOn(true)
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (!on) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.75]}
      style={{ background: 'transparent' }}
    >
      <Lights />
      <Core />
      <Rings />
      <OrbitingTech />
      <Halo />
    </Canvas>
  )
}
