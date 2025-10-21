
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Target,
  TrendingUp,
  TrendingDown,
  Clock,
  Settings,
  RefreshCw,
  Layers,
  Activity,
  Zap
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, ComposedChart, Area } from 'recharts'

// Mock data for Fibonacci analysis
const generateFibData = () => {
  const data = []
  const swingHigh = 45000
  const swingLow = 41000
  const range = swingHigh - swingLow
  
  // Generate price movement with Fibonacci levels
  for (let i = 0; i < 80; i++) {
    let price
    if (i < 20) {
      // Uptrend to swing high
      price = swingLow + (range * (i / 20)) + Math.random() * 200 - 100
    } else if (i < 60) {
      // Retracement
      const retracementProgress = (i - 20) / 40
      price = swingHigh - (range * 0.618 * retracementProgress) + Math.random() * 150 - 75
    } else {
      // Extension beyond swing high
      const extensionProgress = (i - 60) / 20
      price = swingHigh + (range * 0.618 * extensionProgress) + Math.random() * 100 - 50
    }
    
    data.push({
      time: new Date(Date.now() - (79 - i) * 3600000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      price: Math.round(price),
      volume: Math.random() * 1000000 + 500000,
      swingHigh: i >= 20 ? swingHigh : null,
      swingLow: i >= 0 ? swingLow : null
    })
  }
  
  return data
}

const fibData = generateFibData()
const swingHigh = 45000
const swingLow = 41000
const range = swingHigh - swingLow

// Fibonacci levels
const fibonacciLevels = {
  retracement: [
    { level: 0, value: swingHigh, label: '0.0% (Swing High)', color: '#EF4444' },
    { level: 23.6, value: swingHigh - (range * 0.236), label: '23.6%', color: '#F59E0B' },
    { level: 38.2, value: swingHigh - (range * 0.382), label: '38.2%', color: '#EAB308' },
    { level: 50.0, value: swingHigh - (range * 0.5), label: '50.0%', color: '#22C55E' },
    { level: 61.8, value: swingHigh - (range * 0.618), label: '61.8%', color: '#3B82F6' },
    { level: 78.6, value: swingHigh - (range * 0.786), label: '78.6%', color: '#8B5CF6' },
    { level: 100, value: swingLow, label: '100% (Swing Low)', color: '#10B981' }
  ],
  extension: [
    { level: 0, value: swingHigh, label: '0.0% (Swing High)', color: '#EF4444' },
    { level: 127.2, value: swingHigh + (range * 0.272), label: '127.2%', color: '#F59E0B' },
    { level: 138.2, value: swingHigh + (range * 0.382), label: '138.2%', color: '#EAB308' },
    { level: 150.0, value: swingHigh + (range * 0.5), label: '150.0%', color: '#22C55E' },
    { level: 161.8, value: swingHigh + (range * 0.618), label: '161.8%', color: '#3B82F6' },
    { level: 200.0, value: swingHigh + (range * 1.0), label: '200.0%', color: '#8B5CF6' },
    { level: 261.8, value: swingHigh + (range * 1.618), label: '261.8%', color: '#EC4899' }
  ]
}

// Time zones (mock data)
const fibTimeZones = [
  { period: 1, date: '12:00', description: 'T1 - Initial signal' },
  { period: 2, date: '14:00', description: 'T2 - Confirmation' },
  { period: 3, date: '17:00', description: 'T3 - Next level' },
  { period: 5, date: '22:00', description: 'T5 - Key zone' },
  { period: 8, date: '06:00', description: 'T8 - Major target' },
  { period: 13, date: '19:00', description: 'T13 - Long-term' }
]

export default function FibonacciTools() {
  const [selectedTool, setSelectedTool] = useState('retracement')
  const [selectedTimeframe, setSelectedTimeframe] = useState('4h')
  const [showLabels, setShowLabels] = useState(true)
  const [autoDetect, setAutoDetect] = useState(true)

  const currentPrice = fibData[fibData.length - 1]?.price || 43000
  
  const getCurrentFibLevel = () => {
    const levels = fibonacciLevels.retracement
    for (let i = 0; i < levels.length - 1; i++) {
      if (currentPrice <= levels[i].value && currentPrice >= levels[i + 1].value) {
        return levels[i + 1]
      }
    }
    return levels[levels.length - 1]
  }

  const currentFibLevel = getCurrentFibLevel()
  const nextResistance = fibonacciLevels.retracement.find(level => level.value > currentPrice)
  const nextSupport = fibonacciLevels.retracement.slice().reverse().find(level => level.value < currentPrice)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Target className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-white">Fibonacci Analysis Tools</h2>
          <Badge variant="outline" className="border-blue-500 text-blue-400">
            Interactive Tools
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-gray-700">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recalculate
          </Button>
        </div>
      </div>

      {/* Tool Selection & Controls */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Fibonacci Tool</label>
              <Select value={selectedTool} onValueChange={setSelectedTool}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="retracement" className="text-white">Retracement</SelectItem>
                  <SelectItem value="extension" className="text-white">Extension</SelectItem>
                  <SelectItem value="time-zones" className="text-white">Time Zones</SelectItem>
                  <SelectItem value="arcs" className="text-white">Fibonacci Arcs</SelectItem>
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
                  <SelectItem value="1h" className="text-white">1 Hour</SelectItem>
                  <SelectItem value="4h" className="text-white">4 Hours</SelectItem>
                  <SelectItem value="1d" className="text-white">1 Day</SelectItem>
                  <SelectItem value="1w" className="text-white">1 Week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Options</label>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={autoDetect ? "default" : "outline"}
                  onClick={() => setAutoDetect(!autoDetect)}
                  className={autoDetect ? 'bg-orange-500 hover:bg-orange-600' : 'border-gray-700'}
                >
                  Auto Detect
                </Button>
                <Button
                  size="sm"
                  variant={showLabels ? "default" : "outline"}
                  onClick={() => setShowLabels(!showLabels)}
                  className={showLabels ? 'bg-orange-500 hover:bg-orange-600' : 'border-gray-700'}
                >
                  Labels
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Current Level</label>
              <div className="text-lg font-bold" style={{ color: currentFibLevel.color }}>
                {currentFibLevel.label}
              </div>
              <div className="text-sm text-gray-400">
                ${currentFibLevel.value.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fibonacci Chart */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center space-x-2">
                <Activity className="h-5 w-5 text-orange-500" />
                <span>Fibonacci {selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)} Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={fibData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <XAxis 
                      dataKey="time" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#9CA3AF' }}
                      interval="preserveStartEnd"
                    />
                    <YAxis 
                      domain={[
                        selectedTool === 'extension' ? 'dataMin' : swingLow - 500,
                        selectedTool === 'extension' ? swingHigh + range : swingHigh + 500
                      ]}
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

                    {/* Fibonacci Levels */}
                    {(selectedTool === 'retracement' ? fibonacciLevels.retracement : fibonacciLevels.extension).map(level => (
                      <ReferenceLine 
                        key={level.level}
                        y={level.value} 
                        stroke={level.color} 
                        strokeWidth={level.level === 61.8 || level.level === 38.2 ? 2 : 1}
                        strokeDasharray={level.level === 0 || level.level === 100 ? "0" : "3 3"}
                        label={showLabels ? { 
                          value: level.label, 
                          fill: level.color,
                          fontSize: 10
                        } : undefined}
                      />
                    ))}

                    {/* Fibonacci zones (areas between key levels) */}
                    {selectedTool === 'retracement' && (
                      <>
                        <Area
                          type="monotone"
                          dataKey={() => fibonacciLevels.retracement[3].value} // 50%
                          fill="#22C55E"
                          fillOpacity={0.05}
                          stroke="none"
                        />
                        <Area
                          type="monotone"
                          dataKey={() => fibonacciLevels.retracement[4].value} // 61.8%
                          fill="#3B82F6"
                          fillOpacity={0.05}
                          stroke="none"
                        />
                      </>
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fibonacci Levels & Analysis */}
        <div>
          <Tabs defaultValue="levels" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="levels" className="data-[state=active]:bg-orange-500">Levels</TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-orange-500">Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="levels" className="space-y-4">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center space-x-2">
                    <Layers className="h-5 w-5 text-orange-500" />
                    <span>Fibonacci Levels</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {(selectedTool === 'retracement' ? fibonacciLevels.retracement : fibonacciLevels.extension).map(level => {
                      const distance = Math.abs(level.value - currentPrice)
                      const isNear = distance < range * 0.05
                      
                      return (
                        <div key={level.level} className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: level.color }}
                            />
                            <div>
                              <div className="text-sm font-medium text-white">
                                {level.level}%
                              </div>
                              <div className="text-xs text-gray-400">
                                ${level.value.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            {isNear && (
                              <Badge variant="outline" className="border-yellow-500 text-yellow-400 text-xs">
                                Near
                              </Badge>
                            )}
                            <div className="text-xs text-gray-400 mt-1">
                              {distance < 1000 ? `$${distance.toFixed(0)}` : `$${(distance/1000).toFixed(1)}k`} away
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {selectedTool === 'time-zones' && (
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <span>Time Zones</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {fibTimeZones.map(zone => (
                        <div key={zone.period} className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                          <div>
                            <div className="text-sm font-medium text-white">
                              Period {zone.period}
                            </div>
                            <div className="text-xs text-gray-400">
                              {zone.description}
                            </div>
                          </div>
                          <div className="text-sm text-orange-400">
                            {zone.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="analysis" className="space-y-4">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                    <span>Key Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Next Support</span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      ${nextSupport?.value?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {nextSupport?.label} • ${Math.abs((nextSupport?.value || 0) - currentPrice).toFixed(0)} away
                    </div>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-4 w-4 text-red-400" />
                      <span className="text-sm font-medium text-red-400">Next Resistance</span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      ${nextResistance?.value?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {nextResistance?.label} • ${Math.abs((nextResistance?.value || 0) - currentPrice).toFixed(0)} away
                    </div>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="h-4 w-4 text-orange-400" />
                      <span className="text-sm font-medium text-orange-400">Current Position</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Price is trading at the <span style={{ color: currentFibLevel.color }}>
                        {currentFibLevel.label}
                      </span> Fibonacci level, suggesting{' '}
                      {currentFibLevel.level < 38.2 ? 'strong bullish momentum' :
                       currentFibLevel.level < 61.8 ? 'moderate retracement zone' :
                       'deep retracement - potential reversal area'}.
                    </div>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">Trading Signals</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-300">61.8% level: Strong support zone</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-300">38.2% level: Watch for bounce</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-300">Break below 78.6%: Bearish continuation</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Target className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Golden Ratio</div>
                <div className="text-lg font-semibold text-green-400">61.8%</div>
                <div className="text-xs text-gray-400">${fibonacciLevels.retracement[4].value.toLocaleString()}</div>
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
                <div className="text-sm text-gray-400">50% Retracement</div>
                <div className="text-lg font-semibold text-blue-400">50.0%</div>
                <div className="text-xs text-gray-400">${fibonacciLevels.retracement[3].value.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Extension Target</div>
                <div className="text-lg font-semibold text-orange-400">161.8%</div>
                <div className="text-xs text-gray-400">${fibonacciLevels.extension[4].value.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Clock className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Next Time Zone</div>
                <div className="text-lg font-semibold text-purple-400">T5</div>
                <div className="text-xs text-gray-400">22:00 target</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
