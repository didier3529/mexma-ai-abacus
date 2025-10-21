
'use client'

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip } from 'recharts'

const stakingData = [
  { name: 'ETH', apy: 3.2, staked: 28.4, size: 462 },
  { name: 'SOL', apy: 6.9, staked: 67.2, size: 127 },
  { name: 'ADA', apy: 4.8, staked: 73.1, size: 35 },
  { name: 'MATIC', apy: 5.2, staked: 45.7, size: 8 },
  { name: 'BNB', apy: 8.4, staked: 34.9, size: 101 }
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{data.name}</p>
        <p className="text-orange-400">APY: {data.apy}%</p>
        <p className="text-blue-400">Staked: {data.staked}%</p>
        <p className="text-gray-300">Market Cap: ${data.size}B</p>
      </div>
    )
  }
  return null
}

export default function StakingRewardsChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
          <XAxis 
            type="number" 
            dataKey="staked" 
            name="Staked"
            unit="%"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            label={{ 
              value: 'Staked (%)', 
              position: 'insideBottom', 
              offset: -15,
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <YAxis 
            type="number" 
            dataKey="apy" 
            name="APY"
            unit="%"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            label={{ 
              value: 'APY (%)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter 
            data={stakingData} 
            fill="#F97316"
            fillOpacity={0.8}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
