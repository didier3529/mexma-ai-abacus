
'use client'

import { Coins, TrendingUp, Shield, Zap, Target, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import YieldHeatmapChart from './yield-heatmap-chart'
import RiskReturnsChart from './risk-returns-chart'

interface YieldOpportunity {
  id: string
  protocol: string
  chain: string
  pool: string
  apy: number
  tvl: string
  rewards: string[]
  risk: 'low' | 'medium' | 'high'
  impermanentLoss: number
  lockupPeriod: string
  verified: boolean
}

interface LiquidityPool {
  id: string
  protocol: string
  pair: string
  chain: string
  apy: number
  tvl: string
  volume24h: string
  fees24h: string
  impermanentLoss: number
  poolHealth: number
  risks: string[]
}

interface ProtocolRisk {
  id: string
  protocol: string
  category: string
  riskScore: number
  auditStatus: 'audited' | 'unaudited' | 'partial'
  tvlRisk: 'low' | 'medium' | 'high'
  smartContractRisk: number
  liquidityRisk: number
  governanceRisk: number
  lastIncident: string | null
}

interface CrossChainYield {
  id: string
  opportunity: string
  chains: string[]
  baseApy: number
  bridgeApy: number
  totalApy: number
  bridgeCost: string
  timeframe: string
  complexity: 'simple' | 'medium' | 'complex'
}

const yieldOpportunities: YieldOpportunity[] = [
  {
    id: '1',
    protocol: 'Aave V3',
    chain: 'Ethereum',
    pool: 'USDC Lending',
    apy: 23.8,
    tvl: '$2.3B',
    rewards: ['AAVE', 'stkAAVE'],
    risk: 'low',
    impermanentLoss: 0,
    lockupPeriod: 'None',
    verified: true
  },
  {
    id: '2',
    protocol: 'Uniswap V3',
    chain: 'Arbitrum',
    pool: 'ETH/USDC 0.05%',
    apy: 47.3,
    tvl: '$890M',
    rewards: ['ARB', 'UNI'],
    risk: 'medium',
    impermanentLoss: 12.5,
    lockupPeriod: 'None',
    verified: true
  },
  {
    id: '3',
    protocol: 'Curve Finance',
    chain: 'Polygon',
    pool: 'stETH-ETH',
    apy: 34.7,
    tvl: '$456M',
    rewards: ['CRV', 'MATIC'],
    risk: 'low',
    impermanentLoss: 2.1,
    lockupPeriod: 'None',
    verified: true
  },
  {
    id: '4',
    protocol: 'GMX V2',
    chain: 'Arbitrum',
    pool: 'GLP Pool',
    apy: 67.8,
    tvl: '$234M',
    rewards: ['GMX', 'esGMX', 'ARB'],
    risk: 'high',
    impermanentLoss: 8.9,
    lockupPeriod: '15 days',
    verified: true
  }
]

const liquidityPools: LiquidityPool[] = [
  {
    id: '1',
    protocol: 'Uniswap V3',
    pair: 'WETH/USDC',
    chain: 'Ethereum',
    apy: 42.3,
    tvl: '$1.2B',
    volume24h: '$89M',
    fees24h: '$456K',
    impermanentLoss: 15.7,
    poolHealth: 89,
    risks: ['IL Risk', 'Market Risk']
  },
  {
    id: '2',
    protocol: 'Curve',
    pair: '3CRV',
    chain: 'Ethereum',
    apy: 18.9,
    tvl: '$890M',
    volume24h: '$34M',
    fees24h: '$234K',
    impermanentLoss: 1.2,
    poolHealth: 95,
    risks: ['Smart Contract']
  },
  {
    id: '3',
    protocol: 'Balancer',
    pair: 'wstETH/WETH',
    chain: 'Arbitrum',
    apy: 29.4,
    tvl: '$234M',
    volume24h: '$12M',
    fees24h: '$67K',
    impermanentLoss: 4.8,
    poolHealth: 78,
    risks: ['IL Risk', 'Bridge Risk']
  }
]

const protocolRisks: ProtocolRisk[] = [
  {
    id: '1',
    protocol: 'Aave V3',
    category: 'Lending',
    riskScore: 23,
    auditStatus: 'audited',
    tvlRisk: 'low',
    smartContractRisk: 15,
    liquidityRisk: 8,
    governanceRisk: 12,
    lastIncident: null
  },
  {
    id: '2',
    protocol: 'Uniswap V3',
    category: 'DEX',
    riskScore: 31,
    auditStatus: 'audited',
    tvlRisk: 'low',
    smartContractRisk: 18,
    liquidityRisk: 25,
    governanceRisk: 9,
    lastIncident: null
  },
  {
    id: '3',
    protocol: 'GMX V2',
    category: 'Perps',
    riskScore: 67,
    auditStatus: 'partial',
    tvlRisk: 'medium',
    smartContractRisk: 45,
    liquidityRisk: 34,
    governanceRisk: 23,
    lastIncident: '2024-01-15'
  }
]

const crossChainYields: CrossChainYield[] = [
  {
    id: '1',
    opportunity: 'Arbitrum → Polygon USDC',
    chains: ['Arbitrum', 'Polygon'],
    baseApy: 12.3,
    bridgeApy: 8.7,
    totalApy: 21.0,
    bridgeCost: '$2.40',
    timeframe: '7 days',
    complexity: 'simple'
  },
  {
    id: '2',
    opportunity: 'Ethereum → Avalanche ETH',
    chains: ['Ethereum', 'Avalanche'],
    baseApy: 8.9,
    bridgeApy: 15.4,
    totalApy: 24.3,
    bridgeCost: '$12.60',
    timeframe: '14 days',
    complexity: 'medium'
  }
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'high': return 'text-red-400 bg-red-400/10'
    case 'medium': return 'text-orange-400 bg-orange-400/10'
    case 'low': return 'text-green-400 bg-green-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getAuditColor = (status: string) => {
  switch (status) {
    case 'audited': return 'text-green-400 bg-green-400/10'
    case 'partial': return 'text-orange-400 bg-orange-400/10'
    case 'unaudited': return 'text-red-400 bg-red-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case 'simple': return 'text-green-400 bg-green-400/10'
    case 'medium': return 'text-orange-400 bg-orange-400/10'
    case 'complex': return 'text-red-400 bg-red-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getHealthColor = (health: number) => {
  if (health >= 80) return 'text-green-400'
  if (health >= 60) return 'text-orange-400'
  return 'text-red-400'
}

export default function DeFiYieldIntelligence() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-orange-500" />
            <span className="mexma-text-gradient">DeFi Yield Intelligence</span>
            <div className="ml-auto flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">847 Pools Monitored</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Avg APY: 28.4%</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Yield Opportunities Heatmap</h3>
              <YieldHeatmapChart />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Risk-Adjusted Returns</h3>
              <RiskReturnsChart />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-500" />
              <span>Top Yield Opportunities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {yieldOpportunities?.map((opportunity) => (
                <div key={opportunity?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{opportunity?.protocol ?? 'Unknown'}</span>
                      <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                        {opportunity?.chain ?? 'N/A'}
                      </span>
                      {opportunity?.verified && (
                        <Shield className="w-3 h-3 text-green-400" />
                      )}
                    </div>
                    <div className="text-xl font-bold text-green-400">
                      {opportunity?.apy?.toFixed(1) ?? '0.0'}%
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2">{opportunity?.pool ?? 'N/A'}</div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">TVL</p>
                      <p className="font-semibold text-white">{opportunity?.tvl ?? 'N/A'}</p>
                      <p className="text-xs text-gray-400">Lockup: {opportunity?.lockupPeriod ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">IL Risk</p>
                      <p className={`font-semibold ${opportunity?.impermanentLoss === 0 ? 'text-green-400' : 'text-orange-400'}`}>
                        {opportunity?.impermanentLoss?.toFixed(1) ?? '0.0'}%
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(opportunity?.risk ?? 'medium')}`}>
                        {opportunity?.risk?.toUpperCase() ?? 'MEDIUM'} RISK
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {opportunity?.rewards?.map((reward, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded">
                        {reward}
                      </span>
                    )) ?? []}
                  </div>
                </div>
              )) ?? []}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-orange-500" />
              <span>Liquidity Pool Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liquidityPools?.map((pool) => (
                <div key={pool?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{pool?.protocol ?? 'Unknown'}</span>
                      <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                        {pool?.chain ?? 'N/A'}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-green-400">
                      {pool?.apy?.toFixed(1) ?? '0.0'}%
                    </div>
                  </div>
                  
                  <div className="text-sm font-medium text-orange-400 mb-2">{pool?.pair ?? 'N/A'}</div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">TVL</p>
                      <p className="font-semibold text-white">{pool?.tvl ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">24h Volume</p>
                      <p className="font-semibold text-white">{pool?.volume24h ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">24h Fees</p>
                      <p className="font-semibold text-green-400">{pool?.fees24h ?? 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">Health:</span>
                      <span className={`text-xs font-semibold ${getHealthColor(pool?.poolHealth ?? 0)}`}>
                        {pool?.poolHealth ?? 0}%
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pool?.risks?.map((risk, idx) => (
                        <span key={idx} className="text-xs px-1 py-0.5 bg-gray-700 text-gray-300 rounded">
                          {risk}
                        </span>
                      )) ?? []}
                    </div>
                  </div>
                </div>
              )) ?? []}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-orange-500" />
              <span>Protocol Risk Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {protocolRisks?.map((protocol) => (
                <div key={protocol?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{protocol?.protocol ?? 'Unknown'}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getAuditColor(protocol?.auditStatus ?? 'unaudited')}`}>
                        {protocol?.auditStatus?.toUpperCase() ?? 'UNAUDITED'}
                      </span>
                    </div>
                    <div className={`text-xl font-bold ${protocol?.riskScore && protocol.riskScore <= 30 ? 'text-green-400' : protocol?.riskScore && protocol.riskScore <= 60 ? 'text-orange-400' : 'text-red-400'}`}>
                      {protocol?.riskScore ?? 0}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2">{protocol?.category ?? 'Unknown'} Protocol</div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Smart Contract</p>
                      <p className="font-semibold text-white">{protocol?.smartContractRisk ?? 0}/100</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Liquidity</p>
                      <p className="font-semibold text-white">{protocol?.liquidityRisk ?? 0}/100</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Governance</p>
                      <p className="font-semibold text-white">{protocol?.governanceRisk ?? 0}/100</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Last Incident: {protocol?.lastIncident ?? 'None'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(protocol?.tvlRisk ?? 'medium')}`}>
                      {protocol?.tvlRisk?.toUpperCase() ?? 'MEDIUM'} TVL RISK
                    </span>
                  </div>
                </div>
              )) ?? []}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span>Cross-Chain Opportunities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crossChainYields?.map((opportunity) => (
                <div key={opportunity?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white text-sm">{opportunity?.opportunity ?? 'Unknown'}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getComplexityColor(opportunity?.complexity ?? 'medium')}`}>
                        {opportunity?.complexity?.toUpperCase() ?? 'MEDIUM'}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-green-400">
                      {opportunity?.totalApy?.toFixed(1) ?? '0.0'}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Base APY</p>
                      <p className="font-semibold text-white">{opportunity?.baseApy?.toFixed(1) ?? '0.0'}%</p>
                      <p className="text-xs text-orange-400">+ {opportunity?.bridgeApy?.toFixed(1) ?? '0.0'}% bridge</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Bridge Cost</p>
                      <p className="font-semibold text-white">{opportunity?.bridgeCost ?? 'N/A'}</p>
                      <p className="text-xs text-gray-400">{opportunity?.timeframe ?? 'N/A'} timeframe</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {opportunity?.chains?.map((chain, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                        {chain}
                      </span>
                    )) ?? []}
                  </div>
                </div>
              )) ?? []}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
