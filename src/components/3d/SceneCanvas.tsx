import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Unified, persistent background scene. A single morphing system that evolves
 * with global scroll progress (0 = hero → 1 = contact):
 *   • a wireframe icosahedron "core" that rotates and recedes
 *   • a spherical particle shell that disperses into a loose constellation
 *   • subtle mouse parallax
 * Fixed behind all content, pointer-events:none. Skipped on reduced-motion
 * and small/low-power devices (CSS-only black fallback).
 */

const scroll = { p: 0 }            // global scroll progress 0..1
const mouse = { x: 0, y: 0 }       // -1..1

function Core() {
  const wire = useRef<THREE.Mesh>(null)
  const solid = useRef<THREE.Mesh>(null)
  const group = useRef<THREE.Group>(null)

  useFrame((_, dt) => {
    const p = scroll.p
    if (wire.current) {
      wire.current.rotation.x += dt * 0.1
      wire.current.rotation.y += dt * 0.14
      const s = THREE.MathUtils.lerp(1, 0.35, p)
      wire.current.scale.setScalar(s)
      const m = wire.current.material as THREE.MeshBasicMaterial
      m.opacity = THREE.MathUtils.lerp(0.4, 0.05, Math.min(1, p * 1.6))
    }
    if (solid.current) {
      solid.current.rotation.x -= dt * 0.16
      solid.current.rotation.y += dt * 0.1
      solid.current.scale.setScalar(THREE.MathUtils.lerp(0.7, 0.2, p))
    }
    if (group.current) {
      // mouse parallax (eased)
      group.current.rotation.y += (mouse.x * 0.3 - group.current.rotation.y) * 0.04
      group.current.rotation.x += (-mouse.y * 0.2 - group.current.rotation.x) * 0.04
    }
  })

  return (
    <group ref={group}>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color="#ff4500" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh ref={solid} scale={0.7}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshPhongMaterial color="#180600" emissive="#ff2200" emissiveIntensity={0.12} transparent opacity={0.5} shininess={100} />
      </mesh>
    </group>
  )
}

function ParticleShell({ count = 2600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const { base, rand } = useMemo(() => {
    const base = new Float32Array(count * 3)
    const rand = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.2 + Math.random() * 0.5
      base[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      base[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      base[i * 3 + 2] = r * Math.cos(phi)
      rand[i] = Math.random()
    }
    return { base, rand }
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(base.slice(), 3))
    return g
  }, [base])

  useFrame((state, dt) => {
    if (!ref.current) return
    const p = scroll.p
    const t = state.clock.elapsedTime
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
    // disperse outward + drift as scroll increases
    const spread = 1 + p * 2.4
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const drift = Math.sin(t * (0.3 + rand[i] * 0.6) + i) * 0.05
      arr[ix] = base[ix] * spread + drift
      arr[ix + 1] = base[ix + 1] * spread + Math.cos(t * 0.4 + rand[i] * 6) * 0.05
      arr[ix + 2] = base[ix + 2] * spread + drift
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y += dt * 0.03
    const m = ref.current.material as THREE.PointsMaterial
    m.opacity = THREE.MathUtils.lerp(0.55, 0.28, p)
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.018} color="#ff6b35" transparent opacity={0.5} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function Lighting() {
  const light = useRef<THREE.PointLight>(null)
  useFrame((s) => {
    if (light.current) light.current.intensity = 1.1 + Math.sin(s.clock.elapsedTime * 0.7) * 0.25
  })
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight ref={light} position={[0, 0, 4]} color="#ff4500" intensity={1.1} distance={14} />
      <pointLight position={[-5, 3, 2]} color="#ffffff" intensity={0.25} />
    </>
  )
}

function Rig() {
  const { camera } = useThree()
  useFrame(() => {
    // gentle dolly with scroll
    camera.position.z += (6 + scroll.p * 1.5 - camera.position.z) * 0.05
  })
  return null
}

export default function SceneCanvas() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 760
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || small || coarse) return
    setEnabled(true)

    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      scroll.p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0
    }
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  if (!enabled) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
    }} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.75]}
        style={{ background: 'transparent' }}
      >
        <Lighting />
        <Core />
        <ParticleShell />
        <Rig />
      </Canvas>
    </div>
  )
}
