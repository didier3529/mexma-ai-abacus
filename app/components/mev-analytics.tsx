
'use client'

import { Zap, Target, TrendingUp, AlertTriangle, Search, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import TransactionFlowGraph from './transaction-flow-graph'
import MEVOpportunityHeatmap from './mev-opportunity-heatmap'

interface MEVOpportunity {
  id: string
  type: 'arbitrage' | 'sandwich' | 'liquidation' | 'mev_boost'
  asset: string
  profit: string
  profitUsd: string
  block: number
  searcher: string
  validator: string
  gasUsed: string
  timestamp: string
  status: 'pending' | 'executed' | 'failed'
  complexity: 'low' | 'medium' | 'high'
}

interface SearcherStats {
  id: string
  address: string
  name: string
  totalProfit: string
  transactions: number
  successRate: number
  avgProfit: string
  topStrategy: string
  risk: number
}

interface ValidatorPerformance {
  id: string
  address: string
  name: string
  mevRevenue: string
  blocks: number
  avgMEVPerBlock: string
  uptime: number
  efficiency: number
  rank: number
}

const mevOpportunities: MEVOpportunity[] = [
  {
    id: '1',
    type: 'arbitrage',
    asset: 'WETH/USDC',
    profit: '12.47 ETH',
    profitUsd: '$42,647',
    block: 19847293,
    searcher: '0x7a25...f9e2',
    validator: 'Flashbots',
    gasUsed: '284,729',
    timestamp: '12 sec ago',
    status: 'executed',
    complexity: 'medium'
  },
  {
    id: '2',
    type: 'sandwich',
    asset: 'UNI/ETH',
    profit: '8.92 ETH',
    profitUsd: '$30,547',
    block: 19847294,
    searcher: '0x9f84...2a7c',
    validator: 'MEV-Boost',
    gasUsed: '567,834',
    timestamp: '18 sec ago',
    status: 'executed',
    complexity: 'high'
  },
  {
    id: '3',
    type: 'liquidation',
    asset: 'AAVE',
    profit: '24.67 ETH',
    profitUsd: '$84,392',
    block: 19847295,
    searcher: '0x3c92...8d1f',
    validator: 'Titan Builder',
    gasUsed: '394,827',
    timestamp: '24 sec ago',
    status: 'pending',
    complexity: 'low'
  },
  {
    id: '4',
    type: 'mev_boost',
    asset: 'Multiple',
    profit: '47.23 ETH',
    profitUsd: '$161,834',
    block: 19847296,
    searcher: '0x8b47...4e9a',
    validator: 'Lido',
    gasUsed: '892,394',
    timestamp: '31 sec ago',
    status: 'executed',
    complexity: 'high'
  },
  {
    id: '5',
    type: 'arbitrage',
    asset: 'USDT/USDC',
    profit: '3.84 ETH',
    profitUsd: '$13,142',
    block: 19847297,
    searcher: '0x5a92...7c3e',
    validator: 'Coinbase',
    gasUsed: '147,293',
    timestamp: '45 sec ago',
    status: 'failed',
    complexity: 'low'
  }
]

const searcherStats: SearcherStats[] = [
  {
    id: '1',
    address: '0x7a25...f9e2',
    name: 'FlashArb Pro',
    totalProfit: '2,847 ETH',
    transactions: 8472,
    successRate: 87.4,
    avgProfit: '0.34 ETH',
    topStrategy: 'DEX Arbitrage',
    risk: 25
  },
  {
    id: '2',
    address: '0x9f84...2a7c',
    name: 'Sandwich King',
    totalProfit: '1,923 ETH',
    transactions: 3847,
    successRate: 94.2,
    avgProfit: '0.50 ETH',
    topStrategy: 'Sandwich Attacks',
    risk: 67
  },
  {
    id: '3',
    address: '0x3c92...8d1f',
    name: 'Liquid Hunter',
    totalProfit: '3,472 ETH',
    transactions: 2847,
    successRate: 91.8,
    avgProfit: '1.22 ETH',
    topStrategy: 'Liquidations',
    risk: 34
  },
  {
    id: '4',
    address: '0x8b47...4e9a',
    name: 'MEV Maximus',
    totalProfit: '4,923 ETH',
    transactions: 12847,
    successRate: 89.7,
    avgProfit: '0.38 ETH',
    topStrategy: 'Multi-Strategy',
    risk: 45
  }
]

const validatorPerformance: ValidatorPerformance[] = [
  {
    id: '1',
    address: '0xa1b2...c3d4',
    name: 'Flashbots Builder',
    mevRevenue: '1,247 ETH',
    blocks: 2847,
    avgMEVPerBlock: '0.44 ETH',
    uptime: 99.8,
    efficiency: 94.7,
    rank: 1
  },
  {
    id: '2',
    address: '0xe5f6...g7h8',
    name: 'MEV-Boost Relay',
    mevRevenue: '923 ETH',
    blocks: 1923,
    avgMEVPerBlock: '0.48 ETH',
    uptime: 98.4,
    efficiency: 92.3,
    rank: 2
  },
  {
    id: '3',
    address: '0x i9j0...k1l2',
    name: 'Titan Builder',
    mevRevenue: '847 ETH',
    blocks: 1584,
    avgMEVPerBlock: '0.53 ETH',
    uptime: 97.9,
    efficiency: 89.8,
    rank: 3
  },
  {
    id: '4',
    address: '0xm3n4...o5p6',
    name: 'Lido Validator',
    mevRevenue: '672 ETH',
    blocks: 1247,
    avgMEVPerBlock: '0.54 ETH',
    uptime: 99.2,
    efficiency: 91.4,
    rank: 4
  }
]

export default function MEVAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 mexma-gradient rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mexma-text-gradient">MEV Analytics & Transaction Graph Analysis</h2>
            <p className="text-gray-400">Maximal Extractable Value tracking and transaction flow analysis</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Live MEV Detection</span>
          </div>
          <div className="text-orange-400 font-medium">847 Active Searchers</div>
        </div>
      </div>

      {/* MEV Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">MEV Revenue (24h)</p>
                <p className="text-2xl font-bold text-white">847 ETH</p>
                <p className="text-xs text-green-400">+18.7% vs yesterday</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Opportunities</p>
                <p className="text-2xl font-bold text-white">2,847</p>
                <p className="text-xs text-orange-400">294 executing now</p>
              </div>
              <Target className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-white">89.4%</p>
                <p className="text-xs text-green-400">+2.1% improvement</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Risk Level</p>
                <p className="text-2xl font-bold text-yellow-400">Medium</p>
                <p className="text-xs text-yellow-400">47 high-risk detected</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Visualization Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Transaction Flow Graph */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-orange-400" />
              <span>Transaction Flow Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionFlowGraph />
          </CardContent>
        </Card>

        {/* MEV Opportunity Heatmap */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-400" />
              <span>MEV Opportunity Heatmap</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MEVOpportunityHeatmap />
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live MEV Opportunities */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-400" />
              <span>Live MEV Opportunities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mevOpportunities?.map((opportunity) => (
                <div key={opportunity?.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        opportunity?.type === 'arbitrage' ? 'bg-blue-500/20 text-blue-400' :
                        opportunity?.type === 'sandwich' ? 'bg-red-500/20 text-red-400' :
                        opportunity?.type === 'liquidation' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {opportunity?.type}
                      </span>
                      <span className="text-sm font-medium text-white">{opportunity?.asset}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        opportunity?.status === 'executed' ? 'bg-green-500/20 text-green-400' :
                        opportunity?.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {opportunity?.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-orange-400">{opportunity?.profitUsd}</span>
                      <span className="text-xs text-gray-400">Block #{opportunity?.block}</span>
                      <span className="text-xs text-gray-500">{opportunity?.timestamp}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{opportunity?.profit}</div>
                    <div className={`text-xs ${
                      opportunity?.complexity === 'high' ? 'text-red-400' :
                      opportunity?.complexity === 'medium' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {opportunity?.complexity} complexity
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Searchers */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-orange-400" />
              <span>Top MEV Searchers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searcherStats?.map((searcher) => (
                <div key={searcher?.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-white">{searcher?.name}</span>
                      <span className="text-xs text-gray-400">{searcher?.address}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-orange-400">{searcher?.totalProfit} total</span>
                      <span className="text-xs text-gray-400">{searcher?.transactions} txs</span>
                      <span className="text-xs text-green-400">{searcher?.successRate}% success</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Strategy: {searcher?.topStrategy}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{searcher?.avgProfit}</div>
                    <div className={`text-xs ${
                      searcher?.risk >= 60 ? 'text-red-400' :
                      searcher?.risk >= 40 ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      Risk: {searcher?.risk}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validator Performance */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <span>Validator MEV Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {validatorPerformance?.map((validator) => (
              <div key={validator?.id} className="p-4 bg-gray-800/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{validator?.name}</span>
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                    #{validator?.rank}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">MEV Revenue:</span>
                    <span className="text-orange-400">{validator?.mevRevenue}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Blocks:</span>
                    <span className="text-white">{validator?.blocks}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Avg/Block:</span>
                    <span className="text-white">{validator?.avgMEVPerBlock}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Uptime:</span>
                    <span className="text-green-400">{validator?.uptime}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Efficiency:</span>
                    <span className="text-blue-400">{validator?.efficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
