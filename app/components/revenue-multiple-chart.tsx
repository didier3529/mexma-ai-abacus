
'use client'

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip } from 'recharts'

const multipleData = [
  { name: 'UNI', x: 180, y: 49.4, size: 8900 },
  { name: 'AAVE', x: 89, y: 23.6, size: 2100 },
  { name: 'MKR', x: 67, y: 41.8, size: 2800 },
  { name: 'COMP', x: 34, y: 35.3, size: 1200 },
  { name: 'CRV', x: 78, y: 11.4, size: 890 }
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{data.name}</p>
        <p className="text-orange-400">Revenue: ${data.x}M</p>
        <p className="text-blue-400">Multiple: {data.y}x</p>
        <p className="text-gray-300">Market Cap: ${(data.size / 1000).toFixed(1)}B</p>
      </div>
    )
  }
  return null
}

export default function RevenueMultipleChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Revenue"
            unit="M"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            label={{ 
              value: 'Revenue ($M)', 
              position: 'insideBottom', 
              offset: -15,
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Multiple"
            unit="x"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            label={{ 
              value: 'Multiple', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter 
            data={multipleData} 
            fill="#F97316"
            fillOpacity={0.8}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
