
'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const sentimentData = [
  { name: 'Bullish', value: 42, color: '#00FF88' },
  { name: 'Neutral', value: 31, color: '#FFD700' },
  { name: 'Bearish', value: 27, color: '#FF4444' }
]

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function SentimentChart() {
  return (
    <div className="h-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-300">Market Sentiment</h3>
        <div className="text-xs text-gray-400">Last 24h</div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sentimentData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {sentimentData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry?.color ?? '#888888'} />
            )) ?? []}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '11px'
            }}
            formatter={(value: any) => [`${value}%`, 'Sentiment']}
          />
          <Legend 
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: 11 }}
            formatter={(value) => <span style={{ color: '#d1d5db' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
