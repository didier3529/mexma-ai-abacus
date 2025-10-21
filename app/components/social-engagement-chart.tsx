
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const engagementData = [
  { platform: 'Twitter', mentions: 847, likes: 2340, shares: 567 },
  { platform: 'Reddit', mentions: 234, likes: 1450, shares: 289 },
  { platform: 'Discord', mentions: 89, likes: 456, shares: 123 },
  { platform: 'Telegram', mentions: 456, likes: 1890, shares: 445 }
]

export default function SocialEngagementChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={engagementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="platform" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            label={{ value: 'Count', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: '#9ca3af' } }}
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
          <Bar dataKey="mentions" fill="#60B5FF" name="Mentions" />
          <Bar dataKey="likes" fill="#FF9149" name="Likes" />
          <Bar dataKey="shares" fill="#FF9898" name="Shares" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
