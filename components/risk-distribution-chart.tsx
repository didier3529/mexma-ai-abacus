
'use client'

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const riskData = [
  { name: 'Sanctions', value: 35, color: '#dc2626' },
  { name: 'Money Laundering', value: 28, color: '#ea580c' },
  { name: 'Fraud', value: 18, color: '#f59e0b' },
  { name: 'Phishing', value: 12, color: '#eab308' },
  { name: 'Other', value: 7, color: '#6b7280' }
]

export default function RiskDistributionChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={riskData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {riskData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry?.color ?? '#6b7280'} />
            )) ?? []}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '11px'
            }}
            formatter={(value) => [`${value}%`, 'Risk %']}
          />
          <Legend 
            verticalAlign="top"
            wrapperStyle={{ fontSize: 11 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
