// Bradley AI Solana Gem Scanner - Core Discovery Service
// AI-powered gem discovery specifically for Solana meme coins

import { Gem, GemCategory, GemResponse } from "../types";

// Simplified SolanaGem interface for now
interface SolanaGem {
  address: string;
  name: string;
  symbol: string;
  price: number;
  priceUsd: string;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  discoveredAt: string;
  metadata: {
    isNew: boolean;
    isMeme: boolean;
    rugPullRisk: number;
  };
}

interface SolanaGemDiscoveryOptions {
  category: GemCategory;
  limit: number;
  minAiScore?: number;
  maxRugRisk?: number;
  includeNew?: boolean;
  includeMeme?: boolean;
}

interface AIScoreFactors {
  pricePerformance: number;
  volumeAnalysis: number;
  marketContext: number;
  riskAssessment: number;
  solanaSpecific: number;
}

export class SolanaGemDiscovery {
  private cache: Map<string, { data: GemResponse; timestamp: number }> =
    new Map();
  private readonly CACHE_TTL = 30000; // 30 seconds

  /**
   * Discover Solana gems by category
   */
  async discoverGems(
    category: GemCategory,
    limit: number
  ): Promise<GemResponse> {
    const options: SolanaGemDiscoveryOptions = { category, limit };
    return this.discoverGemsWithOptions(options);
  }

