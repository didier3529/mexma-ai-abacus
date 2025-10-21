
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Search,
  TrendingUp,
  DollarSign,
  Activity,
  GitBranch,
  Users,
  Shield,
  BarChart3
} from 'lucide-react'

// Import all section components
import TokenMetricsOverview from './token-metrics-overview'
import OnChainFundamentals from './on-chain-fundamentals'
import FinancialMetrics from './financial-metrics'
import DevelopmentActivity from './development-activity'
import AdoptionGrowthMetrics from './adoption-growth-metrics'
import TokenomicsAnalysis from './tokenomics-analysis'
import ValuationModels from './valuation-models'

export default function FundamentalAnalysisBoard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
            <Search className="h-8 w-8 text-orange-500" />
            <span>Fundamental Analysis Dashboard</span>
          </h1>
          <p className="text-gray-400">Comprehensive crypto asset fundamentals and valuation analysis</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Last Updated</div>
          <div className="text-white font-semibold">{new Date().toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Market Cap</div>
                <div className="text-xl font-bold text-white">$2.14T</div>
                <div className="text-xs text-green-400">+2.8% (24h)</div>
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
                <div className="text-sm text-gray-400">Assets Analyzed</div>
                <div className="text-xl font-bold text-white">847</div>
                <div className="text-xs text-gray-400">Across all chains</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Avg NVT Ratio</div>
                <div className="text-xl font-bold text-white">24.8</div>
                <div className="text-xs text-yellow-400">Neutral zone</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <GitBranch className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Dev Activity</div>
                <div className="text-xl font-bold text-white">8,547</div>
                <div className="text-xs text-green-400">Commits (7d)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="token-metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-gray-900/50 border border-gray-800">
          <TabsTrigger value="token-metrics" className="text-xs">Token Metrics</TabsTrigger>
          <TabsTrigger value="on-chain" className="text-xs">On-Chain</TabsTrigger>
          <TabsTrigger value="financial" className="text-xs">Financial</TabsTrigger>
          <TabsTrigger value="development" className="text-xs">Development</TabsTrigger>
          <TabsTrigger value="adoption" className="text-xs">Adoption</TabsTrigger>
          <TabsTrigger value="tokenomics" className="text-xs">Tokenomics</TabsTrigger>
          <TabsTrigger value="valuation" className="text-xs">Valuation</TabsTrigger>
        </TabsList>

        <TabsContent value="token-metrics" className="space-y-6">
          <TokenMetricsOverview />
        </TabsContent>

        <TabsContent value="on-chain" className="space-y-6">
          <OnChainFundamentals />
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <FinancialMetrics />
        </TabsContent>

        <TabsContent value="development" className="space-y-6">
          <DevelopmentActivity />
        </TabsContent>

        <TabsContent value="adoption" className="space-y-6">
          <AdoptionGrowthMetrics />
        </TabsContent>

        <TabsContent value="tokenomics" className="space-y-6">
          <TokenomicsAnalysis />
        </TabsContent>

        <TabsContent value="valuation" className="space-y-6">
          <ValuationModels />
        </TabsContent>
      </Tabs>
    </div>
  )
}
