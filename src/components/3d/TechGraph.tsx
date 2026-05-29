import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Node extends d3.SimulationNodeDatum {
  id: string
  group: number
  size: number
}
interface Link extends d3.SimulationLinkDatum<Node> {
  value: number
}

const NODES: Node[] = [
  // Core (group 0)
  { id: 'React', group: 0, size: 22 },
  { id: 'TypeScript', group: 0, size: 20 },
  { id: 'Node.js', group: 0, size: 16 },

  // Frontend (group 1)
  { id: 'Next.js', group: 1, size: 17 },
  { id: 'Vite', group: 1, size: 13 },
  { id: 'Tailwind', group: 1, size: 14 },
  { id: 'Framer Motion', group: 1, size: 11 },
  { id: 'shadcn/ui', group: 1, size: 11 },
  { id: 'Three.js', group: 1, size: 13 },

  // Data (group 2)
  { id: 'GraphQL', group: 2, size: 19 },
  { id: 'Apollo', group: 2, size: 15 },
  { id: 'TanStack Query', group: 2, size: 13 },
  { id: 'Zod', group: 2, size: 10 },

  // AI (group 3)
  { id: 'AI SDK', group: 3, size: 16 },
  { id: 'Claude API', group: 3, size: 13 },
  { id: 'OpenAI', group: 3, size: 12 },
  { id: 'RAG', group: 3, size: 10 },

  // Infra (group 4)
  { id: 'Turborepo', group: 4, size: 13 },
  { id: 'Docker', group: 4, size: 12 },
  { id: 'Cloudflare', group: 4, size: 12 },
  { id: 'Firebase', group: 4, size: 11 },
]

const LINKS: Link[] = [
  // React connections
  { source: 'React', target: 'TypeScript', value: 3 },
  { source: 'React', target: 'Next.js', value: 3 },
  { source: 'React', target: 'Vite', value: 2 },
  { source: 'React', target: 'Framer Motion', value: 2 },
  { source: 'React', target: 'shadcn/ui', value: 2 },
  { source: 'React', target: 'TanStack Query', value: 2 },
  { source: 'React', target: 'Three.js', value: 1 },

  // TypeScript connections
  { source: 'TypeScript', target: 'Zod', value: 2 },
  { source: 'TypeScript', target: 'GraphQL', value: 2 },
  { source: 'TypeScript', target: 'TanStack Query', value: 1 },

  // Next.js
  { source: 'Next.js', target: 'Tailwind', value: 2 },
  { source: 'Next.js', target: 'AI SDK', value: 2 },

  // GraphQL
  { source: 'GraphQL', target: 'Apollo', value: 3 },
  { source: 'GraphQL', target: 'Node.js', value: 2 },

  // AI
  { source: 'AI SDK', target: 'Claude API', value: 2 },
  { source: 'AI SDK', target: 'OpenAI', value: 2 },
  { source: 'AI SDK', target: 'RAG', value: 2 },

  // Infra
  { source: 'Node.js', target: 'Docker', value: 2 },
  { source: 'Node.js', target: 'Cloudflare', value: 2 },
  { source: 'Turborepo', target: 'React', value: 2 },
  { source: 'Turborepo', target: 'Next.js', value: 2 },
  { source: 'Firebase', target: 'Node.js', value: 1 },
]

const GROUP_COLORS = ['#ff4500', '#00b4d8', '#a855f7', '#00e96a', '#f59e0b']

