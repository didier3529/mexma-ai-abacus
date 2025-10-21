
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Coins,
  Activity,
  BarChart3
} from 'lucide-react'
import MarketCapChart from './market-cap-chart'
import SupplyAnalysisChart from './supply-analysis-chart'

// Mock data for top cryptocurrencies
const tokenMetrics = [
  {
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 118375.70,
    marketCap: 2340000000000,
    circulatingSupply: 19760000,
    totalSupply: 21000000,
    fdv: 2478000000000,
    mcToRealizedCap: 2.84,
    change24h: -0.78,
    volume24h: 28500000000
  },
  {
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3847.92,
    marketCap: 462000000000,
    circulatingSupply: 120100000,
    totalSupply: 120100000,
    fdv: 462000000000,
    mcToRealizedCap: 1.67,
    change24h: 2.14,
    volume24h: 18200000000
  },
  {
    rank: 3,
    name: 'Solana',
    symbol: 'SOL',
    price: 264.85,
    marketCap: 126800000000,
    circulatingSupply: 478900000,
    totalSupply: 587900000,
    fdv: 155700000000,
    mcToRealizedCap: 3.12,
    change24h: 4.76,
    volume24h: 4200000000
  },
  {
    rank: 4,
    name: 'XRP',
    symbol: 'XRP',
    price: 3.41,
    marketCap: 196200000000,
    circulatingSupply: 57500000000,
    totalSupply: 100000000000,
    fdv: 341000000000,
    mcToRealizedCap: 1.89,
    change24h: -1.23,
    volume24h: 8900000000
  },
  {
    rank: 5,
    name: 'BNB',
    symbol: 'BNB',
    price: 697.23,
    marketCap: 100900000000,
    circulatingSupply: 144700000,
    totalSupply: 144700000,
    fdv: 100900000000,
    mcToRealizedCap: 2.45,
    change24h: 1.87,
    volume24h: 2100000000
  }
]

function formatNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  return `$${num.toLocaleString()}`
}

function formatSupply(num: number): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
  return num.toLocaleString()
}

export default function TokenMetricsOverview() {
  return (
    <div className="space-y-6">
      {/* Top Section - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-orange-500" />
              <span>Market Cap Distribution</span>
            </CardTitle>
            <CardDescription>Top cryptocurrencies by market capitalization</CardDescription>
          </CardHeader>
          <CardContent>
            <MarketCapChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coins className="h-5 w-5 text-orange-500" />
              <span>Supply Analysis</span>
            </CardTitle>
            <CardDescription>Circulating vs total supply comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <SupplyAnalysisChart />
          </CardContent>
        </Card>
      </div>

      {/* Market Cap Rankings Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-orange-500" />
            <span>Token Metrics Rankings</span>
          </CardTitle>
          <CardDescription>Comprehensive token fundamentals analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr className="text-gray-400">
                  <th className="text-left py-3 px-2">Rank</th>
                  <th className="text-left py-3 px-2">Asset</th>
                  <th className="text-right py-3 px-2">Price</th>
                  <th className="text-right py-3 px-2">24h %</th>
                  <th className="text-right py-3 px-2">Market Cap</th>
                  <th className="text-right py-3 px-2">FDV</th>
                  <th className="text-right py-3 px-2">Circulating</th>
                  <th className="text-right py-3 px-2">MC/RC Ratio</th>
                  <th className="text-right py-3 px-2">Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {tokenMetrics.map((token) => (
                  <tr key={token.symbol} className="hover:bg-gray-800/30">
                    <td className="py-4 px-2">
                      <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                        #{token.rank}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <div>
                        <div className="font-semibold text-white">{token.name}</div>
                        <div className="text-gray-400 text-xs">{token.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      ${token.price.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${
                        token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {token.change24h >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{Math.abs(token.change24h).toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {formatNumber(token.marketCap)}
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {formatNumber(token.fdv)}
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {formatSupply(token.circulatingSupply)}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={`${
                          token.mcToRealizedCap > 3 ? 'border-red-500/30 text-red-400' :
                          token.mcToRealizedCap > 2 ? 'border-yellow-500/30 text-yellow-400' :
                          'border-green-500/30 text-green-400'
                        }`}
                      >
                        {token.mcToRealizedCap.toFixed(2)}
                      </Badge>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {formatNumber(token.volume24h)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-orange-500" />
            <span>Market Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <div className="text-sm text-gray-400">Bitcoin Dominance</div>
              <div className="text-2xl font-bold text-white">52.8%</div>
              <div className="text-xs text-green-400">+0.3% from yesterday</div>
            </div>
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <div className="text-sm text-gray-400">Average FDV/MC Ratio</div>
              <div className="text-2xl font-bold text-white">1.34</div>
              <div className="text-xs text-gray-400">Low inflation pressure</div>
            </div>
            <div className="p-4 bg-gray-800/30 rounded-lg">
              <div className="text-sm text-gray-400">Market Health Score</div>
              <div className="text-2xl font-bold text-orange-400">78/100</div>
              <div className="text-xs text-yellow-400">Good fundamentals</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
