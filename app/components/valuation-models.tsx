
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Calculator,
  TrendingUp,
  BarChart3,
  Target,
  DollarSign,
  Activity
} from 'lucide-react'
import MetcalfeModelChart from './metcalfe-model-chart'
import StockToFlowChart from './stock-to-flow-chart'
import DCFModelChart from './dcf-model-chart'

// Mock valuation data
const valuationMetrics = [
  {
    asset: 'Bitcoin',
    symbol: 'BTC',
    currentPrice: 118375,
    metcalfeValue: 125000,
    metcalfeRatio: 0.95,
    s2fValue: 140000,
    s2fRatio: 0.85,
    dcfValue: 110000,
    dcfRatio: 1.08,
    fairValue: 125000,
    valuation: 'Undervalued',
    upside: 5.6
  },
  {
    asset: 'Ethereum',
    symbol: 'ETH',
    currentPrice: 3847,
    metcalfeValue: 4200,
    metcalfeRatio: 0.92,
    s2fValue: 0, // Not applicable
    s2fRatio: 0,
    dcfValue: 4500,
    dcfRatio: 0.85,
    fairValue: 4350,
    valuation: 'Undervalued',
    upside: 13.1
  },
  {
    asset: 'Solana',
    symbol: 'SOL',
    currentPrice: 264.85,
    metcalfeValue: 280,
    metcalfeRatio: 0.95,
    s2fValue: 0,
    s2fRatio: 0,
    dcfValue: 320,
    dcfRatio: 0.83,
    fairValue: 300,
    valuation: 'Undervalued',
    upside: 13.3
  },
  {
    asset: 'XRP',
    symbol: 'XRP',
    currentPrice: 3.41,
    metcalfeValue: 2.80,
    metcalfeRatio: 1.22,
    s2fValue: 0,
    s2fRatio: 0,
    dcfValue: 2.90,
    dcfRatio: 1.18,
    fairValue: 2.85,
    valuation: 'Overvalued',
    upside: -16.4
  },
  {
    asset: 'BNB',
    symbol: 'BNB',
    currentPrice: 697.23,
    metcalfeValue: 750,
    metcalfeRatio: 0.93,
    s2fValue: 0,
    s2fRatio: 0,
    dcfValue: 820,
    dcfRatio: 0.85,
    fairValue: 785,
    valuation: 'Undervalued',
    upside: 12.6
  }
]

function getValuationColor(valuation: string): string {
  switch (valuation) {
    case 'Undervalued': return 'border-green-500/30 text-green-400'
    case 'Fair Value': return 'border-blue-500/30 text-blue-400'
    case 'Overvalued': return 'border-red-500/30 text-red-400'
    default: return 'border-gray-500/30 text-gray-400'
  }
}

function getUpsideColor(upside: number): string {
  if (upside > 10) return 'text-green-400'
  if (upside > 0) return 'text-blue-400'
  return 'text-red-400'
}

export default function ValuationModels() {
  return (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-orange-500" />
              <span>Metcalfe's Law</span>
            </CardTitle>
            <CardDescription>Network value vs active addresses</CardDescription>
          </CardHeader>
          <CardContent>
            <MetcalfeModelChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-orange-500" />
              <span>Stock-to-Flow</span>
            </CardTitle>
            <CardDescription>Scarcity-based valuation model</CardDescription>
          </CardHeader>
          <CardContent>
            <StockToFlowChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-orange-500" />
              <span>DCF Analysis</span>
            </CardTitle>
            <CardDescription>Discounted cash flow valuations</CardDescription>
          </CardHeader>
          <CardContent>
            <DCFModelChart />
          </CardContent>
        </Card>
      </div>

      {/* Valuation Models Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-orange-500" />
            <span>Comprehensive Valuation Analysis</span>
          </CardTitle>
          <CardDescription>Multiple valuation models and fair value estimates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr className="text-gray-400">
                  <th className="text-left py-3 px-2">Asset</th>
                  <th className="text-right py-3 px-2">Current Price</th>
                  <th className="text-right py-3 px-2">Metcalfe Value</th>
                  <th className="text-right py-3 px-2">S2F Value</th>
                  <th className="text-right py-3 px-2">DCF Value</th>
                  <th className="text-right py-3 px-2">Fair Value</th>
                  <th className="text-right py-3 px-2">Valuation</th>
                  <th className="text-right py-3 px-2">Upside/Downside</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {valuationMetrics.map((asset) => (
                  <tr key={asset.symbol} className="hover:bg-gray-800/30">
                    <td className="py-4 px-2">
                      <div>
                        <div className="font-semibold text-white">{asset.asset}</div>
                        <div className="text-gray-400 text-xs">{asset.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      ${asset.currentPrice.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="text-white font-mono">${asset.metcalfeValue.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Ratio: {asset.metcalfeRatio.toFixed(2)}</div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      {asset.s2fValue > 0 ? (
                        <div>
                          <div className="text-white font-mono">${asset.s2fValue.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Ratio: {asset.s2fRatio.toFixed(2)}</div>
                        </div>
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="text-white font-mono">${asset.dcfValue.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Ratio: {asset.dcfRatio.toFixed(2)}</div>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      ${asset.fairValue.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={getValuationColor(asset.valuation)}
                      >
                        {asset.valuation}
                      </Badge>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className={`font-mono ${getUpsideColor(asset.upside)}`}>
                        {asset.upside > 0 ? '+' : ''}{asset.upside.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Undervalued Assets</div>
                <div className="text-2xl font-bold text-white">4/5</div>
                <div className="text-xs text-green-400">Buying opportunities</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Calculator className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg Model Accuracy</div>
                <div className="text-2xl font-bold text-white">84%</div>
                <div className="text-xs text-blue-400">Historical performance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Market Premium</div>
                <div className="text-2xl font-bold text-white">-5.8%</div>
                <div className="text-xs text-green-400">Below fair value</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Target className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg Upside Potential</div>
                <div className="text-2xl font-bold text-white">5.6%</div>
                <div className="text-xs text-green-400">Price appreciation</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
