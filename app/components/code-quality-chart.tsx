
'use client'

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

const qualityData = [
  { subject: 'Test Coverage', A: 92 },
  { subject: 'Documentation', A: 85 },
  { subject: 'Code Review', A: 88 },
  { subject: 'Security', A: 94 },
  { subject: 'Performance', A: 87 },
  { subject: 'Maintainability', A: 90 }
]

export default function CodeQualityChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={qualityData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fontSize: 8, fill: '#9CA3AF' }}
          />
          <Radar
            name="Quality Score"
            dataKey="A"
            stroke="#F97316"
            fill="#F97316"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
