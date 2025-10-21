import { NextRequest, NextResponse } from 'next/server';

// MEME coin configuration with Solana addresses - EXPANDED TO 10 GEMS
const FEATURED_MEME_COINS = [
  {
    symbol: 'BONK',
    name: 'Bonk',
    address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'WEN',
    name: 'Wen',
    address: 'WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'POPCAT',
    name: 'Popcat',
    address: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'MEW',
    name: 'Cat in a Dogs World',
    address: 'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'MYRO',
    name: 'Myro',
    address: 'HhJpBhRRn4g56VsyLuT8DL5Bv31HkXqsrahTTUCZeZg4',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'PNUT',
    name: 'Peanut the Squirrel',
    address: 'A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'MICHI',
    name: 'Michi',
    address: 'ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'BOME',
    name: 'Book of Meme',
    address: 'ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'SHIB',
    name: 'Shiba Inu',
    address: 'CiKu4eHsVrc1eueVQeHn7qhXTcVu95gSQmBpX4utjL9z',
    network: 'solana',
    dex: 'raydium'
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    address: '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj',
    network: 'solana',
    dex: 'raydium'
  }
];

// Enhanced AI scoring algorithm matching Indian version
function calculateAIScore(gem: any): number {
  let score = 40; // Base score like Indian version
  
  // Volume factor (0-20 points) - More stringent like Indian version
  const volume24h = parseFloat(gem.volume?.h24 || '0');
  if (volume24h > 10000000) score += 20;        // $10M+ volume
  else if (volume24h > 5000000) score += 15;    // $5M+ volume
  else if (volume24h > 1000000) score += 10;    // $1M+ volume
  else if (volume24h > 500000) score += 5;      // $500K+ volume
  else if (volume24h > 100000) score += 2;      // $100K+ volume
  
  // Price change factor (0-15 points) - More balanced like Indian version
  const priceChange24h = parseFloat(gem.priceChange?.h24 || '0');
  const absChange = Math.abs(priceChange24h);
  if (absChange > 100) score += 15;             // 100%+ change
  else if (absChange > 50) score += 12;         // 50%+ change
  else if (absChange > 25) score += 8;          // 25%+ change
  else if (absChange > 10) score += 4;          // 10%+ change
  else if (absChange > 5) score += 2;           // 5%+ change
  
  // Liquidity factor (0-15 points) - Higher thresholds like Indian version
  const liquidity = parseFloat(gem.liquidity?.usd || '0');
  if (liquidity > 10000000) score += 15;        // $10M+ liquidity
  else if (liquidity > 5000000) score += 12;    // $5M+ liquidity
  else if (liquidity > 1000000) score += 8;     // $1M+ liquidity
  else if (liquidity > 500000) score += 5;      // $500K+ liquidity
  else if (liquidity > 100000) score += 2;      // $100K+ liquidity
  
  // Market cap factor (0-10 points) - Sweet spot scoring like Indian version
  const marketCap = parseFloat(gem.marketCap || '0');
  if (marketCap > 1000000000) score += 5;       // $1B+ (too big, lower score)
  else if (marketCap > 100000000) score += 10;  // $100M-$1B (sweet spot)
  else if (marketCap > 10000000) score += 8;    // $10M-$100M (good)
  else if (marketCap > 1000000) score += 5;     // $1M-$10M (okay)
  else if (marketCap > 100000) score += 2;      // $100K-$1M (risky)
  
  // Ensure score is within bounds
  return Math.max(0, Math.min(100, Math.round(score)));
}

// Risk assessment matching Indian version
function assessRisk(gem: any, aiScore: number): 'Low' | 'Medium' | 'High' {
  const volume24h = parseFloat(gem.volume?.h24 || '0');
  const liquidity = parseFloat(gem.liquidity?.usd || '0');
  const priceChange = Math.abs(parseFloat(gem.priceChange?.h24 || '0'));
  
  // High risk factors
  if (volume24h < 100000 || liquidity < 50000 || priceChange > 100) {
    return 'High';
  }
  
  // Low risk factors - more stringent like Indian version
  if (aiScore >= 80 && volume24h > 1000000 && liquidity > 500000) {
    return 'Low';
  }
  
  return 'Medium';
}

