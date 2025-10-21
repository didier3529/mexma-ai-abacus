
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Search,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BarChart3,
  Activity,
  Bell,
  Settings
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, ComposedChart, Bar, Area } from 'recharts'

// Mock pattern data
const chartPatterns = [
  {
    id: 'hs1',
    name: 'Head & Shoulders',
    type: 'reversal',
    confidence: 87,
    timeframe: '4h',
    status: 'confirmed',
    direction: 'bearish',
    target: 41200,
    stopLoss: 44800,
    formation: 'complete',
    detectedAt: '2h ago',
    description: 'Classic bearish reversal pattern with clear neckline break',
    successRate: 72
  },
  {
    id: 'flag1',
    name: 'Bull Flag',
    type: 'continuation',
    confidence: 92,
    timeframe: '1h',
    status: 'forming',
    direction: 'bullish',
    target: 45500,
    stopLoss: 42800,
    formation: 'in-progress',
    detectedAt: '45m ago',
    description: 'Strong bullish continuation pattern after significant upward move',
    successRate: 78
  },
  {
    id: 'triangle1',
    name: 'Ascending Triangle',
    type: 'continuation',
    confidence: 74,
    timeframe: '2h',
    status: 'forming',
    direction: 'bullish',
    target: 44800,
    stopLoss: 42300,
    formation: 'in-progress',
    detectedAt: '1.5h ago',
    description: 'Bullish triangle pattern with horizontal resistance',
    successRate: 68
  },
  {
    id: 'wedge1',
    name: 'Falling Wedge',
    type: 'reversal',
    confidence: 81,
    timeframe: '6h',
    status: 'confirmed',
    direction: 'bullish',
    target: 46200,
    stopLoss: 41800,
    formation: 'complete',
    detectedAt: '3h ago',
    description: 'Bullish reversal pattern with decreasing volume',
    successRate: 75
  }
]

const candlestickPatterns = [
  {
    id: 'doji1',
    name: 'Doji',
    type: 'reversal',
    confidence: 65,
    timeframe: '1h',
    status: 'active',
    direction: 'neutral',
    significance: 'medium',
    detectedAt: '15m ago',
    description: 'Indecision pattern suggesting potential reversal',
    location: 'resistance'
  },
  {
    id: 'hammer1',
    name: 'Hammer',
    type: 'reversal',
    confidence: 89,
    timeframe: '4h',
    status: 'confirmed',
    direction: 'bullish',
    significance: 'high',
    detectedAt: '2h ago',
    description: 'Strong bullish reversal signal at support level',
    location: 'support'
  },
  {
    id: 'engulf1',
    name: 'Bullish Engulfing',
    type: 'reversal',
    confidence: 83,
    timeframe: '1h',
    status: 'active',
    direction: 'bullish',
    significance: 'high',
    detectedAt: '30m ago',
    description: 'Two-candle bullish reversal pattern',
    location: 'support'
  },
  {
    id: 'star1',
    name: 'Evening Star',
    type: 'reversal',
    confidence: 77,
    timeframe: '2h',
    status: 'forming',
    direction: 'bearish',
    significance: 'medium',
    detectedAt: '1h ago',
    description: 'Three-candle bearish reversal pattern',
    location: 'resistance'
  }
]

// Mock price data for pattern visualization
const generatePatternData = () => {
  const data = []
  const basePrice = 43000
  
  // Generate head and shoulders pattern
  for (let i = 0; i < 50; i++) {
    let price = basePrice
    
    if (i < 10) {
      // Left shoulder
      price = basePrice + Math.sin(i * 0.3) * 400 + 200
    } else if (i < 25) {
      // Head formation
      price = basePrice + Math.sin((i - 10) * 0.2) * 800 + 400
    } else if (i < 40) {
      // Right shoulder
      price = basePrice + Math.sin((i - 25) * 0.3) * 400 + 200
    } else {
      // Breakdown
      price = basePrice - (i - 40) * 50 + Math.random() * 200
    }
    
    data.push({
      time: new Date(Date.now() - (49 - i) * 3600000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      price: Math.round(price + Math.random() * 100 - 50),
      volume: Math.random() * 1000000 + 500000,
      patternZone: i >= 10 && i <= 35 ? 'pattern' : null
    })
  }
  
  return data
}

const patternData = generatePatternData()

export default function PatternRecognition() {
  const [selectedCategory, setSelectedCategory] = useState('chart-patterns')
  const [selectedTimeframe, setSelectedTimeframe] = useState('all')
  const [confidenceFilter, setConfidenceFilter] = useState('all')
  const [selectedPattern, setSelectedPattern] = useState(chartPatterns[0])

  const getPatternColor = (direction: string) => {
    switch(direction) {
      case 'bullish': return 'text-green-400'
      case 'bearish': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getPatternBadgeColor = (direction: string) => {
    switch(direction) {
      case 'bullish': return 'bg-green-500/20 text-green-400 border-green-500'
      case 'bearish': return 'bg-red-500/20 text-red-400 border-red-500'
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'forming': return <Clock className="h-4 w-4 text-yellow-400" />
      case 'active': return <Activity className="h-4 w-4 text-blue-400" />
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  const filteredChartPatterns = chartPatterns.filter(pattern => {
    const timeframeMatch = selectedTimeframe === 'all' || pattern.timeframe === selectedTimeframe
    const confidenceMatch = confidenceFilter === 'all' || 
      (confidenceFilter === 'high' && pattern.confidence >= 80) ||
      (confidenceFilter === 'medium' && pattern.confidence >= 60 && pattern.confidence < 80) ||
      (confidenceFilter === 'low' && pattern.confidence < 60)
    
    return timeframeMatch && confidenceMatch
  })

  const filteredCandlestickPatterns = candlestickPatterns.filter(pattern => {
    const timeframeMatch = selectedTimeframe === 'all' || pattern.timeframe === selectedTimeframe
    const confidenceMatch = confidenceFilter === 'all' || 
      (confidenceFilter === 'high' && pattern.confidence >= 80) ||
      (confidenceFilter === 'medium' && pattern.confidence >= 60 && pattern.confidence < 80) ||
      (confidenceFilter === 'low' && pattern.confidence < 60)
    
    return timeframeMatch && confidenceMatch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Search className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-white">Pattern Recognition</h2>
          <Badge variant="outline" className="border-green-500 text-green-400">
            AI-Powered Detection
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-gray-700">
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Timeframe</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white">All Timeframes</SelectItem>
                  <SelectItem value="1h" className="text-white">1 Hour</SelectItem>
                  <SelectItem value="2h" className="text-white">2 Hours</SelectItem>
                  <SelectItem value="4h" className="text-white">4 Hours</SelectItem>
                  <SelectItem value="6h" className="text-white">6 Hours</SelectItem>
                  <SelectItem value="1d" className="text-white">1 Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Confidence Level</label>
              <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white">All Levels</SelectItem>
                  <SelectItem value="high" className="text-white">High (80%+)</SelectItem>
                  <SelectItem value="medium" className="text-white">Medium (60-79%)</SelectItem>
                  <SelectItem value="low" className="text-white">Low (&lt;60%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Pattern Category</label>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={selectedCategory === 'chart-patterns' ? "default" : "outline"}
                  onClick={() => setSelectedCategory('chart-patterns')}
                  className={selectedCategory === 'chart-patterns' ? 'bg-orange-500 hover:bg-orange-600' : 'border-gray-700'}
                >
                  Chart Patterns
                </Button>
                <Button
                  size="sm"
                  variant={selectedCategory === 'candlestick' ? "default" : "outline"}
                  onClick={() => setSelectedCategory('candlestick')}
                  className={selectedCategory === 'candlestick' ? 'bg-orange-500 hover:bg-orange-600' : 'border-gray-700'}
                >
                  Candlestick
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pattern List */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                <span>Detected Patterns</span>
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  {selectedCategory === 'chart-patterns' ? filteredChartPatterns.length : filteredCandlestickPatterns.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedCategory === 'chart-patterns' ? (
                  filteredChartPatterns.map(pattern => (
                    <div 
                      key={pattern.id}
                      onClick={() => setSelectedPattern(pattern)}
                      className={`p-3 bg-gray-800/50 rounded-lg cursor-pointer transition-all hover:bg-gray-700/50 ${
                        selectedPattern.id === pattern.id ? 'ring-2 ring-orange-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(pattern.status)}
                          <span className="font-medium text-white">{pattern.name}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={getPatternBadgeColor(pattern.direction)}
                        >
                          {pattern.direction}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{pattern.timeframe}</span>
                        <span className={`font-semibold ${
                          pattern.confidence >= 80 ? 'text-green-400' : 
                          pattern.confidence >= 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {pattern.confidence}%
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-400 mt-1">
                        {pattern.detectedAt} • {pattern.formation}
                      </div>
                    </div>
                  ))
                ) : (
                  filteredCandlestickPatterns.map(pattern => (
                    <div key={pattern.id} className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(pattern.status)}
                          <span className="font-medium text-white">{pattern.name}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={getPatternBadgeColor(pattern.direction)}
                        >
                          {pattern.direction}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{pattern.timeframe}</span>
                        <span className={`font-semibold ${
                          pattern.confidence >= 80 ? 'text-green-400' : 
                          pattern.confidence >= 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {pattern.confidence}%
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-400 mt-1">
                        {pattern.detectedAt} • {pattern.location}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pattern Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  <span>{selectedPattern.name} Pattern</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={getPatternBadgeColor(selectedPattern.direction)}
                >
                  {selectedPattern.confidence}% Confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Type</div>
                    <div className="text-white font-semibold">{selectedPattern.type}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Status</div>
                    <div className={getPatternColor(selectedPattern.direction)}>
                      {selectedPattern.status}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Target</div>
                    <div className="text-white font-semibold">
                      ${selectedPattern.target?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Success Rate</div>
                    <div className="text-white font-semibold">
                      {selectedPattern.successRate || 'N/A'}%
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-300">
                  {selectedPattern.description}
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={patternData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <XAxis 
                      dataKey="time" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#9CA3AF' }}
                      interval="preserveStartEnd"
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#9CA3AF' }}
                      orientation="right"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#F9FAFB'
                      }}
                    />
                    
                    {/* Pattern Highlight Area */}
                    <Area
                      type="monotone"
                      dataKey="patternZone"
                      fill="#F59E0B"
                      fillOpacity={0.1}
                      stroke="none"
                    />
                    
                    {/* Price Line */}
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      dot={false}
                    />

                    {/* Target and Stop Loss Lines */}
                    <ReferenceLine 
                      y={selectedPattern.target} 
                      stroke="#10B981" 
                      strokeDasharray="5 5"
                      label={{ value: "Target", fill: "#10B981" }}
                    />
                    <ReferenceLine 
                      y={selectedPattern.stopLoss} 
                      stroke="#EF4444" 
                      strokeDasharray="5 5"
                      label={{ value: "Stop Loss", fill: "#EF4444" }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pattern Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Bullish Patterns</div>
                <div className="text-lg font-semibold text-green-400">
                  {selectedCategory === 'chart-patterns' 
                    ? filteredChartPatterns.filter(p => p.direction === 'bullish').length
                    : filteredCandlestickPatterns.filter(p => p.direction === 'bullish').length
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Bearish Patterns</div>
                <div className="text-lg font-semibold text-red-400">
                  {selectedCategory === 'chart-patterns' 
                    ? filteredChartPatterns.filter(p => p.direction === 'bearish').length
                    : filteredCandlestickPatterns.filter(p => p.direction === 'bearish').length
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">High Confidence</div>
                <div className="text-lg font-semibold text-orange-400">
                  {selectedCategory === 'chart-patterns' 
                    ? filteredChartPatterns.filter(p => p.confidence >= 80).length
                    : filteredCandlestickPatterns.filter(p => p.confidence >= 80).length
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Active Patterns</div>
                <div className="text-lg font-semibold text-blue-400">
                  {selectedCategory === 'chart-patterns' 
                    ? filteredChartPatterns.filter(p => p.status === 'forming' || p.status === 'active').length
                    : filteredCandlestickPatterns.filter(p => p.status === 'forming' || p.status === 'active').length
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
