
'use client'

import { Activity, Eye, GitBranch, Network, Shield, Zap } from 'lucide-react'
import ForceDirectedGraph from './force-directed-graph'
import SankeyDiagram from './sankey-diagram'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface NetworkNode {
  id: string
  label: string
  type: 'wallet' | 'exchange' | 'contract' | 'mixer' | 'bridge'
  balance: string
  risk: number
  transactions: number
  connections: number
}

interface NetworkFlow {
  id: string
  source: string
  target: string
  amount: string
  amountUsd: string
  asset: string
  timestamp: string
  risk: 'high' | 'medium' | 'low'
  type: 'transfer' | 'swap' | 'bridge' | 'deposit' | 'withdrawal'
}

interface ClusterData {
  id: string
  name: string
  type: 'exchange' | 'defi' | 'institutional' | 'suspicious' | 'unknown'
  wallets: number
  totalValue: string
  risk: number
  activity: number
}

const networkNodes: NetworkNode[] = [
  {
    id: '1',
    label: 'Binance Hot Wallet',
    type: 'exchange',
    balance: '847,392 ETH',
    risk: 15,
    transactions: 12847,
    connections: 2847
  },
  {
    id: '2',
    label: 'Uniswap V3 Router',
    type: 'contract',
    balance: '234,891 ETH',
    risk: 25,
    transactions: 8493,
    connections: 1924
  },
  {
    id: '3',
    label: 'Whale Wallet Alpha',
    type: 'wallet',
    balance: '89,472 ETH',
    risk: 45,
    transactions: 2847,
    connections: 438
  },
  {
    id: '4',
    label: 'Tornado Cash',
    type: 'mixer',
    balance: '47,283 ETH',
    risk: 95,
    transactions: 5847,
    connections: 924
  },
  {
    id: '5',
    label: 'Arbitrum Bridge',
    type: 'bridge',
    balance: '156,847 ETH',
    risk: 30,
    transactions: 3928,
    connections: 1847
  },
  {
    id: '6',
    label: 'Coinbase Custody',
    type: 'exchange',
    balance: '392,847 ETH',
    risk: 10,
    transactions: 6847,
    connections: 2938
  }
]

const networkFlows: NetworkFlow[] = [
  {
    id: '1',
    source: 'Whale Wallet Alpha',
    target: 'Binance Hot Wallet',
    amount: '247.8 ETH',
    amountUsd: '$847,294',
    asset: 'ETH',
    timestamp: '2 min ago',
    risk: 'medium',
    type: 'transfer'
  },
  {
    id: '2',
    source: 'Tornado Cash',
    target: 'Unknown Wallet',
    amount: '89.4 ETH',
    amountUsd: '$305,847',
    asset: 'ETH',
    timestamp: '5 min ago',
    risk: 'high',
    type: 'withdrawal'
  },
  {
    id: '3',
    source: 'Arbitrum Bridge',
    target: 'Uniswap V3 Router',
    amount: '1,847 ETH',
    amountUsd: '$6,324,847',
    asset: 'ETH',
    timestamp: '8 min ago',
    risk: 'low',
    type: 'bridge'
  },
  {
    id: '4',
    source: 'Coinbase Custody',
    target: 'Institutional Wallet',
    amount: '4,847 ETH',
    amountUsd: '$16,594,847',
    asset: 'ETH',
    timestamp: '12 min ago',
    risk: 'low',
    type: 'transfer'
  },
  {
    id: '5',
    source: 'DEX Aggregator',
    target: 'Multiple Wallets',
    amount: '294.7 ETH',
    amountUsd: '$1,008,472',
    asset: 'ETH',
    timestamp: '15 min ago',
    risk: 'medium',
    type: 'swap'
  }
]

