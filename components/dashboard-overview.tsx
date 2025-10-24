
'use client'

import {
    Activity,
    AlertTriangle,
    BarChart3,
    Brain,
    DollarSign,
    Network,
    Search,
    Shield,
    TrendingDown,
    TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ComponentType<any>
  description?: string
}

function MetricCard({ title, value, change, trend, icon: Icon, description }: MetricCardProps) {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Activity

  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
        <Icon className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className={`text-xs flex items-center space-x-1 ${trendColors[trend]}`}>
          <TrendIcon className="h-3 w-3" />
          <span>{change}</span>
        </div>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

interface QuickActionProps {
  title: string
  description: string
  icon: React.ComponentType<any>
  onClick: () => void
}

function QuickAction({ title, description, icon: Icon, onClick }: QuickActionProps) {
  return (
    <Card 
      className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 cursor-pointer transition-colors group"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
            <Icon className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h3 className="font-medium text-white">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface DashboardOverviewProps {
  onSectionChange: (sectionId: string) => void
}

export default function DashboardOverview({ onSectionChange }: DashboardOverviewProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Real-time crypto intelligence and analytics platform</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Threats"
          value="12"
          change="+2 from yesterday"
          trend="up"
          icon={AlertTriangle}
          description="Critical security alerts"
        />
        <MetricCard
          title="Protocols Monitored"
          value="247"
          change="+15 this week"
          trend="up"
          icon={Activity}
          description="DeFi protocols tracked"
        />
        <MetricCard
          title="Trading Signals"
          value="8 Buy"
          change="3 new signals"
          trend="up"
          icon={TrendingUp}
          description="AI-generated signals"
        />
        <MetricCard
          title="Total TVL Tracked"
          value="$67.4B"
          change="+$2.1B (24h)"
          trend="up"
          icon={DollarSign}
          description="Across all monitored protocols"
        />
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trading & Predictions */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <span>Trading & Predictions</span>
            </CardTitle>
            <CardDescription>AI-powered market analysis and predictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">BTC 24h Target</div>
                <div className="text-white font-semibold">$117,450</div>
              </div>
              <div>
                <div className="text-gray-400">Confidence</div>
                <div className="text-green-400 font-semibold">82%</div>
              </div>
            </div>
            <div className="space-y-2">
              <QuickAction
                title="View AI Predictions"
                description="Latest price targets & signals"
                icon={Brain}
                onClick={() => onSectionChange('ai-predictions')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Intelligence & Security */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-orange-500" />
              <span>Intelligence & Security</span>
            </CardTitle>
            <CardDescription>Threat monitoring and whale tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Whale Alerts</div>
                <div className="text-white font-semibold">847 (24h)</div>
              </div>
              <div>
                <div className="text-gray-400">Risk Level</div>
                <div className="text-yellow-400 font-semibold">Medium</div>
              </div>
            </div>
            <div className="space-y-2">
              <QuickAction
                title="View Threat Intel"
                description="Active security alerts"
                icon={AlertTriangle}
                onClick={() => onSectionChange('threat-intelligence')}
              />
            </div>
          </CardContent>
        </Card>

        {/* DeFi & Yield */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-orange-500" />
              <span>DeFi & Yield</span>
            </CardTitle>
            <CardDescription>Protocol monitoring and yield analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Avg APY</div>
                <div className="text-white font-semibold">12.4%</div>
              </div>
              <div>
                <div className="text-gray-400">MEV Revenue</div>
                <div className="text-green-400 font-semibold">847 ETH</div>
              </div>
            </div>
            <div className="space-y-2">
              <QuickAction
                title="View DeFi Protocols"
                description="Protocol health & yields"
                icon={Activity}
                onClick={() => onSectionChange('defi-monitoring')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Network & Flow Analysis */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Network className="h-5 w-5 text-orange-500" />
              <span>Network & Flow Analysis</span>
            </CardTitle>
            <CardDescription>Blockchain flow and cross-chain analytics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Active Nodes</div>
                <div className="text-white font-semibold">847K</div>
              </div>
              <div>
                <div className="text-gray-400">Flow Volume</div>
                <div className="text-blue-400 font-semibold">$847M</div>
              </div>
            </div>
            <div className="space-y-2">
              <QuickAction
                title="View Network Flows"
                description="Real-time transaction analysis"
                icon={Network}
                onClick={() => onSectionChange('network-visualization')}
              />
            </div>
          </CardContent>
        </Card>
        {/* Market Research */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-orange-500" />
              <span>Market Research</span>
            </CardTitle>
            <CardDescription>Fundamental analysis and valuation models</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Market Health</div>
                <div className="text-white font-semibold">78/100</div>
              </div>
              <div>
                <div className="text-gray-400">Avg P/S Ratio</div>
                <div className="text-yellow-400 font-semibold">13.4x</div>
              </div>
            </div>
            <div className="space-y-2">
              <QuickAction
                title="Fundamental Analysis"
                description="Token metrics & valuation"
                icon={BarChart3}
                onClick={() => onSectionChange('fundamental-analysis')}
              />
              <QuickAction
                title="Technical Analysis Tool"
                description="Charts, indicators & patterns"
                icon={Activity}
                onClick={() => onSectionChange('technical-analysis')}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest alerts and significant events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <div className="text-sm text-white">Critical: New DeFi exploit detected on Ethereum</div>
                <div className="text-xs text-gray-400">2 minutes ago • $2.3M affected</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <div className="text-sm text-white">Whale Alert: Large BTC movement detected</div>
                <div className="text-xs text-gray-400">15 minutes ago • 1,250 BTC transferred</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="text-sm text-white">AI Signal: Strong buy signal for ETH</div>
                <div className="text-xs text-gray-400">1 hour ago • 87% confidence</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <div className="text-sm text-white">Network: High MEV activity on Arbitrum</div>
                <div className="text-xs text-gray-400">2 hours ago • 45 ETH extracted</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
