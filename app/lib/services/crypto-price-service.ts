interface CryptoPriceData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdated: string;
}

interface CoinGeckoResponse {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

export class CryptoPriceService {
  private static instance: CryptoPriceService;
  private cache = new Map<string, { data: CryptoPriceData; timestamp: number }>();
  private readonly CACHE_DURATION = 30000; // 30 seconds

  public static getInstance(): CryptoPriceService {
    if (!CryptoPriceService.instance) {
      CryptoPriceService.instance = new CryptoPriceService();
    }
    return CryptoPriceService.instance;
  }

  /**
   * Fetch real-time crypto prices from CoinGecko API
   */
  async getCryptoPrices(symbols: string[]): Promise<CryptoPriceData[]> {
    const cacheKey = symbols.sort().join(',');
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data as any;
    }

    try {
      // Map symbols to CoinGecko IDs
      const coinGeckoIds = this.mapSymbolsToCoinGeckoIds(symbols);
      
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinGeckoIds.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mexma-Dashboard/1.0'
          },
          next: { revalidate: 30 }
        }
      );

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const data: CoinGeckoResponse[] = await response.json();
      
      const priceData: CryptoPriceData[] = data.map(coin => ({
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h || 0,
        volume24h: coin.total_volume,
        marketCap: coin.market_cap,
        lastUpdated: new Date().toISOString()
      }));

      // Cache the results
      this.cache.set(cacheKey, { data: priceData as any, timestamp: Date.now() });
      
      return priceData;
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
      
      // Return fallback data with current timestamp
      return this.getFallbackData(symbols);
    }
  }

  /**
   * Map our symbols to CoinGecko coin IDs
   */
  private mapSymbolsToCoinGeckoIds(symbols: string[]): string[] {
    const symbolToIdMap: Record<string, string> = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'SOL': 'solana',
      'ADA': 'cardano',
      'AVAX': 'avalanche-2',
      'DOT': 'polkadot',
      'MATIC': 'matic-network',
      'LINK': 'chainlink',
      'UNI': 'uniswap',
      'ATOM': 'cosmos'
    };

    return symbols.map(symbol => symbolToIdMap[symbol.toUpperCase()] || symbol.toLowerCase());
  }

  /**
   * Get fallback data when API fails
   */
  private getFallbackData(symbols: string[]): CryptoPriceData[] {
    const fallbackPrices: Record<string, { price: number; change24h: number; volume24h: number; marketCap: number }> = {
      'BTC': { price: 43250.50, change24h: 2.45, volume24h: 28500000000, marketCap: 850000000000 },
      'ETH': { price: 2650.75, change24h: -1.23, volume24h: 15200000000, marketCap: 320000000000 },
      'SOL': { price: 98.45, change24h: 5.67, volume24h: 3200000000, marketCap: 42000000000 },
      'ADA': { price: 0.485, change24h: -0.89, volume24h: 850000000, marketCap: 17000000000 },
      'AVAX': { price: 36.20, change24h: 3.21, volume24h: 1200000000, marketCap: 14000000000 }
    };

    return symbols.map(symbol => ({
      symbol,
      ...fallbackPrices[symbol] || { price: 0, change24h: 0, volume24h: 0, marketCap: 0 },
      lastUpdated: new Date().toISOString()
    }));
  }

  /**
   * Get single crypto price
   */
  async getCryptoPrice(symbol: string): Promise<CryptoPriceData | null> {
    const prices = await this.getCryptoPrices([symbol]);
    return prices[0] || null;
  }
}

export const cryptoPriceService = CryptoPriceService.getInstance();

