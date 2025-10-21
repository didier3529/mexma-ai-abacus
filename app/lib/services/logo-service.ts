import React from 'react';

// Dynamic Logo Loading Service with External API Fallbacks
interface LogoSource {
  name: string;
  baseUrl: string;
  buildUrl: (symbol: string, address?: string) => string;
  priority: number;
}

interface TokenLogo {
  symbol: string;
  address?: string;
  logoUrl: string;
  source: string;
  cached: boolean;
}

export class DynamicLogoService {
  private cache = new Map<string, TokenLogo>();
  private fallbackIcon = '/images/fallback-token.svg';

  // Logo source hierarchy - from most specific to most generic
  private logoSources: LogoSource[] = [
    {
      name: 'local_meme',
      baseUrl: '/meme-logos',
      buildUrl: (symbol) => `/meme-logos/${symbol.toLowerCase()}.svg`,
      priority: 1
    },
    {
      name: 'local_crypto', 
      baseUrl: '/crypto-logos',
      buildUrl: (symbol) => `/crypto-logos/${symbol.toLowerCase()}-logo.svg`,
      priority: 2
    },
    {
      name: 'solana_fm',
      baseUrl: 'https://img.solana.fm',
      buildUrl: (symbol, address) => address ? `https://img.solana.fm/token/${address}?size=64` : '',
      priority: 3
    },
    {
      name: 'coingecko',
      baseUrl: 'https://assets.coingecko.com/coins/images',
      buildUrl: (symbol) => `https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}/image`,
      priority: 4
    },
    {
      name: 'jupiter', 
      baseUrl: 'https://token-list-api.solana.cloud',
      buildUrl: (symbol, address) => address ? `https://token-list-api.solana.cloud/v1/list?name=${address}` : '',
      priority: 5
    },
    {
      name: 'github_trust_wallet',
      baseUrl: 'https://raw.githubusercontent.com/trustwallet/assets',
      buildUrl: (symbol, address) => address ? 
        `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/${address}/logo.png` : '',
      priority: 6
    }
  ];

  // Test if an image URL is accessible
  private async testImageUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        mode: 'cors',
        cache: 'force-cache'
      });
      return response.ok && response.headers.get('content-type')?.startsWith('image/');
    } catch {
      return false;
    }
  }

  // Get logo with full fallback chain
  async getTokenLogo(symbol: string, address?: string, name?: string): Promise<TokenLogo> {
    const cacheKey = `${symbol}_${address || 'no_address'}`;
    
    // Return cached result if available
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Try each logo source in priority order
    for (const source of this.logoSources.sort((a, b) => a.priority - b.priority)) {
      try {
        const logoUrl = source.buildUrl(symbol, address);
        if (!logoUrl) continue;

        const isValid = await this.testImageUrl(logoUrl);
        if (isValid) {
          const tokenLogo: TokenLogo = {
            symbol,
            address,
            logoUrl,
            source: source.name,
            cached: true
          };
          
          // Cache successful result
          this.cache.set(cacheKey, tokenLogo);
          return tokenLogo;
        }
      } catch (error) {
        console.warn(`Logo source ${source.name} failed for ${symbol}:`, error);
        continue;
      }
    }

    // Ultimate fallback - return default icon
    const fallbackLogo: TokenLogo = {
      symbol,
      address,
      logoUrl: this.fallbackIcon,
      source: 'fallback',
      cached: false
    };

    this.cache.set(cacheKey, fallbackLogo);
    return fallbackLogo;
  }

  // Preload logos for known tokens
  async preloadLogos(tokens: Array<{symbol: string, address?: string}>): Promise<void> {
    const promises = tokens.map(token => 
      this.getTokenLogo(token.symbol, token.address)
    );
    await Promise.allSettled(promises);
  }

  // Clear cache (useful for development)
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache statistics
  getCacheStats() {
    return {
      totalCached: this.cache.size,
      entries: Array.from(this.cache.entries()).map(([key, value]) => ({
        key,
        symbol: value.symbol,
        source: value.source,
        url: value.logoUrl
      }))
    };
  }

  // Batch logo loading for multiple tokens
  async batchLoadLogos(tokens: Array<{symbol: string, address?: string, name?: string}>): Promise<TokenLogo[]> {
    const promises = tokens.map(token => 
      this.getTokenLogo(token.symbol, token.address, token.name)
    );
    return Promise.all(promises);
  }
}

// Global instance
export const logoService = new DynamicLogoService();

// React hook for logo loading
export function useTokenLogo(symbol: string, address?: string, name?: string) {
  const [logo, setLogo] = React.useState<TokenLogo | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    
    async function loadLogo() {
      try {
        setLoading(true);
        setError(null);
        const tokenLogo = await logoService.getTokenLogo(symbol, address, name);
        
        if (mounted) {
          setLogo(tokenLogo);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load logo');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadLogo();
    
    return () => {
      mounted = false;
    };
  }, [symbol, address, name]);

  return { logo, loading, error };
}

export default logoService; 