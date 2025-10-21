
'use client'

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const tvlData = [
  { date: '2024-01-15', totalTVL: 45.2, aave: 6.1, uniswap: 4.8, compound: 3.2, curve: 2.4 },
  { date: '2024-01-16', totalTVL: 46.8, aave: 6.3, uniswap: 5.1, compound: 3.3, curve: 2.6 },
  { date: '2024-01-17', totalTVL: 44.9, aave: 6.0, uniswap: 4.7, compound: 3.1, curve: 2.3 },
  { date: '2024-01-18', totalTVL: 48.1, aave: 6.5, uniswap: 5.3, compound: 3.4, curve: 2.7 },
  { date: '2024-01-19', totalTVL: 49.7, aave: 6.8, uniswap: 4.9, compound: 3.4, curve: 2.8 },
  { date: '2024-01-20', totalTVL: 51.2, aave: 6.8, uniswap: 4.9, compound: 3.4, curve: 2.9 },
  { date: '2024-01-21', totalTVL: 53.4, aave: 7.1, uniswap: 5.2, compound: 3.6, curve: 3.1 }
]

export default function TVLChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={tvlData}>
          <XAxis 
            dataKey="date" 
            tickLine={false}
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis 
            tickLine={false}
            tick={{ fontSize: 10 }}
            axisLine={false}
            label={{ value: 'TVL ($B)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '11px'
            }}
            labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
            formatter={(value: any, name: string) => [`$${value}B`, name === 'totalTVL' ? 'Total TVL' : name.charAt(0).toUpperCase() + name.slice(1)]}
          />
          <Legend 
            verticalAlign="top"
            wrapperStyle={{ fontSize: 11 }}
          />
          <Line 
            type="monotone" 
            dataKey="totalTVL" 
            stroke="#FF8C00" 
            strokeWidth={3}
            name="Total TVL"
            dot={false}
            activeDot={{ r: 4, stroke: '#FF8C00', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="aave" 
            stroke="#60B5FF" 
            strokeWidth={2}
            name="Aave"
            dot={false}
            activeDot={{ r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="uniswap" 
            stroke="#FF9149" 
            strokeWidth={2}
            name="Uniswap"
            dot={false}
            activeDot={{ r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="compound" 
            stroke="#80D8C3" 
            strokeWidth={2}
            name="Compound"
            dot={false}
            activeDot={{ r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="curve" 
            stroke="#A19AD3" 
            strokeWidth={2}
            name="Curve"
            dot={false}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
