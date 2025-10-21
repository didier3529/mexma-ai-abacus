
'use client'

import { Shield, AlertTriangle, Zap, Eye, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface ThreatAlert {
  id: string
  severity: 'high' | 'medium' | 'low'
  type: string
  title: string
  description: string
  address: string
  value: string
  timestamp: string
  source: string
}

const threatAlerts: ThreatAlert[] = [
  {
    id: '1',
    severity: 'high',
    type: 'Rugpull Risk',
    title: 'Suspicious liquidity drain detected',
    description: 'Large liquidity removal (87%) from DEX pool within 5 minutes',
    address: '0x742d...F4aE',
    value: '$2.3M',
    timestamp: '2 mins ago',
    source: 'Uniswap V3'
  },
  {
    id: '2',
    severity: 'high',
    type: 'Flash Loan Attack',
    title: 'Multi-protocol flash loan exploit in progress',
    description: 'Coordinated attack across Aave, Compound, and dYdX',
    address: '0x1a2b...8C9D',
    value: '$850K',
    timestamp: '5 mins ago',
    source: 'DeFi Pulse'
  },
  {
    id: '3',
    severity: 'medium',
    type: 'Unusual Activity',
    title: 'High-frequency trading bot detected',
    description: 'Bot executing 500+ trades per minute, potential market manipulation',
    address: '0x5E7F...2A1B',
    value: '$120K',
    timestamp: '8 mins ago',
    source: 'MEV Monitor'
  },
  {
    id: '4',
    severity: 'medium',
    type: 'Whale Movement',
    title: 'Large ETH transfer to exchange',
    description: 'Whale moved 15,000 ETH to Binance, potential sell pressure',
    address: '0x3C4D...9E8F',
    value: '$24.2M',
    timestamp: '12 mins ago',
    source: 'Whale Alert'
  },
  {
    id: '5',
    severity: 'low',
    type: 'Smart Contract',
    title: 'New high-risk contract deployed',
    description: 'Contract with admin privileges and no timelock deployed',
    address: '0x9A8B...6C5D',
    value: '$45K',
    timestamp: '15 mins ago',
    source: 'Contract Scanner'
  }
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'text-red-400'
    case 'medium': return 'text-orange-400'
    case 'low': return 'text-yellow-400'
    default: return 'text-gray-400'
  }
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'high': return <AlertTriangle className="w-4 h-4" />
    case 'medium': return <Zap className="w-4 h-4" />
    case 'low': return <Eye className="w-4 h-4" />
    default: return <Shield className="w-4 h-4" />
  }
}

export default function ThreatAlerts() {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-orange-500" />
          <span className="mexma-text-gradient">Threat Intelligence</span>
          <div className="ml-auto flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Live Monitoring</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {threatAlerts?.map((alert) => (
            <div key={alert?.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-orange-500/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`${getSeverityColor(alert?.severity ?? 'low')} mt-1`}>
                    {getSeverityIcon(alert?.severity ?? 'low')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-xs px-2 py-1 rounded-full bg-gray-700 ${getSeverityColor(alert?.severity ?? 'low')}`}>
                        {alert?.severity?.toUpperCase() ?? 'UNKNOWN'}
                      </span>
                      <span className="text-xs text-gray-400">{alert?.type ?? 'Unknown Type'}</span>
                    </div>
                    <h3 className="font-semibold text-white mb-1">{alert?.title ?? 'No title'}</h3>
                    <p className="text-sm text-gray-300 mb-2">{alert?.description ?? 'No description'}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>Address: <code className="text-orange-400">{alert?.address ?? 'N/A'}</code></span>
                      <span>Value: <span className="text-green-400">{alert?.value ?? 'N/A'}</span></span>
                      <span>Source: {alert?.source ?? 'Unknown'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-xs text-gray-400">{alert?.timestamp ?? 'Unknown time'}</span>
                  <button className="text-orange-500 hover:text-orange-400 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )) ?? []}
        </div>
        
        <div className="mt-6 flex justify-center">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors">
            View All Threats
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
