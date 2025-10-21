
'use client'

import dynamic from 'next/dynamic'

// @ts-ignore
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64 text-gray-400">Loading volatility surface...</div>
})

const VolatilitySurfaceChart = () => {
  // Sample volatility surface data
  const strikes = [105000, 110000, 115000, 118000, 120000, 125000, 130000, 135000, 140000]
  const expiries = ['1W', '2W', '1M', '2M', '3M', '6M']
  
  const volatilityData = [
    [125, 118, 112, 108, 105, 98],
    [118, 112, 106, 102, 99, 92],
    [112, 108, 102, 98, 95, 88],
    [108, 104, 98, 94, 91, 84],
    [105, 101, 95, 91, 88, 81],
    [102, 98, 92, 88, 85, 78],
    [98, 94, 88, 84, 81, 74],
    [95, 91, 85, 81, 78, 71],
    [92, 88, 82, 78, 75, 68]
  ]

  const data: any = [{
    z: volatilityData,
    x: expiries,
    y: strikes,
    type: 'surface' as const,
    colorscale: [
      [0, '#1f2937'],
      [0.25, '#374151'],
      [0.5, '#f97316'],
      [0.75, '#ea580c'],
      [1, '#dc2626']
    ],
    colorbar: {
      title: false,
      thickness: 8,
      len: 0.7,
      tickfont: { color: '#9ca3af', size: 10 }
    },
    hovertemplate: '%{y:$,.0f} | %{x} | %{z:.1f}%<extra></extra>',
    lighting: {
      ambient: 0.8,
      diffuse: 0.8,
      fresnel: 0.2,
      specular: 0.05,
      roughness: 0.5
    }
  }]

  const layout: any = {
    title: false,
    scene: {
      camera: {
        eye: { x: 1.25, y: 1.25, z: 1.25 }
      },
      xaxis: {
        title: 'Expiry',
        titlefont: { color: '#9ca3af', size: 11 },
        tickfont: { color: '#9ca3af', size: 10 },
        showgrid: true,
        gridcolor: '#374151',
        showbackground: true,
        backgroundcolor: '#1f2937',
        showspikes: false
      },
      yaxis: {
        title: 'Strike',
        titlefont: { color: '#9ca3af', size: 11 },
        tickfont: { color: '#9ca3af', size: 10 },
        showgrid: true,
        gridcolor: '#374151',
        showbackground: true,
        backgroundcolor: '#1f2937',
        showspikes: false
      },
      zaxis: {
        title: 'IV (%)',
        titlefont: { color: '#9ca3af', size: 11 },
        tickfont: { color: '#9ca3af', size: 10 },
        showgrid: true,
        gridcolor: '#374151',
        showbackground: true,
        backgroundcolor: '#1f2937',
        showspikes: false
      },
      bgcolor: '#111827'
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#9ca3af' },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    hoverlabel: {
      bgcolor: '#1f2937',
      bordercolor: '#374151',
      font: { size: 11, color: '#f9fafb' }
    }
  }

  const config: any = {
    responsive: true,
    displaylogo: false,
    displayModeBar: true,
    modeBarButtonsToRemove: ["autoScale2d", "autoscale", "editInChartStudio", "editinchartstudio", "hoverCompareCartesian", "hovercompare", "lasso", "lasso2d", "orbitRotation", "orbitrotation", "pan", "pan2d", "pan3d", "resetSankeyGroup", "resetViewMap", "resetViewMapbox", "resetViews", "resetcameradefault", "resetsankeygroup", "select", "select2d", "sendDataToCloud", "senddatatocloud", "tableRotation", "tablerotation", "toggleHover", "toggleSpikelines", "togglehover", "togglespikelines", "zoom", "zoom2d", "zoom3d", "zoomIn2d", "zoomInGeo", "zoomInMap", "zoomInMapbox", "zoomOut2d", "zoomOutGeo", "zoomOutMap", "zoomOutMapbox", "zoomin", "zoomout"]
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

export default VolatilitySurfaceChart
