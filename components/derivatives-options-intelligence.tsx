
'use client'

import { TrendingUp, BarChart3, Activity, Zap, Target, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import VolatilitySurfaceChart from './volatility-surface-chart'
import OptionsFlowChart from './options-flow-chart'

interface VolatilityData {
  id: string
  asset: string
  strike: number
  expiry: string
  impliedVol: number
  delta: number
  gamma: number
  theta: number
  vega: number
  change24h: number
  volume: number
  openInterest: number
}

interface OptionsFlow {
  id: string
  timestamp: string
  type: 'call' | 'put'
  asset: string
  strike: number
  expiry: string
  premium: string
  volume: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
  unusualActivity: boolean
  flowSize: 'small' | 'medium' | 'large' | 'block'
}

interface DerivativesPosition {
  id: string
  exchange: string
  asset: string
  type: 'futures' | 'options' | 'perpetual'
  openInterest: string
  volume24h: string
  funding: number
  basis: number
  change24h: number
  liquidationRisk: 'low' | 'medium' | 'high'
}

interface GammaExposure {
  id: string
  level: string
  exposure: string
  impact: 'supportive' | 'neutral' | 'resistive'
  probability: number
}

const volatilityData: VolatilityData[] = [
  {
    id: '1',
    asset: 'BTC',
    strike: 118000,
    expiry: '2025-02-28',
    impliedVol: 87.3,
    delta: 0.52,
    gamma: 0.0089,
    theta: -45.7,
    vega: 892.4,
    change24h: 4.2,
    volume: 847,
    openInterest: 23450
  },
  {
    id: '2',
    asset: 'ETH',
    strike: 3750,
    expiry: '2025-02-14',
    impliedVol: 94.8,
    delta: 0.48,
    gamma: 0.0134,
    theta: -28.9,
    vega: 567.2,
    change24h: -2.1,
    volume: 2340,
    openInterest: 18920
  },
  {
    id: '3',
    asset: 'BTC',
    strike: 125000,
    expiry: '2025-03-28',
    impliedVol: 102.1,
    delta: 0.38,
    gamma: 0.0067,
    theta: -67.3,
    vega: 1247.8,
    change24h: 8.7,
    volume: 456,
    openInterest: 34670
  },
  {
    id: '4',
    asset: 'SOL',
    strike: 290,
    expiry: '2025-02-07',
    impliedVol: 118.5,
    delta: 0.61,
    gamma: 0.0234,
    theta: -12.4,
    vega: 234.5,
    change24h: -5.3,
    volume: 1890,
    openInterest: 8940
  }
]

const optionsFlow: OptionsFlow[] = [
  {
    id: '1',
    timestamp: '14 mins ago',
    type: 'call',
    asset: 'BTC',
    strike: 125000,
    expiry: '2025-03-28',
    premium: '$2.34M',
    volume: 847,
    sentiment: 'bullish',
    unusualActivity: true,
    flowSize: 'block'
  },
  {
    id: '2',
    timestamp: '27 mins ago',
    type: 'put',
    asset: 'ETH',
    strike: 3500,
    expiry: '2025-02-14',
    premium: '$890K',
    volume: 1456,
    sentiment: 'bearish',
    unusualActivity: false,
    flowSize: 'large'
  },
  {
    id: '3',
    timestamp: '1.2 hours ago',
    type: 'call',
    asset: 'BTC',
    strike: 130000,
    expiry: '2025-06-27',
    premium: '$1.67M',
    volume: 234,
    sentiment: 'bullish',
    unusualActivity: true,
    flowSize: 'medium'
  }
]

const derivativesPositions: DerivativesPosition[] = [
  {
    id: '1',
    exchange: 'Deribit',
    asset: 'BTC',
    type: 'options',
    openInterest: '$8.9B',
    volume24h: '$2.3B',
    funding: 0.0125,
    basis: 234.5,
    change24h: 12.4,
    liquidationRisk: 'low'
  },
  {
    id: '2',
    exchange: 'Binance',
    asset: 'ETH',
    type: 'perpetual',
    openInterest: '$3.4B',
    volume24h: '$1.8B',
    funding: -0.0089,
    basis: -45.7,
    change24h: -8.2,
    liquidationRisk: 'medium'
  },
  {
    id: '3',
    exchange: 'Bybit',
    asset: 'SOL',
    type: 'futures',
    openInterest: '$890M',
    volume24h: '$456M',
    funding: 0.0234,
    basis: 12.8,
    change24h: 23.7,
    liquidationRisk: 'low'
  },
  {
    id: '4',
    exchange: 'OKX',
    asset: 'BTC',
    type: 'perpetual',
    openInterest: '$4.7B',
    volume24h: '$3.2B',
    funding: 0.0067,
    basis: 189.3,
    change24h: 5.8,
    liquidationRisk: 'high'
  }
]

const gammaExposure: GammaExposure[] = [
  { id: '1', level: '$115,000', exposure: '$2.3B', impact: 'supportive', probability: 89 },
  { id: '2', level: '$120,000', exposure: '$4.7B', impact: 'resistive', probability: 76 },
  { id: '3', level: '$125,000', exposure: '$3.1B', impact: 'resistive', probability: 82 },
  { id: '4', level: '$110,000', exposure: '$1.8B', impact: 'supportive', probability: 91 }
]

const getFlowColor = (type: string) => {
  return type === 'call' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
}

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'bullish': return 'text-green-400'
    case 'bearish': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'high': return 'text-red-400 bg-red-400/10'
    case 'medium': return 'text-orange-400 bg-orange-400/10'
    case 'low': return 'text-green-400 bg-green-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'supportive': return 'text-green-400 bg-green-400/10'
    case 'resistive': return 'text-red-400 bg-red-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

export default function DerivativesOptionsIntelligence() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            <span className="mexma-text-gradient">Derivatives & Options Intelligence</span>
            <div className="ml-auto flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Live Options Flow</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-green-400">$18.7B Open Interest</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Volatility Surface</h3>
              <VolatilitySurfaceChart />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Options Flow (Real-time)</h3>
              <OptionsFlowChart />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <span>Implied Volatility Term Structure</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {volatilityData?.map((vol) => (
                <div key={vol?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{vol?.asset ?? 'N/A'}</span>
                      <span className="text-xs text-gray-400">${vol?.strike?.toLocaleString() ?? '0'}</span>
                      <span className="text-xs text-orange-400">{vol?.expiry ?? 'N/A'}</span>
                    </div>
                    <div className={`text-xs ${(vol?.change24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {(vol?.change24h ?? 0) >= 0 ? '+' : ''}{vol?.change24h?.toFixed(1) ?? '0.0'}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">IV</p>
                      <p className="font-semibold text-white">{vol?.impliedVol?.toFixed(1) ?? '0.0'}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Delta</p>
                      <p className="font-semibold text-orange-400">{vol?.delta?.toFixed(3) ?? '0.000'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Gamma</p>
                      <p className="font-semibold text-blue-400">{vol?.gamma?.toFixed(4) ?? '0.0000'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Vega</p>
                      <p className="font-semibold text-purple-400">{vol?.vega?.toFixed(1) ?? '0.0'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Vol: {vol?.volume?.toLocaleString() ?? '0'}</span>
                    <span className="text-xs text-gray-400">OI: {vol?.openInterest?.toLocaleString() ?? '0'}</span>
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
              <span>Unusual Options Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optionsFlow?.map((flow) => (
                <div key={flow?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getFlowColor(flow?.type ?? 'call')}`}>
                        {flow?.type?.toUpperCase() ?? 'CALL'}
                      </span>
                      <span className="font-semibold text-white">{flow?.asset ?? 'N/A'}</span>
                      {flow?.unusualActivity && (
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                          UNUSUAL
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">{flow?.timestamp ?? 'Unknown'}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Strike / Expiry</p>
                      <p className="font-semibold text-white">${flow?.strike?.toLocaleString() ?? '0'}</p>
                      <p className="text-xs text-orange-400">{flow?.expiry ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Premium</p>
                      <p className="font-semibold text-white">{flow?.premium ?? 'N/A'}</p>
                      <p className="text-xs text-gray-400">{flow?.volume?.toLocaleString() ?? '0'} contracts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${getSentimentColor(flow?.sentiment ?? 'neutral')}`}>
                      {flow?.sentiment?.toUpperCase() ?? 'NEUTRAL'}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                      {flow?.flowSize?.toUpperCase() ?? 'SMALL'} FLOW
                    </span>
                  </div>
                </div>
              )) ?? []}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-500" />
                <span>Derivatives Positioning</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-2 text-gray-400 font-medium">Exchange</th>
                      <th className="text-right py-3 px-2 text-gray-400 font-medium">Asset</th>
                      <th className="text-right py-3 px-2 text-gray-400 font-medium">Type</th>
                      <th className="text-right py-3 px-2 text-gray-400 font-medium">Open Interest</th>
                      <th className="text-right py-3 px-2 text-gray-400 font-medium">24h Volume</th>
                      <th className="text-right py-3 px-2 text-gray-400 font-medium">Funding</th>
                      <th className="text-right py-3 px-2 text-gray-400 font-medium">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {derivativesPositions?.map((pos) => (
                      <tr key={pos?.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-2 font-medium text-white">{pos?.exchange ?? 'N/A'}</td>
                        <td className="py-4 px-2 text-right font-semibold text-orange-400">{pos?.asset ?? 'N/A'}</td>
                        <td className="py-4 px-2 text-right">
                          <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                            {pos?.type?.toUpperCase() ?? 'UNKNOWN'}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right font-semibold text-white">{pos?.openInterest ?? 'N/A'}</td>
                        <td className="py-4 px-2 text-right text-gray-300">{pos?.volume24h ?? 'N/A'}</td>
                        <td className="py-4 px-2 text-right">
                          <span className={`font-medium ${(pos?.funding ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {(pos?.funding ?? 0) >= 0 ? '+' : ''}{((pos?.funding ?? 0) * 100).toFixed(3)}%
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(pos?.liquidationRisk ?? 'low')}`}>
                            {pos?.liquidationRisk?.toUpperCase() ?? 'LOW'}
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

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-orange-500" />
              <span>Gamma Exposure (GEX)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gammaExposure?.map((gex) => (
                <div key={gex?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{gex?.level ?? 'N/A'}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(gex?.impact ?? 'neutral')}`}>
                      {gex?.impact?.toUpperCase() ?? 'NEUTRAL'}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-xs text-gray-400">Exposure</p>
                    <p className="font-semibold text-orange-400">{gex?.exposure ?? 'N/A'}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Probability:</span>
                    <span className="text-xs text-green-400">{gex?.probability ?? 0}%</span>
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
