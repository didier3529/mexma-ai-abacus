
'use client'

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts'

const metcalfeData = [
  { name: 'BTC', x: 847, y: 118375, predicted: 125000 },
  { name: 'ETH', x: 635, y: 3847, predicted: 4200 },
  { name: 'SOL', x: 423, y: 265, predicted: 280 },
  { name: 'XRP', x: 289, y: 3.41, predicted: 2.80 },
  { name: 'BNB', x: 234, y: 697, predicted: 750 }
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const accuracy = ((data.y / data.predicted) * 100).toFixed(1)
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{data.name}</p>
        <p className="text-orange-400">Addresses: {data.x}K</p>
        <p className="text-blue-400">Current: ${data.y.toLocaleString()}</p>
        <p className="text-green-400">Predicted: ${data.predicted.toLocaleString()}</p>
        <p className="text-gray-300 text-xs">Accuracy: {accuracy}%</p>
      </div>
    )
  }
  return null
}

export default function MetcalfeModelChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Active Addresses"
            unit="K"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            label={{ 
              value: 'Active Addresses (K)', 
              position: 'insideBottom', 
              offset: -15,
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Price"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            scale="log"
            domain={['dataMin / 2', 'dataMax * 2']}
            label={{ 
              value: 'Price ($)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter 
            data={metcalfeData} 
            fill="#F97316"
            fillOpacity={0.8}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
