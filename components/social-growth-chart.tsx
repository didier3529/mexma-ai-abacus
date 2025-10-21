
'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const socialData = [
  { month: 'Oct', eth: 2.6, sol: 0.8, matic: 0.7, avax: 0.3, arb: 0.2 },
  { month: 'Nov', eth: 2.7, sol: 0.9, matic: 0.8, avax: 0.35, arb: 0.25 },
  { month: 'Dec', eth: 2.75, sol: 1.1, matic: 0.85, avax: 0.4, arb: 0.3 },
  { month: 'Jan', eth: 2.8, sol: 1.2, matic: 0.89, avax: 0.45, arb: 0.35 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}M followers
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function SocialGrowthChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={socialData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            label={{ 
              value: 'Followers (M)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="eth" 
            name="Ethereum"
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="sol" 
            name="Solana"
            stroke="#8B5CF6" 
            strokeWidth={2}
            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="matic" 
            name="Polygon"
            stroke="#F97316" 
            strokeWidth={2}
            dot={{ fill: '#F97316', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
