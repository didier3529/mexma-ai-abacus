
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  TrendingUp, 
  TrendingDown,
  Target, 
  Layers,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, ScatterChart, Scatter, ComposedChart } from 'recharts'

// Mock data for support/resistance levels
const generatePriceData = () => {
  const data = []
  const basePrice = 43000
  let currentPrice = basePrice
  
  for (let i = 0; i < 100; i++) {
    const change = (Math.random() - 0.5) * 800
    currentPrice = currentPrice + change
    
    data.push({
      time: new Date(Date.now() - (99 - i) * 3600000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      price: Math.round(currentPrice),
      volume: Math.random() * 1000000 + 500000,
      timestamp: Date.now() - (99 - i) * 3600000
    })
  }
  
  return data
}

const priceData = generatePriceData()
const currentPrice = priceData[priceData.length - 1]?.price || 43000

// Generate support/resistance levels
const supportResistanceLevels = [
  {
    id: 'R3',
    type: 'resistance',
    price: currentPrice + 1200,
    strength: 95,
    touches: 8,
    lastTouch: '2h ago',
    status: 'strong',
    description: 'Major resistance zone'
  },
  {
    id: 'R2',
    type: 'resistance',
    price: currentPrice + 800,
    strength: 78,
    touches: 5,
    lastTouch: '45m ago',
    status: 'moderate',
    description: 'Previous high resistance'
  },
  {
    id: 'R1',
    type: 'resistance',
    price: currentPrice + 400,
    strength: 62,
    touches: 3,
    lastTouch: '1h ago',
    status: 'weak',
    description: 'Near-term resistance'
  },
  {
    id: 'S1',
    type: 'support',
    price: currentPrice - 300,
    strength: 85,
    touches: 6,
    lastTouch: '30m ago',
    status: 'strong',
    description: 'Key support level'
  },
  {
    id: 'S2',
    type: 'support',
    price: currentPrice - 700,
    strength: 72,
    touches: 4,
    lastTouch: '1.5h ago',
    status: 'moderate',
    description: 'Major support zone'
  },
  {
    id: 'S3',
    type: 'support',
    price: currentPrice - 1100,
    strength: 88,
    touches: 7,
    lastTouch: '3h ago',
    status: 'strong',
    description: 'Historical support'
  }
]

const pivotPoints = {
  classic: {
    PP: currentPrice,
    R1: currentPrice + 267,
    R2: currentPrice + 534,
    R3: currentPrice + 801,
    S1: currentPrice - 267,
    S2: currentPrice - 534,
    S3: currentPrice - 801
  },
  fibonacci: {
    PP: currentPrice,
    R1: currentPrice + 161,
    R2: currentPrice + 261,
    R3: currentPrice + 423,
    S1: currentPrice - 161,
    S2: currentPrice - 261,
    S3: currentPrice - 423
  },
  camarilla: {
    PP: currentPrice,
    R1: currentPrice + 89,
    R2: currentPrice + 178,
    R3: currentPrice + 267,
    R4: currentPrice + 356,
    S1: currentPrice - 89,
    S2: currentPrice - 178,
    S3: currentPrice - 267,
    S4: currentPrice - 356
  }
}

export default function SupportResistanceAnalysis() {
  const [selectedMethod, setSelectedMethod] = useState('automatic')
  const [selectedPivotType, setSelectedPivotType] = useState('classic')
  const [showTrendLines, setShowTrendLines] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h')

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'text-green-400'
    if (strength >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStrengthBadge = (strength: number) => {
    if (strength >= 80) return 'Strong'
    if (strength >= 60) return 'Moderate'
    return 'Weak'
  }

  const getStrengthBadgeColor = (strength: number) => {
    if (strength >= 80) return 'bg-green-500/20 text-green-400 border-green-500'
    if (strength >= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
    return 'bg-red-500/20 text-red-400 border-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Target className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-white">Support & Resistance Analysis</h2>
          <Badge variant="outline" className="border-green-500 text-green-400">
            Auto-Detection Active
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
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

      {/* Controls */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Detection Method</label>
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="automatic" className="text-white">Automatic Detection</SelectItem>
                  <SelectItem value="manual" className="text-white">Manual Drawing</SelectItem>
                  <SelectItem value="pivot-points" className="text-white">Pivot Points</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Timeframe</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="15m" className="text-white">15 Minutes</SelectItem>
                  <SelectItem value="1h" className="text-white">1 Hour</SelectItem>
                  <SelectItem value="4h" className="text-white">4 Hours</SelectItem>
                  <SelectItem value="1d" className="text-white">1 Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Pivot Type</label>
              <Select value={selectedPivotType} onValueChange={setSelectedPivotType}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="classic" className="text-white">Classic</SelectItem>
                  <SelectItem value="fibonacci" className="text-white">Fibonacci</SelectItem>
                  <SelectItem value="camarilla" className="text-white">Camarilla</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Chart with S/R Levels */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg text-white">Price Chart with Support & Resistance Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={priceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={['dataMin - 200', 'dataMax + 200']}
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
                
                {/* Price Line */}
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  dot={false}
                />

                {/* Support Lines */}
                {supportResistanceLevels
                  .filter(level => level.type === 'support')
                  .map(level => (
                    <ReferenceLine 
                      key={level.id}
                      y={level.price} 
                      stroke="#10B981" 
                      strokeWidth={level.strength >= 80 ? 3 : level.strength >= 60 ? 2 : 1}
                      strokeDasharray={level.strength >= 80 ? "0" : "5 5"}
                      label={{ 
                        value: `${level.id}: $${level.price.toLocaleString()}`, 
                        fill: "#10B981",
                        fontSize: 10
                      }}
                    />
                  ))}

                {/* Resistance Lines */}
                {supportResistanceLevels
                  .filter(level => level.type === 'resistance')
                  .map(level => (
                    <ReferenceLine 
                      key={level.id}
                      y={level.price} 
                      stroke="#EF4444" 
                      strokeWidth={level.strength >= 80 ? 3 : level.strength >= 60 ? 2 : 1}
                      strokeDasharray={level.strength >= 80 ? "0" : "5 5"}
                      label={{ 
                        value: `${level.id}: $${level.price.toLocaleString()}`, 
                        fill: "#EF4444",
                        fontSize: 10
                      }}
                    />
                  ))}

                {/* Current Price Line */}
                <ReferenceLine 
                  y={currentPrice} 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={{ 
                    value: `Current: $${currentPrice.toLocaleString()}`, 
                    fill: "#F59E0B",
                    fontSize: 10
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support/Resistance Levels Table */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center space-x-2">
              <Layers className="h-5 w-5 text-orange-500" />
              <span>Detected Levels</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {supportResistanceLevels.map(level => (
                <div key={level.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      level.type === 'resistance' 
                        ? 'bg-red-500/20' 
                        : 'bg-green-500/20'
                    }`}>
                      {level.type === 'resistance' ? (
                        <TrendingUp className="h-4 w-4 text-red-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                    <div>
                      <div className={`font-semibold ${
                        level.type === 'resistance' ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {level.id}: ${level.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">{level.description}</div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <Badge 
                      variant="outline" 
                      className={getStrengthBadgeColor(level.strength)}
                    >
                      {getStrengthBadge(level.strength)}
                    </Badge>
                    <div className="text-xs text-gray-400">
                      {level.touches} touches • {level.lastTouch}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pivot Points */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-500" />
              <span>Pivot Points ({selectedPivotType.charAt(0).toUpperCase() + selectedPivotType.slice(1)})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(pivotPoints[selectedPivotType as keyof typeof pivotPoints]).map(([key, value]) => {
                const isResistance = key.startsWith('R')
                const isSupport = key.startsWith('S')
                const isPivot = key === 'PP'
                const distance = Math.abs(value - currentPrice)
                const distancePercent = ((distance / currentPrice) * 100).toFixed(2)
                
                return (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isPivot 
                          ? 'bg-orange-500/20' 
                          : isResistance 
                            ? 'bg-red-500/20' 
                            : 'bg-green-500/20'
                      }`}>
                        {isPivot ? (
                          <Target className="h-4 w-4 text-orange-400" />
                        ) : isResistance ? (
                          <TrendingUp className="h-4 w-4 text-red-400" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <div>
                        <div className={`font-semibold ${
                          isPivot 
                            ? 'text-orange-400' 
                            : isResistance 
                              ? 'text-red-400' 
                              : 'text-green-400'
                        }`}>
                          {key}: ${Math.round(value).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {distance > 100 ? `${distancePercent}% away` : 'Near current price'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {Math.abs(value - currentPrice) < 500 && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Key Level
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Strong Support</div>
                <div className="text-lg font-semibold text-green-400">
                  {supportResistanceLevels.filter(l => l.type === 'support' && l.strength >= 80).length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Strong Resistance</div>
                <div className="text-lg font-semibold text-red-400">
                  {supportResistanceLevels.filter(l => l.type === 'resistance' && l.strength >= 80).length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Target className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Nearest Level</div>
                <div className="text-lg font-semibold text-orange-400">
                  ${Math.min(...supportResistanceLevels.map(l => Math.abs(l.price - currentPrice))).toFixed(0)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Layers className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Levels</div>
                <div className="text-lg font-semibold text-blue-400">
                  {supportResistanceLevels.length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
