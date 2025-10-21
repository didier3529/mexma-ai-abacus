
'use client'

import { Brain, TrendingUp, MessageSquare, Users, BarChart3, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import SentimentTimelineChart from './sentiment-timeline-chart'
import SocialEngagementChart from './social-engagement-chart'

interface SentimentMetric {
  id: string
  platform: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
  score: number
  volume: number
  change24h: number
  keywords: string[]
  lastUpdated: string
}

interface MarketInsight {
  id: string
  type: 'trend' | 'event' | 'sentiment' | 'technical'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  source: string
  timestamp: string
  relevantAssets: string[]
}

interface SocialMetric {
  id: string
  platform: string
  metric: string
  value: string
  change24h: number
  trendDirection: 'up' | 'down' | 'stable'
  engagement: number
}

interface FearGreedData {
  value: number
  label: string
  change24h: number
  components: {
    volatility: number
    momentum: number
    volume: number
    social: number
    surveys: number
    dominance: number
  }
}

const sentimentMetrics: SentimentMetric[] = [
  {
    id: '1',
    platform: 'Twitter',
    sentiment: 'bullish',
    score: 73,
    volume: 847620,
    change24h: 12.4,
    keywords: ['bitcoin', 'ETF', 'bullrun', 'hodl'],
    lastUpdated: '2 mins ago'
  },
  {
    id: '2',
    platform: 'Reddit',
    sentiment: 'bullish',
    score: 68,
    volume: 234590,
    change24h: 8.7,
    keywords: ['altseason', 'DeFi', 'gains'],
    lastUpdated: '5 mins ago'
  },
  {
    id: '3',
    platform: 'Discord',
    sentiment: 'neutral',
    score: 52,
    volume: 89340,
    change24h: -2.1,
    keywords: ['trading', 'analysis', 'market'],
    lastUpdated: '8 mins ago'
  },
  {
    id: '4',
    platform: 'Telegram',
    sentiment: 'bullish',
    score: 79,
    volume: 456720,
    change24h: 18.9,
    keywords: ['pump', 'moon', 'diamond hands'],
    lastUpdated: '1 min ago'
  }
]

const marketInsights: MarketInsight[] = [
  {
    id: '1',
    type: 'trend',
    title: 'Institutional Bitcoin Accumulation Accelerating',
    description: 'Large-scale BTC purchases by corporate treasuries detected across multiple wallets. Pattern suggests coordinated institutional buying.',
    impact: 'high',
    confidence: 89,
    source: 'AI Pattern Recognition',
    timestamp: '12 mins ago',
    relevantAssets: ['BTC', 'ETH']
  },
  {
    id: '2',
    type: 'sentiment',
    title: 'Social Sentiment Reaches 3-Month High',
    description: 'Cross-platform sentiment analysis shows bullish momentum building. Twitter mentions up 340% with positive sentiment dominating.',
    impact: 'medium',
    confidence: 76,
    source: 'Social Intelligence',
    timestamp: '34 mins ago',
    relevantAssets: ['BTC', 'ETH', 'SOL']
  },
  {
    id: '3',
    type: 'event',
    title: 'Major DeFi Protocol Upgrade Imminent',
    description: 'Code analysis reveals significant protocol upgrades scheduled for next 48h. Historical data suggests positive price impact.',
    impact: 'medium',
    confidence: 82,
    source: 'Code Analysis',
    timestamp: '1.2 hours ago',
    relevantAssets: ['UNI', 'AAVE', 'CRV']
  }
]

const socialMetrics: SocialMetric[] = [
  {
    id: '1',
    platform: 'Twitter',
    metric: 'Mentions/Hour',
    value: '14.2K',
    change24h: 23.5,
    trendDirection: 'up',
    engagement: 89
  },
  {
    id: '2',
    platform: 'Reddit',
    metric: 'Comments/Hour',
    value: '3.8K',
    change24h: 12.1,
    trendDirection: 'up',
    engagement: 76
  },
  {
    id: '3',
    platform: 'Discord',
    metric: 'Messages/Hour',
    value: '8.9K',
    change24h: -5.2,
    trendDirection: 'down',
    engagement: 64
  },
  {
    id: '4',
    platform: 'Telegram',
    metric: 'Activity Score',
    value: '91',
    change24h: 31.8,
    trendDirection: 'up',
    engagement: 94
  }
]

const fearGreedData: FearGreedData = {
  value: 76,
  label: 'Greed',
  change24h: 8,
  components: {
    volatility: 65,
    momentum: 82,
    volume: 71,
    social: 89,
    surveys: 58,
    dominance: 43
  }
}

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'bullish': return 'text-green-400 bg-green-400/10'
    case 'bearish': return 'text-red-400 bg-red-400/10'
    case 'neutral': return 'text-gray-400 bg-gray-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high': return 'text-red-400 bg-red-400/10'
    case 'medium': return 'text-orange-400 bg-orange-400/10'
    case 'low': return 'text-green-400 bg-green-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getTrendIcon = (direction: string) => {
  switch (direction) {
    case 'up': return <TrendingUp className="w-3 h-3 text-green-400" />
    case 'down': return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />
    default: return <BarChart3 className="w-3 h-3 text-gray-400" />
  }
}