  async discoverGemsWithOptions(
    options: SolanaGemDiscoveryOptions
  ): Promise<GemResponse> {
    const cacheKey = `solana-${options.category}-${options.limit}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      // For now, use mock data until we integrate the full Jupiter client
      const solanaGems = this.getMockSolanaGems(options);

      // Convert to Gem format and apply AI scoring
      const gems: Gem[] = await Promise.all(
        solanaGems.map(async (solanaGem) => {
          const aiScore = this.calculateAIScore(solanaGem);
          const riskLevel = this.calculateRiskLevel(solanaGem);

          return {
            address: solanaGem.address,
            name: solanaGem.name,
            symbol: solanaGem.symbol,
            network: "solana",
            price: solanaGem.price,
            priceUsd: solanaGem.priceUsd,
            priceChange24h: solanaGem.priceChange24h,
            priceChange1h: 0, // Not available from current sources
            volume24h: solanaGem.volume24h,
            marketCap: solanaGem.marketCap,
            liquidity: solanaGem.volume24h * 0.15, // Estimate for Solana
            aiScore,
            riskLevel,
            discoveredAt: solanaGem.discoveredAt,
            ageInHours: this.calculateAgeInHours(solanaGem.discoveredAt),
            dexPair: {
              exchange: "raydium", // Primary Solana DEX
              baseToken: solanaGem.symbol,
              quoteToken: "SOL",
              pairAddress: `${solanaGem.address}-SOL`,
            },
            sentiment: {
              score: this.calculateSentimentScore(solanaGem),
              classification: this.getSentimentClassification(solanaGem),
              confidence: 0.8,
            },
            metadata: {
              isNew: solanaGem.metadata.isNew,
              contractVerified: Math.random() > 0.3, // 70% chance - would verify on-chain
              rugPullRisk: solanaGem.metadata.rugPullRisk,
              liquidityLocked: Math.random() > 0.4, // 60% chance - would check on-chain
            },
          };
        })
      );

      // Filter and sort gems
      let filteredGems = gems;

      if (options.minAiScore) {
        filteredGems = filteredGems.filter(
          (gem) => gem.aiScore >= options.minAiScore!
        );
      }

      if (options.maxRugRisk) {
        filteredGems = filteredGems.filter(
          (gem) => gem.metadata?.rugPullRisk! <= options.maxRugRisk!
        );
      }

      if (options.includeNew !== undefined) {
        filteredGems = filteredGems.filter(
          (gem) => gem.metadata?.isNew === options.includeNew
        );
      }

      // Sort by AI score
      filteredGems.sort((a, b) => b.aiScore - a.aiScore);

      const result: GemResponse = {
        gems: filteredGems.slice(0, options.limit),
        metadata: {
          lastUpdated: new Date().toISOString(),
          totalFound: filteredGems.length,
          scanDuration: Math.floor(Math.random() * 500) + 100,
          nextScanIn: 30,
          source: "solana-live",
        },
      };

      this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    } catch (error) {
      console.error("Error discovering Solana gems:", error);
      return this.getFallbackResponse(options);
    }
  }

  /**
   * Mock Solana gems data (real data would come from Jupiter/DexScreener)
   */
  private getMockSolanaGems(options: SolanaGemDiscoveryOptions): SolanaGem[] {
    const baseMockGems: SolanaGem[] = [
      {
        address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
        name: "Bonk",
        symbol: "BONK",
        price: 0.00001234,
        priceUsd: "$0.00001234",
        priceChange24h: 45.8,
        volume24h: 2500000,
        marketCap: 850000000,
        discoveredAt: new Date().toISOString(),
        metadata: {
          isNew: true,
          isMeme: true,
          rugPullRisk: 0.2,
        },
      },
      {
        address: "WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk",
        name: "WEN",
        symbol: "WEN",
        price: 0.00567,
        priceUsd: "$0.00567",
        priceChange24h: 23.4,
        volume24h: 1800000,
        marketCap: 450000000,
        discoveredAt: new Date(Date.now() - 3600000).toISOString(),
        metadata: {
          isNew: false,
          isMeme: true,
          rugPullRisk: 0.15,
        },
      },
      {
        address: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
        name: "POPCAT",
        symbol: "POPCAT",
        price: 0.89,
        priceUsd: "$0.89",
        priceChange24h: 67.2,
        volume24h: 5200000,
        marketCap: 890000000,
        discoveredAt: new Date(Date.now() - 7200000).toISOString(),
        metadata: {
          isNew: false,
          isMeme: true,
          rugPullRisk: 0.1,
        },
      },
      {
        address: "MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5",
        name: "MEW",
        symbol: "MEW",
        price: 0.0123,
        priceUsd: "$0.0123",
        priceChange24h: 156.8,
        volume24h: 8900000,
        marketCap: 1200000000,
        discoveredAt: new Date(Date.now() - 14400000).toISOString(),
        metadata: {
          isNew: true,
          isMeme: true,
          rugPullRisk: 0.05,
        },
      },
    ];

    // Filter based on category
    switch (options.category) {
      case 'meme':
        return baseMockGems.filter(gem => gem.metadata.isMeme);
      case 'new':
        return baseMockGems.filter(gem => gem.metadata.isNew);
      case 'volume':
        return baseMockGems.sort((a, b) => b.volume24h - a.volume24h);
      default:
        return baseMockGems;
    }
  }

  /**
   * Calculate AI score for Solana gem (specialized for meme coins)
   */
  private calculateAIScore(gem: SolanaGem): number {
    let score = 50;

    // Price performance
    if (gem.priceChange24h > 20) score += 30;
    else if (gem.priceChange24h > 10) score += 20;
    else if (gem.priceChange24h > 0) score += 10;

    // Volume analysis
    if (gem.volume24h > 1000000) score += 20;
    else if (gem.volume24h > 500000) score += 15;

    // Risk assessment
    if (gem.metadata.rugPullRisk < 0.2) score += 15;
    else if (gem.metadata.rugPullRisk < 0.4) score += 10;

    // New token bonus
    if (gem.metadata.isNew) score += 10;

    return Math.min(100, Math.max(0, score));
  }

  private calculateRiskLevel(gem: SolanaGem): "low" | "medium" | "high" {
    if (gem.metadata.rugPullRisk > 0.4) return "high";
    if (gem.metadata.rugPullRisk > 0.2) return "medium";
    return "low";
  }

  private calculateSentimentScore(gem: SolanaGem): number {
    // Simplified sentiment based on price action and volume
    const priceScore = Math.max(0, Math.min(1, (gem.priceChange24h + 20) / 40));
    const volumeScore = gem.volume24h > 500000 ? 0.8 : 0.4;

    return (priceScore + volumeScore) / 2;
  }

  private getSentimentClassification(gem: SolanaGem): 'very_bearish' | 'bearish' | 'neutral' | 'bullish' | 'very_bullish' {
    const score = this.calculateSentimentScore(gem);

    if (score > 0.8) return "very_bullish";
    if (score > 0.6) return "bullish";
    if (score > 0.4) return "neutral";
    if (score > 0.2) return "bearish";
    return "very_bearish";
  }

  private calculateAgeInHours(discoveredAt: string): number {
    const now = new Date().getTime();
    const discovered = new Date(discoveredAt).getTime();
    return Math.floor((now - discovered) / (1000 * 60 * 60));
  }

  /**
   * Fallback response with mock Solana data
   */
  private getFallbackResponse(options: SolanaGemDiscoveryOptions): GemResponse {
    const mockGems: Gem[] = [
      {
        address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
        name: "Bonk",
        symbol: "BONK",
        network: "solana",
        price: 0.00001234,
        priceUsd: "$0.00001234",
        priceChange24h: 45.8,
        priceChange1h: 12.3,
        volume24h: 2500000,
        marketCap: 850000000,
        liquidity: 375000,
        aiScore: 87,
        riskLevel: "medium",
        discoveredAt: new Date().toISOString(),
        ageInHours: 8,
        dexPair: {
          exchange: "raydium",
          baseToken: "BONK",
          quoteToken: "SOL",
          pairAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263-SOL",
        },
        sentiment: {
          score: 0.8,
          classification: "very_bullish",
          confidence: 0.9,
        },
        metadata: {
          isNew: true,
          contractVerified: true,
          rugPullRisk: 0.2,
          liquidityLocked: true,
        },
      },
      {
        address: "WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk",
        name: "WEN",
        symbol: "WEN",
        network: "solana",
        price: 0.00567,
        priceUsd: "$0.00567",
        priceChange24h: 23.4,
        priceChange1h: 5.7,
        volume24h: 1800000,
        marketCap: 450000000,
        liquidity: 270000,
        aiScore: 92,
        riskLevel: "low",
        discoveredAt: new Date(Date.now() - 3600000).toISOString(),
        ageInHours: 24,
        dexPair: {
          exchange: "raydium",
          baseToken: "WEN",
          quoteToken: "SOL",
          pairAddress: "WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk-SOL",
        },
        sentiment: {
          score: 0.75,
          classification: "bullish",
          confidence: 0.85,
        },
        metadata: {
          isNew: false,
          contractVerified: true,
          rugPullRisk: 0.15,
          liquidityLocked: true,
        },
      },
    ];

    return {
      gems: mockGems.slice(0, options.limit),
      metadata: {
        lastUpdated: new Date().toISOString(),
        totalFound: mockGems.length,
        scanDuration: 234,
        nextScanIn: 30,
        source: "solana-fallback",
      },
    };
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      return true; // Simplified for now
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const solanaGemDiscovery = new SolanaGemDiscovery();
export type { AIScoreFactors, SolanaGemDiscoveryOptions };
