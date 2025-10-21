
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const ArbitrageOpportunitiesChart = () => {
  const arbitrageData = [
    { 
      pair: 'BTC/USDT', 
      profit: 2340, 
      spread: 0.012, 
      volume: 500, 
      confidence: 94,
      exchanges: 'Binance → Bybit'
    },
    { 
      pair: 'ETH/USDC', 
      profit: 890, 
      spread: 0.143, 
      volume: 150, 
      confidence: 87,
      exchanges: 'Uniswap → Coinbase'
    },
    { 
      pair: 'SOL/USDT', 
      profit: 456, 
      spread: 0.522, 
      volume: 75, 
      confidence: 73,
      exchanges: 'Raydium → Binance'
    },
    { 
      pair: 'AVAX/USDT', 
      profit: 234, 
      spread: 0.298, 
      volume: 45, 
      confidence: 89,
      exchanges: 'TraderJoe → OKX'
    },
    { 
      pair: 'MATIC/USDC', 
      profit: 178, 
      spread: 0.187, 
      volume: 35, 
      confidence: 91,
      exchanges: 'QuickSwap → Binance'
    }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{label}</p>
          <p className="text-green-400">Profit: ${data.profit.toLocaleString()}</p>
          <p className="text-orange-400">Spread: {data.spread.toFixed(3)}%</p>
          <p className="text-blue-400">Volume: ${data.volume}K</p>
          <p className="text-purple-400">Confidence: {data.confidence}%</p>
          <p className="text-gray-400 text-xs">{data.exchanges}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={arbitrageData} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
          <XAxis 
            dataKey="pair" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            label={{ value: 'Profit ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: '#9ca3af' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="profit" 
            fill="#f97316"
            radius={[4, 4, 0, 0]}
            opacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ArbitrageOpportunitiesChart
