
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Activity,
  Users,
  DollarSign,
  Shield,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import ActiveAddressChart from './active-address-chart'
import TransactionVolumeChart from './transaction-volume-chart'
import NVTRatioChart from './nvt-ratio-chart'

// Mock on-chain data
const onChainMetrics = [
  {
    chain: 'Bitcoin',
    symbol: 'BTC',
    activeAddresses: 847523,
    activeChange: 2.4,
    txVolume: 28500000000,
    volumeChange: -1.2,
    nvtRatio: 42.7,
    nvtRating: 'high',
    hashRate: 847.2,
    hashChange: 1.8,
    networkSecurity: 'Very High'
  },
  {
    chain: 'Ethereum',
    symbol: 'ETH',
    activeAddresses: 634821,
    activeChange: 4.7,
    txVolume: 18200000000,
    volumeChange: 3.4,
    nvtRatio: 18.4,
    nvtRating: 'normal',
    hashRate: 0, // PoS
    hashChange: 0,
    networkSecurity: 'High'
  },
  {
    chain: 'Solana',
    symbol: 'SOL',
    activeAddresses: 423167,
    activeChange: 8.9,
    txVolume: 4200000000,
    volumeChange: 12.7,
    nvtRatio: 14.2,
    nvtRating: 'low',
    hashRate: 0,
    hashChange: 0,
    networkSecurity: 'Medium'
  },
  {
    chain: 'Polygon',
    symbol: 'MATIC',
    activeAddresses: 892341,
    activeChange: 15.6,
    txVolume: 1800000000,
    volumeChange: 8.3,
    nvtRatio: 8.7,
    nvtRating: 'low',
    hashRate: 0,
    hashChange: 0,
    networkSecurity: 'Medium'
  },
  {
    chain: 'Arbitrum',
    symbol: 'ARB',
    activeAddresses: 234567,
    activeChange: 23.4,
    txVolume: 2100000000,
    volumeChange: 18.9,
    nvtRatio: 12.3,
    nvtRating: 'low',
    hashRate: 0,
    hashChange: 0,
    networkSecurity: 'Medium'
  }
]

function formatNumber(num: number): string {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
  return num.toLocaleString()
}

function getNVTColor(rating: string): string {
  switch (rating) {
    case 'low': return 'border-green-500/30 text-green-400'
    case 'normal': return 'border-yellow-500/30 text-yellow-400'
    case 'high': return 'border-red-500/30 text-red-400'
    default: return 'border-gray-500/30 text-gray-400'
  }
}

export default function OnChainFundamentals() {
  return (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-500" />
              <span>Active Addresses</span>
            </CardTitle>
            <CardDescription>7-day growth trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ActiveAddressChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-orange-500" />
              <span>Transaction Volume</span>
            </CardTitle>
            <CardDescription>Daily volume trends</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionVolumeChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-orange-500" />
              <span>NVT Ratios</span>
            </CardTitle>
            <CardDescription>Network value to transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <NVTRatioChart />
          </CardContent>
        </Card>
      </div>

      {/* On-Chain Metrics Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-orange-500" />
            <span>Network Fundamentals</span>
          </CardTitle>
          <CardDescription>Comprehensive on-chain health metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr className="text-gray-400">
                  <th className="text-left py-3 px-2">Network</th>
                  <th className="text-right py-3 px-2">Active Addresses</th>
                  <th className="text-right py-3 px-2">7d Change</th>
                  <th className="text-right py-3 px-2">TX Volume (24h)</th>
                  <th className="text-right py-3 px-2">Volume Change</th>
                  <th className="text-right py-3 px-2">NVT Ratio</th>
                  <th className="text-right py-3 px-2">Hash Rate (EH/s)</th>
                  <th className="text-right py-3 px-2">Security</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {onChainMetrics.map((network) => (
                  <tr key={network.symbol} className="hover:bg-gray-800/30">
                    <td className="py-4 px-2">
                      <div>
                        <div className="font-semibold text-white">{network.chain}</div>
                        <div className="text-gray-400 text-xs">{network.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {network.activeAddresses.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${
                        network.activeChange >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {network.activeChange >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{Math.abs(network.activeChange).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {formatNumber(network.txVolume)}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${
                        network.volumeChange >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {network.volumeChange >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{Math.abs(network.volumeChange).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={getNVTColor(network.nvtRating)}
                      >
                        {network.nvtRatio.toFixed(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {network.hashRate > 0 ? `${network.hashRate} EH/s` : 'PoS'}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={
                          network.networkSecurity === 'Very High' ? 'border-green-500/30 text-green-400' :
                          network.networkSecurity === 'High' ? 'border-blue-500/30 text-blue-400' :
                          'border-yellow-500/30 text-yellow-400'
                        }
                      >
                        {network.networkSecurity}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Network Health Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Active Users</div>
                <div className="text-2xl font-bold text-white">3.2M</div>
                <div className="text-xs text-green-400">+7.8% (7d)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg TX per Second</div>
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="text-xs text-blue-400">Peak: 2,891 TPS</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Shield className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Network Health</div>
                <div className="text-2xl font-bold text-white">92/100</div>
                <div className="text-xs text-green-400">Excellent</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
