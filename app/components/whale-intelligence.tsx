
'use client'

import { Waves, Eye, TrendingUp, Zap, Users, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import WhaleHeatmapChart from './whale-heatmap-chart'
import SmartMoneyFlowChart from './smart-money-flow-chart'

interface WhaleWallet {
  id: string
  address: string
  label: string
  balance: string
  balanceUsd: string
  change24h: number
  transactions24h: number
  lastActivity: string
  riskScore: number
  category: 'institution' | 'whale' | 'smart_money' | 'unknown'
}

interface SmartMoneyFlow {
  id: string
  entity: string
  type: 'inflow' | 'outflow'
  amount: string
  amountUsd: string
  asset: string
  exchange: string
  timestamp: string
  confidence: number
}

interface WhaleTransaction {
  id: string
  hash: string
  whale: string
  type: 'buy' | 'sell' | 'transfer'
  amount: string
  amountUsd: string
  asset: string
  platform: string
  timestamp: string
  impact: 'high' | 'medium' | 'low'
}

const whaleWallets: WhaleWallet[] = [
  {
    id: '1',
    address: '0x8ba1...7f2d',
    label: 'MicroStrategy',
    balance: '190,150 BTC',
    balanceUsd: '$22.5B',
    change24h: 2.3,
    transactions24h: 3,
    lastActivity: '47 mins ago',
    riskScore: 15,
    category: 'institution'
  },
  {
    id: '2',
    address: '0x3cd7...9a1b',
    label: 'Coinbase Cold Storage',
    balance: '847,200 BTC',
    balanceUsd: '$100.3B',
    change24h: -0.8,
    transactions24h: 12,
    lastActivity: '2 hours ago',
    riskScore: 8,
    category: 'institution'
  },
  {
    id: '3',
    address: '0x7e4f...2c9d',
    label: 'Smart Money Alpha',
    balance: '45,670 ETH',
    balanceUsd: '$170.8M',
    change24h: 8.4,
    transactions24h: 28,
    lastActivity: '12 mins ago',
    riskScore: 25,
    category: 'smart_money'
  },
  {
    id: '4',
    address: '0x1a9b...5e8f',
    label: 'Unknown Whale #1',
    balance: '89,340 ETH',
    balanceUsd: '$334.2M',
    change24h: -3.2,
    transactions24h: 7,
    lastActivity: '1 hour ago',
    riskScore: 42,
    category: 'whale'
  },
  {
    id: '5',
    address: '0x9f2c...6d1a',
    label: 'Grayscale Holdings',
    balance: '632,240 BTC',
    balanceUsd: '$74.8B',
    change24h: 0.1,
    transactions24h: 1,
    lastActivity: '8 hours ago',
    riskScore: 12,
    category: 'institution'
  }
]

const smartMoneyFlows: SmartMoneyFlow[] = [
  {
    id: '1',
    entity: 'Jump Trading',
    type: 'inflow',
    amount: '12,450',
    amountUsd: '$46.7M',
    asset: 'ETH',
    exchange: 'Coinbase Pro',
    timestamp: '8 mins ago',
    confidence: 94
  },
  {
    id: '2',
    entity: 'Alameda Research',
    type: 'outflow',
    amount: '2,847',
    amountUsd: '$11.2M',
    asset: 'BTC',
    exchange: 'Binance',
    timestamp: '23 mins ago',
    confidence: 87
  },
  {
    id: '3',
    entity: 'DeFi Alpha Fund',
    type: 'inflow',
    amount: '890,340',
    amountUsd: '$890.3K',
    asset: 'USDC',
    exchange: 'Uniswap V3',
    timestamp: '1 hour ago',
    confidence: 91
  },
  {
    id: '4',
    entity: 'Three Arrows Capital',
    type: 'outflow',
    amount: '5,234',
    amountUsd: '$1.8M',
    asset: 'SOL',
    exchange: 'FTX',
    timestamp: '45 mins ago',
    confidence: 89
  },
  {
    id: '5',
    entity: 'Wintermute Trading',
    type: 'inflow',
    amount: '15,678',
    amountUsd: '$892.4K',
    asset: 'AVAX',
    exchange: 'Kraken',
    timestamp: '2 hours ago',
    confidence: 92
  },
  {
    id: '6',
    entity: 'Galaxy Digital',
    type: 'inflow',
    amount: '1,234,567',
    amountUsd: '$2.1M',
    asset: 'MATIC',
    exchange: 'Polygon Bridge',
    timestamp: '3 hours ago',
    confidence: 88
  }
]

const whaleTransactions: WhaleTransaction[] = [
  {
    id: '1',
    hash: '0xa7b3...f2d1',
    whale: 'MicroStrategy',
    type: 'buy',
    amount: '420',
    amountUsd: '$49.7M',
    asset: 'BTC',
    platform: 'Coinbase',
    timestamp: '47 mins ago',
    impact: 'high'
  },
  {
    id: '2',
    hash: '0x8c9e...1a4b',
    whale: 'Smart Money Alpha',
    type: 'sell',
    amount: '8,900',
    amountUsd: '$33.3M',
    asset: 'ETH',
    platform: 'Uniswap',
    timestamp: '1.2 hours ago',
    impact: 'medium'
  },
  {
    id: '3',
    hash: '0xf1d2...9e8c',
    whale: 'Unknown Whale #1',
    type: 'transfer',
    amount: '15,670',
    amountUsd: '$58.6M',
    asset: 'ETH',
    platform: 'Internal',
    timestamp: '2.1 hours ago',
    impact: 'low'
  }
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'institution': return 'text-blue-400 bg-blue-400/10'
    case 'smart_money': return 'text-green-400 bg-green-400/10'
    case 'whale': return 'text-purple-400 bg-purple-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getRiskColor = (risk: number) => {
  if (risk <= 20) return 'text-green-400'
  if (risk <= 40) return 'text-orange-400'
  return 'text-red-400'
}

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high': return 'text-red-400 bg-red-400/10'
    case 'medium': return 'text-orange-400 bg-orange-400/10'
    case 'low': return 'text-green-400 bg-green-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

export default function WhaleIntelligence() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Waves className="w-5 h-5 text-orange-500" />
            <span className="mexma-text-gradient">Whale Intelligence & Smart Money Tracking</span>
            <div className="ml-auto flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">2,847 Wallets Tracked</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4 text-green-400" />
                <span className="text-green-400">47 Active Alerts</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Whale Activity Heatmap</h3>
              <WhaleHeatmapChart />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Smart Money Flow (24h)</h3>
              <SmartMoneyFlowChart />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-500" />
              <span>Top Whale Wallets</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {whaleWallets?.map((wallet) => (
                <div key={wallet?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{wallet?.label ?? 'Unknown'}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(wallet?.category ?? 'unknown')}`}>
                        {wallet?.category?.replace('_', ' ')?.toUpperCase() ?? 'UNKNOWN'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{wallet?.lastActivity ?? 'Unknown'}</div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2">{wallet?.address ?? 'N/A'}</div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Balance</p>
                      <p className="font-semibold text-white">{wallet?.balance ?? 'N/A'}</p>
                      <p className="text-sm text-orange-400">{wallet?.balanceUsd ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">24h Change</p>
                      <p className={`font-semibold ${(wallet?.change24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {(wallet?.change24h ?? 0) >= 0 ? '+' : ''}{wallet?.change24h?.toFixed(1) ?? '0.0'}%
                      </p>
                      <p className="text-xs text-gray-400">{wallet?.transactions24h ?? 0} txs today</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Risk Score: </span>
                    <span className={`text-xs font-semibold ${getRiskColor(wallet?.riskScore ?? 0)}`}>
                      {wallet?.riskScore ?? 0}/100
                    </span>
                  </div>
                </div>
              )) ?? []}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-orange-500" />
              <span>Smart Money Flows</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {smartMoneyFlows?.map((flow) => (
                <div key={flow?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{flow?.entity ?? 'Unknown'}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        flow?.type === 'inflow' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {flow?.type?.toUpperCase() ?? 'UNKNOWN'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{flow?.timestamp ?? 'Unknown'}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Amount</p>
                      <p className="font-semibold text-white">{flow?.amount ?? 'N/A'} {flow?.asset ?? ''}</p>
                      <p className="text-sm text-orange-400">{flow?.amountUsd ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Exchange</p>
                      <p className="font-semibold text-white">{flow?.exchange ?? 'N/A'}</p>
                      <p className="text-xs text-green-400">{flow?.confidence ?? 0}% confidence</p>
                    </div>
                  </div>
                </div>
              )) ?? []}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <span>Recent Whale Transactions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">Whale</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Type</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Amount</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Value</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Platform</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Impact</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {whaleTransactions?.map((tx) => (
                  <tr key={tx?.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-2">
                      <div>
                        <div className="font-medium text-white">{tx?.whale ?? 'Unknown'}</div>
                        <div className="text-xs text-gray-400">{tx?.hash ?? 'N/A'}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tx?.type === 'buy' ? 'bg-green-500/20 text-green-400' : 
                        tx?.type === 'sell' ? 'bg-red-500/20 text-red-400' : 
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {tx?.type?.toUpperCase() ?? 'UNKNOWN'}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right font-semibold text-white">
                      {tx?.amount ?? 'N/A'} {tx?.asset ?? ''}
                    </td>
                    <td className="py-4 px-2 text-right text-orange-400 font-medium">{tx?.amountUsd ?? 'N/A'}</td>
                    <td className="py-4 px-2 text-right text-gray-300">{tx?.platform ?? 'N/A'}</td>
                    <td className="py-4 px-2 text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(tx?.impact ?? 'low')}`}>
                        {tx?.impact?.toUpperCase() ?? 'LOW'}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right text-gray-400 text-sm">{tx?.timestamp ?? 'Unknown'}</td>
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
