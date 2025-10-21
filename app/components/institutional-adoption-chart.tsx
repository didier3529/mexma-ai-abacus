
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const institutionalData = [
  { name: 'ETH', score: 95, color: '#3B82F6' },
  { name: 'SOL', score: 82, color: '#8B5CF6' },
  { name: 'MATIC', score: 78, color: '#F97316' },
  { name: 'AVAX', score: 73, color: '#10B981' },
  { name: 'ARB', score: 69, color: '#EF4444' }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const score = payload[0].value
    let tier = 'Enterprise'
    if (score >= 85) tier = 'Institutional Grade'
    else if (score >= 70) tier = 'Professional'
    
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-orange-400">Score: {score}/100</p>
        <p className="text-gray-300 text-xs">{tier}</p>
      </div>
    )
  }
  return null
}

export default function InstitutionalAdoptionChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={institutionalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            domain={[0, 100]}
            label={{ 
              value: 'Score', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="score" 
            fill="#F97316"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
