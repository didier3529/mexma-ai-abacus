
'use client'

import { TrendingUp, Brain, Target, Zap, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import PredictionChart from './prediction-chart'
import SentimentChart from './sentiment-chart'

interface Prediction {
  id: string
  asset: string
  symbol: string
  currentPrice: string
  predicted24h: string
  predicted7d: string
  confidence: number
  direction: 'up' | 'down' | 'neutral'
  signal: 'strong_buy' | 'buy' | 'hold' | 'sell' | 'strong_sell'
  reasoning: string
  lastUpdated: string
}

interface MarketSignal {
  id: string
  type: string
  asset: string
  signal: string
  strength: number
  timeframe: string
  entry: string
  target: string
  stopLoss: string
  riskReward: string
}

const predictions: Prediction[] = [
  {
    id: '1',
    asset: 'Bitcoin',
    symbol: 'BTC',
    currentPrice: '$118,375.70',
    predicted24h: '$117,450',
    predicted7d: '$124,800',
    confidence: 82,
    direction: 'down',
    signal: 'hold',
    reasoning: 'Short-term profit-taking expected near $118K resistance, consolidation before next leg up',
    lastUpdated: '1 min ago'
  },
  {
    id: '2',
    asset: 'Ethereum',
    symbol: 'ETH',
    currentPrice: '$3,742',
    predicted24h: '$3,890',
    predicted7d: '$4,200',
    confidence: 85,
    direction: 'up',
    signal: 'buy',
    reasoning: 'Layer 2 scaling solutions gaining traction, staking yields remain attractive',
    lastUpdated: '2 mins ago'
  },
  {
    id: '3',
    asset: 'Solana',
    symbol: 'SOL',
    currentPrice: '$183.62',
    predicted24h: '$191.50',
    predicted7d: '$205.80',
    confidence: 78,
    direction: 'up',
    signal: 'hold',
    reasoning: 'DeFi ecosystem growth, improved network stability after recent upgrades',
    lastUpdated: '3 mins ago'
  },
  {
    id: '4',
    asset: 'Cardano',
    symbol: 'ADA',
    currentPrice: '$0.7921',
    predicted24h: '$0.8250',
    predicted7d: '$0.8850',
    confidence: 73,
    direction: 'up',
    signal: 'hold',
    reasoning: 'Hydra scaling solution progress, increased smart contract activity',
    lastUpdated: '4 mins ago'
  }
]

const marketSignals: MarketSignal[] = [
  {
    id: '1',
    type: 'Breakout',
    asset: 'AVAX',
    signal: 'BUY',
    strength: 89,
    timeframe: '4H',
    entry: '$36.50',
    target: '$42.00',
    stopLoss: '$34.20',
    riskReward: '2.4:1'
  },
  {
    id: '2',
    type: 'Reversal',
    asset: 'MATIC',
    signal: 'BUY',
    strength: 76,
    timeframe: '1D',
    entry: '$0.785',
    target: '$0.920',
    stopLoss: '$0.720',
    riskReward: '2.1:1'
  },
  {
    id: '3',
    type: 'Momentum',
    asset: 'UNI',
    signal: 'SELL',
    strength: 68,
    timeframe: '2H',
    entry: '$6.45',
    target: '$5.80',
    stopLoss: '$6.85',
    riskReward: '1.6:1'
  }
]

const getDirectionIcon = (direction: string) => {
  switch (direction) {
    case 'up': return <ArrowUp className="w-4 h-4 text-green-400" />
    case 'down': return <ArrowDown className="w-4 h-4 text-red-400" />
    default: return <Minus className="w-4 h-4 text-gray-400" />
  }
}

const getSignalColor = (signal: string) => {
  switch (signal) {
    case 'strong_buy': return 'text-green-500 bg-green-500/10'
    case 'buy': return 'text-green-400 bg-green-400/10'
    case 'hold': return 'text-gray-400 bg-gray-400/10'
    case 'sell': return 'text-red-400 bg-red-400/10'
    case 'strong_sell': return 'text-red-500 bg-red-500/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getStrengthColor = (strength: number) => {
  if (strength >= 80) return 'text-green-400'
  if (strength >= 60) return 'text-orange-400'
  return 'text-red-400'
}

export default function PredictiveInsights() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-orange-500" />
            <span className="mexma-text-gradient">AI Price Predictions</span>
            <div className="ml-auto flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">ML Model Active</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {predictions?.map((prediction) => (
                <div key={prediction?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{prediction?.asset ?? 'Unknown'}</span>
                      <span className="text-gray-400">({prediction?.symbol ?? 'N/A'})</span>
                      {getDirectionIcon(prediction?.direction ?? 'neutral')}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getSignalColor(prediction?.signal ?? 'hold')}`}>
                        {prediction?.signal?.replace('_', ' ')?.toUpperCase() ?? 'HOLD'}
                      </span>
                      <span className="text-xs text-gray-400">{prediction?.confidence ?? 0}% confidence</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-400">Current</p>
                      <p className="font-semibold text-white">{prediction?.currentPrice ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">24h Target</p>
                      <p className="font-semibold text-orange-400">{prediction?.predicted24h ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">7d Target</p>
                      <p className="font-semibold text-blue-400">{prediction?.predicted7d ?? 'N/A'}</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-300 mb-2">{prediction?.reasoning ?? 'No reasoning available'}</p>
                  <p className="text-xs text-gray-500">Updated {prediction?.lastUpdated ?? 'unknown time'}</p>
                </div>
              )) ?? []}
            </div>
            
            <div>
              <PredictionChart />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-500" />
              <span>Trading Signals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketSignals?.map((signal) => (
                <div key={signal?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{signal?.asset ?? 'Unknown'}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                        {signal?.type ?? 'Unknown'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        signal?.signal === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {signal?.signal ?? 'HOLD'}
                      </span>
                      <span className={`text-xs ${getStrengthColor(signal?.strength ?? 0)}`}>
                        {signal?.strength ?? 0}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400">Entry: </span>
                      <span className="text-white">{signal?.entry ?? 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Target: </span>
                      <span className="text-green-400">{signal?.target ?? 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Stop Loss: </span>
                      <span className="text-red-400">{signal?.stopLoss ?? 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">R:R: </span>
                      <span className="text-orange-400">{signal?.riskReward ?? 'N/A'}</span>
                    </div>
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
              <span>Market Sentiment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SentimentChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
