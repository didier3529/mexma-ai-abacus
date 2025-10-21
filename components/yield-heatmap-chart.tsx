
'use client'

import dynamic from 'next/dynamic'

// @ts-ignore
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64 text-gray-400">Loading yield heatmap...</div>
})

const YieldHeatmapChart = () => {
  const protocols = ['Aave', 'Compound', 'Uniswap', 'Curve', 'Balancer', 'GMX', 'Radiant', 'Stargate']
  const chains = ['Ethereum', 'Arbitrum', 'Polygon', 'Optimism', 'Avalanche', 'BSC']
  
  const yieldData = [
    [23.8, 45.2, 34.7, 28.9, 19.3, 67.8, 89.4, 12.5],
    [18.9, 52.1, 41.3, 31.7, 22.8, 0, 78.9, 45.6],
    [15.4, 38.7, 29.1, 42.5, 16.7, 0, 56.3, 34.8],
    [21.2, 47.8, 35.9, 33.4, 20.1, 0, 67.2, 28.9],
    [17.6, 43.2, 31.8, 29.7, 18.5, 0, 72.1, 41.3],
    [19.8, 49.5, 33.2, 35.8, 21.4, 0, 65.7, 37.2]
  ]

  const data: any = [{
    z: yieldData,
    x: protocols,
    y: chains,
    type: 'heatmap' as const,
    colorscale: [
      [0, '#111827'],
      [0.1, '#1f2937'],
      [0.3, '#374151'],
      [0.5, '#f97316'],
      [0.7, '#ea580c'],
      [1, '#dc2626']
    ],
    colorbar: {
      title: false,
      thickness: 8,
      len: 0.7,
      ticksuffix: '%',
      tickfont: { color: '#9ca3af', size: 10 }
    },
    hovertemplate: '%{y} | %{x}<br>APY: %{z:.1f}%<extra></extra>',
    text: yieldData.map(row => 
      row.map(val => val === 0 ? 'N/A' : `${val.toFixed(1)}%`)
    ),
    texttemplate: '%{text}',
    textfont: { color: '#f9fafb', size: 9 },
    showscale: true
  }]

  const layout: any = {
    title: false,
    xaxis: {
      title: 'Protocols',
      titlefont: { color: '#9ca3af', size: 11 },
      tickfont: { color: '#9ca3af', size: 10 },
      showgrid: false,
      side: 'bottom'
    },
    yaxis: {
      title: 'Chains',
      titlefont: { color: '#9ca3af', size: 11 },
      tickfont: { color: '#9ca3af', size: 10 },
      showgrid: false
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#9ca3af' },
    margin: { l: 80, r: 60, t: 20, b: 60 },
    hoverlabel: {
      bgcolor: '#1f2937',
      bordercolor: '#374151',
      font: { size: 11, color: '#f9fafb' }
    }
  }

  const config: any = {
    responsive: true,
    displaylogo: false,
    displayModeBar: false
  }

  return (
    <div className="h-64 w-full">
      <Plot
        data={data}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default YieldHeatmapChart
