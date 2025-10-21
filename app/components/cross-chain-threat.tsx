
'use client'

import { Shield, AlertTriangle, Ban, Eye, Activity, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import ThreatGaugeChart from './threat-gauge-chart'
import RiskDistributionChart from './risk-distribution-chart'

interface ThreatAlert {
  id: string
  type: 'sanctions' | 'mixer' | 'ransomware' | 'fraud' | 'phishing' | 'laundering'
  severity: 'critical' | 'high' | 'medium' | 'low'
  address: string
  entity: string
  amount: string
  amountUsd: string
  chain: string
  confidence: number
  description: string
  timestamp: string
  status: 'active' | 'investigating' | 'resolved'
}

interface RiskEntity {
  id: string
  address: string
  label: string
  riskScore: number
  category: string
  totalVolume: string
  flaggedTxs: number
  lastActivity: string
  chains: string[]
  sanctions: boolean
}

interface ComplianceMetric {
  id: string
  metric: string
  value: string
  change24h: number
  status: 'good' | 'warning' | 'critical'
  description: string
}

const threatAlerts: ThreatAlert[] = [
  {
    id: '1',
    type: 'sanctions',
    severity: 'critical',
    address: '0x9abc...def1',
    entity: 'Tornado Cash Router',
    amount: '450.7',
    amountUsd: '$1.69M',
    chain: 'Ethereum',
    confidence: 98,
    description: 'OFAC sanctioned entity receiving funds',
    timestamp: '23 mins ago',
    status: 'active'
  },
  {
    id: '2',
    type: 'mixer',
    severity: 'high',
    address: '0x7def...abc9',
    entity: 'Privacy Mixer',
    amount: '127.3',
    amountUsd: '$476K',
    chain: 'BSC',
    confidence: 89,
    description: 'High-volume mixing service activity detected',
    timestamp: '1.2 hours ago',
    status: 'investigating'
  },
  {
    id: '3',
    type: 'ransomware',
    severity: 'critical',
    address: '0x4fed...cba2',
    entity: 'DarkSide Group',
    amount: '89.2',
    amountUsd: '$334K',
    chain: 'Bitcoin',
    confidence: 94,
    description: 'Known ransomware wallet movement',
    timestamp: '2.7 hours ago',
    status: 'active'
  },
  {
    id: '4',
    type: 'fraud',
    severity: 'medium',
    address: '0x2bad...fed4',
    entity: 'Rug Pull Suspect',
    amount: '23,400',
    amountUsd: '$87.5K',
    chain: 'Polygon',
    confidence: 76,
    description: 'Suspected rug pull pattern detected',
    timestamp: '4.1 hours ago',
    status: 'investigating'
  }
]

const riskEntities: RiskEntity[] = [
  {
    id: '1',
    address: '0x8888...1111',
    label: 'High Risk Cluster #1',
    riskScore: 94,
    category: 'Sanctions',
    totalVolume: '$45.7M',
    flaggedTxs: 2847,
    lastActivity: '12 mins ago',
    chains: ['ETH', 'BSC', 'MATIC'],
    sanctions: true
  },
  {
    id: '2',
    address: '0x7777...2222',
    label: 'Money Laundering Ring',
    riskScore: 87,
    category: 'Laundering',
    totalVolume: '$23.2M',
    flaggedTxs: 1456,
    lastActivity: '3 hours ago',
    chains: ['ETH', 'BTC'],
    sanctions: false
  },
  {
    id: '3',
    address: '0x6666...3333',
    label: 'Fraud Network Alpha',
    riskScore: 73,
    category: 'Fraud',
    totalVolume: '$8.9M',
    flaggedTxs: 894,
    lastActivity: '1 day ago',
    chains: ['BSC', 'MATIC', 'AVAX'],
    sanctions: false
  },
  {
    id: '4',
    address: '0x5555...4444',
    label: 'Phishing Operation',
    riskScore: 68,
    category: 'Phishing',
    totalVolume: '$4.1M',
    flaggedTxs: 567,
    lastActivity: '6 hours ago',
    chains: ['ETH'],
    sanctions: false
  }
]

const complianceMetrics: ComplianceMetric[] = [
  {
    id: '1',
    metric: 'Sanctioned Entities Blocked',
    value: '847',
    change24h: 12,
    status: 'good',
    description: 'OFAC compliance rate: 99.8%'
  },
  {
    id: '2',
    metric: 'Suspicious Transactions Flagged',
    value: '2,340',
    change24h: 23,
    status: 'warning',
    description: 'Above average detection rate'
  },
  {
    id: '3',
    metric: 'False Positive Rate',
    value: '2.3%',
    change24h: -0.8,
    status: 'good',
    description: 'Model accuracy improving'
  },
  {
    id: '4',
    metric: 'Response Time (avg)',
    value: '14 mins',
    change24h: -18,
    status: 'good',
    description: 'Alert processing speed'
  }
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'text-red-500 bg-red-500/10'
    case 'high': return 'text-orange-500 bg-orange-500/10'
    case 'medium': return 'text-yellow-500 bg-yellow-500/10'
    case 'low': return 'text-green-500 bg-green-500/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getThreatIcon = (type: string) => {
  switch (type) {
    case 'sanctions': return <Ban className="w-4 h-4 text-red-500" />
    case 'mixer': return <Eye className="w-4 h-4 text-orange-500" />
    case 'ransomware': return <Shield className="w-4 h-4 text-red-500" />
    case 'fraud': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    case 'phishing': return <Target className="w-4 h-4 text-orange-500" />
    default: return <Activity className="w-4 h-4 text-gray-400" />
  }
}

const getRiskScoreColor = (score: number) => {
  if (score >= 80) return 'text-red-400'
  if (score >= 60) return 'text-orange-400'
  if (score >= 40) return 'text-yellow-400'
  return 'text-green-400'
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'good': return 'text-green-400'
    case 'warning': return 'text-orange-400'
    case 'critical': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

export default function CrossChainThreat() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-orange-500" />
            <span className="mexma-text-gradient">Cross-Chain Threat Intelligence</span>
            <div className="ml-auto flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">12 Active Threats</span>
              </div>
              <div className="flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400">Risk Level: HIGH</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Threat Level Gauge</h3>
              <ThreatGaugeChart />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Risk Distribution</h3>
              <RiskDistributionChart />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Active Threat Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {threatAlerts?.map((alert) => (
                <div key={alert?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getThreatIcon(alert?.type ?? 'fraud')}
                      <span className="font-semibold text-white">{alert?.entity ?? 'Unknown'}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(alert?.severity ?? 'medium')}`}>
                        {alert?.severity?.toUpperCase() ?? 'MEDIUM'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{alert?.timestamp ?? 'Unknown'}</div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2">{alert?.address ?? 'N/A'}</div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Amount</p>
                      <p className="font-semibold text-white">{alert?.amount ?? 'N/A'}</p>
                      <p className="text-sm text-orange-400">{alert?.amountUsd ?? 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Chain</p>
                      <p className="font-semibold text-white">{alert?.chain ?? 'N/A'}</p>
                      <p className="text-xs text-green-400">{alert?.confidence ?? 0}% confidence</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-300 mb-2">{alert?.description ?? 'No description available'}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Status: </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert?.status === 'active' ? 'bg-red-500/20 text-red-400' :
                      alert?.status === 'investigating' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {alert?.status?.toUpperCase() ?? 'UNKNOWN'}
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
              <Ban className="w-5 h-5 text-orange-500" />
              <span>High-Risk Entities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskEntities?.map((entity) => (
                <div key={entity?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{entity?.label ?? 'Unknown'}</span>
                      {entity?.sanctions && (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                          SANCTIONED
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">{entity?.lastActivity ?? 'Unknown'}</div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2">{entity?.address ?? 'N/A'}</div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Risk Score</p>
                      <p className={`font-semibold text-lg ${getRiskScoreColor(entity?.riskScore ?? 0)}`}>
                        {entity?.riskScore ?? 0}/100
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total Volume</p>
                      <p className="font-semibold text-white">{entity?.totalVolume ?? 'N/A'}</p>
                      <p className="text-xs text-red-400">{entity?.flaggedTxs ?? 0} flagged txs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Chains: </span>
                    <div className="flex space-x-1">
                      {entity?.chains?.map((chain, idx) => (
                        <span key={idx} className="text-xs px-1 py-0.5 bg-gray-700 text-gray-300 rounded">
                          {chain}
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

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-orange-500" />
            <span>Compliance Monitoring</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceMetrics?.map((metric) => (
              <div key={metric?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    metric?.status === 'good' ? 'bg-green-400' :
                    metric?.status === 'warning' ? 'bg-orange-400' :
                    'bg-red-400'
                  }`}></div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    (metric?.change24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {(metric?.change24h ?? 0) >= 0 ? '+' : ''}{metric?.change24h ?? 0}%
                  </span>
                </div>
                
                <div className="mb-2">
                  <h4 className="text-sm font-medium text-gray-400 mb-1">{metric?.metric ?? 'Unknown Metric'}</h4>
                  <p className={`text-2xl font-bold ${getStatusColor(metric?.status ?? 'good')}`}>
                    {metric?.value ?? 'N/A'}
                  </p>
                </div>
                
                <p className="text-xs text-gray-300">{metric?.description ?? 'No description available'}</p>
              </div>
            )) ?? []}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
