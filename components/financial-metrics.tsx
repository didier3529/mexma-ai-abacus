
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Percent,
  Activity,
  PieChart
} from 'lucide-react'
import PSRatioChart from './ps-ratio-chart'
import TVLAnalysisChart from './tvl-analysis-chart'
import RevenueMultipleChart from './revenue-multiple-chart'

// Mock financial data for DeFi protocols
const financialMetrics = [
  {
    protocol: 'Uniswap',
    symbol: 'UNI',
    tvl: 4200000000,
    tvlChange: 3.4,
    marketCap: 8900000000,
    psRatio: 12.4,
    revenue: 180000000,
    revenueChange: 15.7,
    feeAPY: 8.9,
    multiple: 49.4,
    category: 'DEX'
  },
  {
    protocol: 'Aave',
    symbol: 'AAVE',
    tvl: 6700000000,
    tvlChange: -2.1,
    marketCap: 2100000000,
    psRatio: 8.7,
    revenue: 89000000,
    revenueChange: 8.2,
    feeAPY: 12.3,
    multiple: 23.6,
    category: 'Lending'
  },
  {
    protocol: 'MakerDAO',
    symbol: 'MKR',
    tvl: 5400000000,
    tvlChange: 1.8,
    marketCap: 2800000000,
    psRatio: 15.2,
    revenue: 67000000,
    revenueChange: -3.4,
    feeAPY: 15.8,
    multiple: 41.8,
    category: 'CDP'
  },
  {
    protocol: 'Compound',
    symbol: 'COMP',
    tvl: 2100000000,
    tvlChange: -5.7,
    marketCap: 1200000000,
    psRatio: 22.1,
    revenue: 34000000,
    revenueChange: -12.3,
    feeAPY: 6.7,
    multiple: 35.3,
    category: 'Lending'
  },
  {
    protocol: 'Curve',
    symbol: 'CRV',
    tvl: 3800000000,
    tvlChange: 7.2,
    marketCap: 890000000,
    psRatio: 8.9,
    revenue: 78000000,
    revenueChange: 23.4,
    feeAPY: 11.4,
    multiple: 11.4,
    category: 'DEX'
  }
]

function formatNumber(num: number): string {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  return `$${num.toLocaleString()}`
}

function getPSRatioColor(ratio: number): string {
  if (ratio < 10) return 'border-green-500/30 text-green-400'
  if (ratio < 20) return 'border-yellow-500/30 text-yellow-400'
  return 'border-red-500/30 text-red-400'
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'DEX': return 'border-blue-500/30 text-blue-400'
    case 'Lending': return 'border-green-500/30 text-green-400'
    case 'CDP': return 'border-orange-500/30 text-orange-400'
    default: return 'border-gray-500/30 text-gray-400'
  }
}

export default function FinancialMetrics() {
  return (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Percent className="h-5 w-5 text-orange-500" />
              <span>P/S Ratios</span>
            </CardTitle>
            <CardDescription>Price-to-Sales comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <PSRatioChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-orange-500" />
              <span>TVL Analysis</span>
            </CardTitle>
            <CardDescription>Total Value Locked trends</CardDescription>
          </CardHeader>
          <CardContent>
            <TVLAnalysisChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <span>Revenue Multiples</span>
            </CardTitle>
            <CardDescription>Market cap to revenue ratio</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueMultipleChart />
          </CardContent>
        </Card>
      </div>

      {/* Financial Metrics Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-orange-500" />
            <span>DeFi Protocol Financial Analysis</span>
          </CardTitle>
          <CardDescription>Comprehensive financial metrics and valuation ratios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr className="text-gray-400">
                  <th className="text-left py-3 px-2">Protocol</th>
                  <th className="text-right py-3 px-2">TVL</th>
                  <th className="text-right py-3 px-2">Market Cap</th>
                  <th className="text-right py-3 px-2">P/S Ratio</th>
                  <th className="text-right py-3 px-2">Revenue (30d)</th>
                  <th className="text-right py-3 px-2">Fee APY</th>
                  <th className="text-right py-3 px-2">Multiple</th>
                  <th className="text-right py-3 px-2">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {financialMetrics.map((protocol) => (
                  <tr key={protocol.symbol} className="hover:bg-gray-800/30">
                    <td className="py-4 px-2">
                      <div>
                        <div className="font-semibold text-white">{protocol.protocol}</div>
                        <div className="text-gray-400 text-xs">{protocol.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="text-white font-mono">{formatNumber(protocol.tvl)}</div>
                      <div className={`text-xs flex items-center justify-end space-x-1 ${
                        protocol.tvlChange >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {protocol.tvlChange >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{Math.abs(protocol.tvlChange).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {formatNumber(protocol.marketCap)}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={getPSRatioColor(protocol.psRatio)}
                      >
                        {protocol.psRatio.toFixed(1)}x
                      </Badge>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="text-white font-mono">{formatNumber(protocol.revenue)}</div>
                      <div className={`text-xs flex items-center justify-end space-x-1 ${
                        protocol.revenueChange >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {protocol.revenueChange >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{Math.abs(protocol.revenueChange).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {protocol.feeAPY.toFixed(1)}%
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {protocol.multiple.toFixed(1)}x
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={getCategoryColor(protocol.category)}
                      >
                        {protocol.category}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total TVL</div>
                <div className="text-2xl font-bold text-white">$22.2B</div>
                <div className="text-xs text-green-400">+1.9% (7d)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Activity className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg Revenue Growth</div>
                <div className="text-2xl font-bold text-white">6.2%</div>
                <div className="text-xs text-green-400">Month over month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Percent className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Median P/S Ratio</div>
                <div className="text-2xl font-bold text-white">13.4x</div>
                <div className="text-xs text-yellow-400">Fair valuation</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg Fee APY</div>
                <div className="text-2xl font-bold text-white">11.0%</div>
                <div className="text-xs text-green-400">Attractive yield</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
