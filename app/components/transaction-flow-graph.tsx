
'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface TransactionNode {
  id: string
  label: string
  type: 'searcher' | 'user' | 'contract' | 'validator' | 'mempool'
  value: number
  mev: number
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface TransactionLink {
  source: string | TransactionNode
  target: string | TransactionNode
  value: number
  type: 'frontrun' | 'backrun' | 'sandwich' | 'normal'
  mev: number
}

export default function TransactionFlowGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  const nodes: TransactionNode[] = [
    { id: 'mempool', label: 'Mempool', type: 'mempool', value: 100, mev: 0 },
    { id: 'user1', label: 'User Tx', type: 'user', value: 60, mev: 0 },
    { id: 'searcher1', label: 'MEV Bot Alpha', type: 'searcher', value: 80, mev: 95 },
    { id: 'searcher2', label: 'MEV Bot Beta', type: 'searcher', value: 70, mev: 87 },
    { id: 'contract1', label: 'Uniswap V3', type: 'contract', value: 90, mev: 0 },
    { id: 'contract2', label: 'Balancer', type: 'contract', value: 75, mev: 0 },
    { id: 'validator', label: 'Flashbots', type: 'validator', value: 95, mev: 45 },
    { id: 'user2', label: 'Victim Tx', type: 'user', value: 50, mev: -30 },
    { id: 'searcher3', label: 'Arb Hunter', type: 'searcher', value: 65, mev: 78 }
  ]

  const links: TransactionLink[] = [
    { source: 'mempool', target: 'user1', value: 30, type: 'normal', mev: 0 },
    { source: 'mempool', target: 'searcher1', value: 60, type: 'frontrun', mev: 45 },
    { source: 'searcher1', target: 'contract1', value: 80, type: 'sandwich', mev: 95 },
    { source: 'user1', target: 'contract1', value: 40, type: 'normal', mev: 0 },
    { source: 'searcher2', target: 'contract1', value: 50, type: 'backrun', mev: 87 },
    { source: 'contract1', target: 'validator', value: 70, type: 'normal', mev: 0 },
    { source: 'searcher3', target: 'contract2', value: 35, type: 'frontrun', mev: 78 },
    { source: 'user2', target: 'contract2', value: 25, type: 'normal', mev: -30 },
    { source: 'contract2', target: 'validator', value: 45, type: 'normal', mev: 0 },
    { source: 'mempool', target: 'searcher2', value: 40, type: 'frontrun', mev: 87 }
  ]

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 500
    const height = 400
    const centerX = width / 2
    const centerY = height / 2

    // Create simulation with forces
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('collision', d3.forceCollide().radius(35))

    // Create container group
    const container = svg.append('g')

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        container.attr('transform', event.transform)
      })

    svg.call(zoom as any)

    // Create arrow markers for different link types
    const defs = svg.append('defs')
    
    const arrowTypes = [
      { id: 'frontrun', color: '#dc2626' },
      { id: 'backrun', color: '#f97316' },
      { id: 'sandwich', color: '#7c2d12' },
      { id: 'normal', color: '#6b7280' }
    ]

    arrowTypes.forEach(arrow => {
      defs.append('marker')
        .attr('id', `arrow-${arrow.id}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 25)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', arrow.color)
    })

    // Create links with animations
    const link = container.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('stroke', (d: TransactionLink) => {
        if (d.type === 'frontrun') return '#dc2626'
        if (d.type === 'backrun') return '#f97316'
        if (d.type === 'sandwich') return '#7c2d12'
        return '#6b7280'
      })
      .attr('stroke-width', (d: TransactionLink) => Math.max(2, d.value / 10))
      .attr('stroke-opacity', 0.8)
      .attr('marker-end', (d: TransactionLink) => `url(#arrow-${d.type})`)
      .style('stroke-dasharray', (d: TransactionLink) => 
        d.type === 'sandwich' ? '8,4' : 'none'
      )

    // Animate link opacity and dash patterns
    link
      .style('stroke-dashoffset', 20)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .style('stroke-dashoffset', 0)
      .on('end', function() {
        d3.select(this)
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .style('stroke-dashoffset', -20)
      })

    // Create animated particles for MEV flows
    const particles = container.selectAll('.particle')
      .data(links.filter(d => d.mev > 0))
      .enter()
      .append('circle')
      .attr('class', 'particle')
      .attr('r', 3)
      .attr('fill', '#f97316')
      .attr('opacity', 0)

    // Animate particles along MEV flows
    function animateMEVParticles() {
      particles
        .attr('opacity', 0.9)
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .attrTween('transform', function(d: TransactionLink) {
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

    // Create nodes with different visual styles
    const node = container.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')

    // Add node circles with type-specific styling
    node.append('circle')
      .attr('r', (d: TransactionNode) => Math.sqrt(d.value) + 15)
      .attr('fill', (d: TransactionNode) => {
        if (d.type === 'searcher') return d.mev > 0 ? '#dc2626' : '#f97316'
        if (d.type === 'user') return d.mev < 0 ? '#ef4444' : '#3b82f6'
        if (d.type === 'contract') return '#8b5cf6'
        if (d.type === 'validator') return '#10b981'
        return '#6b7280'
      })
      .attr('stroke', (d: TransactionNode) => {
        if (d.mev > 50) return '#dc2626'
        if (d.mev > 0) return '#f97316'
        if (d.mev < 0) return '#ef4444'
        return '#374151'
      })
      .attr('stroke-width', 3)
      .style('filter', (d: TransactionNode) => 
        d.mev > 0 ? 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.7))' : 
        'drop-shadow(0 0 6px rgba(107, 114, 128, 0.4))'
      )

    // Add pulsing animation for MEV nodes
    node.filter((d: TransactionNode) => d.mev > 0)
      .append('circle')
      .attr('r', 8)
      .attr('fill', '#f97316')
      .attr('opacity', 0.6)
      .transition()
      .duration(1500)
      .ease(d3.easeSinInOut)
      .attr('r', 25)
      .attr('opacity', 0)
      .on('end', function() {
        d3.select(this)
          .attr('r', 8)
          .attr('opacity', 0.6)
          .transition()
          .duration(1500)
          .ease(d3.easeSinInOut)
          .attr('r', 25)
          .attr('opacity', 0)
      })

    // Add labels
    node.append('text')
      .text((d: TransactionNode) => d.label)
      .attr('font-size', '9px')
      .attr('font-weight', 'bold')
      .attr('fill', '#ffffff')
      .attr('text-anchor', 'middle')
      .attr('dy', -30)
      .style('pointer-events', 'none')

    // Add MEV indicators
    node.filter((d: TransactionNode) => d.mev !== 0)
      .append('text')
      .text((d: TransactionNode) => `MEV: ${d.mev > 0 ? '+' : ''}${d.mev}%`)
      .attr('font-size', '8px')
      .attr('fill', (d: TransactionNode) => d.mev > 0 ? '#f97316' : '#ef4444')
      .attr('text-anchor', 'middle')
      .attr('dy', 40)
      .style('pointer-events', 'none')

    // Add drag behavior
    const drag = d3.drag<SVGGElement, TransactionNode>()
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
          .attr('r', Math.sqrt(d.value) + 20)
          .style('filter', d.mev > 0 ? 
            'drop-shadow(0 0 15px rgba(249, 115, 22, 1))' : 
            'drop-shadow(0 0 10px rgba(107, 114, 128, 0.8))'
          )
      })
      .on('mouseout', function(event, d) {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', Math.sqrt(d.value) + 15)
          .style('filter', d.mev > 0 ? 
            'drop-shadow(0 0 10px rgba(249, 115, 22, 0.7))' : 
            'drop-shadow(0 0 6px rgba(107, 114, 128, 0.4))'
          )
      })

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('transform', (d: TransactionNode) => `translate(${d.x},${d.y})`)
    })

    // Start MEV particle animation
    const mevInterval = setInterval(animateMEVParticles, 2000)
    animateMEVParticles() // Start immediately

    return () => {
      clearInterval(mevInterval)
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
            <div className="w-3 h-1 bg-red-600"></div>
            <span>Frontrun</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-orange-500"></div>
            <span>Backrun</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-amber-800 border-dashed border-t"></div>
            <span>Sandwich</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-2 text-xs text-gray-400">
        Live MEV transaction flows • Orange particles = MEV extraction
      </div>
    </div>
  )
}
