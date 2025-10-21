
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const nvtData = [
  { name: 'BTC', nvt: 42.7, color: '#F97316' },
  { name: 'ETH', nvt: 18.4, color: '#3B82F6' },
  { name: 'SOL', nvt: 14.2, color: '#8B5CF6' },
  { name: 'MATIC', nvt: 8.7, color: '#10B981' },
  { name: 'ARB', nvt: 12.3, color: '#F59E0B' }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const nvt = payload[0].value
    let rating = 'Normal'
    if (nvt > 30) rating = 'High (Overvalued)'
    else if (nvt < 15) rating = 'Low (Undervalued)'
    
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-orange-400">NVT Ratio: {nvt}</p>
        <p className="text-gray-300 text-xs">{rating}</p>
      </div>
    )
  }
  return null
}

export default function NVTRatioChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={nvtData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            label={{ 
              value: 'NVT Ratio', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="nvt" 
            fill="#F97316"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
