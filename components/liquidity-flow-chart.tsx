
'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface FlowNode {
  id: string
  label: string
  chain: string
  value: number
  type: 'source' | 'bridge' | 'destination'
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface FlowLink {
  source: string | FlowNode
  target: string | FlowNode
  value: number
  asset: string
  active: boolean
}

export default function LiquidityFlowChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [activeFlows, setActiveFlows] = useState<string[]>([])

  const nodes: FlowNode[] = [
    { id: 'eth-main', label: 'Ethereum Mainnet', chain: 'ETH', value: 100, type: 'source' },
    { id: 'arb-one', label: 'Arbitrum One', chain: 'ARB', value: 80, type: 'destination' },
    { id: 'poly-main', label: 'Polygon', chain: 'MATIC', value: 70, type: 'destination' },
    { id: 'op-main', label: 'Optimism', chain: 'OP', value: 60, type: 'destination' },
    { id: 'base-main', label: 'Base', chain: 'BASE', value: 50, type: 'destination' },
    { id: 'bridge-arb', label: 'Arbitrum Bridge', chain: 'BRIDGE', value: 40, type: 'bridge' },
    { id: 'bridge-poly', label: 'Polygon Bridge', chain: 'BRIDGE', value: 35, type: 'bridge' },
    { id: 'bridge-op', label: 'OP Bridge', chain: 'BRIDGE', value: 30, type: 'bridge' },
    { id: 'bridge-base', label: 'Base Bridge', chain: 'BRIDGE', value: 25, type: 'bridge' },
    { id: 'hop-protocol', label: 'Hop Protocol', chain: 'MULTI', value: 45, type: 'bridge' }
  ]

  const links: FlowLink[] = [
    { source: 'eth-main', target: 'bridge-arb', value: 80, asset: 'WETH', active: false },
    { source: 'bridge-arb', target: 'arb-one', value: 75, asset: 'WETH', active: false },
    { source: 'eth-main', target: 'bridge-poly', value: 60, asset: 'USDC', active: false },
    { source: 'bridge-poly', target: 'poly-main', value: 55, asset: 'USDC', active: false },
    { source: 'eth-main', target: 'bridge-op', value: 50, asset: 'WETH', active: false },
    { source: 'bridge-op', target: 'op-main', value: 45, asset: 'WETH', active: false },
    { source: 'eth-main', target: 'bridge-base', value: 40, asset: 'WETH', active: false },
    { source: 'bridge-base', target: 'base-main', value: 35, asset: 'WETH', active: false },
    { source: 'arb-one', target: 'hop-protocol', value: 30, asset: 'ETH', active: false },
    { source: 'hop-protocol', target: 'op-main', value: 25, asset: 'ETH', active: false },
    { source: 'poly-main', target: 'hop-protocol', value: 20, asset: 'USDC', active: false },
    { source: 'hop-protocol', target: 'base-main', value: 15, asset: 'USDC', active: false }
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
      .force('collision', d3.forceCollide().radius(40))

    // Create container group
    const container = svg.append('g')

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        container.attr('transform', event.transform)
      })

    svg.call(zoom as any)

    // Create gradient definitions for flow animations
    const defs = svg.append('defs')
    
    // Create animated gradient for active flows
    const gradient = defs.append('linearGradient')
      .attr('id', 'flow-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#f97316')
      .attr('stop-opacity', 0)

    gradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', '#f97316')
      .attr('stop-opacity', 1)

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#f97316')
      .attr('stop-opacity', 0)

    // Create links
    const link = container.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('stroke', '#6b7280')
      .attr('stroke-width', (d: FlowLink) => Math.max(2, d.value / 10))
      .attr('stroke-opacity', 0.6)

    // Create animated flow particles
    const particles = container.selectAll('.particle')
      .data(links)
      .enter()
      .append('circle')
      .attr('class', 'particle')
      .attr('r', 3)
      .attr('fill', '#f97316')
      .attr('opacity', 0)

    // Create nodes
    const node = container.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')

    // Add node circles with type-specific styling
    node.append('circle')
      .attr('r', (d: FlowNode) => Math.sqrt(d.value) + 15)
      .attr('fill', (d: FlowNode) => {
        if (d.type === 'source') return '#3b82f6'
        if (d.type === 'bridge') return '#f97316'
        return '#10b981'
      })
      .attr('stroke', '#374151')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))')

    // Add pulsing rings for active nodes
    node.append('circle')
      .attr('r', 10)
      .attr('fill', 'none')
      .attr('stroke', '#f97316')
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .transition()
      .duration(2000)
      .ease(d3.easeSinInOut)
      .attr('r', 35)
      .attr('opacity', 0.6)
      .on('end', function() {
        d3.select(this)
          .attr('r', 10)
          .attr('opacity', 0)
          .transition()
          .duration(2000)
          .ease(d3.easeSinInOut)
          .attr('r', 35)
          .attr('opacity', 0.6)
      })

    // Add labels
    node.append('text')
      .text((d: FlowNode) => d.label)
      .attr('font-size', '8px')
      .attr('font-weight', 'bold')
      .attr('fill', '#ffffff')
      .attr('text-anchor', 'middle')
      .attr('dy', -25)
      .style('pointer-events', 'none')

    // Add chain indicators
    node.append('text')
      .text((d: FlowNode) => d.chain)
      .attr('font-size', '7px')
      .attr('fill', '#f97316')
      .attr('text-anchor', 'middle')
      .attr('dy', 35)
      .style('pointer-events', 'none')

    // Add value indicators
    node.append('text')
      .text((d: FlowNode) => `$${d.value}M TVL`)
      .attr('font-size', '6px')
      .attr('fill', '#9ca3af')
      .attr('text-anchor', 'middle')
      .attr('dy', 45)
      .style('pointer-events', 'none')

    // Animate particles along links
    function animateFlowParticles() {
      // Randomly activate some flows
      const randomLinks = links.filter(() => Math.random() > 0.7)
      setActiveFlows(randomLinks.map(l => `${typeof l.source === 'string' ? l.source : l.source.id}-${typeof l.target === 'string' ? l.target : l.target.id}`))

      particles
        .filter((d: FlowLink, i: number) => randomLinks.includes(d))
        .attr('opacity', 0.9)
        .transition()
        .duration(3000)
        .ease(d3.easeLinear)
        .attrTween('transform', function(d: FlowLink) {
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

      // Highlight active links
      link
        .attr('stroke', (d: FlowLink) => 
          randomLinks.includes(d) ? '#f97316' : '#6b7280'
        )
        .attr('stroke-width', (d: FlowLink) => 
          randomLinks.includes(d) ? Math.max(4, d.value / 8) : Math.max(2, d.value / 10)
        )
        .attr('stroke-opacity', (d: FlowLink) => 
          randomLinks.includes(d) ? 0.9 : 0.6
        )
    }

    // Add drag behavior
    const drag = d3.drag<SVGGElement, FlowNode>()
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
        // Highlight connected links
        link
          .attr('stroke', (l: FlowLink) => {
            const sourceId = typeof l.source === 'string' ? l.source : l.source.id
            const targetId = typeof l.target === 'string' ? l.target : l.target.id
            return (sourceId === d.id || targetId === d.id) ? '#f97316' : '#6b7280'
          })
          .attr('stroke-opacity', (l: FlowLink) => {
            const sourceId = typeof l.source === 'string' ? l.source : l.source.id
            const targetId = typeof l.target === 'string' ? l.target : l.target.id
            return (sourceId === d.id || targetId === d.id) ? 1 : 0.3
          })

        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', Math.sqrt(d.value) + 20)
          .style('filter', 'drop-shadow(0 0 15px rgba(249, 115, 22, 0.8))')
      })
      .on('mouseout', function(event, d) {
        link
          .attr('stroke', '#6b7280')
          .attr('stroke-opacity', 0.6)

        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', Math.sqrt(d.value) + 15)
          .style('filter', 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))')
      })

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('transform', (d: FlowNode) => `translate(${d.x},${d.y})`)
    })

    // Start flow animation
    const flowInterval = setInterval(animateFlowParticles, 4000)
    animateFlowParticles() // Start immediately

    return () => {
      clearInterval(flowInterval)
      simulation.stop()
    }
  }, [])

  return (
    <div className="w-full h-96 bg-gray-800/20 rounded-lg overflow-hidden relative">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 500 400"
        className="w-full h-full"
      />
      <div className="absolute top-2 right-2 text-xs text-gray-400 bg-gray-900/80 p-2 rounded">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Source Chain</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Bridge</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Destination</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-2 text-xs text-gray-400">
        Live cross-chain liquidity flows • Orange particles = active transfers
      </div>
    </div>
  )
}
