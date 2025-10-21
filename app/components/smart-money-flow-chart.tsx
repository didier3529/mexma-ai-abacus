
'use client'

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const flowData = [
  { time: '00:00', inflow: 45.2, outflow: 23.1 },
  { time: '04:00', inflow: 52.8, outflow: 31.4 },
  { time: '08:00', inflow: 67.3, outflow: 28.9 },
  { time: '12:00', inflow: 89.1, outflow: 45.6 },
  { time: '16:00', inflow: 76.4, outflow: 52.3 },
  { time: '20:00', inflow: 94.7, outflow: 38.2 },
  { time: '24:00', inflow: 103.5, outflow: 41.8 }
]

export default function SmartMoneyFlowChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={flowData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            label={{ value: 'Flow ($M)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: '#9ca3af' } }}
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
          <Area 
            type="monotone" 
            dataKey="inflow" 
            stackId="1"
            stroke="#10b981" 
            fill="#10b981"
            fillOpacity={0.3}
            name="Inflow"
          />
          <Area 
            type="monotone" 
            dataKey="outflow" 
            stackId="2"
            stroke="#ef4444" 
            fill="#ef4444"
            fillOpacity={0.3}
            name="Outflow"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
