
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const commitsData = [
  { name: 'ETH', commits: 287, color: '#3B82F6' },
  { name: 'SOL', commits: 234, color: '#8B5CF6' },
  { name: 'AVAX', commits: 198, color: '#10B981' },
  { name: 'MATIC', commits: 156, color: '#F97316' },
  { name: 'ADA', commits: 134, color: '#EF4444' }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-orange-400">Commits: {payload[0].value}</p>
        <p className="text-gray-300 text-xs">Last 7 days</p>
      </div>
    )
  }
  return null
}

export default function GitCommitsChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={commitsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              value: 'Commits', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="commits" 
            fill="#F97316"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
