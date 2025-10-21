
'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// @ts-ignore
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-800/30 rounded-lg flex items-center justify-center"><span className="text-gray-400">Loading correlation matrix...</span></div>
})

export default function CorrelationMatrixHeatmap() {
  const [animationFrame, setAnimationFrame] = useState(0)

  // Asset correlation matrix data with real-time updates
  const baseCorrelationData = [
    [1.00, 0.87, 0.45, 0.23, 0.67, 0.34, 0.78, 0.56],    // BTC
    [0.87, 1.00, 0.56, 0.34, 0.78, 0.45, 0.89, 0.67],    // ETH
    [0.45, 0.56, 1.00, 0.78, 0.23, 0.89, 0.34, 0.45],    // SOL
    [0.23, 0.34, 0.78, 1.00, 0.45, 0.67, 0.56, 0.89],    // ADA
    [0.67, 0.78, 0.23, 0.45, 1.00, 0.34, 0.67, 0.23],    // MATIC
    [0.34, 0.45, 0.89, 0.67, 0.34, 1.00, 0.78, 0.56],    // AVAX
    [0.78, 0.89, 0.34, 0.56, 0.67, 0.78, 1.00, 0.34],    // UNI
    [0.56, 0.67, 0.45, 0.89, 0.23, 0.56, 0.34, 1.00]     // LINK
  ]

  // Add dynamic fluctuations to simulate real-time correlations
  const [correlationData, setCorrelationData] = useState(baseCorrelationData)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => prev + 1)
      
      const newData = baseCorrelationData.map((row, i) => 
        row.map((value, j) => {
          if (i === j) return 1.00 // Diagonal always 1
          
          // Add small random fluctuations
          const fluctuation = (Math.sin(animationFrame * 0.1 + i + j) * 0.05) + 
                            (Math.random() - 0.5) * 0.02
          const newValue = Math.max(-1, Math.min(1, value + fluctuation))
          return Math.round(newValue * 100) / 100
        })
      )
      
      setCorrelationData(newData)
    }, 2000)

    return () => clearInterval(interval)
  }, [animationFrame])

  const assetLabels = ['BTC', 'ETH', 'SOL', 'ADA', 'MATIC', 'AVAX', 'UNI', 'LINK']

  const data: any = [{
    z: correlationData,
    x: assetLabels,
    y: assetLabels,
    type: 'heatmap' as const,
    colorscale: [
      [0, '#7f1d1d'],    // Strong negative (dark red)
      [0.2, '#dc2626'],  // Negative (red)
      [0.35, '#f97316'], // Weak negative (orange)
      [0.45, '#fbbf24'], // Neutral (yellow)
      [0.55, '#84cc16'], // Weak positive (light green)
      [0.7, '#22c55e'],  // Positive (green)
      [0.85, '#10b981'], // Strong positive (teal)
      [1, '#059669']     // Perfect positive (dark teal)
    ],
    hovertemplate: '<b>%{x} vs %{y}</b><br>Correlation: %{z}<br>Strength: %{customdata}<extra></extra>',
    customdata: correlationData.map(row => 
      row.map(val => {
        const abs = Math.abs(val)
        if (abs >= 0.8) return 'Very Strong'
        if (abs >= 0.6) return 'Strong'
        if (abs >= 0.4) return 'Moderate'
        if (abs >= 0.2) return 'Weak'
        return 'Very Weak'
      })
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
      tickvals: [-1, -0.5, 0, 0.5, 1],
      ticktext: ['-1.0', '-0.5', '0.0', '+0.5', '+1.0']
    },
    animation: {
      transition: {
        duration: 1500,
        easing: 'cubic-in-out'
      },
      frame: {
        duration: 2000,
        redraw: true
      }
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
    margin: { l: 60, r: 60, t: 40, b: 60 },
    xaxis: {
      title: {
        text: 'Assets',
        font: { size: 11, color: '#f97316' }
      },
      tickfont: { size: 11, color: '#ffffff' },
      gridcolor: '#374151',
      showgrid: false,
      side: 'bottom'
    },
    yaxis: {
      title: {
        text: 'Assets',
        font: { size: 11, color: '#f97316' }
      },
      tickfont: { size: 11, color: '#ffffff' },
      gridcolor: '#374151',
      showgrid: false,
      autorange: 'reversed'
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
        text: 'Live Asset Correlation Matrix • Updates every 2 seconds',
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
    <div className="w-full h-96 relative">
      <Plot
        data={data}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
      <div className="absolute top-2 right-2 text-xs text-gray-400 bg-gray-900/80 p-2 rounded">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-2 bg-red-600"></div>
            <span>Strong Negative</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-2 bg-yellow-500"></div>
            <span>Neutral</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-2 bg-teal-600"></div>
            <span>Strong Positive</span>
          </div>
        </div>
      </div>
    </div>
  )
}
