
'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const s2fData = [
  { date: '2020', actual: 8900, predicted: 10000 },
  { date: '2021', actual: 47000, predicted: 50000 },
  { date: '2022', actual: 16500, predicted: 18000 },
  { date: '2023', actual: 42000, predicted: 45000 },
  { date: '2024', actual: 71000, predicted: 75000 },
  { date: '2025', actual: 118375, predicted: 140000 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-orange-400">Actual: ${payload[0]?.value?.toLocaleString()}</p>
        <p className="text-blue-400">S2F Model: ${payload[1]?.value?.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export default function StockToFlowChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={s2fData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            scale="log"
            domain={['dataMin / 2', 'dataMax * 1.2']}
            label={{ 
              value: 'BTC Price ($)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 11, fill: '#9CA3AF' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="actual" 
            name="Actual Price"
            stroke="#F97316" 
            strokeWidth={3}
            dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            name="S2F Prediction"
            stroke="#3B82F6" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
