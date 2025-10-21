
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3, 
  Activity, 
  Clock, 
  Maximize2,
  Settings,
  Download,
  RefreshCw,
  Pause,
  Play
} from 'lucide-react'
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts'
import { useCandlestickData, useTickerData, useTechnicalIndicators } from '../hooks/use-websocket-data'
import { SUPPORTED_ASSETS, SUPPORTED_TIMEFRAMES } from '../lib/websocket-service'
import ConnectionStatusIndicator from './connection-status-indicator'
import LivePriceTicker from './live-price-ticker'

export default function AdvancedChartInterface() {
  const [selectedAsset, setSelectedAsset] = useState('BTCUSDT')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h')
  const [chartType, setChartType] = useState('candlestick')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null)

  // Real-time data hooks
  const { candlestickData, currentCandle, lastUpdate, latestPrice, priceChange } = useCandlestickData(selectedAsset, selectedTimeframe)
  const { tickerData, price, changePercent24h, volume24h } = useTickerData(selectedAsset)
  const indicators = useTechnicalIndicators(candlestickData)

  const chartTypes = [
    { id: 'candlestick', name: 'Candlestick', icon: BarChart3 },
    { id: 'line', name: 'Line Chart', icon: TrendingUp },
    { id: 'area', name: 'Area Chart', icon: Activity },
    { id: 'heikin-ashi', name: 'Heikin Ashi', icon: BarChart3 }
  ]

  const currentAsset = SUPPORTED_ASSETS.find(a => a.symbol === selectedAsset)
  const selectedTimeframeConfig = SUPPORTED_TIMEFRAMES.find(tf => tf.interval === selectedTimeframe)

  // Update timestamp when data changes
  useEffect(() => {
    if (lastUpdate) {
      setLastUpdateTime(lastUpdate)
    }
  }, [lastUpdate])

  const formatPrice = (price: number) => {
    if (!price) return '$0.00'
    if (price > 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    if (price > 1) return `$${price.toFixed(4)}`
    return `$${price.toFixed(6)}`
  }

  const formatChange = (change: number) => {
    if (!change) return '0.00%'
    return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      {/* Header with Asset Selection */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-white">Advanced Chart Interface</h2>
          </div>
          <ConnectionStatusIndicator />
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsPaused(!isPaused)}
            className={`border-gray-700 ${isPaused ? 'bg-orange-500/20 border-orange-500' : ''}`}
          >
            {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="border-gray-700">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Live Price Ticker */}
      <LivePriceTicker symbol={selectedAsset} />

      {/* Asset & Controls Panel */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Asset Selection */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Asset</label>
              <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {SUPPORTED_ASSETS.map(asset => (
                    <SelectItem key={asset.symbol} value={asset.symbol} className="text-white">
                      <div className="flex items-center justify-between w-full">
                        <span>{asset.displaySymbol} - {asset.name}</span>
                        <LivePriceTicker symbol={asset.symbol} compact />
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Timeframe Selection */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Timeframe</label>
              <div className="flex flex-wrap gap-1">
                {SUPPORTED_TIMEFRAMES.map(tf => (
                  <Button
                    key={tf.id}
                    size="sm"
                    variant={selectedTimeframe === tf.interval ? "default" : "outline"}
                    onClick={() => setSelectedTimeframe(tf.interval)}
                    className={`text-xs ${
                      selectedTimeframe === tf.interval 
                        ? 'bg-orange-500 hover:bg-orange-600' 
                        : 'border-gray-700 hover:bg-gray-800'
                    }`}
                  >
                    {tf.id}
                  </Button>
                ))}
              </div>
            </div>

            {/* Chart Type */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Chart Type</label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {chartTypes.map(type => (
                    <SelectItem key={type.id} value={type.id} className="text-white">
                      <div className="flex items-center space-x-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Live Data Stats */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Live Data</label>
              <div className="text-lg font-bold text-white">
                {formatPrice(price || latestPrice)}
              </div>
              <div className={`text-sm ${changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatChange(changePercent24h)}
              </div>
              {lastUpdateTime && (
                <div className="text-xs text-gray-400">
                  Updated: {lastUpdateTime.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Chart */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">
            {currentAsset?.displaySymbol || 'BTC'} / USD - {selectedTimeframeConfig?.name || selectedTimeframe}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {currentCandle && (
              <Badge variant="outline" className="border-green-500 text-green-400 animate-pulse">
                Live: {formatPrice(currentCandle.close)}
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="border-gray-700"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`${isFullscreen ? 'h-[800px]' : 'h-[500px]'} w-full`}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart 
                data={isPaused ? candlestickData : candlestickData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  yAxisId="price"
                  domain={['dataMin - 100', 'dataMax + 100']}
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
                  formatter={(value: any, name: string) => [
                    typeof value === 'number' ? formatPrice(value) : value,
                    name.charAt(0).toUpperCase() + name.slice(1)
                  ]}
                />
                
                {chartType === 'candlestick' && (
                  <>
                    <Bar dataKey="volume" fill="#374151" opacity={0.3} yAxisId="volume" />
                    <Line 
                      yAxisId="price"
                      type="monotone" 
                      dataKey="close" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      dot={false}
                      connectNulls={false}
                    />
                    <Line 
                      yAxisId="price"
                      type="monotone" 
                      dataKey="high" 
                      stroke="#10B981" 
                      strokeWidth={1}
                      dot={false}
                      opacity={0.7}
                    />
                    <Line 
                      yAxisId="price"
                      type="monotone" 
                      dataKey="low" 
                      stroke="#EF4444" 
                      strokeWidth={1}
                      dot={false}
                      opacity={0.7}
                    />
                  </>
                )}
                
                {chartType === 'line' && (
                  <Line 
                    yAxisId="price"
                    type="monotone" 
                    dataKey="close" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    dot={false}
                    connectNulls={false}
                  />
                )}
                
                {chartType === 'area' && (
                  <Line 
                    yAxisId="price"
                    type="monotone" 
                    dataKey="close" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    fill="#F59E0B"
                    fillOpacity={0.1}
                    dot={false}
                    connectNulls={false}
                  />
                )}

                {/* Technical Indicator Lines */}
                {indicators.sma > 0 && (
                  <Line 
                    yAxisId="price"
                    type="monotone" 
                    dataKey={(entry) => indicators.sma}
                    stroke="#10B981" 
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    dot={false}
                  />
                )}

                {/* Support/Resistance Lines */}
                {candlestickData.length > 0 && (
                  <>
                    <ReferenceLine 
                      yAxisId="price"
                      y={(candlestickData[candlestickData.length - 1]?.close || 0) * 1.02} 
                      stroke="#EF4444" 
                      strokeDasharray="5 5"
                      label={{ value: "Resistance", fill: "#EF4444", position: "insideTopRight" }}
                    />
                    <ReferenceLine 
                      yAxisId="price"
                      y={(candlestickData[candlestickData.length - 1]?.close || 0) * 0.98} 
                      stroke="#10B981" 
                      strokeDasharray="5 5"
                      label={{ value: "Support", fill: "#10B981", position: "insideBottomRight" }}
                    />
                  </>
                )}

                {/* Current Price Line */}
                {(price || latestPrice) && (
                  <ReferenceLine 
                    yAxisId="price"
                    y={price || latestPrice} 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    strokeDasharray="2 2"
                    label={{ value: "Current", fill: "#F59E0B", position: "insideTopRight" }}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Chart Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                priceChange >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                {priceChange >= 0 ? 
                  <TrendingUp className="h-5 w-5 text-green-400" /> : 
                  <TrendingDown className="h-5 w-5 text-red-400" />
                }
              </div>
              <div>
                <div className="text-sm text-gray-400">Trend Direction</div>
                <div className={`text-lg font-semibold ${
                  priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {priceChange >= 0 ? 'Bullish' : 'Bearish'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Activity className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">RSI</div>
                <div className={`text-lg font-semibold ${
                  indicators.rsi > 70 ? 'text-red-400' : 
                  indicators.rsi < 30 ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {indicators.rsi.toFixed(1)}
                </div>
                <div className="text-xs text-gray-400">
                  {indicators.rsi > 70 ? 'Overbought' : 
                   indicators.rsi < 30 ? 'Oversold' : 'Neutral'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Volume</div>
                <div className="text-lg font-semibold text-blue-400">
                  {volume24h > 0 ? 
                    `${(volume24h / 1000000).toFixed(1)}M` : 
                    '1.2M'
                  }
                </div>
                <div className="text-xs text-gray-400">
                  24h Volume
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Clock className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Last Update</div>
                <div className="text-lg font-semibold text-orange-400">
                  {lastUpdateTime ? 
                    `${Math.floor((Date.now() - lastUpdateTime.getTime()) / 1000)}s` : 
                    'Live'
                  }
                </div>
                <div className="text-xs text-gray-400">
                  {isPaused ? 'Paused' : 'Real-time'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
