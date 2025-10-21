
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  TrendingUp,
  TrendingDown,
  Target,
  Layers,
  Activity,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Settings,
  RefreshCw,
  Zap,
  Eye
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, ComposedChart, Bar, Area } from 'recharts'

// Mock data for market structure analysis
const generateMarketStructureData = () => {
  const data = []
  const basePrice = 43000
  let currentPrice = basePrice
  
  // Generate data with clear market structure patterns
  for (let i = 0; i < 100; i++) {
    let priceChange = 0
    
    // Create higher highs and higher lows pattern, then break
    if (i < 30) {
      // Uptrend with HH/HL pattern
      priceChange = Math.sin(i * 0.2) * 200 + (i * 15)
    } else if (i < 60) {
      // Consolidation/ranging
      priceChange = Math.sin(i * 0.3) * 150 + 450
    } else {
      // Break of structure - downtrend
      priceChange = Math.sin(i * 0.15) * 100 + 450 - ((i - 60) * 20)
    }
    
    currentPrice = basePrice + priceChange + (Math.random() - 0.5) * 50
    
    data.push({
      time: new Date(Date.now() - (99 - i) * 3600000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      price: Math.round(currentPrice),
      volume: Math.random() * 1000000 + 500000,
      highHigh: i === 25 || i === 35 || i === 45 ? currentPrice : null,
      lowLow: i === 20 || i === 30 || i === 40 ? currentPrice : null,
      structureBreak: i === 65 ? currentPrice : null,
      liquidityZone: (i >= 25 && i <= 35) || (i >= 55 && i <= 65) ? currentPrice : null,
      orderBlock: i === 28 || i === 38 || i === 58 ? currentPrice : null
    })
  }
  
  return data
}

const marketStructureData = generateMarketStructureData()

// Market structure levels
const structureLevels = {
  higherHighs: [
    { price: 43800, time: '10:30', strength: 85, confirmed: true },
    { price: 44200, time: '12:15', strength: 92, confirmed: true },
    { price: 44600, time: '14:20', strength: 78, confirmed: false }
  ],
  higherLows: [
    { price: 43200, time: '09:45', strength: 88, confirmed: true },
    { price: 43500, time: '11:30', strength: 91, confirmed: true },
    { price: 43100, time: '13:10', strength: 65, confirmed: false }
  ],
  structureBreaks: [
    {
      type: 'bearish',
      level: 43400,
      time: '15:30',
      significance: 'major',
      confirmed: true,
      description: 'Break of higher low structure'
    },
    {
      type: 'bullish',
      level: 44100,
      time: '11:45',
      significance: 'minor',
      confirmed: true,
      description: 'Break above previous high'
    }
  ],
  liquidityZones: [
    {
      id: 'lz1',
      type: 'buy-side',
      high: 44800,
      low: 44600,
      strength: 95,
      description: 'Major buy-side liquidity above previous highs',
      status: 'untested'
    },
    {
      id: 'lz2',
      type: 'sell-side',
      high: 43200,
      low: 43000,
      strength: 88,
      description: 'Sell-side liquidity below previous lows',
      status: 'partially-swept'
    },
    {
      id: 'lz3',
      type: 'buy-side',
      high: 44300,
      low: 44100,
      strength: 72,
      description: 'Intermediate buy-side liquidity',
      status: 'tested'
    }
  ],
  orderBlocks: [
    {
      id: 'ob1',
      type: 'bullish',
      high: 43600,
      low: 43400,
      time: '12:30',
      strength: 82,
      status: 'active',
      description: 'Strong bullish order block - institutional buying'
    },
    {
      id: 'ob2',
      type: 'bearish',
      high: 44400,
      low: 44200,
      time: '14:45',
      strength: 76,
      status: 'tested',
      description: 'Bearish order block - distribution zone'
    },
    {
      id: 'ob3',
      type: 'bullish',
      high: 43800,
      low: 43600,
      time: '10:15',
      strength: 89,
      status: 'respected',
      description: 'Highly respected bullish order block'
    }
  ]
}

// Market structure analysis summary
const structureAnalysis = {
  currentTrend: 'bearish_structure_break',
  trendStrength: 78,
  keyLevel: 43400,
  nextTarget: 42800,
  invalidationLevel: 44200,
  structureIntact: false,
  liquidityBias: 'sell-side',
  institutionalBias: 'bearish'
}

export default function MarketStructureAnalysis() {
  const [selectedView, setSelectedView] = useState('structure-levels')
  const [showLiquidity, setShowLiquidity] = useState(true)
  const [showOrderBlocks, setShowOrderBlocks] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h')

  const currentPrice = marketStructureData[marketStructureData.length - 1]?.price || 43000

  const getStructureColor = (type: string) => {
    switch(type) {
      case 'bullish': return 'text-green-400'
      case 'bearish': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getStructureBadgeColor = (type: string) => {
    switch(type) {
      case 'bullish': return 'bg-green-500/20 text-green-400 border-green-500'
      case 'bearish': return 'bg-red-500/20 text-red-400 border-red-500'
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active':
      case 'untested':
      case 'respected': return 'text-green-400'
      case 'tested':
      case 'partially-swept': return 'text-yellow-400'
      case 'broken':
      case 'swept': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getLiquidityTypeColor = (type: string) => {
    return type === 'buy-side' ? 'text-green-400' : 'text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Layers className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-white">Market Structure Analysis</h2>
          <Badge variant="outline" className="border-purple-500 text-purple-400">
            ICT Concepts
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

      {/* Structure Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                structureAnalysis.currentTrend.includes('bullish') ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                {structureAnalysis.currentTrend.includes('bullish') ? (
                  <TrendingUp className="h-5 w-5 text-green-400" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-400" />
                )}
              </div>
              <div>
                <div className="text-sm text-gray-400">Structure Status</div>
                <div className={`text-lg font-semibold ${getStructureColor(
                  structureAnalysis.currentTrend.includes('bullish') ? 'bullish' : 'bearish'
                )}`}>
                  {structureAnalysis.structureIntact ? 'INTACT' : 'BROKEN'}
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
                <div className="text-sm text-gray-400">Key Level</div>
                <div className="text-lg font-semibold text-orange-400">
                  ${structureAnalysis.keyLevel.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">
                  {Math.abs(currentPrice - structureAnalysis.keyLevel) < 100 ? 'At level' : `${Math.abs(currentPrice - structureAnalysis.keyLevel)}$ away`}
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
                <div className="text-sm text-gray-400">Liquidity Bias</div>
                <div className={`text-lg font-semibold ${getLiquidityTypeColor(
                  structureAnalysis.liquidityBias.replace('-side', '')
                )}`}>
                  {structureAnalysis.liquidityBias.toUpperCase()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Zap className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Next Target</div>
                <div className="text-lg font-semibold text-purple-400">
                  ${structureAnalysis.nextTarget.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">
                  {((Math.abs(currentPrice - structureAnalysis.nextTarget) / currentPrice) * 100).toFixed(1)}% move
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Structure Chart */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-white">Market Structure Visualization</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={showLiquidity ? "default" : "outline"}
              onClick={() => setShowLiquidity(!showLiquidity)}
              className={showLiquidity ? 'bg-orange-500 hover:bg-orange-600' : 'border-gray-700'}
            >
              <Eye className="h-4 w-4 mr-1" />
              Liquidity
            </Button>
            <Button
              size="sm"
              variant={showOrderBlocks ? "default" : "outline"}
              onClick={() => setShowOrderBlocks(!showOrderBlocks)}
              className={showOrderBlocks ? 'bg-orange-500 hover:bg-orange-600' : 'border-gray-700'}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Order Blocks
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={marketStructureData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={['dataMin - 300', 'dataMax + 300']}
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

                {/* Liquidity Zones */}
                {showLiquidity && structureLevels.liquidityZones.map(zone => (
                  <Area
                    key={zone.id}
                    type="monotone"
                    dataKey={() => zone.high}
                    fill={zone.type === 'buy-side' ? '#10B981' : '#EF4444'}
                    fillOpacity={0.1}
                    stroke={zone.type === 'buy-side' ? '#10B981' : '#EF4444'}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                ))}

                {/* Order Blocks */}
                {showOrderBlocks && structureLevels.orderBlocks.map(block => (
                  <Area
                    key={block.id}
                    type="monotone"
                    dataKey={() => block.high}
                    fill={block.type === 'bullish' ? '#10B981' : '#EF4444'}
                    fillOpacity={0.15}
                    stroke={block.type === 'bullish' ? '#10B981' : '#EF4444'}
                    strokeWidth={2}
                  />
                ))}

                {/* Structure Levels */}
                <ReferenceLine 
                  y={structureAnalysis.keyLevel} 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  label={{ value: "Key Structure Level", fill: "#F59E0B" }}
                />
                <ReferenceLine 
                  y={structureAnalysis.nextTarget} 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{ value: "Target", fill: "#8B5CF6" }}
                />
                <ReferenceLine 
                  y={structureAnalysis.invalidationLevel} 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={{ value: "Invalidation", fill: "#EF4444" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Structure Levels */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <span>Structure Levels</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="highs-lows" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="highs-lows" className="data-[state=active]:bg-orange-500">HH/HL</TabsTrigger>
                <TabsTrigger value="breaks" className="data-[state=active]:bg-orange-500">Breaks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="highs-lows" className="space-y-3 mt-4">
                <div>
                  <h5 className="text-sm font-medium text-green-400 mb-2">Higher Highs</h5>
                  {structureLevels.higherHighs.map((hh, index) => (
                    <div key={index} className="p-2 bg-gray-800/50 rounded mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">${hh.price.toLocaleString()}</span>
                        <div className="flex items-center space-x-2">
                          {hh.confirmed ? (
                            <CheckCircle className="h-3 w-3 text-green-400" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 text-yellow-400" />
                          )}
                          <span className="text-xs text-gray-400">{hh.strength}%</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">{hh.time}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <h5 className="text-sm font-medium text-blue-400 mb-2">Higher Lows</h5>
                  {structureLevels.higherLows.map((hl, index) => (
                    <div key={index} className="p-2 bg-gray-800/50 rounded mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">${hl.price.toLocaleString()}</span>
                        <div className="flex items-center space-x-2">
                          {hl.confirmed ? (
                            <CheckCircle className="h-3 w-3 text-green-400" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 text-yellow-400" />
                          )}
                          <span className="text-xs text-gray-400">{hl.strength}%</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">{hl.time}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="breaks" className="space-y-3 mt-4">
                {structureLevels.structureBreaks.map((sb, index) => (
                  <div key={index} className="p-3 bg-gray-800/50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant="outline" 
                        className={getStructureBadgeColor(sb.type)}
                      >
                        {sb.type} Break
                      </Badge>
                      <span className="text-xs text-gray-400">{sb.time}</span>
                    </div>
                    <div className="text-sm text-white mb-1">
                      ${sb.level.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-300">
                      {sb.description}
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline" className={`text-xs ${
                        sb.significance === 'major' ? 'border-red-500 text-red-400' : 'border-yellow-500 text-yellow-400'
                      }`}>
                        {sb.significance} significance
                      </Badge>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Liquidity Zones */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-500" />
              <span>Liquidity Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {structureLevels.liquidityZones.map(zone => (
              <div key={zone.id} className="p-3 bg-gray-800/50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className={zone.type === 'buy-side' ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}
                  >
                    {zone.type}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(zone.status)} border-gray-600`}
                  >
                    {zone.status}
                  </Badge>
                </div>
                
                <div className="text-sm text-white mb-1">
                  ${zone.low.toLocaleString()} - ${zone.high.toLocaleString()}
                </div>
                
                <div className="text-xs text-gray-300 mb-2">
                  {zone.description}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Strength</span>
                  <span className={`text-xs font-semibold ${
                    zone.strength >= 90 ? 'text-green-400' : 
                    zone.strength >= 70 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {zone.strength}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Order Blocks */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-orange-500" />
              <span>Order Blocks</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {structureLevels.orderBlocks.map(block => (
              <div key={block.id} className="p-3 bg-gray-800/50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className={getStructureBadgeColor(block.type)}
                  >
                    {block.type}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(block.status)} border-gray-600`}
                  >
                    {block.status}
                  </Badge>
                </div>
                
                <div className="text-sm text-white mb-1">
                  ${block.low.toLocaleString()} - ${block.high.toLocaleString()}
                </div>
                
                <div className="text-xs text-gray-300 mb-2">
                  {block.description}
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{block.time}</span>
                  <span className={`font-semibold ${
                    block.strength >= 85 ? 'text-green-400' : 
                    block.strength >= 70 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {block.strength}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Analysis Summary */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <Activity className="h-5 w-5 text-orange-500" />
            <span>Market Structure Summary & Trading Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Current Structure Analysis</h4>
                <div className="p-3 bg-gray-800/50 rounded">
                  <div className="text-sm text-gray-300">
                    Market structure has been {structureAnalysis.structureIntact ? 'maintained' : 'broken'} with a 
                    {' '}<span className={getStructureColor(structureAnalysis.currentTrend.includes('bullish') ? 'bullish' : 'bearish')}>
                      {structureAnalysis.currentTrend.replace('_', ' ')}
                    </span> pattern emerging.
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Key Observations</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Clear liquidity pools identified above/below structure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Order blocks showing institutional interest</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300">Structure break indicates potential trend change</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Trading Plan</h4>
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                  <div className="text-sm text-gray-300 space-y-2">
                    <div><strong>Entry Strategy:</strong> Wait for price to return to order block at ${structureLevels.orderBlocks[0].high.toLocaleString()}</div>
                    <div><strong>Target:</strong> Sell-side liquidity at ${structureAnalysis.nextTarget.toLocaleString()}</div>
                    <div><strong>Stop Loss:</strong> Above invalidation level at ${structureAnalysis.invalidationLevel.toLocaleString()}</div>
                    <div><strong>Risk-Reward:</strong> 1:2.5 ratio with proper position sizing</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Risk Factors</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-gray-300">High impact news events may invalidate structure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-gray-300">Market opening gaps could affect liquidity zones</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
