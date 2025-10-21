
'use client'

import { Layers, BarChart3, TrendingUp, Zap, Globe, ArrowUpDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import CorrelationMatrixHeatmap from './correlation-matrix-heatmap'
import LiquidityFlowChart from './liquidity-flow-chart'

interface LiquidityPool {
  id: string
  chain: string
  protocol: string
  pair: string
  tvl: string
  tvlUsd: string
  apy: number
  volume24h: string
  liquidity: string
  fees24h: string
  risk: number
  status: 'healthy' | 'warning' | 'critical'
}

interface CrossChainFlow {
  id: string
  sourceChain: string
  targetChain: string
  asset: string
  amount: string
  amountUsd: string
  bridge: string
  timestamp: string
  fee: string
  time: string
  risk: 'low' | 'medium' | 'high'
}

interface ChainMetrics {
  id: string
  name: string
  symbol: string
  tvl: string
  change24h: number
  volume: string
  transactions: number
  bridges: number
  avgFee: string
  blockTime: string
  tps: number
}

const liquidityPools: LiquidityPool[] = [
  {
    id: '1',
    chain: 'Ethereum',
    protocol: 'Uniswap V3',
    pair: 'WETH/USDC',
    tvl: '847.2M',
    tvlUsd: '$847,200,000',
    apy: 24.7,
    volume24h: '$89.4M',
    liquidity: '$45.2M',
    fees24h: '$124K',
    risk: 15,
    status: 'healthy'
  },
  {
    id: '2',
    chain: 'Arbitrum',
    protocol: 'Camelot',
    pair: 'ARB/ETH',
    tvl: '234.8M',
    tvlUsd: '$234,800,000',
    apy: 67.3,
    volume24h: '$23.8M',
    liquidity: '$18.9M',
    fees24h: '$67K',
    risk: 45,
    status: 'warning'
  },
  {
    id: '3',
    chain: 'Polygon',
    protocol: 'QuickSwap',
    pair: 'MATIC/USDT',
    tvl: '156.7M',
    tvlUsd: '$156,700,000',
    apy: 34.2,
    volume24h: '$15.6M',
    liquidity: '$12.4M',
    fees24h: '$34K',
    risk: 25,
    status: 'healthy'
  },
  {
    id: '4',
    chain: 'Optimism',
    protocol: 'Velodrome',
    pair: 'OP/ETH',
    tvl: '89.4M',
    tvlUsd: '$89,400,000',
    apy: 89.1,
    volume24h: '$8.9M',
    liquidity: '$6.7M',
    fees24h: '$23K',
    risk: 67,
    status: 'critical'
  },
  {
    id: '5',
    chain: 'Base',
    protocol: 'Aerodrome',
    pair: 'WETH/USDbC',
    tvl: '123.5M',
    tvlUsd: '$123,500,000',
    apy: 45.8,
    volume24h: '$12.3M',
    liquidity: '$9.8M',
    fees24h: '$45K',
    risk: 35,
    status: 'healthy'
  }
]

const crossChainFlows: CrossChainFlow[] = [
  {
    id: '1',
    sourceChain: 'Ethereum',
    targetChain: 'Arbitrum',
    asset: 'WETH',
    amount: '2,847 WETH',
    amountUsd: '$9.74M',
    bridge: 'Arbitrum Bridge',
    timestamp: '2 min ago',
    fee: '0.01 ETH',
    time: '15 min',
    risk: 'low'
  },
  {
    id: '2',
    sourceChain: 'Polygon',
    targetChain: 'Ethereum',
    asset: 'USDC',
    amount: '5.2M USDC',
    amountUsd: '$5.2M',
    bridge: 'Polygon PoS Bridge',
    timestamp: '5 min ago',
    fee: '15 MATIC',
    time: '45 min',
    risk: 'medium'
  },
  {
    id: '3',
    sourceChain: 'Optimism',
    targetChain: 'Base',
    asset: 'WETH',
    amount: '847 WETH',
    amountUsd: '$2.89M',
    bridge: 'Superbridge',
    timestamp: '8 min ago',
    fee: '0.005 ETH',
    time: '7 min',
    risk: 'low'
  },
  {
    id: '4',
    sourceChain: 'Ethereum',
    targetChain: 'Polygon',
    asset: 'USDT',
    amount: '3.4M USDT',
    amountUsd: '$3.4M',
    bridge: 'Polygon Bridge',
    timestamp: '12 min ago',
    fee: '25 USDT',
    time: '30 min',
    risk: 'medium'
  },
  {
    id: '5',
    sourceChain: 'Arbitrum',
    targetChain: 'Optimism',
    asset: 'ETH',
    amount: '456 ETH',
    amountUsd: '$1.56M',
    bridge: 'Hop Protocol',
    timestamp: '15 min ago',
    fee: '0.02 ETH',
    time: '20 min',
    risk: 'high'
  }
]

const chainMetrics: ChainMetrics[] = [
  {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    tvl: '$47.8B',
    change24h: +2.4,
    volume: '$12.8B',
    transactions: 1247893,
    bridges: 847,
    avgFee: '$8.47',
    blockTime: '12s',
    tps: 15
  },
  {
    id: '2',
    name: 'Arbitrum',
    symbol: 'ARB',
    tvl: '$8.9B',
    change24h: +8.7,
    volume: '$2.4B',
    transactions: 234897,
    bridges: 234,
    avgFee: '$0.15',
    blockTime: '2s',
    tps: 4000
  },
  {
    id: '3',
    name: 'Polygon',
    symbol: 'MATIC',
    tvl: '$5.2B',
    change24h: -1.8,
    volume: '$1.8B',
    transactions: 892347,
    bridges: 189,
    avgFee: '$0.02',
    blockTime: '2s',
    tps: 7000
  },
  {
    id: '4',
    name: 'Optimism',
    symbol: 'OP',
    tvl: '$3.4B',
    change24h: +5.6,
    volume: '$847M',
    transactions: 156789,
    bridges: 123,
    avgFee: '$0.08',
    blockTime: '2s',
    tps: 2000
  },
  {
    id: '5',
    name: 'Base',
    symbol: 'BASE',
    tvl: '$2.1B',
    change24h: +12.3,
    volume: '$456M',
    transactions: 89456,
    bridges: 67,
    avgFee: '$0.05',
    blockTime: '2s',
    tps: 1000
  }
]

export default function CrossChainLiquidity() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 mexma-gradient rounded-lg flex items-center justify-center">
            <Layers className="w-4 h-4 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mexma-text-gradient">Cross-Chain Liquidity Flow & Correlation Matrix</h2>
            <p className="text-gray-400">Real-time liquidity tracking and cross-chain analytics</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Multi-Chain Monitor</span>
          </div>
          <div className="text-orange-400 font-medium">$67.4B Total TVL</div>
        </div>
      </div>

      {/* Chain Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Chains</p>
                <p className="text-2xl font-bold text-white">847</p>
                <p className="text-xs text-green-400">+23 new bridges</p>
              </div>
              <Globe className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Cross-Chain Volume</p>
                <p className="text-2xl font-bold text-white">$4.7B</p>
                <p className="text-xs text-orange-400">Last 24 hours</p>
              </div>
              <ArrowUpDown className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Liquidity Health</p>
                <p className="text-2xl font-bold text-green-400">94.2%</p>
                <p className="text-xs text-green-400">Healthy pools</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Arbitrage Ops</p>
                <p className="text-2xl font-bold text-white">2,847</p>
                <p className="text-xs text-blue-400">94 active now</p>
              </div>
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Visualization Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Correlation Matrix Heatmap */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-orange-400" />
              <span>Asset Correlation Matrix</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CorrelationMatrixHeatmap />
          </CardContent>
        </Card>

        {/* Liquidity Flow Chart */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-orange-400" />
              <span>Real-Time Liquidity Flows</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LiquidityFlowChart />
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Liquidity Pools */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <span>Top Cross-Chain Pools</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {liquidityPools?.map((pool) => (
                <div key={pool?.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-white">{pool?.pair}</span>
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                        {pool?.chain}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        pool?.status === 'healthy' ? 'bg-green-500/20 text-green-400' :
                        pool?.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {pool?.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-orange-400">TVL: ${pool?.tvl}</span>
                      <span className="text-xs text-gray-400">APY: {pool?.apy}%</span>
                      <span className="text-xs text-gray-500">Vol: {pool?.volume24h}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{pool?.protocol}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{pool?.fees24h}</div>
                    <div className={`text-xs ${
                      pool?.risk <= 30 ? 'text-green-400' :
                      pool?.risk <= 60 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      Risk: {pool?.risk}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Cross-Chain Flows */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowUpDown className="w-5 h-5 text-orange-400" />
              <span>Live Cross-Chain Flows</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {crossChainFlows?.map((flow) => (
                <div key={flow?.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-white">{flow?.sourceChain}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-sm font-medium text-white">{flow?.targetChain}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        flow?.risk === 'high' ? 'bg-red-500/20 text-red-400' :
                        flow?.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {flow?.risk}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-orange-400">{flow?.amountUsd}</span>
                      <span className="text-xs text-gray-400">{flow?.asset}</span>
                      <span className="text-xs text-gray-500">ETA: {flow?.time}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      via {flow?.bridge} • Fee: {flow?.fee}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{flow?.amount}</div>
                    <div className="text-xs text-gray-400">{flow?.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chain Performance Metrics */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-orange-400" />
            <span>Multi-Chain Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {chainMetrics?.map((chain) => (
              <div key={chain?.id} className="p-4 bg-gray-800/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white">{chain?.name}</span>
                  <span className={`text-xs font-medium ${
                    chain?.change24h > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {chain?.change24h > 0 ? '+' : ''}{chain?.change24h}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">TVL:</span>
                    <span className="text-orange-400">{chain?.tvl}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Volume:</span>
                    <span className="text-white">{chain?.volume}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Transactions:</span>
                    <span className="text-white">{chain?.transactions?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">TPS:</span>
                    <span className="text-blue-400">{chain?.tps}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Avg Fee:</span>
                    <span className="text-green-400">{chain?.avgFee}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Bridges:</span>
                    <span className="text-purple-400">{chain?.bridges}</span>
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
