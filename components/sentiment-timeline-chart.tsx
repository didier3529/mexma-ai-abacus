
'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const sentimentData = [
  { time: '00:00', bullish: 65, bearish: 25, neutral: 10 },
  { time: '04:00', bullish: 68, bearish: 22, neutral: 10 },
  { time: '08:00', bullish: 72, bearish: 18, neutral: 10 },
  { time: '12:00', bullish: 75, bearish: 15, neutral: 10 },
  { time: '16:00', bullish: 78, bearish: 12, neutral: 10 },
  { time: '20:00', bullish: 73, bearish: 17, neutral: 10 },
  { time: '24:00', bullish: 76, bearish: 14, neutral: 10 }
]

export default function SentimentTimelineChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sentimentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            label={{ value: 'Sentiment %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: '#9ca3af' } }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '11px'
            }}
          />
          <Legend 
            verticalAlign="top"
            wrapperStyle={{ fontSize: 11 }}
          />
          <Line 
            type="monotone" 
            dataKey="bullish" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 3 }}
            name="Bullish"
          />
          <Line 
            type="monotone" 
            dataKey="bearish" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ fill: '#ef4444', r: 3 }}
            name="Bearish"
          />
          <Line 
            type="monotone" 
            dataKey="neutral" 
            stroke="#6b7280" 
            strokeWidth={2}
            dot={{ fill: '#6b7280', r: 3 }}
            name="Neutral"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
