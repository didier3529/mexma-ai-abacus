
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Target,
  Layers,
  ArrowUp,
  ArrowDown,
  Minus,
  Settings,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ComposedChart, Bar } from 'recharts'

// Mock data for different timeframes
const generateTimeframeData = (timeframe: string) => {
  const data = []
  const intervals = timeframe === '1m' ? 60 : timeframe === '5m' ? 12 : timeframe === '15m' ? 4 : timeframe === '1h' ? 1 : 0.25
  const basePrice = 43000
  let currentPrice = basePrice
  
  for (let i = 0; i < 50; i++) {
    const change = (Math.random() - 0.5) * (intervals * 20)
    currentPrice = currentPrice + change
    const rsi = 30 + Math.random() * 40 + Math.sin(i * 0.1) * 20
    const macd = Math.sin(i * 0.15) * 50 + Math.random() * 10
    const volume = Math.random() * 1000000 + 500000
    
    data.push({
      time: new Date(Date.now() - (49 - i) * 3600000 * intervals).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      price: Math.round(currentPrice),
      rsi: Math.round(rsi * 100) / 100,
      macd: Math.round(macd * 100) / 100,
      volume: Math.round(volume),
      sma20: Math.round(currentPrice + (Math.random() - 0.5) * 100),
      ema50: Math.round(currentPrice + (Math.random() - 0.5) * 150)
    })
  }
  
  return data
}

const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d', '1w']
const timeframeData = Object.fromEntries(
  timeframes.map(tf => [tf, generateTimeframeData(tf)])
)

// Multi-timeframe analysis data
const multiTimeframeAnalysis = {
  '1m': {
    trend: 'bullish',
    strength: 65,
    rsi: 68.5,
    macd: 'bullish',
    volume: 'high',
    signal: 'buy',
    confidence: 72
  },
  '5m': {
    trend: 'bullish',
    strength: 78,
    rsi: 58.2,
    macd: 'bullish',
    volume: 'normal',
    signal: 'buy',
    confidence: 81
  },
  '15m': {
    trend: 'bullish',
    strength: 82,
    rsi: 55.8,
    macd: 'bullish',
    volume: 'high',
    signal: 'strong_buy',
    confidence: 85
  },
  '1h': {
    trend: 'bullish',
    strength: 75,
    rsi: 62.1,
    macd: 'neutral',
    volume: 'normal',
    signal: 'buy',
    confidence: 78
  },
  '4h': {
    trend: 'neutral',
    strength: 45,
    rsi: 52.3,
    macd: 'bearish',
    volume: 'low',
    signal: 'hold',
    confidence: 55
  },
  '1d': {
    trend: 'bearish',
    strength: 35,
    rsi: 45.7,
    macd: 'bearish',
    volume: 'normal',
    signal: 'sell',
    confidence: 68
  },
  '1w': {
    trend: 'bearish',
    strength: 25,
    rsi: 38.2,
    macd: 'bearish',
    volume: 'low',
    signal: 'strong_sell',
    confidence: 72
  }
}

// Trend alignment analysis
const trendAlignment = {
  shortTerm: ['1m', '5m', '15m'],
  mediumTerm: ['1h', '4h'],
  longTerm: ['1d', '1w'],
  alignment: {
    shortTerm: 'bullish',
    mediumTerm: 'neutral',
    longTerm: 'bearish',
    overall: 'mixed'
  },
  conflictLevel: 'high'
}

