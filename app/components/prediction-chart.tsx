
'use client'

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts'

const predictionData = [
  { time: '00:00', actual: 118376, predicted: null },
  { time: '04:00', actual: 117950, predicted: null },
  { time: '08:00', actual: 118720, predicted: null },
  { time: '12:00', actual: 118376, predicted: 118376 },
  { time: '16:00', actual: null, predicted: 118070 },
  { time: '20:00', actual: null, predicted: 117760 },
  { time: '24:00', actual: null, predicted: 117450 }
]

export default function PredictionChart() {
  return (
    <div className="h-64">
      <h3 className="text-sm font-medium text-gray-300 mb-4">BTC Price Prediction (24h)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={predictionData}>
          <XAxis 
            dataKey="time" 
            tickLine={false}
            tick={{ fontSize: 10 }}
            axisLine={false}
          />
          <YAxis 
            tickLine={false}
            tick={{ fontSize: 10 }}
            axisLine={false}
            domain={['dataMin - 500', 'dataMax + 500']}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '11px'
            }}
            formatter={(value: any, name: string) => [
              value ? `$${value.toLocaleString()}` : 'N/A', 
              name === 'actual' ? 'Actual Price' : 'Predicted Price'
            ]}
          />
          <ReferenceLine x="12:00" stroke="#666" strokeDasharray="2 2" />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#60B5FF" 
            strokeWidth={2}
            name="Actual"
            dot={{ r: 3 }}
            connectNulls={false}
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="#FF8C00" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Predicted"
            dot={{ r: 3 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
