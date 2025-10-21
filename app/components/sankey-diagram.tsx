
'use client'

import dynamic from 'next/dynamic'

// @ts-ignore
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-800/30 rounded-lg flex items-center justify-center"><span className="text-gray-400">Loading sankey diagram...</span></div>
})

export default function SankeyDiagram() {
  const sankeyData = {
    type: 'sankey' as const,
    orientation: 'h' as const,
    node: {
      pad: 15,
      thickness: 20,
      line: {
        color: '#374151',
        width: 0.5
      },
      label: [
        'Whale Wallets', 'Institutional', 'Retail', 'CEX Cold Storage', 
        'CEX Hot Wallets', 'DEX Liquidity', 'DeFi Protocols', 'Bridges',
        'Mixers', 'Unknown Entities', 'Staking Contracts', 'Final Destinations'
      ],
      color: [
        '#f97316', '#3b82f6', '#10b981', '#6366f1',
        '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b',
        '#dc2626', '#6b7280', '#84cc16', '#1f2937'
      ],
      hovertemplate: '%{label}<br>Total Flow: $%{value}M<extra></extra>'
    },
    link: {
      source: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 10],
      target: [4, 6, 4, 6, 4, 5, 4, 10, 5, 7, 6, 11, 7, 11, 8, 9, 11, 11],
      value: [847, 423, 291, 156, 184, 267, 392, 845, 673, 234, 456, 789, 345, 567, 123, 89, 234, 456],
      color: [
        'rgba(249, 115, 22, 0.3)', 'rgba(249, 115, 22, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.3)',
        'rgba(16, 185, 129, 0.3)', 'rgba(16, 185, 129, 0.3)', 'rgba(99, 102, 241, 0.3)', 'rgba(99, 102, 241, 0.3)',
        'rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(236, 72, 153, 0.3)', 'rgba(236, 72, 153, 0.3)',
        'rgba(20, 184, 166, 0.3)', 'rgba(20, 184, 166, 0.3)', 'rgba(245, 158, 11, 0.3)', 'rgba(220, 38, 38, 0.6)',
        'rgba(107, 114, 128, 0.5)', 'rgba(132, 204, 22, 0.3)'
      ],
      hovertemplate: '%{source.label} → %{target.label}<br>Flow: $%{value}M<extra></extra>'
    }
  }

  const layout: any = {
    title: false,
    font: {
      size: 10,
      color: '#ffffff'
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    margin: { l: 20, r: 20, t: 20, b: 20 },
    hovermode: 'closest',
    hoverlabel: {
      bgcolor: '#1f2937',
      font: {
        size: 11,
        color: '#ffffff'
      },
      align: 'left'
    },
    annotations: [
      {
        text: 'Real-time fund flows across crypto ecosystem',
        showarrow: false,
        x: 0.5,
        y: 1.02,
        xref: 'paper',
        yref: 'paper',
        xanchor: 'center',
        yanchor: 'bottom',
        font: {
          size: 12,
          color: '#f97316'
        }
      }
    ]
  }

  const config: any = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: [
      'autoScale2d', 'autoscale', 'editInChartStudio', 'editinchartstudio',
      'hoverCompareCartesian', 'hovercompare', 'lasso', 'lasso2d', 'orbitRotation',
      'orbitrotation', 'pan', 'pan2d', 'pan3d', 'resetSankeyGroup', 'resetViewMap',
      'resetViewMapbox', 'resetViews', 'resetcameradefault', 'resetsankeygroup',
      'select', 'select2d', 'sendDataToCloud', 'senddatatocloud', 'tableRotation',
      'tablerotation', 'toggleHover', 'toggleSpikelines', 'togglehover',
      'togglespikelines', 'zoom', 'zoom2d', 'zoom3d', 'zoomIn2d', 'zoomInGeo',
      'zoomInMap', 'zoomInMapbox', 'zoomOut2d', 'zoomOutGeo', 'zoomOutMap',
      'zoomOutMapbox', 'zoomin', 'zoomout'
    ]
  }

  return (
    <div className="w-full h-96">
      <Plot
        data={[sankeyData]}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
