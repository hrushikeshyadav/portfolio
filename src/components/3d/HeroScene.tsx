import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

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
            color="#1a0a02"
            emissive="#ff4500"
            emissiveIntensity={0.32}
            roughness={0.18}
            metalness={0.85}
            distort={0.38}
            speed={2.4}
          />
        </mesh>

        {/* Counter-rotating wireframe shell */}
        <mesh ref={wire} scale={2.05}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#ff4500" wireframe transparent opacity={0.16} />
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
      <pointsMaterial size={0.022} color="#ff8a5c" transparent opacity={0.5} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
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
      <pointLight ref={p} position={[2, 1, 4]} color="#ff5a1f" intensity={2.2} distance={18} />
      <pointLight position={[-4, 2, -2]} color="#3b82f6" intensity={1.1} distance={16} />
      <pointLight position={[0, -3, 2]} color="#ffffff" intensity={0.5} />
    </>
  )
}

export default function HeroScene() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || window.innerWidth < 700) return
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
      <Halo />
    </Canvas>
  )
}
