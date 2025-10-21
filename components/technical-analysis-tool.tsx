
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  BarChart3,
  Activity,
  Target,
  Search,
  TrendingUp,
  Volume2,
  Clock,
  Layers
} from 'lucide-react'

// Import all technical analysis components
import AdvancedChartInterface from './advanced-chart-interface'
import TechnicalIndicatorsPanel from './technical-indicators-panel'
import SupportResistanceAnalysis from './support-resistance-analysis'
import PatternRecognition from './pattern-recognition'
import FibonacciTools from './fibonacci-tools'
import VolumeAnalysis from './volume-analysis'
import MultiTimeframeAnalysis from './multi-timeframe-analysis'
import MarketStructureAnalysis from './market-structure-analysis'

export default function TechnicalAnalysisTool() {
  const [activeSection, setActiveSection] = useState('chart-interface')

  const sections = [
    {
      id: 'chart-interface',
      name: 'Advanced Chart Interface',
      icon: BarChart3,
      description: 'Professional TradingView-style charts with multiple timeframes',
      component: AdvancedChartInterface
    },
    {
      id: 'indicators',
      name: 'Technical Indicators',
      icon: Activity,
      description: 'RSI, MACD, Bollinger Bands, and more with customizable parameters',
      component: TechnicalIndicatorsPanel
    },
    {
      id: 'support-resistance',
      name: 'Support & Resistance',
      icon: Target,
      description: 'Automatic level detection, pivot points, and trend lines',
      component: SupportResistanceAnalysis
    },
    {
      id: 'patterns',
      name: 'Pattern Recognition',
      icon: Search,
      description: 'AI-powered chart and candlestick pattern detection',
      component: PatternRecognition
    },
    {
      id: 'fibonacci',
      name: 'Fibonacci Tools',
      icon: TrendingUp,
      description: 'Retracements, extensions, time zones, and interactive tools',
      component: FibonacciTools
    },
    {
      id: 'volume',
      name: 'Volume Analysis',
      icon: Volume2,
      description: 'Volume profile, VWAP, OBV, and liquidity analysis',
      component: VolumeAnalysis
    },
    {
      id: 'multi-timeframe',
      name: 'Multi-Timeframe Analysis',
      icon: Clock,
      description: 'Cross-timeframe trend alignment and correlation analysis',
      component: MultiTimeframeAnalysis
    },
    {
      id: 'market-structure',
      name: 'Market Structure Analysis',
      icon: Layers,
      description: 'ICT concepts: order blocks, liquidity zones, structure breaks',
      component: MarketStructureAnalysis
    }
  ]

  const activeComponent = sections.find(section => section.id === activeSection)
  const ActiveComponent = activeComponent?.component

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-orange-500" />
            <span>Technical Analysis Tool</span>
          </h1>
          <p className="text-gray-400">Professional-grade technical analysis with advanced charting and indicators</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Active Section</div>
          <div className="text-white font-semibold">{activeComponent?.name}</div>
        </div>
      </div>

      {/* Section Navigation */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg text-white">Analysis Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map(section => {
              const isActive = activeSection === section.id
              const Icon = section.icon
              
              return (
                <Card
                  key={section.id}
                  className={`cursor-pointer transition-all hover:bg-gray-700/50 ${
                    isActive 
                      ? 'bg-orange-500/20 border-orange-500 ring-2 ring-orange-500/50' 
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-orange-500/20' : 'bg-gray-700/50'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          isActive ? 'text-orange-400' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-sm ${
                          isActive ? 'text-orange-400' : 'text-white'
                        }`}>
                          {section.name}
                        </h3>
                      </div>
                      {isActive && (
                        <Badge variant="outline" className="border-orange-500 text-orange-400 text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Section Content */}
      <div className="min-h-screen">
        {ActiveComponent && <ActiveComponent />}
      </div>

      {/* Quick Stats Footer */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-400">8</div>
              <div className="text-sm text-gray-400">Analysis Sections</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">15+</div>
              <div className="text-sm text-gray-400">Technical Indicators</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-gray-400">Chart Patterns</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">7</div>
              <div className="text-sm text-gray-400">Timeframes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
