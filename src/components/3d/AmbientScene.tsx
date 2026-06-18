import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Site-wide ambient layer. A slowly drifting 3D node-network — the visual
 * language of computer science (dependency graphs, neural nets, packet
 * routing) — wrapped around a few wireframe polyhedra and a particle field.
 *
 * It reacts to the cursor (parallax) and to global scroll progress: the camera
 * dollies forward through the lattice and the graph expands as you descend the
 * page, so new structure keeps opening up. Colors are read from the live CSS
 * theme tokens, so it flips with the dark/light toggle.
 *
 * Fixed behind all content, pointer-events:none. Skipped on reduced-motion and
 * small / touch devices (the CSS aurora is the fallback).
 */

const scroll = { p: 0 }
const mouse = { x: 0, y: 0 }

function readToken(name: string, fallback: THREE.Color): THREE.Color {
  if (typeof document === 'undefined') return fallback
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!raw) return fallback
  const [r, g, b] = raw.split(',').map((n) => parseFloat(n) / 255)
  if ([r, g, b].some((v) => Number.isNaN(v))) return fallback
  return new THREE.Color(r, g, b)
}

const NODES = 120
const MAX_DIST = 2.4      // edge connection radius
const VOL = 9             // spread of the node cloud

function isLightTheme() {
  return typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light'
}

function useThemeColors() {
  const read = () => ({
    accent: readToken('--accent-rgb', new THREE.Color('#5a8cff')),
    accent2: readToken('--accent2-rgb', new THREE.Color('#ff8fb4')),
    light: isLightTheme(),
  })
  const [colors, setColors] = useState(read)
  useEffect(() => {
    const update = () => setColors(read())
    window.addEventListener('themechange', update)
    return () => window.removeEventListener('themechange', update)
  }, [])
  return colors
}

