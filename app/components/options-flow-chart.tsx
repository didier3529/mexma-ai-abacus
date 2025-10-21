
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const OptionsFlowChart = () => {
  const flowData = [
    { time: '00:00', calls: 2340, puts: 1890, net: 450 },
    { time: '04:00', calls: 3450, puts: 2100, net: 1350 },
    { time: '08:00', calls: 5670, puts: 3200, net: 2470 },
    { time: '12:00', calls: 8940, puts: 4500, net: 4440 },
    { time: '16:00', calls: 12340, puts: 6700, net: 5640 },
    { time: '20:00', calls: 9870, puts: 5400, net: 4470 },
    { time: '24:00', calls: 7650, puts: 4200, net: 3450 }
  ]

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={flowData} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            label={{ value: 'Time (24h)', position: 'insideBottom', offset: -15, style: { textAnchor: 'middle', fontSize: 11, fill: '#9ca3af' } }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            label={{ value: 'Volume', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: '#9ca3af' } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151', 
              borderRadius: '6px',
              fontSize: 11
            }}
            labelStyle={{ color: '#f9fafb' }}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: 11 }}
          />
          <Bar 
            dataKey="calls" 
            fill="#10b981" 
            name="Calls"
            radius={[2, 2, 0, 0]}
            opacity={0.8}
          />
          <Bar 
            dataKey="puts" 
            fill="#ef4444" 
            name="Puts"
            radius={[2, 2, 0, 0]}
            opacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default OptionsFlowChart
