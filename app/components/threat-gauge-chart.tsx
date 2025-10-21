
'use client'

import dynamic from 'next/dynamic'

// @ts-ignore
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-800/30 rounded-lg flex items-center justify-center"><span className="text-gray-400">Loading gauge...</span></div>
})

export default function ThreatGaugeChart() {
  const data: any = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: 78,
    title: { text: "Threat Level", font: { color: '#9ca3af', size: 14 } },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: { 
        range: [null, 100],
        tickcolor: '#9ca3af',
        tickfont: { color: '#9ca3af', size: 10 }
      },
      bar: { color: "#ef4444" },
      steps: [
        { range: [0, 30], color: "#10b981" },
        { range: [30, 60], color: "#f59e0b" },
        { range: [60, 100], color: "#ef4444" }
      ],
      threshold: {
        line: { color: "#dc2626", width: 4 },
        thickness: 0.75,
        value: 90
      }
    }
  }]

  const layout: any = {
    width: 320,
    height: 250,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#9ca3af' }
  }

  const config: any = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ["autoScale2d", "autoscale", "editInChartStudio", "editinchartstudio", "hoverCompareCartesian", "hovercompare", "lasso", "lasso2d", "orbitRotation", "orbitrotation", "pan", "pan2d", "pan3d", "resetSankeyGroup", "resetViewMap", "resetViewMapbox", "resetViews", "resetcameradefault", "resetsankeygroup", "select", "select2d", "sendDataToCloud", "senddatatocloud", "tableRotation", "tablerotation", "toggleHover", "toggleSpikelines", "togglehover", "togglespikelines", "zoom", "zoom2d", "zoom3d", "zoomIn2d", "zoomInGeo", "zoomInMap", "zoomInMapbox", "zoomOut2d", "zoomOutGeo", "zoomOutMap", "zoomOutMapbox", "zoomin", "zoomout"]
  }

  return (
    <div className="w-full h-64 flex justify-center">
      <Plot
        data={data}
        layout={layout}
        config={config}
      />
    </div>
  )
}