function Network() {
  const group = useRef<THREE.Group>(null)
  const points = useRef<THREE.Points>(null)
  const lines = useRef<THREE.LineSegments>(null)
  const { accent, accent2, light } = useThemeColors()
  // additive glow reads beautifully on dark, but washes out on light — so
  // switch to normal blending and lean on the (darker) accent there.
  const blend = light ? THREE.NormalBlending : THREE.AdditiveBlending

  // node base positions + per-node drift phase, and the edge index pairs
  const { base, phase, edges } = useMemo(() => {
    const base = new Float32Array(NODES * 3)
    const phase = new Float32Array(NODES)
    for (let i = 0; i < NODES; i++) {
      base[i * 3] = (Math.random() - 0.5) * VOL * 1.6
      base[i * 3 + 1] = (Math.random() - 0.5) * VOL
      base[i * 3 + 2] = (Math.random() - 0.5) * VOL
      phase[i] = Math.random() * Math.PI * 2
    }
    const edges: [number, number][] = []
    for (let i = 0; i < NODES; i++) {
      for (let j = i + 1; j < NODES; j++) {
        const dx = base[i * 3] - base[j * 3]
        const dy = base[i * 3 + 1] - base[j * 3 + 1]
        const dz = base[i * 3 + 2] - base[j * 3 + 2]
        if (dx * dx + dy * dy + dz * dz < MAX_DIST * MAX_DIST) edges.push([i, j])
      }
    }
    return { base, phase, edges }
  }, [])

  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(base.slice(), 3))
    return g
  }, [base])

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edges.length * 6), 3))
    return g
  }, [edges])

  // live working buffer of current node positions
  const cur = useMemo(() => new Float32Array(base.length), [base])

  // Data packets: bright pulses that travel along the graph edges — the visual
  // of packet routing / signal propagation. Replaces the old wireframe blobs.
  const PACKETS = 30
  const packets = useRef(
    Array.from({ length: PACKETS }, () => ({
      edge: Math.floor(Math.random() * Math.max(1, edges.length)),
      t: Math.random(),
      speed: 0.12 + Math.random() * 0.4,
    }))
  )
  const packetGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(PACKETS * 3), 3))
    return g
  }, [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const p = scroll.p
    const spread = 1 + p * 0.5

    // animate nodes (gentle organic drift) and write into the points buffer
    const nodeArr = nodeGeo.attributes.position.array as Float32Array
    for (let i = 0; i < NODES; i++) {
      const ix = i * 3
      const x = base[ix] * spread + Math.sin(t * 0.25 + phase[i]) * 0.25
      const y = base[ix + 1] * spread + Math.cos(t * 0.22 + phase[i]) * 0.25
      const z = base[ix + 2] * spread + Math.sin(t * 0.2 + phase[i] * 1.3) * 0.25
      cur[ix] = x; cur[ix + 1] = y; cur[ix + 2] = z
      nodeArr[ix] = x; nodeArr[ix + 1] = y; nodeArr[ix + 2] = z
    }
    nodeGeo.attributes.position.needsUpdate = true

    // rebuild edge endpoints from current node positions
    const lineArr = lineGeo.attributes.position.array as Float32Array
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e]
      const o = e * 6
      lineArr[o] = cur[a * 3]; lineArr[o + 1] = cur[a * 3 + 1]; lineArr[o + 2] = cur[a * 3 + 2]
      lineArr[o + 3] = cur[b * 3]; lineArr[o + 4] = cur[b * 3 + 1]; lineArr[o + 5] = cur[b * 3 + 2]
    }
    lineGeo.attributes.position.needsUpdate = true

    // advance packets along their edges; recycle onto a new edge at the end
    if (edges.length) {
      const pArr = packetGeo.attributes.position.array as Float32Array
      for (let i = 0; i < PACKETS; i++) {
        const pk = packets.current[i]
        pk.t += dt * pk.speed
        if (pk.t > 1) {
          pk.t -= 1
          pk.edge = (Math.random() * edges.length) | 0
        }
        const [a, b] = edges[pk.edge]
        const o = i * 3
        pArr[o] = cur[a * 3] + (cur[b * 3] - cur[a * 3]) * pk.t
        pArr[o + 1] = cur[a * 3 + 1] + (cur[b * 3 + 1] - cur[a * 3 + 1]) * pk.t
        pArr[o + 2] = cur[a * 3 + 2] + (cur[b * 3 + 2] - cur[a * 3 + 2]) * pk.t
      }
      packetGeo.attributes.position.needsUpdate = true
    }

    if (group.current) {
      // slow ambient spin + eased cursor parallax
      group.current.rotation.y += dt * 0.015
      group.current.rotation.x += (-mouse.y * 0.12 - group.current.rotation.x) * 0.03
      group.current.position.x += (mouse.x * 0.6 - group.current.position.x) * 0.03
      group.current.position.y += (-mouse.y * 0.4 - group.current.position.y) * 0.03
    }
  })

  return (
    <group ref={group}>
      <lineSegments ref={lines} geometry={lineGeo}>
        <lineBasicMaterial
          color={accent}
          transparent
          opacity={light ? 0.3 : 0.18}
          blending={blend}
          depthWrite={false}
        />
      </lineSegments>
      <points ref={points} geometry={nodeGeo}>
        <pointsMaterial
          color={accent2}
          size={0.07}
          transparent
          opacity={light ? 0.95 : 0.9}
          sizeAttenuation
          depthWrite={false}
          blending={blend}
        />
      </points>
      {/* travelling data packets */}
      <points geometry={packetGeo}>
        <pointsMaterial
          color={accent}
          size={0.16}
          transparent
          opacity={light ? 0.9 : 0.95}
          sizeAttenuation
          depthWrite={false}
          blending={blend}
        />
      </points>
    </group>
  )
}

function Rig() {
  const { camera } = useThree()
  useFrame(() => {
    // dolly forward through the lattice as the page scrolls
    const targetZ = 12 - scroll.p * 6
    camera.position.z += (targetZ - camera.position.z) * 0.04
    camera.position.y += (scroll.p * 1.5 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function AmbientScene() {
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
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.75]}
        style={{ background: 'transparent' }}
      >
        <Network />
        <Rig />
      </Canvas>
    </div>
  )
}
