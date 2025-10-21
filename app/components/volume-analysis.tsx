
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  BarChart3,
  Activity,
  TrendingUp,
  TrendingDown,
  Volume2,
  Target,
  Layers,
  AlertTriangle,
  Settings,
  RefreshCw
} from 'lucide-react'
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, Area, AreaChart, LineChart } from 'recharts'

// Mock volume profile data
const generateVolumeData = () => {
  const data = []
  const basePrice = 43000
  let currentPrice = basePrice
  
  for (let i = 0; i < 100; i++) {
    const change = (Math.random() - 0.5) * 400
    currentPrice = currentPrice + change
    const volume = Math.random() * 2000000 + 500000
    const vwap = currentPrice + (Math.random() - 0.5) * 100
    const obv = (i * 1000000) + (Math.random() - 0.5) * 5000000
    const mfi = Math.random() * 100
    const ad = Math.random() * 1000000 - 500000
    
    data.push({
      time: new Date(Date.now() - (99 - i) * 3600000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      price: Math.round(currentPrice),
      volume: Math.round(volume),
      vwap: Math.round(vwap),
      obv: Math.round(obv),
      mfi: Math.round(mfi * 100) / 100,
      ad: Math.round(ad),
      avgVolume: 1200000,
      volumeRatio: volume / 1200000,
      timestamp: Date.now() - (99 - i) * 3600000
    })
  }
  
  return data
}

const volumeData = generateVolumeData()

// Volume profile levels (Point of Control, Value Area High/Low)
const volumeProfile = {
  poc: 43150, // Point of Control
  vah: 43800, // Value Area High
  val: 42500, // Value Area Low
  valueAreaPercent: 70
}

// Volume indicators analysis
const volumeIndicators = [
  {
    name: 'Volume Trend',
    value: 'Increasing',
    status: 'bullish',
    description: 'Volume has been consistently rising with price',
    confidence: 85
  },
  {
    name: 'Volume-Price Relationship',
    value: 'Confirming',
    status: 'bullish',
    description: 'Volume confirms the current price direction',
    confidence: 78
  },
  {
    name: 'Accumulation/Distribution',
    value: 'Accumulation',
    status: 'bullish',
    description: 'Smart money appears to be accumulating',
    confidence: 72
  },
  {
    name: 'Money Flow',
    value: 'Positive',
    status: 'bullish',
    description: 'Money flowing into the asset',
    confidence: 68
  }
]

const volumeAlerts = [
  {
    id: 1,
    type: 'volume-spike',
    message: 'Volume spike detected - 340% above average',
    severity: 'high',
    time: '15m ago',
    price: 43200
  },
  {
    id: 2,
    type: 'poc-test',
    message: 'Price testing Point of Control level',
    severity: 'medium',
    time: '45m ago',
    price: 43150
  },
  {
    id: 3,
    type: 'value-area-break',
    message: 'Price moved above Value Area High',
    severity: 'high',
    time: '1h ago',
    price: 43800
  }
]

export default function VolumeAnalysis() {
  const [selectedIndicator, setSelectedIndicator] = useState('volume-profile')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h')
  const [showVWAP, setShowVWAP] = useState(true)
  const [showPOC, setShowPOC] = useState(true)

  const currentPrice = volumeData[volumeData.length - 1]?.price || 43000
  const currentVolume = volumeData[volumeData.length - 1]?.volume || 1000000
  const avgVolume = 1200000
  const volumeRatio = currentVolume / avgVolume

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'bullish': return 'text-green-400'
      case 'bearish': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'bullish': return 'bg-green-500/20 text-green-400 border-green-500'
      case 'bearish': return 'bg-red-500/20 text-red-400 border-red-500'
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      default: return 'text-blue-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Volume2 className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-white">Volume Analysis</h2>
          <Badge variant="outline" className="border-blue-500 text-blue-400">
            Real-time Analysis
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

      {/* Volume Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Current Volume</div>
                <div className="text-lg font-semibold text-blue-400">
                  {(currentVolume / 1000000).toFixed(2)}M
                </div>
                <div className="text-xs text-gray-400">
                  {volumeRatio > 1 ? '+' : ''}{((volumeRatio - 1) * 100).toFixed(0)}% vs avg
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
                <div className="text-sm text-gray-400">Point of Control</div>
                <div className="text-lg font-semibold text-orange-400">
                  ${volumeProfile.poc.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">
                  {Math.abs(currentPrice - volumeProfile.poc) < 100 ? 'At POC' : `${Math.abs(currentPrice - volumeProfile.poc)}$ away`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Activity className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">VWAP</div>
                <div className="text-lg font-semibold text-green-400">
                  ${volumeData[volumeData.length - 1]?.vwap?.toLocaleString() || '43,000'}
                </div>
                <div className="text-xs text-gray-400">
                  {currentPrice > (volumeData[volumeData.length - 1]?.vwap || 43000) ? 'Above VWAP' : 'Below VWAP'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Layers className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Value Area</div>
                <div className="text-lg font-semibold text-purple-400">
                  {volumeProfile.valueAreaPercent}%
                </div>
                <div className="text-xs text-gray-400">
                  ${volumeProfile.val.toLocaleString()} - ${volumeProfile.vah.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Volume Chart with Indicators */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-white">Volume Profile & VWAP Analysis</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={showVWAP ? "default" : "outline"}
              onClick={() => setShowVWAP(!showVWAP)}
              className={showVWAP ? 'bg-orange-500 hover:bg-orange-600' : 'border-gray-700'}
            >
              VWAP
            </Button>
            <Button
              size="sm"
              variant={showPOC ? "default" : "outline"}
              onClick={() => setShowPOC(!showPOC)}
              className={showPOC ? 'bg-orange-500 hover:bg-orange-600' : 'border-gray-700'}
            >
              POC
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={volumeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  yAxisId="price"
                  domain={['dataMin - 200', 'dataMax + 200']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  orientation="right"
                />
                <YAxis 
                  yAxisId="volume"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
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
                
                {/* Volume Bars */}
                <Bar 
                  yAxisId="volume"
                  dataKey="volume" 
                  fill="#374151" 
                  opacity={0.6}
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

                {/* VWAP Line */}
                {showVWAP && (
                  <Line 
                    yAxisId="price"
                    type="monotone" 
                    dataKey="vwap" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="3 3"
                  />
                )}

                {/* Volume Profile Levels */}
                {showPOC && (
                  <>
                    <ReferenceLine 
                      yAxisId="price"
                      y={volumeProfile.poc} 
                      stroke="#F59E0B" 
                      strokeWidth={3}
                      label={{ value: "POC", fill: "#F59E0B" }}
                    />
                    <ReferenceLine 
                      yAxisId="price"
                      y={volumeProfile.vah} 
                      stroke="#EF4444" 
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      label={{ value: "VAH", fill: "#EF4444" }}
                    />
                    <ReferenceLine 
                      yAxisId="price"
                      y={volumeProfile.val} 
                      stroke="#10B981" 
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      label={{ value: "VAL", fill: "#10B981" }}
                    />
                  </>
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume Indicators */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center space-x-2">
              <Activity className="h-5 w-5 text-orange-500" />
              <span>Volume Indicators</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="obv" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="obv" className="data-[state=active]:bg-orange-500">OBV</TabsTrigger>
                <TabsTrigger value="mfi" className="data-[state=active]:bg-orange-500">MFI</TabsTrigger>
                <TabsTrigger value="ad" className="data-[state=active]:bg-orange-500">A/D</TabsTrigger>
              </TabsList>
              
              <TabsContent value="obv" className="mt-4">
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={volumeData}>
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
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="obv" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-sm text-gray-300">
                  On-Balance Volume shows {volumeData[volumeData.length - 1]?.obv > volumeData[volumeData.length - 10]?.obv ? 'increasing' : 'decreasing'} volume accumulation
                </div>
              </TabsContent>
              
              <TabsContent value="mfi" className="mt-4">
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={volumeData}>
                      <XAxis 
                        dataKey="time" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#9CA3AF' }}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#9CA3AF' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <ReferenceLine y={80} stroke="#EF4444" strokeDasharray="2 2" />
                      <ReferenceLine y={20} stroke="#10B981" strokeDasharray="2 2" />
                      <Line 
                        type="monotone" 
                        dataKey="mfi" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-sm text-gray-300">
                  Money Flow Index at {volumeData[volumeData.length - 1]?.mfi?.toFixed(1)} - {
                    (volumeData[volumeData.length - 1]?.mfi || 50) > 80 ? 'Overbought territory' :
                    (volumeData[volumeData.length - 1]?.mfi || 50) < 20 ? 'Oversold territory' :
                    'Neutral range'
                  }
                </div>
              </TabsContent>
              
              <TabsContent value="ad" className="mt-4">
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={volumeData}>
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
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="ad"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-sm text-gray-300">
                  Accumulation/Distribution Line indicates {Math.abs(volumeData[volumeData.length - 1]?.ad || 0) > 100000 ? 'strong' : 'moderate'} {(volumeData[volumeData.length - 1]?.ad || 0) > 0 ? 'accumulation' : 'distribution'}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Volume Analysis Summary */}
        <div className="space-y-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <span>Volume Analysis Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {volumeIndicators.map((indicator, index) => (
                  <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{indicator.name}</span>
                      <Badge 
                        variant="outline" 
                        className={getStatusBadgeColor(indicator.status)}
                      >
                        {indicator.value}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">
                      {indicator.description}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Confidence</span>
                      <span className={`text-xs font-semibold ${
                        indicator.confidence >= 80 ? 'text-green-400' : 
                        indicator.confidence >= 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {indicator.confidence}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>Volume Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {volumeAlerts.map(alert => (
                  <div key={alert.id} className="p-3 bg-gray-800/50 rounded-lg border-l-2 border-l-orange-500">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.type.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">{alert.time}</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-1">
                      {alert.message}
                    </div>
                    <div className="text-xs text-gray-400">
                      At ${alert.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
