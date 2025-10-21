
'use client'

import { Activity, BarChart3, Zap, TrendingUp, Target, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import OrderbookDepthChart from './orderbook-depth-chart'
import ArbitrageOpportunitiesChart from './arbitrage-opportunities-chart'

interface OrderbookData {
  id: string
  exchange: string
  pair: string
  bidDepth: string
  askDepth: string
  spread: number
  midPrice: number
  imbalance: number
  liquidity1pct: string
  liquidity5pct: string
  lastUpdate: string
}

interface ArbitrageOpportunity {
  id: string
  pair: string
  buyExchange: string
  sellExchange: string
  buyPrice: number
  sellPrice: number
  spread: number
  profitUsd: string
  volume: string
  complexity: 'simple' | 'medium' | 'complex'
  timeWindow: string
  confidence: number
}

interface NetworkHealth {
  id: string
  network: string
  blockTime: number
  gasPrice: string
  congestion: 'low' | 'medium' | 'high'
  healthScore: number
  throughput: string
  finalityTime: string
  uptimePercent: number
}

interface LiquidityMetrics {
  id: string
  exchange: string
  pair: string
  totalLiquidity: string
  tier1Liquidity: string
  tier2Liquidity: string
  marketImpact1pct: number
  marketImpact5pct: number
  velocityScore: number
}

const orderbookData: OrderbookData[] = [
  {
    id: '1',
    exchange: 'Binance',
    pair: 'BTC/USDT',
    bidDepth: '$45.7M',
    askDepth: '$52.3M',
    spread: 0.02,
    midPrice: 118375.50,
    imbalance: -6.8,
    liquidity1pct: '$12.4M',
    liquidity5pct: '$67.8M',
    lastUpdate: '2 secs ago'
  },
  {
    id: '2',
    exchange: 'Coinbase',
    pair: 'BTC/USD',
    bidDepth: '$38.9M',
    askDepth: '$41.2M',
    spread: 0.05,
    midPrice: 118382.75,
    imbalance: 2.3,
    liquidity1pct: '$9.7M',
    liquidity5pct: '$45.6M',
    lastUpdate: '1 sec ago'
  },
  {
    id: '3',
    exchange: 'Kraken',
    pair: 'BTC/USD',
    bidDepth: '$23.4M',
    askDepth: '$28.7M',
    spread: 0.08,
    midPrice: 118389.25,
    imbalance: 9.8,
    liquidity1pct: '$5.2M',
    liquidity5pct: '$28.9M',
    lastUpdate: '3 secs ago'
  },
  {
    id: '4',
    exchange: 'Bybit',
    pair: 'BTC/USDT',
    bidDepth: '$67.2M',
    askDepth: '$59.8M',
    spread: 0.03,
    midPrice: 118378.90,
    imbalance: -5.5,
    liquidity1pct: '$18.9M',
    liquidity5pct: '$89.4M',
    lastUpdate: '1 sec ago'
  }
]

const arbitrageOpportunities: ArbitrageOpportunity[] = [
  {
    id: '1',
    pair: 'BTC/USDT',
    buyExchange: 'Binance',
    sellExchange: 'Bybit',
    buyPrice: 118375.50,
    sellPrice: 118389.25,
    spread: 0.012,
    profitUsd: '$2,340',
    volume: '$500K',
    complexity: 'simple',
    timeWindow: '15 secs',
    confidence: 94
  },
  {
    id: '2',
    pair: 'ETH/USDC',
    buyExchange: 'Uniswap',
    sellExchange: 'Coinbase',
    buyPrice: 3742.85,
    sellPrice: 3748.20,
    spread: 0.143,
    profitUsd: '$890',
    volume: '$150K',
    complexity: 'medium',
    timeWindow: '45 secs',
    confidence: 87
  },
  {
    id: '3',
    pair: 'SOL/USDT',
    buyExchange: 'Raydium',
    sellExchange: 'Binance',
    buyPrice: 287.45,
    sellPrice: 288.95,
    spread: 0.522,
    profitUsd: '$456',
    volume: '$75K',
    complexity: 'complex',
    timeWindow: '2 mins',
    confidence: 73
  }
]

const networkHealth: NetworkHealth[] = [
  {
    id: '1',
    network: 'Ethereum',
    blockTime: 12.1,
    gasPrice: '45 gwei',
    congestion: 'medium',
    healthScore: 87,
    throughput: '15 TPS',
    finalityTime: '6.4 mins',
    uptimePercent: 99.98
  },
  {
    id: '2',
    network: 'Arbitrum',
    blockTime: 0.25,
    gasPrice: '0.1 gwei',
    congestion: 'low',
    healthScore: 94,
    throughput: '40,000 TPS',
    finalityTime: '1.2 mins',
    uptimePercent: 99.95
  },
  {
    id: '3',
    network: 'Polygon',
    blockTime: 2.1,
    gasPrice: '30 gwei',
    congestion: 'low',
    healthScore: 91,
    throughput: '7,000 TPS',
    finalityTime: '2.3 mins',
    uptimePercent: 99.92
  },
  {
    id: '4',
    network: 'Solana',
    blockTime: 0.4,
    gasPrice: '$0.0005',
    congestion: 'low',
    healthScore: 89,
    throughput: '65,000 TPS',
    finalityTime: '12.8 secs',
    uptimePercent: 99.87
  }
]

const liquidityMetrics: LiquidityMetrics[] = [
  {
    id: '1',
    exchange: 'Binance',
    pair: 'BTC/USDT',
    totalLiquidity: '$98.0M',
    tier1Liquidity: '$12.4M',
    tier2Liquidity: '$67.8M',
    marketImpact1pct: 0.05,
    marketImpact5pct: 0.23,
    velocityScore: 94
  },
  {
    id: '2',
    exchange: 'Coinbase',
    pair: 'ETH/USD',
    totalLiquidity: '$45.6M',
    tier1Liquidity: '$8.9M',
    tier2Liquidity: '$28.7M',
    marketImpact1pct: 0.08,
    marketImpact5pct: 0.34,
    velocityScore: 87
  },
  {
    id: '3',
    exchange: 'Uniswap V3',
    pair: 'ETH/USDC',
    totalLiquidity: '$234.5M',
    tier1Liquidity: '$45.7M',
    tier2Liquidity: '$123.4M',
    marketImpact1pct: 0.03,
    marketImpact5pct: 0.12,
    velocityScore: 78
  }
]

const getSpreadColor = (spread: number) => {
  if (spread <= 0.03) return 'text-green-400'
  if (spread <= 0.08) return 'text-orange-400'
  return 'text-red-400'
}

const getImbalanceColor = (imbalance: number) => {
  const abs = Math.abs(imbalance)
  if (abs <= 3) return 'text-green-400'
  if (abs <= 8) return 'text-orange-400'
  return 'text-red-400'
}

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case 'simple': return 'text-green-400 bg-green-400/10'
    case 'medium': return 'text-orange-400 bg-orange-400/10'
    case 'complex': return 'text-red-400 bg-red-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getCongestionColor = (congestion: string) => {
  switch (congestion) {
    case 'low': return 'text-green-400 bg-green-400/10'
    case 'medium': return 'text-orange-400 bg-orange-400/10'
    case 'high': return 'text-red-400 bg-red-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getHealthColor = (health: number) => {
  if (health >= 90) return 'text-green-400'
  if (health >= 75) return 'text-orange-400'
  return 'text-red-400'
}

export default function MarketMicrostructureAnalytics() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-orange-500" />
            <span className="mexma-text-gradient">Market Microstructure Analytics</span>
            <div className="ml-auto flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Real-time Depth Analysis</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4 text-green-400" />
                <span className="text-green-400">23 Arbitrage Opportunities</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Order Book Depth Analysis</h3>
              <OrderbookDepthChart />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Arbitrage Opportunities</h3>
              <ArbitrageOpportunitiesChart />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-orange-500" />
              <span>Real-time Order Book Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderbookData?.map((book) => (
                <div key={book?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{book?.exchange ?? 'Unknown'}</span>
                      <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                        {book?.pair ?? 'N/A'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{book?.lastUpdate ?? 'Unknown'}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Mid Price</p>
                      <p className="font-semibold text-white">${(book?.midPrice ?? 0).toLocaleString()}</p>
                      <p className={`text-xs font-medium ${getSpreadColor(book?.spread ?? 0)}`}>
                        {(book?.spread ?? 0).toFixed(3)}% spread
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Bid Depth</p>
                      <p className="font-semibold text-green-400">{book?.bidDepth ?? 'N/A'}</p>
                      <p className="text-xs text-gray-400">Ask: {book?.askDepth ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Imbalance</p>
                      <p className={`font-semibold ${getImbalanceColor(book?.imbalance ?? 0)}`}>
                        {(book?.imbalance ?? 0) >= 0 ? '+' : ''}{(book?.imbalance ?? 0).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">1% Impact: {book?.liquidity1pct ?? 'N/A'}</span>
                    <span className="text-xs text-gray-400">5% Impact: {book?.liquidity5pct ?? 'N/A'}</span>
                  </div>
                </div>
              )) ?? []}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span>Active Arbitrage Opportunities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {arbitrageOpportunities?.map((arb) => (
                <div key={arb?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{arb?.pair ?? 'N/A'}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getComplexityColor(arb?.complexity ?? 'medium')}`}>
                        {arb?.complexity?.toUpperCase() ?? 'MEDIUM'}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-green-400">
                      {(arb?.spread ?? 0).toFixed(3)}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Buy @ {arb?.buyExchange ?? 'N/A'}</p>
                      <p className="font-semibold text-green-400">${(arb?.buyPrice ?? 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Sell @ {arb?.sellExchange ?? 'N/A'}</p>
                      <p className="font-semibold text-red-400">${(arb?.sellPrice ?? 0).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Profit</p>
                      <p className="font-semibold text-orange-400">{arb?.profitUsd ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Volume</p>
                      <p className="font-semibold text-white">{arb?.volume ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Window</p>
                      <p className="font-semibold text-white">{arb?.timeWindow ?? 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Confidence:</span>
                    <span className="text-xs text-green-400">{arb?.confidence ?? 0}%</span>
                  </div>
                </div>
              )) ?? []}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-500" />
              <span>Network Health Monitoring</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {networkHealth?.map((network) => (
                <div key={network?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{network?.network ?? 'Unknown'}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getCongestionColor(network?.congestion ?? 'medium')}`}>
                        {network?.congestion?.toUpperCase() ?? 'MEDIUM'}
                      </span>
                    </div>
                    <div className={`text-xl font-bold ${getHealthColor(network?.healthScore ?? 0)}`}>
                      {network?.healthScore ?? 0}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Block Time</p>
                      <p className="font-semibold text-white">{network?.blockTime ?? 0}s</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Gas Price</p>
                      <p className="font-semibold text-orange-400">{network?.gasPrice ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Throughput</p>
                      <p className="font-semibold text-white">{network?.throughput ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Finality</p>
                      <p className="font-semibold text-white">{network?.finalityTime ?? 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Uptime:</span>
                    <span className="text-xs text-green-400">{network?.uptimePercent ?? 0}%</span>
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
              <span>Liquidity Depth Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liquidityMetrics?.map((liquidity) => (
                <div key={liquidity?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{liquidity?.exchange ?? 'Unknown'}</span>
                      <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                        {liquidity?.pair ?? 'N/A'}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-green-400">
                      {liquidity?.velocityScore ?? 0}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Total Liquidity</p>
                      <p className="font-semibold text-white">{liquidity?.totalLiquidity ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tier 1</p>
                      <p className="font-semibold text-green-400">{liquidity?.tier1Liquidity ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Tier 2</p>
                      <p className="font-semibold text-blue-400">{liquidity?.tier2Liquidity ?? 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      1% Impact: {(liquidity?.marketImpact1pct ?? 0).toFixed(2)}%
                    </span>
                    <span className="text-xs text-gray-400">
                      5% Impact: {(liquidity?.marketImpact5pct ?? 0).toFixed(2)}%
                    </span>
                  </div>
                </div>
              )) ?? []}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