const clusterData: ClusterData[] = [
  {
    id: '1',
    name: 'Centralized Exchanges',
    type: 'exchange',
    wallets: 2847,
    totalValue: '$47.8B',
    risk: 20,
    activity: 94
  },
  {
    id: '2',
    name: 'DeFi Protocols',
    type: 'defi',
    wallets: 8392,
    totalValue: '$23.4B',
    risk: 35,
    activity: 87
  },
  {
    id: '3',
    name: 'Institutional Holders',
    type: 'institutional',
    wallets: 847,
    totalValue: '$15.9B',
    risk: 15,
    activity: 78
  },
  {
    id: '4',
    name: 'Suspicious Entities',
    type: 'suspicious',
    wallets: 294,
    totalValue: '$2.8B',
    risk: 89,
    activity: 92
  },
  {
    id: '5',
    name: 'Unknown Clusters',
    type: 'unknown',
    wallets: 1847,
    totalValue: '$8.4B',
    risk: 67,
    activity: 83
  }
]

export default function NetworkFlowVisualization() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 mexma-gradient rounded-lg flex items-center justify-center">
            <Network className="w-4 h-4 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mexma-text-gradient">Network Flow Visualization</h2>
            <p className="text-gray-400">Real-time blockchain transaction flow analysis</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Live Network Scan</span>
          </div>
          <div className="text-orange-400 font-medium">847K Active Nodes</div>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Flows</p>
                <p className="text-2xl font-bold text-white">8,472</p>
                <p className="text-xs text-green-400">+12.4% from last hour</p>
              </div>
              <Activity className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Network Risk</p>
                <p className="text-2xl font-bold text-red-400">High</p>
                <p className="text-xs text-red-400">47 suspicious flows detected</p>
              </div>
              <Shield className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Flow Volume</p>
                <p className="text-2xl font-bold text-white">$847M</p>
                <p className="text-xs text-orange-400">Last 24 hours</p>
              </div>
              <Zap className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Clusters Found</p>
                <p className="text-2xl font-bold text-white">2,847</p>
                <p className="text-xs text-blue-400">294 new entities</p>
              </div>
              <GitBranch className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Visualization Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Force-Directed Network Graph */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Network className="w-5 h-5 text-orange-400" />
              <span>Interactive Network Graph</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ForceDirectedGraph />
          </CardContent>
        </Card>

        {/* Sankey Flow Diagram */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GitBranch className="w-5 h-5 text-orange-400" />
              <span>Fund Flow Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SankeyDiagram />
          </CardContent>
        </Card>
      </div>

      {/* Network Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Network Flows */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-orange-400" />
              <span>Live Network Flows</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {networkFlows?.map((flow) => (
                <div key={flow?.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-white">{flow?.source}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-sm font-medium text-white">{flow?.target}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-400">{flow?.amount}</span>
                      <span className="text-xs text-orange-400">{flow?.amountUsd}</span>
                      <span className="text-xs text-gray-500">{flow?.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      flow?.risk === 'high' ? 'bg-red-500/20 text-red-400' :
                      flow?.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {flow?.risk}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                      {flow?.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Address Clusters */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-orange-400" />
              <span>Address Clusters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clusterData?.map((cluster) => (
                <div key={cluster?.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-white">{cluster?.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        cluster?.type === 'suspicious' ? 'bg-red-500/20 text-red-400' :
                        cluster?.type === 'exchange' ? 'bg-blue-500/20 text-blue-400' :
                        cluster?.type === 'defi' ? 'bg-purple-500/20 text-purple-400' :
                        cluster?.type === 'institutional' ? 'bg-green-500/20 text-green-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {cluster?.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-400">{cluster?.wallets} wallets</span>
                      <span className="text-xs text-orange-400">{cluster?.totalValue}</span>
                      <span className="text-xs text-gray-500">{cluster?.activity}% active</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      cluster?.risk >= 80 ? 'text-red-400' :
                      cluster?.risk >= 50 ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {cluster?.risk}/100
                    </div>
                    <div className="text-xs text-gray-400">Risk Score</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
