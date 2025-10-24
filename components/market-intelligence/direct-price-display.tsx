'use client'

import { cryptoPriceService } from '@/lib/services/crypto-price-service'
import { Activity, BarChart3, DollarSign, Globe, TrendingDown, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface MarketData {
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  lastUpdated: string
}

// Function to get the correct logo URL for each crypto from CoinGecko CDN
const getCryptoLogoUrl = (symbol: string): string => {
  const logoMap: Record<string, string> = {
    'BTC': 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    'ETH': 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    'SOL': 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    'ADA': 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    'AVAX': 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png'
  };
  
  return logoMap[symbol] || `https://assets.coingecko.com/coins/images/1/large/bitcoin.png`;
};

export default function DirectPriceDisplay() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [isLive, setIsLive] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch real crypto prices
  const fetchCryptoPrices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('[DirectPriceDisplay] Fetching crypto prices...');
      const symbols = ['BTC', 'ETH', 'SOL', 'ADA', 'AVAX'];
      const prices = await cryptoPriceService.getCryptoPrices(symbols);
      console.log('[DirectPriceDisplay] Received prices:', prices);
      
      setMarketData(prices);
      setIsLive(true);
    } catch (err) {
      console.error('[DirectPriceDisplay] Failed to fetch crypto prices:', err);
      setError(`Failed to load real-time prices: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load and periodic updates
  useEffect(() => {
    fetchCryptoPrices();
    
    const interval = setInterval(fetchCryptoPrices, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [])

  const formatPrice = (price: number) => {
    if (price >= 1) return price.toFixed(2)
    return price.toFixed(6)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000000) return `$${(volume / 1000000000).toFixed(1)}B`
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`
    return `$${(volume / 1000).toFixed(1)}K`
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000000) return `$${(marketCap / 1000000000000).toFixed(1)}T`
    if (marketCap >= 1000000000) return `$${(marketCap / 1000000000).toFixed(1)}B`
    return `$${(marketCap / 1000000).toFixed(1)}M`
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-orange-500" />
            <span className="mexma-text-gradient">Market Intelligence</span>
            <div className="ml-auto flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Real-time Market Data</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4 text-green-400" />
                <span className="text-green-400">{marketData.length} Assets Tracked</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Live Price Data</h3>

              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white">Loading real-time prices...</span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="text-red-400 text-2xl mb-2">⚠️</div>
                      <div className="text-red-400 font-semibold">Connection Error</div>
                      <div className="text-gray-400 text-sm mt-1">{error}</div>
                      <button 
                        onClick={fetchCryptoPrices}
                        className="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                ) : marketData.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-gray-400 text-center">
                      <div className="text-2xl mb-2">📊</div>
                      <div>No price data available</div>
                    </div>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Symbol</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">Price</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">24h Change</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">Volume</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">Market Cap</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {marketData.map((coin, index) => (
                      <tr key={coin.symbol} className="hover:bg-gray-700/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                              <img 
                                src={getCryptoLogoUrl(coin.symbol)}
                                alt={`${coin.symbol} logo`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  // Fallback to colored circle if logo fails
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                    const colors: Record<string, string> = {
                                      'BTC': '#F7931A',
                                      'ETH': '#627EEA', 
                                      'SOL': '#9945FF',
                                      'ADA': '#0033AD',
                                      'AVAX': '#E84142'
                                    };
                                    parent.innerHTML = `
                                      <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background-color: ${colors[coin.symbol] || '#FF6300'}">
                                        <span class="text-white font-bold text-sm">${coin.symbol[0]}</span>
                                      </div>
                                    `;
                                  }
                                }}
                              />
                            </div>
                            <span className="font-semibold text-white">{coin.symbol}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-mono text-white">${formatPrice(coin.price)}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className={`flex items-center justify-end space-x-1 ${
                            coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {coin.change24h >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            <span className="font-mono">{Math.abs(coin.change24h).toFixed(2)}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-mono text-gray-300">{formatVolume(coin.volume24h)}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-mono text-gray-300">{formatMarketCap(coin.marketCap)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Market Overview</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Total Market Cap</p>
                      <p className="text-2xl font-bold text-white">$1.2T</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">24h Volume</p>
                      <p className="text-2xl font-bold text-white">$45.2B</p>
                    </div>
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Activity className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Active Pairs</p>
                      <p className="text-2xl font-bold text-white">1,247</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5 text-purple-400" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Market Trend</p>
                      <p className="text-lg font-semibold text-green-400">Bullish</p>
                    </div>
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

