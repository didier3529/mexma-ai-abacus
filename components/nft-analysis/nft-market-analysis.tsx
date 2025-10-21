'use client'

import { nftPriceService } from '@/lib/services/nft-price-service'
import { Image as ImageIcon, TrendingDown, TrendingUp, Users, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

interface NFTCollection {
  name: string
  floorPrice: number
  change24h: number
  volume24h: number
  totalSupply: number
  owners: number
  sales24h: number
  image: string
}

export const NFTMarketAnalysis = () => {
  const [collections, setCollections] = useState<NFTCollection[]>([])
  const [isLive, setIsLive] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch real NFT collection data
  const fetchNFTCollections = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('[NFTMarketAnalysis] Fetching NFT collections...');
      const nftCollections = await nftPriceService.getNFTCollections();
      console.log('[NFTMarketAnalysis] Received collections:', nftCollections);
      
      // Process images to ensure they're properly set
      const processedCollections = nftCollections.map(collection => ({
        ...collection,
        image: nftPriceService.getCollectionImage(collection)
      }));
      
      console.log('[NFTMarketAnalysis] Processed collections:', processedCollections);
      setCollections(processedCollections);
      setIsLive(true);
    } catch (err) {
      console.error('[NFTMarketAnalysis] Failed to fetch NFT collections:', err);
      setError(`Failed to load NFT market data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load and periodic updates
  useEffect(() => {
    fetchNFTCollections();
    
    const interval = setInterval(fetchNFTCollections, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [])

  const formatPrice = (price: number) => {
    return price.toFixed(2)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`
    return `$${volume.toFixed(0)}`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <ImageIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">NFT Market Analysis</h1>
              <p className="text-sm text-gray-400">Real-time NFT collection metrics and trends</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Collections</p>
              <p className="text-2xl font-bold text-white">{collections.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Volume 24h</p>
              <p className="text-2xl font-bold text-white">$4.9M</p>
            </div>
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Sales 24h</p>
              <p className="text-2xl font-bold text-white">247</p>
            </div>
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Unique Owners</p>
              <p className="text-2xl font-bold text-white">28.6K</p>
            </div>
            <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Collections Table */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Top NFT Collections</h3>
          <p className="text-sm text-gray-400 mt-1">Real-time floor prices and market metrics</p>
        </div>
        
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white">Loading NFT collections...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-red-400 text-2xl mb-2">⚠️</div>
                <div className="text-red-400 font-semibold">Connection Error</div>
                <div className="text-gray-400 text-sm mt-1">{error}</div>
                <button 
                  onClick={fetchNFTCollections}
                  className="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : collections.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-400 text-center">
                <div className="text-2xl mb-2">🖼️</div>
                <div>No NFT collections available</div>
              </div>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Collection</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">Floor Price</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">24h Change</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">Volume 24h</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">Sales 24h</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-300">Owners</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {collections.map((collection, index) => (
                <tr key={collection.name} className="hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-white">{collection.name}</span>
                        <p className="text-xs text-gray-400">{formatNumber(collection.totalSupply)} items</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-white">{formatPrice(collection.floorPrice)} ETH</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className={`flex items-center justify-end space-x-1 ${
                      collection.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {collection.change24h >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-mono">{Math.abs(collection.change24h).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-gray-300">{formatVolume(collection.volume24h)}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-gray-300">{collection.sales24h}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-gray-300">{formatNumber(collection.owners)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">
              NFT MARKET ANALYSIS • {collections.length} COLLECTIONS TRACKED
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  )
}

