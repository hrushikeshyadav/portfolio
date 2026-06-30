import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function CoreGeom() {
  const outer = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (outer.current) {
      outer.current.rotation.x = t * 0.12
      outer.current.rotation.y = t * 0.17
    }
    if (inner.current) {
      inner.current.rotation.x = -t * 0.2
      inner.current.rotation.y = t * 0.13
    }
    if (ring.current) {
      ring.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.15
      ring.current.rotation.z = t * 0.08
    }
  })

  return (
    <group>
      {/* Outer icosahedron — wireframe orange */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial color="#5a8cff" wireframe transparent opacity={0.35} />
      </mesh>
      {/* Inner solid — deep blue glow */}
      <mesh ref={inner} scale={0.72}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshPhongMaterial
          color="#0a1230"
          emissive="#5a8cff"
          emissiveIntensity={0.1}
          transparent
          opacity={0.65}
          shininess={120}
        />
      </mesh>
      {/* Ring */}
      <mesh ref={ring}>
        <torusGeometry args={[2.4, 0.015, 8, 120]} />
        <meshBasicMaterial color="#7aa2ff" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

function OrbitalDots({ count = 120, radius = 3.8 }: { count?: number; radius?: number }) {
  const points = useRef<THREE.Points>(null)

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * (0.8 + Math.random() * 0.5)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      speeds[i] = 0.2 + Math.random() * 0.8
    }
    return { positions, speeds }
  }, [count, radius])

  useFrame(({ clock }) => {
    if (!points.current) return
    const posArr = (points.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(clock.elapsedTime * speeds[i] + i) * 0.002
    }
    points.current.geometry.attributes.position.needsUpdate = true
    points.current.rotation.y = clock.elapsedTime * 0.04
  })

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial size={0.025} color="#ff8fb4" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function BackgroundStars({ count = 600 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return pos
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  return (
    <points geometry={geo}>
      <pointsMaterial size={0.018} color="#ffffff" transparent opacity={0.22} sizeAttenuation />
    </points>
  )
}

function GlowLight() {
  const light = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (light.current) {
      light.current.intensity = 1.2 + Math.sin(clock.elapsedTime * 0.8) * 0.3
    }
  })
  return <pointLight ref={light} position={[0, 0, 3]} color="#5a8cff" intensity={1.2} distance={12} />
}

export default function ResumeScene({ height = 420 }: { height?: number }) {
  return (
    <div style={{ width: '100%', height, background: 'rgba(var(--bg-rgb),0.9)' }}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} />
        <GlowLight />
        <pointLight position={[-4, 4, 2]} color="#ffffff" intensity={0.3} />
        <CoreGeom />
        <OrbitalDots />
        <BackgroundStars />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
