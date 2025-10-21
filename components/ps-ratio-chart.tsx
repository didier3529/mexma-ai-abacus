
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const psRatioData = [
  { name: 'UNI', ratio: 12.4, color: '#3B82F6' },
  { name: 'AAVE', ratio: 8.7, color: '#10B981' },
  { name: 'MKR', ratio: 15.2, color: '#F97316' },
  { name: 'COMP', ratio: 22.1, color: '#EF4444' },
  { name: 'CRV', ratio: 8.9, color: '#8B5CF6' }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const ratio = payload[0].value
    let valuation = 'Fair'
    if (ratio > 20) valuation = 'Overvalued'
    else if (ratio < 10) valuation = 'Undervalued'
    
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-orange-400">P/S Ratio: {ratio}x</p>
        <p className="text-gray-300 text-xs">{valuation}</p>
      </div>
    )
  }
  return null
}

export default function PSRatioChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={psRatioData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              value: 'P/S Ratio', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="ratio" 
            fill="#F97316"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
