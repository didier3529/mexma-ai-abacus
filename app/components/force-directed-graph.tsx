
'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Node {
  id: string
  label: string
  type: 'wallet' | 'exchange' | 'contract' | 'mixer' | 'bridge'
  value: number
  risk: number
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface Link {
  source: string | Node
  target: string | Node
  value: number
  risk: 'high' | 'medium' | 'low'
}

export default function ForceDirectedGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  const nodes: Node[] = [
    { id: 'binance', label: 'Binance', type: 'exchange', value: 100, risk: 15 },
    { id: 'uniswap', label: 'Uniswap', type: 'contract', value: 80, risk: 25 },
    { id: 'whale1', label: 'Whale Alpha', type: 'wallet', value: 60, risk: 45 },
    { id: 'tornado', label: 'Tornado Cash', type: 'mixer', value: 40, risk: 95 },
    { id: 'arbitrum', label: 'Arbitrum Bridge', type: 'bridge', value: 70, risk: 30 },
    { id: 'coinbase', label: 'Coinbase', type: 'exchange', value: 90, risk: 10 },
    { id: 'whale2', label: 'Whale Beta', type: 'wallet', value: 50, risk: 35 },
    { id: 'compound', label: 'Compound', type: 'contract', value: 65, risk: 20 },
    { id: 'bridge2', label: 'Polygon Bridge', type: 'bridge', value: 55, risk: 25 },
    { id: 'unknown1', label: 'Unknown Wallet', type: 'wallet', value: 30, risk: 75 }
  ]

  const links: Link[] = [
    { source: 'whale1', target: 'binance', value: 50, risk: 'medium' },
    { source: 'tornado', target: 'unknown1', value: 30, risk: 'high' },
    { source: 'arbitrum', target: 'uniswap', value: 70, risk: 'low' },
    { source: 'coinbase', target: 'whale2', value: 40, risk: 'low' },
    { source: 'whale2', target: 'compound', value: 35, risk: 'medium' },
    { source: 'binance', target: 'tornado', value: 25, risk: 'high' },
    { source: 'uniswap', target: 'compound', value: 45, risk: 'low' },
    { source: 'bridge2', target: 'whale1', value: 30, risk: 'medium' },
    { source: 'whale1', target: 'uniswap', value: 60, risk: 'low' },
    { source: 'unknown1', target: 'bridge2', value: 20, risk: 'high' }
  ]

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 500
    const height = 400
    const centerX = width / 2
    const centerY = height / 2

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('collision', d3.forceCollide().radius(30))

    // Create container group
    const container = svg.append('g')

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        container.attr('transform', event.transform)
      })

    svg.call(zoom as any)

    // Create links
    const link = container.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('stroke', (d: Link) => 
        d.risk === 'high' ? '#dc2626' : 
        d.risk === 'medium' ? '#f97316' : '#22c55e'
      )
      .attr('stroke-width', (d: Link) => Math.sqrt(d.value) / 2)
      .attr('stroke-opacity', 0.6)
      .style('stroke-dasharray', (d: Link) => d.risk === 'high' ? '5,5' : 'none')

    // Create animated particles along links
    const particles = container.selectAll('.particle')
      .data(links)
      .enter()
      .append('circle')
      .attr('class', 'particle')
      .attr('r', 2)
      .attr('fill', '#f97316')
      .attr('opacity', 0)

    // Animate particles
    function animateParticles() {
      particles
        .attr('opacity', 0.8)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attrTween('transform', function(d: Link) {
          const source = typeof d.source === 'string' ? nodes.find(n => n.id === d.source) : d.source
          const target = typeof d.target === 'string' ? nodes.find(n => n.id === d.target) : d.target
          
          if (!source || !target) {
            return function() { return 'translate(0,0)' }
          }
          
          return function(t: number) {
            const x = source.x! + (target.x! - source.x!) * t
            const y = source.y! + (target.y! - source.y!) * t
            return `translate(${x},${y})`
          }
        })
        .on('end', function() {
          d3.select(this).attr('opacity', 0)
        })
    }

    // Create nodes
    const node = container.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')

    // Add node circles with glow effect
    node.append('circle')
      .attr('r', (d: Node) => Math.sqrt(d.value) + 10)
      .attr('fill', (d: Node) => {
        if (d.type === 'exchange') return '#3b82f6'
        if (d.type === 'contract') return '#8b5cf6'
        if (d.type === 'mixer') return '#dc2626'
        if (d.type === 'bridge') return '#10b981'
        return '#f97316'
      })
      .attr('stroke', (d: Node) => 
        d.risk >= 80 ? '#dc2626' : 
        d.risk >= 50 ? '#f97316' : '#22c55e'
      )
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.5))')

    // Add inner circle for animation
    node.append('circle')
      .attr('r', 5)
      .attr('fill', '#ffffff')
      .attr('opacity', 0.8)
      .transition()
      .duration(2000)
      .ease(d3.easeSinInOut)
      .attr('r', 15)
      .attr('opacity', 0)
      .on('end', function() {
        d3.select(this)
          .attr('r', 5)
          .attr('opacity', 0.8)
          .transition()
          .duration(2000)
          .ease(d3.easeSinInOut)
          .attr('r', 15)
          .attr('opacity', 0)
      })

    // Add labels
    node.append('text')
      .text((d: Node) => d.label)
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#ffffff')
      .attr('text-anchor', 'middle')
      .attr('dy', -25)
      .style('pointer-events', 'none')

    // Add risk indicators
    node.append('text')
      .text((d: Node) => `Risk: ${d.risk}%`)
      .attr('font-size', '8px')
      .attr('fill', (d: Node) => 
        d.risk >= 80 ? '#dc2626' : 
        d.risk >= 50 ? '#f97316' : '#22c55e'
      )
      .attr('text-anchor', 'middle')
      .attr('dy', 35)
      .style('pointer-events', 'none')

    // Add drag behavior
    const drag = d3.drag<SVGGElement, Node>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (event, d) => {
        d.fx = event.x
        d.fy = event.y
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      })

    node.call(drag)

    // Add hover effects
    node
      .on('mouseover', function(event, d) {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', Math.sqrt(d.value) + 15)
          .style('filter', 'drop-shadow(0 0 15px rgba(249, 115, 22, 0.8))')
      })
      .on('mouseout', function(event, d) {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', Math.sqrt(d.value) + 10)
          .style('filter', 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.5))')
      })

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('transform', (d: Node) => `translate(${d.x},${d.y})`)
    })

    // Start particle animation
    const particleInterval = setInterval(animateParticles, 3000)
    animateParticles() // Start immediately

    return () => {
      clearInterval(particleInterval)
      simulation.stop()
    }
  }, [])

  return (
    <div className="w-full h-96 bg-gray-800/20 rounded-lg overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 500 400"
        className="w-full h-full"
      />
      <div className="absolute bottom-2 left-2 text-xs text-gray-400">
        Drag nodes • Scroll to zoom • Animated flows show real-time transactions
      </div>
    </div>
  )
}
