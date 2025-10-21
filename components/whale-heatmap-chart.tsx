
'use client'

import dynamic from 'next/dynamic'

// @ts-ignore
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-800/30 rounded-lg flex items-center justify-center"><span className="text-gray-400">Loading heatmap...</span></div>
})

export default function WhaleHeatmapChart() {
  const heatmapData = [
    [12, 45, 78, 23, 67, 89, 34],
    [56, 23, 89, 45, 12, 67, 78],
    [89, 67, 34, 78, 45, 23, 56],
    [23, 78, 56, 67, 89, 45, 12],
    [67, 34, 12, 89, 23, 78, 45],
    [45, 89, 67, 12, 56, 34, 78],
    [78, 12, 45, 34, 67, 56, 89]
  ]

  const xLabels = ['BTC', 'ETH', 'SOL', 'ADA', 'MATIC', 'AVAX', 'UNI']
  const yLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']

  const data: any = [{
    z: heatmapData,
    x: xLabels,
    y: yLabels,
    type: 'heatmap' as const,
    colorscale: [
      [0, '#1f2937'],
      [0.2, '#374151'],
      [0.4, '#6b7280'],
      [0.6, '#f97316'],
      [0.8, '#ea580c'],
      [1, '#dc2626']
    ],
    hovertemplate: '%{x} at %{y}<br>Activity: %{z}<extra></extra>',
    showscale: true,
    colorbar: {
      title: false,
      thickness: 8,
      len: 0.7,
      tickfont: { color: '#9ca3af', size: 10 }
    }
  }]

  const layout: any = {
    title: false,
    xaxis: {
      title: false,
      tickfont: { color: '#9ca3af', size: 10 },
      showgrid: false,
      zeroline: false
    },
    yaxis: {
      title: false,
      tickfont: { color: '#9ca3af', size: 10 },
      showgrid: false,
      zeroline: false
    },
    plot_bgcolor: 'transparent',
    paper_bgcolor: 'transparent',
    font: { color: '#9ca3af' },
    margin: { l: 60, r: 60, t: 20, b: 40 },
    hovermode: 'closest',
    hoverlabel: {
      bgcolor: '#1f2937',
      font: { size: 13, color: '#f9fafb' },
      align: 'left'
    }
  }

  const config: any = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ["autoScale2d", "autoscale", "editInChartStudio", "editinchartstudio", "hoverCompareCartesian", "hovercompare", "lasso", "lasso2d", "orbitRotation", "orbitrotation", "pan", "pan2d", "pan3d", "resetSankeyGroup", "resetViewMap", "resetViewMapbox", "resetViews", "resetcameradefault", "resetsankeygroup", "select", "select2d", "sendDataToCloud", "senddatatocloud", "tableRotation", "tablerotation", "toggleHover", "toggleSpikelines", "togglehover", "togglespikelines", "zoom", "zoom2d", "zoom3d", "zoomIn2d", "zoomInGeo", "zoomInMap", "zoomInMapbox", "zoomOut2d", "zoomOutGeo", "zoomOutMap", "zoomOutMapbox", "zoomin", "zoomout"]
  }

  return (
    <div className="w-full h-64">
      <Plot
        data={data}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
