
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const dcfData = [
  { name: 'ETH', dcf: 4500, current: 3847, premium: -14.5 },
  { name: 'SOL', dcf: 320, current: 265, premium: -17.2 },
  { name: 'BNB', dcf: 820, current: 697, premium: -15.0 },
  { name: 'BTC', dcf: 110000, current: 118375, premium: 7.6 },
  { name: 'XRP', dcf: 2.90, current: 3.41, premium: 17.6 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-blue-400">DCF Value: ${data.dcf.toLocaleString()}</p>
        <p className="text-orange-400">Current: ${data.current.toLocaleString()}</p>
        <p className={`${data.premium > 0 ? 'text-red-400' : 'text-green-400'}`}>
          Premium: {data.premium > 0 ? '+' : ''}{data.premium.toFixed(1)}%
        </p>
      </div>
    )
  }
  return null
}

export default function DCFModelChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dcfData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            scale="log"
            label={{ 
              value: 'Value ($)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="dcf" 
            name="DCF Value"
            fill="#3B82F6"
            radius={[2, 2, 0, 0]}
            opacity={0.8}
          />
          <Bar 
            dataKey="current" 
            name="Current Price"
            fill="#F97316"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
