
'use client'

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts'

const OrderbookDepthChart = () => {
  const orderbookData = [
    { price: 118200, bidVolume: 45.7, askVolume: 0, type: 'bid' },
    { price: 118250, bidVolume: 38.2, askVolume: 0, type: 'bid' },
    { price: 118300, bidVolume: 29.8, askVolume: 0, type: 'bid' },
    { price: 118350, bidVolume: 18.5, askVolume: 0, type: 'bid' },
    { price: 118370, bidVolume: 8.9, askVolume: 0, type: 'bid' },
    { price: 118375, bidVolume: 0, askVolume: 0, type: 'mid' }, // Mid price
    { price: 118380, bidVolume: 0, askVolume: 12.3, type: 'ask' },
    { price: 118400, bidVolume: 0, askVolume: 23.7, type: 'ask' },
    { price: 118450, bidVolume: 0, askVolume: 34.2, type: 'ask' },
    { price: 118500, bidVolume: 0, askVolume: 41.8, type: 'ask' },
    { price: 118550, bidVolume: 0, askVolume: 52.4, type: 'ask' }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">${label?.toLocaleString()}</p>
          {data.bidVolume > 0 && (
            <p className="text-green-400">Bid Volume: {data.bidVolume} BTC</p>
          )}
          {data.askVolume > 0 && (
            <p className="text-red-400">Ask Volume: {data.askVolume} BTC</p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={orderbookData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <XAxis 
            dataKey="price" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickFormatter={(value) => `${value}B`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine x={118375} stroke="#f97316" strokeDasharray="3 3" label={{ value: "Mid", position: "top" }} />
          <Area 
            dataKey="bidVolume" 
            fill="#10b981" 
            fillOpacity={0.6}
            stroke="#10b981"
            strokeWidth={2}
            type="stepAfter"
          />
          <Area 
            dataKey="askVolume" 
            fill="#ef4444" 
            fillOpacity={0.6}
            stroke="#ef4444"
            strokeWidth={2}
            type="stepBefore"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default OrderbookDepthChart
