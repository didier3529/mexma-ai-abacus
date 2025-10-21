
'use client'

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

const burnData = [
  { month: 'Oct', burned: 2.8 },
  { month: 'Nov', burned: 3.2 },
  { month: 'Dec', burned: 2.9 },
  { month: 'Jan', burned: 3.5 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-orange-400">Burned: {payload[0].value}M tokens</p>
        <p className="text-gray-300 text-xs">Deflationary pressure</p>
      </div>
    )
  }
  return null
}

export default function TokenBurnChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={burnData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="burnGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
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
              value: 'Burned (M)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="burned"
            stroke="#EF4444"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#burnGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
