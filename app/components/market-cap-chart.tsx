
'use client'

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const marketCapData = [
  { name: 'Bitcoin', value: 2340, color: '#F97316' },
  { name: 'Ethereum', value: 462, color: '#3B82F6' },
  { name: 'Solana', value: 127, color: '#8B5CF6' },
  { name: 'XRP', value: 196, color: '#10B981' },
  { name: 'BNB', value: 101, color: '#F59E0B' },
  { name: 'Others', value: 890, color: '#6B7280' }
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{data.name}</p>
        <p className="text-orange-400">${data.value}B ({((data.value / 4116) * 100).toFixed(1)}%)</p>
      </div>
    )
  }
  return null
}

export default function MarketCapChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={marketCapData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {marketCapData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top"
            align="right"
            layout="vertical"
            wrapperStyle={{ fontSize: '11px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
