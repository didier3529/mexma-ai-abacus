
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Coins,
  TrendingUp,
  TrendingDown,
  Flame,
  Lock,
  Calendar,
  Percent
} from 'lucide-react'
import InflationRateChart from './inflation-rate-chart'
import StakingRewardsChart from './staking-rewards-chart'
import TokenBurnChart from './token-burn-chart'

// Mock tokenomics data
const tokenomicsMetrics = [
  {
    token: 'Ethereum',
    symbol: 'ETH',
    inflationRate: -0.8,
    stakingApy: 3.2,
    stakedSupply: 28.4,
    burnRate: 2.1,
    burnAmount: 847283,
    vestingUnlocks: 0,
    nextUnlock: 'None',
    mechanism: 'Deflationary'
  },
  {
    token: 'Solana',
    symbol: 'SOL',
    inflationRate: 5.8,
    stakingApy: 6.9,
    stakedSupply: 67.2,
    burnRate: 0,
    burnAmount: 0,
    vestingUnlocks: 12.8,
    nextUnlock: 'Feb 15, 2025',
    mechanism: 'Inflationary'
  },
  {
    token: 'Cardano',
    symbol: 'ADA',
    inflationRate: 4.2,
    stakingApy: 4.8,
    stakedSupply: 73.1,
    burnRate: 0,
    burnAmount: 0,
    vestingUnlocks: 0,
    nextUnlock: 'None',
    mechanism: 'Moderate Inflation'
  },
  {
    token: 'Polygon',
    symbol: 'MATIC',
    inflationRate: 3.6,
    stakingApy: 5.2,
    stakedSupply: 45.7,
    burnRate: 0.8,
    burnAmount: 234567,
    vestingUnlocks: 8.3,
    nextUnlock: 'Mar 1, 2025',
    mechanism: 'Low Inflation'
  },
  {
    token: 'BNB',
    symbol: 'BNB',
    inflationRate: -2.1,
    stakingApy: 8.4,
    stakedSupply: 34.9,
    burnRate: 1.2,
    burnAmount: 456789,
    vestingUnlocks: 0,
    nextUnlock: 'None',
    mechanism: 'Deflationary'
  }
]

function getInflationColor(rate: number): string {
  if (rate < 0) return 'border-green-500/30 text-green-400'
  if (rate < 3) return 'border-blue-500/30 text-blue-400'
  if (rate < 6) return 'border-yellow-500/30 text-yellow-400'
  return 'border-red-500/30 text-red-400'
}

function getMechanismColor(mechanism: string): string {
  switch (mechanism) {
    case 'Deflationary': return 'border-green-500/30 text-green-400'
    case 'Low Inflation': return 'border-blue-500/30 text-blue-400'
    case 'Moderate Inflation': return 'border-yellow-500/30 text-yellow-400'
    case 'Inflationary': return 'border-red-500/30 text-red-400'
    default: return 'border-gray-500/30 text-gray-400'
  }
}

export default function TokenomicsAnalysis() {
  return (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Percent className="h-5 w-5 text-orange-500" />
              <span>Inflation Rates</span>
            </CardTitle>
            <CardDescription>Annual inflation/deflation rates</CardDescription>
          </CardHeader>
          <CardContent>
            <InflationRateChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-orange-500" />
              <span>Staking Rewards</span>
            </CardTitle>
            <CardDescription>APY and staking participation</CardDescription>
          </CardHeader>
          <CardContent>
            <StakingRewardsChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span>Token Burns</span>
            </CardTitle>
            <CardDescription>Burn mechanisms and impact</CardDescription>
          </CardHeader>
          <CardContent>
            <TokenBurnChart />
          </CardContent>
        </Card>
      </div>

      {/* Tokenomics Metrics Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-orange-500" />
            <span>Tokenomics Analysis</span>
          </CardTitle>
          <CardDescription>Comprehensive tokenomics metrics and mechanisms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr className="text-gray-400">
                  <th className="text-left py-3 px-2">Token</th>
                  <th className="text-right py-3 px-2">Inflation Rate</th>
                  <th className="text-right py-3 px-2">Staking APY</th>
                  <th className="text-right py-3 px-2">Staked %</th>
                  <th className="text-right py-3 px-2">Burn Rate</th>
                  <th className="text-right py-3 px-2">Pending Unlocks</th>
                  <th className="text-right py-3 px-2">Next Unlock</th>
                  <th className="text-right py-3 px-2">Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {tokenomicsMetrics.map((token) => (
                  <tr key={token.symbol} className="hover:bg-gray-800/30">
                    <td className="py-4 px-2">
                      <div>
                        <div className="font-semibold text-white">{token.token}</div>
                        <div className="text-gray-400 text-xs">{token.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={getInflationColor(token.inflationRate)}
                      >
                        {token.inflationRate > 0 ? '+' : ''}{token.inflationRate.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {token.stakingApy.toFixed(1)}%
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {token.stakedSupply.toFixed(1)}%
                    </td>
                    <td className="py-4 px-2 text-right">
                      {token.burnRate > 0 ? (
                        <div>
                          <div className="text-white font-mono">{token.burnRate.toFixed(1)}%</div>
                          <div className="text-xs text-gray-400">{token.burnAmount.toLocaleString()} tokens</div>
                        </div>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </td>
                    <td className="py-4 px-2 text-right">
                      {token.vestingUnlocks > 0 ? (
                        <span className="text-orange-400 font-mono">{token.vestingUnlocks.toFixed(1)}%</span>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </td>
                    <td className="py-4 px-2 text-right text-gray-300 text-xs">
                      {token.nextUnlock}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={getMechanismColor(token.mechanism)}
                      >
                        {token.mechanism}
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
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Percent className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg Inflation Rate</div>
                <div className="text-2xl font-bold text-white">2.1%</div>
                <div className="text-xs text-green-400">Low pressure</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Lock className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg Staking APY</div>
                <div className="text-2xl font-bold text-white">5.7%</div>
                <div className="text-xs text-blue-400">Attractive yields</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Flame className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Monthly Burns</div>
                <div className="text-2xl font-bold text-white">1.54M</div>
                <div className="text-xs text-orange-400">Tokens burned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Pending Unlocks</div>
                <div className="text-2xl font-bold text-white">21.1%</div>
                <div className="text-xs text-yellow-400">Supply dilution</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
