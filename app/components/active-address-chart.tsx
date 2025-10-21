
'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const activeAddressData = [
  { date: 'Jan 23', btc: 820, eth: 580, sol: 320 },
  { date: 'Jan 24', btc: 835, eth: 595, sol: 340 },
  { date: 'Jan 25', btc: 827, eth: 610, sol: 365 },
  { date: 'Jan 26', btc: 841, eth: 625, sol: 385 },
  { date: 'Jan 27', btc: 838, eth: 615, sol: 405 },
  { date: 'Jan 28', btc: 852, eth: 640, sol: 420 },
  { date: 'Jan 29', btc: 847, eth: 635, sol: 423 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}K addresses
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function ActiveAddressChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={activeAddressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            label={{ 
              value: 'Addresses (K)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="btc" 
            name="Bitcoin"
            stroke="#F97316" 
            strokeWidth={2}
            dot={{ fill: '#F97316', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: '#F97316' }}
          />
          <Line 
            type="monotone" 
            dataKey="eth" 
            name="Ethereum"
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: '#3B82F6' }}
          />
          <Line 
            type="monotone" 
            dataKey="sol" 
            name="Solana"
            stroke="#8B5CF6" 
            strokeWidth={2}
            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: '#8B5CF6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
