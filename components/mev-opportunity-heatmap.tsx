
'use client'

import dynamic from 'next/dynamic'

// @ts-ignore
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-800/30 rounded-lg flex items-center justify-center"><span className="text-gray-400">Loading MEV heatmap...</span></div>
})

export default function MEVOpportunityHeatmap() {
  // MEV opportunity data: rows = time periods, columns = opportunity types
  const heatmapData = [
    [45, 23, 67, 89, 34, 56, 78, 91], // 00:00-03:00
    [67, 89, 34, 56, 78, 23, 45, 67], // 03:00-06:00
    [89, 34, 56, 78, 45, 67, 23, 34], // 06:00-09:00
    [34, 78, 45, 23, 89, 34, 56, 89], // 09:00-12:00
    [78, 45, 23, 67, 56, 78, 89, 45], // 12:00-15:00
    [23, 67, 89, 45, 34, 89, 67, 78], // 15:00-18:00
    [56, 89, 67, 78, 23, 45, 34, 56], // 18:00-21:00
    [89, 45, 78, 34, 67, 56, 78, 23]  // 21:00-24:00
  ]

  const yLabels = [
    '00:00-03:00', '03:00-06:00', '06:00-09:00', '09:00-12:00',
    '12:00-15:00', '15:00-18:00', '18:00-21:00', '21:00-24:00'
  ]

  const xLabels = [
    'Arbitrage', 'Sandwich', 'Liquidation', 'MEV-Boost',
    'Flash Loan', 'Frontrun', 'Backrun', 'Cross-DEX'
  ]

  const data: any = [{
    z: heatmapData,
    x: xLabels,
    y: yLabels,
    type: 'heatmap' as const,
    colorscale: [
      [0, '#0f1419'],
      [0.1, '#1f2937'],
      [0.2, '#374151'],
      [0.3, '#4b5563'],
      [0.4, '#6b7280'],
      [0.5, '#f97316'],
      [0.6, '#ea580c'],
      [0.8, '#dc2626'],
      [0.9, '#b91c1c'],
      [1, '#7f1d1d']
    ],
    hovertemplate: '<b>%{x}</b><br>Time: %{y}<br>Opportunities: %{z}<br>Expected Profit: $%{customdata}K<extra></extra>',
    customdata: heatmapData.map(row => 
      row.map(val => Math.round(val * 3.2)) // Convert to profit estimates
    ),
    showscale: true,
    colorbar: {
      title: false,
      thickness: 8,
      len: 0.7,
      tickfont: {
        size: 10,
        color: '#ffffff'
      },
      tickmode: 'array',
      tickvals: [0, 25, 50, 75, 90],
      ticktext: ['Low', 'Med-', 'Med', 'High', 'Max']
    }
  }]

  const layout: any = {
    title: false,
    font: {
      size: 10,
      color: '#ffffff'
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    margin: { l: 80, r: 60, t: 40, b: 60 },
    xaxis: {
      title: {
        text: 'MEV Opportunity Types',
        font: { size: 11, color: '#f97316' }
      },
      tickfont: { size: 9, color: '#ffffff' },
      gridcolor: '#374151',
      showgrid: false
    },
    yaxis: {
      title: {
        text: 'Time Periods',
        font: { size: 11, color: '#f97316' }
      },
      tickfont: { size: 9, color: '#ffffff' },
      gridcolor: '#374151',
      showgrid: false
    },
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
        text: 'Real-time MEV opportunity intensity across 24h periods',
        showarrow: false,
        x: 0.5,
        y: 1.08,
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
        data={data}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
