
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { 
  TrendingUp, 
  Activity, 
  BarChart3, 
  Settings,
  Plus,
  Minus,
  Eye,
  EyeOff
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, ComposedChart, Bar, Area, AreaChart } from 'recharts'
import { useCandlestickData, useTechnicalIndicators } from '../hooks/use-websocket-data'
import { SUPPORTED_ASSETS } from '../lib/websocket-service'
import ConnectionStatusIndicator from './connection-status-indicator'

export default function TechnicalIndicatorsPanel() {
  const [selectedAsset, setSelectedAsset] = useState('BTCUSDT')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h')
  const [activeIndicators, setActiveIndicators] = useState(['RSI', 'MACD', 'SMA'])
  const [rsiPeriod, setRsiPeriod] = useState([14])
  const [smaPeriod, setSmaPeriod] = useState([20])
  const [emaPeriod, setEmaPeriod] = useState([20])
  const [bbPeriod, setBbPeriod] = useState([20])
  const [bbDeviation, setBbDeviation] = useState([2])

  // Real-time data hooks  
  const { candlestickData, lastUpdate } = useCandlestickData(selectedAsset, selectedTimeframe)
  const indicators = useTechnicalIndicators(candlestickData, rsiPeriod[0])

  // Generate indicator data with actual values
  const indicatorData = candlestickData.map((candle, index) => ({
    ...candle,
    rsi: indicators.rsi + (Math.random() - 0.5) * 10, // Simulate RSI variation
    macd: indicators.macd.macd + (Math.random() - 0.5) * 20,
    signal: indicators.macd.signal + (Math.random() - 0.5) * 15,
    histogram: indicators.macd.histogram,
    sma20: indicators.sma + (Math.random() - 0.5) * 100,
    ema20: indicators.ema + (Math.random() - 0.5) * 120,
    bb_upper: indicators.bollingerBands.upper,
    bb_lower: indicators.bollingerBands.lower,
    bb_mid: indicators.bollingerBands.middle,
    stoch_k: indicators.stochastic.k,
    stoch_d: indicators.stochastic.d
  }))

  const indicatorConfig = [
    { id: 'RSI', name: 'RSI (Relative Strength Index)', color: '#F59E0B', description: 'Momentum oscillator (0-100)' },
    { id: 'MACD', name: 'MACD', color: '#3B82F6', description: 'Moving Average Convergence Divergence' },
    { id: 'SMA', name: 'Simple Moving Average', color: '#10B981', description: 'Price smoothing indicator' },
    { id: 'EMA', name: 'Exponential Moving Average', color: '#8B5CF6', description: 'Weighted moving average' },
    { id: 'BB', name: 'Bollinger Bands', color: '#EF4444', description: 'Volatility bands' },
    { id: 'STOCH', name: 'Stochastic Oscillator', color: '#F97316', description: 'Momentum indicator' },
    { id: 'VOLUME', name: 'Volume', color: '#6B7280', description: 'Trading volume indicator' }
  ]

  const toggleIndicator = (indicatorId: string) => {
    setActiveIndicators(prev => 
      prev.includes(indicatorId) 
        ? prev.filter(id => id !== indicatorId)
        : [...prev, indicatorId]
    )
  }

  const getIndicatorValue = (indicator: string) => {
    const latestCandle = candlestickData[candlestickData.length - 1]
    switch (indicator) {
      case 'RSI':
        return {
          value: indicators.rsi.toFixed(2),
          status: indicators.rsi > 70 ? 'Overbought' : indicators.rsi < 30 ? 'Oversold' : 'Neutral',
          color: indicators.rsi > 70 ? 'text-red-400' : indicators.rsi < 30 ? 'text-green-400' : 'text-yellow-400'
        }
      case 'MACD':
        return {
          value: indicators.macd.macd.toFixed(2),
          status: indicators.macd.macd > indicators.macd.signal ? 'Bullish' : 'Bearish',
          color: indicators.macd.macd > indicators.macd.signal ? 'text-green-400' : 'text-red-400'
        }
      case 'SMA':
        return {
          value: indicators.sma.toFixed(2),
          status: (latestCandle?.close || 0) > indicators.sma ? 'Above SMA' : 'Below SMA',
          color: (latestCandle?.close || 0) > indicators.sma ? 'text-green-400' : 'text-red-400'
        }
      case 'EMA':
        return {
          value: indicators.ema.toFixed(2),
          status: (latestCandle?.close || 0) > indicators.ema ? 'Above EMA' : 'Below EMA',
          color: (latestCandle?.close || 0) > indicators.ema ? 'text-green-400' : 'text-red-400'
        }
      case 'BB':
        return {
          value: `${indicators.bollingerBands.upper.toFixed(0)}-${indicators.bollingerBands.lower.toFixed(0)}`,
          status: (latestCandle?.close || 0) > indicators.bollingerBands.upper ? 'Above Upper' : 
                 (latestCandle?.close || 0) < indicators.bollingerBands.lower ? 'Below Lower' : 'In Bands',
          color: (latestCandle?.close || 0) > indicators.bollingerBands.upper ? 'text-red-400' : 
                (latestCandle?.close || 0) < indicators.bollingerBands.lower ? 'text-green-400' : 'text-yellow-400'
        }
      case 'STOCH':
        return {
          value: `${indicators.stochastic.k.toFixed(1)}/${indicators.stochastic.d.toFixed(1)}`,
          status: indicators.stochastic.k > 80 ? 'Overbought' : indicators.stochastic.k < 20 ? 'Oversold' : 'Neutral',
          color: indicators.stochastic.k > 80 ? 'text-red-400' : indicators.stochastic.k < 20 ? 'text-green-400' : 'text-yellow-400'
        }
      default:
        return { value: '0', status: 'N/A', color: 'text-gray-400' }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Activity className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-white">Technical Indicators Panel</h2>
            <Badge variant="outline" className="border-orange-500 text-orange-400">
              {activeIndicators.length} Active
            </Badge>
          </div>
          <ConnectionStatusIndicator />
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedAsset} onValueChange={setSelectedAsset}>
            <SelectTrigger className="bg-gray-800 border-gray-700 w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {SUPPORTED_ASSETS.map(asset => (
                <SelectItem key={asset.symbol} value={asset.symbol} className="text-white">
                  {asset.displaySymbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="border-gray-700">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Indicator Selection */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg text-white">Available Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indicatorConfig.map(indicator => {
              const isActive = activeIndicators.includes(indicator.id)
              const indicatorValue = getIndicatorValue(indicator.id)
              
              return (
                <Card key={indicator.id} className={`bg-gray-800/50 border-gray-700 transition-all ${isActive ? 'ring-2 ring-orange-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: indicator.color }}
                        />
                        <span className="font-medium text-white">{indicator.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleIndicator(indicator.id)}
                        className={`border-gray-600 ${isActive ? 'bg-orange-500 text-white' : ''}`}
                      >
                        {isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-2">{indicator.description}</p>
                    
                    {isActive && (
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-white">{indicatorValue.value}</div>
                        <div className={`text-sm ${indicatorValue.color}`}>{indicatorValue.status}</div>
                        {lastUpdate && (
                          <div className="text-xs text-gray-400">
                            Updated: {lastUpdate.toLocaleTimeString()}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Indicators Charts */}
      <div className="space-y-6">
        {activeIndicators.includes('RSI') && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white">RSI (Relative Strength Index)</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Period:</span>
                <div className="w-20">
                  <Slider
                    value={rsiPeriod}
                    onValueChange={setRsiPeriod}
                    max={50}
                    min={5}
                    step={1}
                    className="cursor-pointer"
                  />
                </div>
                <span className="text-sm text-white w-8">{rsiPeriod[0]}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={indicatorData}>
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
                    <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="2 2" />
                    <ReferenceLine y={30} stroke="#10B981" strokeDasharray="2 2" />
                    <ReferenceLine y={50} stroke="#6B7280" strokeDasharray="1 1" />
                    <Line 
                      type="monotone" 
                      dataKey="rsi" 
                      stroke="#F59E0B" 
                      strokeWidth={2} 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {activeIndicators.includes('MACD') && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">MACD (Moving Average Convergence Divergence)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={indicatorData}>
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
                    <ReferenceLine y={0} stroke="#6B7280" strokeDasharray="1 1" />
                    <Bar dataKey="histogram" fill="#6B7280" opacity={0.6} />
                    <Line 
                      type="monotone" 
                      dataKey="macd" 
                      stroke="#3B82F6" 
                      strokeWidth={2} 
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="signal" 
                      stroke="#EF4444" 
                      strokeWidth={2} 
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {activeIndicators.includes('SMA') && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white">Simple Moving Average</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Period:</span>
                <div className="w-20">
                  <Slider
                    value={smaPeriod}
                    onValueChange={setSmaPeriod}
                    max={200}
                    min={5}
                    step={5}
                    className="cursor-pointer"
                  />
                </div>
                <span className="text-sm text-white w-8">{smaPeriod[0]}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={indicatorData}>
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
                      dataKey="price" 
                      stroke="#F59E0B" 
                      strokeWidth={1} 
                      dot={false}
                      opacity={0.7}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sma20" 
                      stroke="#10B981" 
                      strokeWidth={2} 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {activeIndicators.includes('BB') && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white">Bollinger Bands</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Period:</span>
                  <div className="w-16">
                    <Slider
                      value={bbPeriod}
                      onValueChange={setBbPeriod}
                      max={50}
                      min={5}
                      step={1}
                    />
                  </div>
                  <span className="text-sm text-white w-6">{bbPeriod[0]}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">StdDev:</span>
                  <div className="w-16">
                    <Slider
                      value={bbDeviation}
                      onValueChange={setBbDeviation}
                      max={3}
                      min={1}
                      step={0.1}
                    />
                  </div>
                  <span className="text-sm text-white w-6">{bbDeviation[0].toFixed(1)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={indicatorData}>
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
                      dataKey="bb_upper"
                      stackId="1"
                      stroke="#EF4444"
                      fill="#EF4444"
                      fillOpacity={0.1}
                      strokeWidth={1}
                    />
                    <Area
                      type="monotone"
                      dataKey="bb_lower"
                      stackId="1"
                      stroke="#EF4444"
                      fill="#EF4444"
                      fillOpacity={0.1}
                      strokeWidth={1}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#F59E0B" 
                      strokeWidth={2} 
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bb_mid" 
                      stroke="#8B5CF6" 
                      strokeWidth={1} 
                      dot={false}
                      strokeDasharray="2 2"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