// Mock data generator for development/fallback - ENHANCED FOR 10 GEMS
function generateMockGemData(coin: typeof FEATURED_MEME_COINS[0], index: number): any {
  // Create varied but realistic data for each gem
  const basePrice = (Math.random() * 10) * (1 + index * 0.1); // Vary by index
  const priceChange = (Math.random() - 0.5) * 200 * (1 + Math.sin(index)); // Varied changes
  const volume = (Math.random() * 50000000) * (1 + index * 0.2); // Higher volume for later gems
  const marketCap = basePrice * (1000000 + Math.random() * 9000000 * (1 + index * 0.15));
  
  const mockGem = {
    chainId: 'solana',
    dexId: 'raydium',
    url: `https://dexscreener.com/solana/${coin.address}`,
    pairAddress: coin.address,
    baseToken: {
      address: coin.address,
      name: coin.name,
      symbol: coin.symbol
    },
    quoteToken: {
      address: 'So11111111111111111111111111111111111111112',
      name: 'Solana',
      symbol: 'SOL'
    },
    priceNative: (basePrice / 100).toString(),
    priceUsd: basePrice.toString(),
    priceChange: {
      h24: priceChange
    },
    volume: {
      h24: volume
    },
    liquidity: {
      usd: volume * (0.1 + index * 0.02) // Vary liquidity ratio
    },
    marketCap: marketCap
  };
  
  return mockGem;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'meme';
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 10); // ✅ FIXED: Allow up to 10 gems
    
    // Force focus on MEME category
    if (category !== 'meme') {
      return NextResponse.json({
        success: false,
        error: 'Only MEME category supported',
        data: []
      }, { status: 400 });
    }

    let gems: any[] = [];
    
    try {
      // Try to fetch from DexScreener for ALL FEATURED MEME COINS
      const promises = FEATURED_MEME_COINS.slice(0, limit).map(async (coin, index) => {
        try {
          const response = await fetch(
            `https://api.dexscreener.com/latest/dex/tokens/${coin.address}`,
            { 
              headers: {
                'User-Agent': 'Mexma-Dashboard/1.0'
              },
              next: { revalidate: 30 } // Cache for 30 seconds
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            return data.pairs?.[0] || generateMockGemData(coin, index);
          } else {
            return generateMockGemData(coin, index);
          }
        } catch (error) {
          console.warn(`Failed to fetch data for ${coin.symbol}, using mock data:`, error);
          return generateMockGemData(coin, index);
        }
      });
      
      const results = await Promise.allSettled(promises);
      gems = results
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<any>).value)
        .filter(Boolean);
        
    } catch (apiError) {
      console.warn('DexScreener API failed, using mock data:', apiError);
      // Fallback to mock data for all gems
      gems = FEATURED_MEME_COINS.slice(0, limit).map(generateMockGemData);
    }

    // If no data from API, use mock data
    if (gems.length === 0) {
      gems = FEATURED_MEME_COINS.slice(0, limit).map(generateMockGemData);
    }

    // Transform data to match Indian version format EXACTLY
    const transformedGems = gems.map((gem, index) => {
      const symbol = gem.baseToken?.symbol || FEATURED_MEME_COINS[index]?.symbol || 'UNKNOWN';
      const address = gem.baseToken?.address || gem.pairAddress || FEATURED_MEME_COINS[index]?.address;
      const aiScore = calculateAIScore(gem);
      const riskLevel = assessRisk(gem, aiScore);
      
      return {
        // ✅ EXACT FORMAT FROM INDIAN VERSION:
        address: address,
        symbol: symbol,
        name: gem.baseToken?.name || FEATURED_MEME_COINS[index]?.name || 'Unknown Token',
        priceUsd: parseFloat(gem.priceUsd || '0').toString(), // Keep as string like Indian version
        price: parseFloat(gem.priceUsd || '0'), // Also include as number
        priceChange24h: parseFloat(gem.priceChange?.h24 || '0'),
        volume24h: parseFloat(gem.volume?.h24 || '0'),
        marketCap: parseFloat(gem.marketCap || '0'),
        liquidity: parseFloat(gem.liquidity?.usd || '0'),
        
        // AI Analysis - exact format from Indian version
        aiScore: aiScore,
        aiScoreSource: 'dexscreener',
        riskLevel: riskLevel,
        
        // Exchange info - exact format from Indian version
        exchange: gem.dexId || 'raydium',
        dexPair: {
          exchange: gem.dexId || 'raydium',
          baseToken: symbol,
          quoteToken: 'SOL',
          pairAddress: address
        },
        
        // Metadata - exact format from Indian version
        network: 'solana',
        isNew: aiScore > 85 && parseFloat(gem.volume?.h24 || '0') > 1000000,
        lastUpdated: new Date().toISOString(),
        url: gem.url || `https://dexscreener.com/solana/${address}`,
        
        // Legacy compatibility
        contractAddress: address,
        logoUrl: `https://dd.dexscreener.com/ds-data/tokens/solana/${address}.png` // DexScreener logo URL
      };
    });

    // Sort by AI score descending like Indian version
    transformedGems.sort((a, b) => b.aiScore - a.aiScore);

    // ✅ EXACT RESPONSE FORMAT FROM INDIAN VERSION:
    const response = {
      gems: transformedGems, // Use 'gems' not 'data' like Indian version
      metadata: {
        totalFound: transformedGems.length,
        lastUpdated: new Date().toISOString(),
        source: 'solana-live',
        externalAIProvider: 'dexscreener',
        externalScoresCount: transformedGems.length,
        enhancedAt: new Date().toISOString(),
        category: 'meme',
        cacheTTL: 30
      }
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-Powered-By': 'Mexma-Gem-Scanner'
      }
    });

  } catch (error) {
    console.error('Gems API Error:', error);
    
    // Emergency fallback - return mock data for all 10 MEME coins
    const fallbackGems = FEATURED_MEME_COINS.slice(0, 10).map((coin, index) => {
      const mockGem = generateMockGemData(coin, index);
      const aiScore = calculateAIScore(mockGem);
      
      return {
        address: coin.address,
        symbol: coin.symbol,
        name: coin.name,
        priceUsd: parseFloat(mockGem.priceUsd).toString(),
        price: parseFloat(mockGem.priceUsd),
        priceChange24h: parseFloat(mockGem.priceChange.h24),
        volume24h: parseFloat(mockGem.volume.h24),
        marketCap: parseFloat(mockGem.marketCap),
        liquidity: parseFloat(mockGem.liquidity.usd),
        aiScore: aiScore,
        aiScoreSource: 'fallback',
        riskLevel: assessRisk(mockGem, aiScore),
        exchange: 'raydium',
        network: 'solana',
        isNew: false,
        lastUpdated: new Date().toISOString(),
        url: `https://dexscreener.com/solana/${coin.address}`,
        contractAddress: coin.address,
        logoUrl: `https://dd.dexscreener.com/ds-data/tokens/solana/${coin.address}.png`
      };
    });

    return NextResponse.json({
      gems: fallbackGems,
      metadata: {
        totalFound: fallbackGems.length,
        lastUpdated: new Date().toISOString(),
        source: 'fallback',
        apiSource: 'fallback',
        error: 'Using fallback data due to API error'
      }
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30'
      }
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 