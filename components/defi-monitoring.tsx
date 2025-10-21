
'use client'

import { Activity, TrendingUp, TrendingDown, DollarSign, Users, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import TVLChart from './tvl-chart'

interface Protocol {
  id: string
  name: string
  logo: string
  tvl: string
  tvlChange24h: number
  apy: string
  volume24h: string
  users24h: number
  healthScore: number
  category: string
  riskLevel: 'low' | 'medium' | 'high'
}

const protocols: Protocol[] = [
  {
    id: '1',
    name: 'Aave V3',
    logo: '🏦',
    tvl: '$6.82B',
    tvlChange24h: 2.3,
    apy: '4.2%',
    volume24h: '$421M',
    users24h: 12847,
    healthScore: 95,
    category: 'Lending',
    riskLevel: 'low'
  },
  {
    id: '2',
    name: 'Uniswap V3',
    logo: '🦄',
    tvl: '$4.91B',
    tvlChange24h: -1.2,
    apy: '8.7%',
    volume24h: '$1.2B',
    users24h: 34521,
    healthScore: 92,
    category: 'DEX',
    riskLevel: 'low'
  },
  {
    id: '3',
    name: 'Compound',
    logo: '💰',
    tvl: '$3.44B',
    tvlChange24h: 0.8,
    apy: '3.9%',
    volume24h: '$156M',
    users24h: 8934,
    healthScore: 89,
    category: 'Lending',
    riskLevel: 'low'
  },
  {
    id: '4',
    name: 'Curve Finance',
    logo: '🌊',
    tvl: '$2.87B',
    tvlChange24h: 4.5,
    apy: '12.3%',
    volume24h: '$89M',
    users24h: 5672,
    healthScore: 88,
    category: 'DEX',
    riskLevel: 'medium'
  },
  {
    id: '5',
    name: 'MakerDAO',
    logo: '🏛️',
    tvl: '$2.31B',
    tvlChange24h: -0.5,
    apy: '2.1%',
    volume24h: '$67M',
    users24h: 3456,
    healthScore: 94,
    category: 'CDP',
    riskLevel: 'low'
  },
  {
    id: '6',
    name: 'Yearn Finance',
    logo: '📈',
    tvl: '$892M',
    tvlChange24h: 7.2,
    apy: '15.6%',
    volume24h: '$23M',
    users24h: 1823,
    healthScore: 76,
    category: 'Yield',
    riskLevel: 'medium'
  }
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low': return 'text-green-400'
    case 'medium': return 'text-orange-400'
    case 'high': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

const getHealthScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-400'
  if (score >= 75) return 'text-orange-400'
  return 'text-red-400'
}

export default function DeFiMonitoring() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-orange-500" />
            <span className="mexma-text-gradient">DeFi Protocol Monitoring</span>
            <div className="ml-auto flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">247 Protocols</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400">+$2.1B TVL (24h)</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TVLChart />
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-orange-500" />
            <span>Top Protocols</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">Protocol</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">TVL</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">24h Change</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">APY</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Volume 24h</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Users 24h</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Health</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody>
                {protocols?.map((protocol) => (
                  <tr key={protocol?.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{protocol?.logo ?? '📊'}</span>
                        <div>
                          <div className="font-medium text-white">{protocol?.name ?? 'Unknown'}</div>
                          <div className="text-xs text-gray-400">{protocol?.category ?? 'Unknown'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right font-semibold text-white">{protocol?.tvl ?? 'N/A'}</td>
                    <td className="py-4 px-2 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${
                        (protocol?.tvlChange24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {(protocol?.tvlChange24h ?? 0) >= 0 ? 
                          <TrendingUp className="w-3 h-3" /> : 
                          <TrendingDown className="w-3 h-3" />
                        }
                        <span>{protocol?.tvlChange24h?.toFixed(1) ?? '0.0'}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-orange-400 font-medium">{protocol?.apy ?? 'N/A'}</td>
                    <td className="py-4 px-2 text-right text-gray-300">{protocol?.volume24h ?? 'N/A'}</td>
                    <td className="py-4 px-2 text-right text-gray-300">{protocol?.users24h?.toLocaleString() ?? '0'}</td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getHealthScoreColor(protocol?.healthScore ?? 0).replace('text-', 'bg-')}`}></div>
                        <span className={getHealthScoreColor(protocol?.healthScore ?? 0)}>{protocol?.healthScore ?? 0}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span className={`text-xs px-2 py-1 rounded-full bg-gray-700 ${getRiskColor(protocol?.riskLevel ?? 'medium')}`}>
                        {protocol?.riskLevel?.toUpperCase() ?? 'UNKNOWN'}
                      </span>
                    </td>
                  </tr>
                )) ?? []}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
