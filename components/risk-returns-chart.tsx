
'use client'

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const RiskReturnsChart = () => {
  const riskReturnsData = [
    { protocol: 'Aave V3', risk: 23, apy: 23.8, size: 2300 },
    { protocol: 'Compound', risk: 31, apy: 18.9, size: 1200 },
    { protocol: 'Uniswap V3', risk: 45, apy: 47.3, size: 890 },
    { protocol: 'Curve', risk: 28, apy: 34.7, size: 1560 },
    { protocol: 'Balancer', risk: 42, apy: 29.4, size: 340 },
    { protocol: 'GMX V2', risk: 67, apy: 67.8, size: 234 },
    { protocol: 'Radiant', risk: 78, apy: 89.4, size: 120 },
    { protocol: 'Stargate', risk: 35, apy: 28.9, size: 450 }
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.protocol}</p>
          <p className="text-green-400">APY: {data.apy}%</p>
          <p className="text-orange-400">Risk Score: {data.risk}</p>
          <p className="text-gray-400">TVL: ${data.size}M</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
          <XAxis 
            type="number"
            dataKey="risk"
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            label={{ value: 'Risk Score', position: 'insideBottom', offset: -15, style: { textAnchor: 'middle', fontSize: 11, fill: '#9ca3af' } }}
          />
          <YAxis 
            type="number"
            dataKey="apy"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            label={{ value: 'APY (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: '#9ca3af' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter 
            data={riskReturnsData} 
            fill="#f97316"
            fillOpacity={0.7}
            stroke="#ea580c"
            strokeWidth={2}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RiskReturnsChart
