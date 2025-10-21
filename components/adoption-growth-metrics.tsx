
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Users,
  TrendingUp,
  TrendingDown,
  Heart,
  Building,
  Target,
  Globe
} from 'lucide-react'
import UserGrowthChart from './user-growth-chart'
import SocialGrowthChart from './social-growth-chart'
import InstitutionalAdoptionChart from './institutional-adoption-chart'

// Mock adoption data
const adoptionMetrics = [
  {
    protocol: 'Ethereum',
    symbol: 'ETH',
    activeUsers: 634821,
    userGrowth: 4.7,
    retention: 78.5,
    partnerships: 247,
    socialFollowers: 2800000,
    socialGrowth: 12.4,
    institutionalScore: 95,
    ecosystem: 'DeFi/NFT/Gaming'
  },
  {
    protocol: 'Solana',
    symbol: 'SOL',
    activeUsers: 423167,
    userGrowth: 18.9,
    retention: 71.2,
    partnerships: 156,
    socialFollowers: 1200000,
    socialGrowth: 34.7,
    institutionalScore: 82,
    ecosystem: 'DeFi/Gaming/Mobile'
  },
  {
    protocol: 'Polygon',
    symbol: 'MATIC',
    activeUsers: 892341,
    userGrowth: 15.6,
    retention: 65.8,
    partnerships: 189,
    socialFollowers: 890000,
    socialGrowth: 28.3,
    institutionalScore: 78,
    ecosystem: 'Gaming/Enterprise'
  },
  {
    protocol: 'Avalanche',
    symbol: 'AVAX',
    activeUsers: 234567,
    userGrowth: 23.4,
    retention: 73.1,
    partnerships: 134,
    socialFollowers: 450000,
    socialGrowth: 41.2,
    institutionalScore: 73,
    ecosystem: 'DeFi/Subnets'
  },
  {
    protocol: 'Arbitrum',
    symbol: 'ARB',
    activeUsers: 345678,
    userGrowth: 67.8,
    retention: 68.9,
    partnerships: 98,
    socialFollowers: 350000,
    socialGrowth: 89.5,
    institutionalScore: 69,
    ecosystem: 'DeFi/Scaling'
  }
]

function getRetentionColor(retention: number): string {
  if (retention >= 75) return 'border-green-500/30 text-green-400'
  if (retention >= 65) return 'border-yellow-500/30 text-yellow-400'
  return 'border-red-500/30 text-red-400'
}

function getInstitutionalColor(score: number): string {
  if (score >= 85) return 'border-green-500/30 text-green-400'
  if (score >= 70) return 'border-blue-500/30 text-blue-400'
  return 'border-orange-500/30 text-orange-400'
}

export default function AdoptionGrowthMetrics() {
  return (
    <div className="space-y-6">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-500" />
              <span>User Growth</span>
            </CardTitle>
            <CardDescription>Monthly active user trends</CardDescription>
          </CardHeader>
          <CardContent>
            <UserGrowthChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-orange-500" />
              <span>Social Growth</span>
            </CardTitle>
            <CardDescription>Social media following growth</CardDescription>
          </CardHeader>
          <CardContent>
            <SocialGrowthChart />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-orange-500" />
              <span>Institutional Adoption</span>
            </CardTitle>
            <CardDescription>Enterprise and institutional metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <InstitutionalAdoptionChart />
          </CardContent>
        </Card>
      </div>

      {/* Adoption Metrics Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-orange-500" />
            <span>Adoption & Growth Analysis</span>
          </CardTitle>
          <CardDescription>Comprehensive adoption metrics across major protocols</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr className="text-gray-400">
                  <th className="text-left py-3 px-2">Protocol</th>
                  <th className="text-right py-3 px-2">Active Users</th>
                  <th className="text-right py-3 px-2">Growth (30d)</th>
                  <th className="text-right py-3 px-2">Retention</th>
                  <th className="text-right py-3 px-2">Partnerships</th>
                  <th className="text-right py-3 px-2">Social Followers</th>
                  <th className="text-right py-3 px-2">Institutional</th>
                  <th className="text-right py-3 px-2">Ecosystem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {adoptionMetrics.map((protocol) => (
                  <tr key={protocol.symbol} className="hover:bg-gray-800/30">
                    <td className="py-4 px-2">
                      <div>
                        <div className="font-semibold text-white">{protocol.protocol}</div>
                        <div className="text-gray-400 text-xs">{protocol.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {protocol.activeUsers.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${
                        protocol.userGrowth >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {protocol.userGrowth >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{Math.abs(protocol.userGrowth).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={getRetentionColor(protocol.retention)}
                      >
                        {protocol.retention.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="py-4 px-2 text-right text-white font-mono">
                      {protocol.partnerships}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="text-white font-mono">{(protocol.socialFollowers / 1000000).toFixed(1)}M</div>
                      <div className={`text-xs flex items-center justify-end space-x-1 ${
                        protocol.socialGrowth >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {protocol.socialGrowth >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{Math.abs(protocol.socialGrowth).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge 
                        variant="outline" 
                        className={getInstitutionalColor(protocol.institutionalScore)}
                      >
                        {protocol.institutionalScore}/100
                      </Badge>
                    </td>
                    <td className="py-4 px-2 text-right text-gray-300 text-xs">
                      {protocol.ecosystem}
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
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Active Users</div>
                <div className="text-2xl font-bold text-white">2.53M</div>
                <div className="text-xs text-green-400">+26.1% (30d)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Heart className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg Social Growth</div>
                <div className="text-2xl font-bold text-white">41.2%</div>
                <div className="text-xs text-blue-400">Last 30 days</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Building className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Partnerships</div>
                <div className="text-2xl font-bold text-white">824</div>
                <div className="text-xs text-orange-400">Active integrations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Globe className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg Retention</div>
                <div className="text-2xl font-bold text-white">71.5%</div>
                <div className="text-xs text-green-400">Strong loyalty</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
