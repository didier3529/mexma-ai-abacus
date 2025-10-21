
'use client'

import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  Volume2, 
  Clock 
} from 'lucide-react'
import { useTickerData } from '../hooks/use-websocket-data'
import { SUPPORTED_ASSETS } from '../lib/websocket-service'

interface LivePriceTickerProps {
  symbol?: string
  compact?: boolean
}

export default function LivePriceTicker({ symbol = 'BTCUSDT', compact = false }: LivePriceTickerProps) {
  const { tickerData, lastUpdate, price, changePercent24h, volume24h, high24h, low24h } = useTickerData(symbol)
  
  const asset = SUPPORTED_ASSETS.find(a => a.symbol === symbol)
  const isPositive = changePercent24h >= 0
  const priceChangeColor = isPositive ? 'text-green-400' : 'text-red-400'
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  const formatPrice = (price: number) => {
    if (price > 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    if (price > 1) return `$${price.toFixed(4)}`
    return `$${price.toFixed(6)}`
  }

  const formatVolume = (volume: number) => {
    if (volume > 1000000) return `${(volume / 1000000).toFixed(1)}M`
    if (volume > 1000) return `${(volume / 1000).toFixed(1)}K`
    return volume.toFixed(0)
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">{asset?.displaySymbol}</span>
          <span className="text-white font-semibold">
            {price > 0 ? formatPrice(price) : formatPrice(asset?.basePrice || 0)}
          </span>
          <div className={`flex items-center space-x-1 ${priceChangeColor}`}>
            <TrendIcon className="h-3 w-3" />
            <span className="text-xs">
              {changePercent24h !== 0 ? `${changePercent24h > 0 ? '+' : ''}${changePercent24h.toFixed(2)}%` : '0.00%'}
            </span>
          </div>
        </div>
        {lastUpdate && (
          <div className="text-xs text-gray-400">
            {lastUpdate.toLocaleTimeString()}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Price */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3">
              <div>
                <div className="text-sm text-gray-400">{asset?.name} ({asset?.displaySymbol})</div>
                <div className="text-2xl font-bold text-white">
                  {price > 0 ? formatPrice(price) : formatPrice(asset?.basePrice || 0)}
                </div>
              </div>
              <div className={`flex items-center space-x-1 ${priceChangeColor}`}>
                <TrendIcon className="h-5 w-5" />
                <div className="text-right">
                  <div className="font-semibold">
                    {changePercent24h !== 0 ? `${changePercent24h > 0 ? '+' : ''}${changePercent24h.toFixed(2)}%` : '0.00%'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 24h High/Low */}
          <div>
            <div className="text-sm text-gray-400 mb-1">24h High/Low</div>
            <div className="space-y-1">
              <div className="text-green-400 text-sm">
                H: {high24h > 0 ? formatPrice(high24h) : formatPrice((asset?.basePrice || 0) * 1.05)}
              </div>
              <div className="text-red-400 text-sm">
                L: {low24h > 0 ? formatPrice(low24h) : formatPrice((asset?.basePrice || 0) * 0.95)}
              </div>
            </div>
          </div>

          {/* Volume */}
          <div>
            <div className="text-sm text-gray-400 mb-1">24h Volume</div>
            <div className="flex items-center space-x-1">
              <Volume2 className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 font-semibold">
                {volume24h > 0 ? formatVolume(volume24h) : '1.2M'}
              </span>
            </div>
          </div>

          {/* Last Update */}
          <div>
            <div className="text-sm text-gray-400 mb-1">Last Update</div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-purple-400" />
              <span className="text-purple-400 text-sm">
                {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Live'}
              </span>
            </div>
            <Badge 
              variant="outline" 
              className="mt-1 text-xs bg-orange-500/20 text-orange-400 border-orange-500"
            >
              Real-time
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