export default function TechGraph({ style }: { style?: React.CSSProperties }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current!
    const svg = d3.select(svgRef.current!)
    svg.selectAll('*').remove()

    const W = container.clientWidth || 700
    const H = container.clientHeight || 480

    svg.attr('width', W).attr('height', H)

    // Defs: glow filters
    const defs = svg.append('defs')
    GROUP_COLORS.forEach((_c, i) => {
      const filter = defs.append('filter').attr('id', `glow-${i}`).attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%')
      filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur')
      const merge = filter.append('feMerge')
      merge.append('feMergeNode').attr('in', 'coloredBlur')
      merge.append('feMergeNode').attr('in', 'SourceGraphic')
    })

    const g = svg.append('g')

    // Zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .on('zoom', (e) => g.attr('transform', e.transform))
    svg.call(zoom)

    // Force simulation
    const nodes: Node[] = NODES.map(n => ({ ...n }))
    const links: Link[] = LINKS.map(l => ({ ...l }))

    const sim = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links)
        .id(d => d.id)
        .distance(d => 80 - (d.value ?? 1) * 8)
        .strength(0.4))
      .force('charge', d3.forceManyBody().strength(-220))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collision', d3.forceCollide<Node>().radius(d => d.size + 18))

    // Links
    const link = g.append('g').selectAll('line')
      .data(links).join('line')
      .attr('stroke', d => {
        const s = nodes.find(n => n.id === (d.source as Node).id || n.id === d.source)
        return s ? GROUP_COLORS[s.group] : '#333'
      })
      .attr('stroke-opacity', 0.15)
      .attr('stroke-width', d => Math.sqrt(d.value ?? 1) * 0.8)

    // Node groups
    const node = g.append('g').selectAll('g')
      .data(nodes).join('g')
      .style('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, Node>()
          .on('start', (e, d) => {
            if (!e.active) sim.alphaTarget(0.3).restart()
            d.fx = d.x; d.fy = d.y
          })
          .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y })
          .on('end', (e, d) => {
            if (!e.active) sim.alphaTarget(0)
            d.fx = null; d.fy = null
          }) as unknown as (sel: d3.Selection<d3.BaseType | SVGGElement, Node, SVGGElement, unknown>) => void
      )

    // Outer glow circle
    node.append('circle')
      .attr('r', d => d.size + 8)
      .attr('fill', d => GROUP_COLORS[d.group])
      .attr('opacity', 0.06)
      .attr('filter', d => `url(#glow-${d.group})`)

    // Main circle
    node.append('circle')
      .attr('r', d => d.size * 0.72)
      .attr('fill', '#111')
      .attr('stroke', d => GROUP_COLORS[d.group])
      .attr('stroke-width', 1.2)
      .attr('stroke-opacity', 0.65)

    // Label
    node.append('text')
      .text(d => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.size * 0.72 + 14)
      .attr('fill', 'rgba(245,240,235,0.55)')
      .attr('font-size', d => Math.max(8, d.size * 0.52))
      .attr('font-family', "'DM Mono', monospace")
      .attr('letter-spacing', '0.04em')

    // Hover interactions
    node
      .on('mouseenter', function(_, d) {
        d3.select(this).select('circle:nth-child(2)')
          .attr('fill', GROUP_COLORS[d.group])
          .attr('fill-opacity', 0.18)
          .attr('stroke-opacity', 1)

        d3.select(this).select('text')
          .attr('fill', GROUP_COLORS[d.group])
          .attr('font-weight', '700')

        // Highlight connected links
        link.attr('stroke-opacity', l => {
          const src = (l.source as Node).id
          const tgt = (l.target as Node).id
          return src === d.id || tgt === d.id ? 0.7 : 0.05
        })
      })
      .on('mouseleave', function(_) {
        d3.select(this).select('circle:nth-child(2)')
          .attr('fill', '#111')
          .attr('fill-opacity', 1)
          .attr('stroke-opacity', 0.65)

        d3.select(this).select('text')
          .attr('fill', 'rgba(245,240,235,0.55)')
          .attr('font-weight', 'normal')

        link.attr('stroke-opacity', 0.15)
      })

    // Tick
    sim.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!)

      node.attr('transform', d => `translate(${d.x},${d.y})`)
    })

    // Fade in nodes
    node.attr('opacity', 0)
      .transition().duration(600).delay((_, i) => i * 25)
      .attr('opacity', 1)

    const ro = new ResizeObserver(() => {
      const nW = container.clientWidth
      const nH = container.clientHeight
      svg.attr('width', nW).attr('height', nH)
      sim.force('center', d3.forceCenter(nW / 2, nH / 2))
      sim.alpha(0.2).restart()
    })
    ro.observe(container)

    return () => {
      sim.stop()
      ro.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', ...style }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