export default function MultiTimeframeAnalysis() {
  const [selectedTimeframes, setSelectedTimeframes] = useState(['15m', '1h', '4h', '1d'])
  const [primaryTimeframe, setPrimaryTimeframe] = useState('1h')
  const [showRSI, setShowRSI] = useState(true)
  const [alignmentView, setAlignmentView] = useState(true)

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'bullish': return <ArrowUp className="h-4 w-4 text-green-400" />
      case 'bearish': return <ArrowDown className="h-4 w-4 text-red-400" />
      default: return <Minus className="h-4 w-4 text-yellow-400" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch(trend) {
      case 'bullish': return 'text-green-400'
      case 'bearish': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getSignalColor = (signal: string) => {
    switch(signal) {
      case 'strong_buy':
      case 'buy': return 'bg-green-500/20 text-green-400 border-green-500'
      case 'strong_sell':
      case 'sell': return 'bg-red-500/20 text-red-400 border-red-500'
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
    }
  }

  const getStrengthColor = (strength: number) => {
    if (strength >= 75) return 'text-green-400'
    if (strength >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getAlignmentColor = (alignment: string) => {
    switch(alignment) {
      case 'bullish': return 'text-green-400'
      case 'bearish': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Clock className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-white">Multi-Timeframe Analysis</h2>
          <Badge variant="outline" className="border-purple-500 text-purple-400">
            {selectedTimeframes.length} Timeframes
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={alignmentView ? "default" : "outline"}
            onClick={() => setAlignmentView(!alignmentView)}
            className={alignmentView ? 'bg-orange-500 hover:bg-orange-600' : 'border-gray-700'}
          >
            <Layers className="h-4 w-4 mr-2" />
            Alignment View
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Timeframe Selection */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Primary Timeframe</label>
              <Select value={primaryTimeframe} onValueChange={setPrimaryTimeframe}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {timeframes.map(tf => (
                    <SelectItem key={tf} value={tf} className="text-white">{tf}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Active Timeframes</label>
              <div className="flex flex-wrap gap-2">
                {timeframes.map(tf => (
                  <Button
                    key={tf}
                    size="sm"
                    variant={selectedTimeframes.includes(tf) ? "default" : "outline"}
                    onClick={() => {
                      setSelectedTimeframes(prev => 
                        prev.includes(tf) 
                          ? prev.filter(t => t !== tf)
                          : [...prev, tf]
                      )
                    }}
                    className={`text-xs ${
                      selectedTimeframes.includes(tf) 
                        ? 'bg-orange-500 hover:bg-orange-600' 
                        : 'border-gray-700 hover:bg-gray-800'
                    }`}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trend Alignment Dashboard */}
      {alignmentView && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center space-x-2">
              <Layers className="h-5 w-5 text-orange-500" />
              <span>Trend Alignment Analysis</span>
              <Badge variant="outline" className={`border-${trendAlignment.conflictLevel === 'high' ? 'red' : 'yellow'}-500 text-${trendAlignment.conflictLevel === 'high' ? 'red' : 'yellow'}-400`}>
                {trendAlignment.conflictLevel.toUpperCase()} CONFLICT
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Short Term</div>
                      <div className={`text-lg font-semibold ${getAlignmentColor(trendAlignment.alignment.shortTerm)}`}>
                        {trendAlignment.alignment.shortTerm.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-400">1m, 5m, 15m</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Activity className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Medium Term</div>
                      <div className={`text-lg font-semibold ${getAlignmentColor(trendAlignment.alignment.mediumTerm)}`}>
                        {trendAlignment.alignment.mediumTerm.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-400">1h, 4h</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Long Term</div>
                      <div className={`text-lg font-semibold ${getAlignmentColor(trendAlignment.alignment.longTerm)}`}>
                        {trendAlignment.alignment.longTerm.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-400">1d, 1w</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Target className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Overall</div>
                      <div className={`text-lg font-semibold ${getAlignmentColor(trendAlignment.alignment.overall)}`}>
                        {trendAlignment.alignment.overall.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-400">All timeframes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alignment Matrix */}
            <div className="grid grid-cols-7 gap-2">
              <div className="text-sm font-medium text-gray-400 p-2">Timeframe</div>
              <div className="text-sm font-medium text-gray-400 p-2">Trend</div>
              <div className="text-sm font-medium text-gray-400 p-2">Strength</div>
              <div className="text-sm font-medium text-gray-400 p-2">RSI</div>
              <div className="text-sm font-medium text-gray-400 p-2">MACD</div>
              <div className="text-sm font-medium text-gray-400 p-2">Signal</div>
              <div className="text-sm font-medium text-gray-400 p-2">Confidence</div>

              {selectedTimeframes.map(tf => {
                const analysis = multiTimeframeAnalysis[tf as keyof typeof multiTimeframeAnalysis]
                return (
                  <div key={tf} className="contents">
                    <div className="p-2 bg-gray-800/50 rounded text-sm font-medium text-white">{tf}</div>
                    <div className={`p-2 bg-gray-800/50 rounded text-sm flex items-center space-x-1`}>
                      {getTrendIcon(analysis.trend)}
                      <span className={getTrendColor(analysis.trend)}>{analysis.trend}</span>
                    </div>
                    <div className="p-2 bg-gray-800/50 rounded text-sm">
                      <span className={getStrengthColor(analysis.strength)}>{analysis.strength}%</span>
                    </div>
                    <div className="p-2 bg-gray-800/50 rounded text-sm text-white">{analysis.rsi}</div>
                    <div className={`p-2 bg-gray-800/50 rounded text-sm ${getTrendColor(analysis.macd)}`}>
                      {analysis.macd}
                    </div>
                    <div className="p-2 bg-gray-800/50 rounded">
                      <Badge variant="outline" className={`${getSignalColor(analysis.signal)} text-xs`}>
                        {analysis.signal.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className={`p-2 bg-gray-800/50 rounded text-sm ${
                      analysis.confidence >= 75 ? 'text-green-400' : 
                      analysis.confidence >= 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {analysis.confidence}%
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Multi-Timeframe Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {selectedTimeframes.slice(0, 4).map(timeframe => (
          <Card key={timeframe} className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                <span>{timeframe} Timeframe</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                {getTrendIcon(multiTimeframeAnalysis[timeframe as keyof typeof multiTimeframeAnalysis].trend)}
                <Badge 
                  variant="outline" 
                  className={getSignalColor(multiTimeframeAnalysis[timeframe as keyof typeof multiTimeframeAnalysis].signal)}
                >
                  {multiTimeframeAnalysis[timeframe as keyof typeof multiTimeframeAnalysis].signal.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={timeframeData[timeframe]} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <XAxis 
                      dataKey="time" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#9CA3AF' }}
                      interval="preserveStartEnd"
                    />
                    <YAxis 
                      yAxisId="price"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#9CA3AF' }}
                      orientation="right"
                    />
                    {showRSI && (
                      <YAxis 
                        yAxisId="rsi"
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#9CA3AF' }}
                        orientation="left"
                      />
                    )}
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#F9FAFB'
                      }}
                    />
                    
                    {/* Price Line */}
                    <Line 
                      yAxisId="price"
                      type="monotone" 
                      dataKey="price" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      dot={false}
                    />

                    {/* Moving Averages */}
                    <Line 
                      yAxisId="price"
                      type="monotone" 
                      dataKey="sma20" 
                      stroke="#10B981" 
                      strokeWidth={1}
                      dot={false}
                      strokeDasharray="3 3"
                    />
                    <Line 
                      yAxisId="price"
                      type="monotone" 
                      dataKey="ema50" 
                      stroke="#3B82F6" 
                      strokeWidth={1}
                      dot={false}
                      strokeDasharray="5 5"
                    />

                    {/* RSI */}
                    {showRSI && (
                      <Line 
                        yAxisId="rsi"
                        type="monotone" 
                        dataKey="rsi" 
                        stroke="#8B5CF6" 
                        strokeWidth={1}
                        dot={false}
                        opacity={0.7}
                      />
                    )}

                    {/* Volume */}
                    <Bar 
                      yAxisId="price"
                      dataKey="volume" 
                      fill="#374151" 
                      opacity={0.3}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Timeframe Analysis Summary */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-gray-800/50 rounded">
                  <div className="text-gray-400">Trend Strength</div>
                  <div className={`font-semibold ${getStrengthColor(multiTimeframeAnalysis[timeframe as keyof typeof multiTimeframeAnalysis].strength)}`}>
                    {multiTimeframeAnalysis[timeframe as keyof typeof multiTimeframeAnalysis].strength}%
                  </div>
                </div>
                <div className="p-2 bg-gray-800/50 rounded">
                  <div className="text-gray-400">RSI</div>
                  <div className="font-semibold text-white">
                    {multiTimeframeAnalysis[timeframe as keyof typeof multiTimeframeAnalysis].rsi}
                  </div>
                </div>
                <div className="p-2 bg-gray-800/50 rounded">
                  <div className="text-gray-400">Volume</div>
                  <div className={`font-semibold ${
                    multiTimeframeAnalysis[timeframe as keyof typeof multiTimeframeAnalysis].volume === 'high' ? 'text-green-400' :
                    multiTimeframeAnalysis[timeframe as keyof typeof multiTimeframeAnalysis].volume === 'normal' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {multiTimeframeAnalysis[timeframe as keyof typeof multiTimeframeAnalysis].volume}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary & Recommendations */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <Target className="h-5 w-5 text-orange-500" />
            <span>Multi-Timeframe Summary & Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Short-Term Outlook</h4>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className={`text-sm ${getAlignmentColor(trendAlignment.alignment.shortTerm)}`}>
                  {trendAlignment.alignment.shortTerm.toUpperCase()} TREND
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Strong alignment across 1m, 5m, and 15m timeframes suggests good short-term momentum.
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">Medium-Term Outlook</h4>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className={`text-sm ${getAlignmentColor(trendAlignment.alignment.mediumTerm)}`}>
                  {trendAlignment.alignment.mediumTerm.toUpperCase()} TREND
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Mixed signals on 1h and 4h timeframes indicate potential consolidation.
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">Long-Term Outlook</h4>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className={`text-sm ${getAlignmentColor(trendAlignment.alignment.longTerm)}`}>
                  {trendAlignment.alignment.longTerm.toUpperCase()} TREND
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Daily and weekly charts show bearish bias, suggesting caution for long-term positions.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <span className="font-semibold text-orange-400">Trading Recommendation</span>
            </div>
            <div className="text-sm text-gray-300">
              <strong>Current Situation:</strong> Mixed timeframe signals with short-term bullish momentum conflicting with long-term bearish trend.
              <br />
              <strong>Recommendation:</strong> Consider short-term trades on lower timeframes while being cautious of overall bearish sentiment. 
              Risk management is crucial given the high conflict level between timeframes.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
