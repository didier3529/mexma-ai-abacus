
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const supplyData = [
  { 
    name: 'BTC', 
    circulating: 19.76, 
    total: 21.0,
    percentage: 94.1
  },
  { 
    name: 'ETH', 
    circulating: 120.1, 
    total: 120.1,
    percentage: 100
  },
  { 
    name: 'SOL', 
    circulating: 478.9, 
    total: 587.9,
    percentage: 81.5
  },
  { 
    name: 'XRP', 
    circulating: 57.5, 
    total: 100.0,
    percentage: 57.5
  },
  { 
    name: 'BNB', 
    circulating: 144.7, 
    total: 144.7,
    percentage: 100
  }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-orange-400">Circulating: {data.circulating}M</p>
        <p className="text-blue-400">Total: {data.total}M</p>
        <p className="text-gray-300">Released: {data.percentage.toFixed(1)}%</p>
      </div>
    )
  }
  return null
}

export default function SupplyAnalysisChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={supplyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              value: 'Supply (M)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top"
            wrapperStyle={{ fontSize: '11px' }}
          />
          <Bar 
            dataKey="circulating" 
            name="Circulating Supply"
            fill="#F97316" 
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            dataKey="total" 
            name="Total Supply"
            fill="#3B82F6" 
            opacity={0.6}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
