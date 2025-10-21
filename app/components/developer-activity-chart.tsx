
'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const developerData = [
  { week: 'Week 1', developers: 452 },
  { week: 'Week 2', developers: 467 },
  { week: 'Week 3', developers: 473 },
  { week: 'Week 4', developers: 484 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-orange-400">Active Developers: {payload[0].value}</p>
      </div>
    )
  }
  return null
}

export default function DeveloperActivityChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={developerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="week" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            domain={['dataMin - 10', 'dataMax + 10']}
            label={{ 
              value: 'Developers', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="developers" 
            stroke="#F97316" 
            strokeWidth={3}
            dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#F97316' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
