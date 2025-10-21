
'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const tvlData = [
  { date: 'Jan 23', total: 20.8 },
  { date: 'Jan 24', total: 21.4 },
  { date: 'Jan 25', total: 20.9 },
  { date: 'Jan 26', total: 22.1 },
  { date: 'Jan 27', total: 21.7 },
  { date: 'Jan 28', total: 22.8 },
  { date: 'Jan 29', total: 22.2 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-orange-400">Total TVL: ${payload[0].value}B</p>
      </div>
    )
  }
  return null
}

export default function TVLAnalysisChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={tvlData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            domain={['dataMin - 1', 'dataMax + 1']}
            label={{ 
              value: 'TVL ($B)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="total" 
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