const getFearGreedColor = (value: number) => {
  if (value >= 75) return 'text-orange-400'
  if (value >= 50) return 'text-green-400'
  if (value >= 25) return 'text-yellow-400'
  return 'text-red-400'
}

export default function AIMarketSentiment() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-orange-500" />
            <span className="mexma-text-gradient">AI-Powered Market Sentiment & Social Intelligence</span>
            <div className="ml-auto flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">AI Engine Active</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4 text-green-400" />
                <span className="text-green-400">1.2M Posts Analyzed</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Sentiment Timeline (24h)</h3>
              <SentimentTimelineChart />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Social Engagement Metrics</h3>
              <SocialEngagementChart />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              <span>Platform Sentiment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sentimentMetrics?.map((metric) => (
                <div key={metric?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{metric?.platform ?? 'Unknown'}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(metric?.sentiment ?? 'neutral')}`}>
                        {metric?.sentiment?.toUpperCase() ?? 'NEUTRAL'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{metric?.lastUpdated ?? 'Unknown'}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Sentiment Score</p>
                      <p className={`text-xl font-bold ${getFearGreedColor(metric?.score ?? 50)}`}>
                        {metric?.score ?? 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Volume</p>
                      <p className="font-semibold text-white">{(metric?.volume ?? 0).toLocaleString()}</p>
                      <p className={`text-xs ${(metric?.change24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {(metric?.change24h ?? 0) >= 0 ? '+' : ''}{metric?.change24h?.toFixed(1) ?? '0.0'}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {metric?.keywords?.map((keyword, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                        #{keyword}
                      </span>
                    )) ?? []}
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
              <span>AI Market Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketInsights?.map((insight) => (
                <div key={insight?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(insight?.impact ?? 'low')}`}>
                      {insight?.impact?.toUpperCase() ?? 'LOW'} IMPACT
                    </span>
                    <div className="text-xs text-gray-400">{insight?.timestamp ?? 'Unknown'}</div>
                  </div>
                  
                  <h4 className="font-semibold text-white mb-2">{insight?.title ?? 'No title'}</h4>
                  <p className="text-xs text-gray-300 mb-3">{insight?.description ?? 'No description available'}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Source: {insight?.source ?? 'Unknown'}</span>
                    <span className="text-xs text-green-400">{insight?.confidence ?? 0}% confidence</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {insight?.relevantAssets?.map((asset, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded">
                        {asset}
                      </span>
                    )) ?? []}
                  </div>
                </div>
              )) ?? []}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-500" />
              <span>Social Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              {socialMetrics?.map((metric) => (
                <div key={metric?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{metric?.platform ?? 'Unknown'}</span>
                      {getTrendIcon(metric?.trendDirection ?? 'stable')}
                    </div>
                    <div className="text-xs text-gray-400">{metric?.metric ?? 'Unknown Metric'}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xl font-bold text-white">{metric?.value ?? 'N/A'}</p>
                      <p className={`text-xs ${(metric?.change24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {(metric?.change24h ?? 0) >= 0 ? '+' : ''}{metric?.change24h?.toFixed(1) ?? '0.0'}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Engagement</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-orange-500 rounded-full" 
                            style={{ width: `${metric?.engagement ?? 0}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-orange-400">{metric?.engagement ?? 0}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )) ?? []}
            </div>

            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
              <div className="text-center mb-4">
                <h4 className="font-semibold text-white mb-2">Fear & Greed Index</h4>
                <div className={`text-4xl font-bold ${getFearGreedColor(fearGreedData?.value ?? 50)}`}>
                  {fearGreedData?.value ?? 0}
                </div>
                <div className={`text-sm ${getFearGreedColor(fearGreedData?.value ?? 50)}`}>
                  {fearGreedData?.label ?? 'Neutral'}
                </div>
                <div className={`text-xs ${(fearGreedData?.change24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {(fearGreedData?.change24h ?? 0) >= 0 ? '+' : ''}{fearGreedData?.change24h ?? 0} (24h)
                </div>
              </div>
              
              <div className="space-y-2">
                {Object.entries(fearGreedData?.components ?? {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 capitalize">{key}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full" 
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-white w-8">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
