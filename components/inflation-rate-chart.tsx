
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts'

const inflationData = [
  { name: 'ETH', rate: -0.8, color: '#10B981' },
  { name: 'BNB', rate: -2.1, color: '#10B981' },
  { name: 'MATIC', rate: 3.6, color: '#F59E0B' },
  { name: 'ADA', rate: 4.2, color: '#F59E0B' },
  { name: 'SOL', rate: 5.8, color: '#EF4444' }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const rate = payload[0].value
    const type = rate < 0 ? 'Deflationary' : rate < 3 ? 'Low Inflation' : rate < 6 ? 'Moderate' : 'High Inflation'
    
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-orange-400">Rate: {rate > 0 ? '+' : ''}{rate}%</p>
        <p className="text-gray-300 text-xs">{type}</p>
      </div>
    )
  }
  return null
}

export default function InflationRateChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={inflationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              value: 'Rate (%)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <ReferenceLine y={0} stroke="#6B7280" strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="rate" 
            fill="#F97316"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
