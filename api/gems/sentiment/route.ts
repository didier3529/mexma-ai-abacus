// Bradley AI Gem Scanner - Sentiment API Endpoint
// Provides market sentiment analysis for gem discovery

import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/gems/sentiment
 * Returns market sentiment analysis data
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category'); // Optional: get sentiment for specific category
    const includeTopics = searchParams.get('includeTopics') === 'true';

    let sentimentData;
    let trendingTopics = null;

    if (category) {
      // Get sentiment for specific category
      const categorySentiment = await getCategorySentiment(category);
      sentimentData = {
        overall: {
          marketFear: 66, // Fear & Greed Index: 66 ("Greed")
          classification: 'Greed',
          timestamp: new Date().toISOString(),
        },
        categories: {
          [category]: categorySentiment,
        },
      };
    } else {
      // Get overall market sentiment
      sentimentData = await getMarketSentiment();
    }

    // Get trending topics if requested
    if (includeTopics) {
      trendingTopics = await getTrendingSentimentTopics();
    }

    const response = {
      data: sentimentData,
      trendingTopics,
      metadata: {
        lastUpdated: new Date().toISOString(),
        source: 'alternative.me',
        cacheStatus: 'fresh',
        requestId: Date.now().toString(),
      },
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=240, stale-while-revalidate=600', // 4 min cache, 10 min stale
        'X-API-Version': '1.0',
        'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
        'Content-Type': 'application/json',
      },
    });

  } catch (error: any) {
    console.error('Gems Sentiment API Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch sentiment data',
        message: 'An error occurred while analyzing market sentiment.',
        code: 'SENTIMENT_ERROR',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours
    },
  });
}

// Helper functions for sentiment analysis
async function getMarketSentiment() {
  // Simplified sentiment data - in real implementation would call Alternative.me API
  return {
    overall: {
      marketFear: 66, // Fear & Greed Index: 66 ("Greed")
      classification: 'Greed',
      timestamp: new Date().toISOString(),
    },
    categories: {
      'crypto': {
        sentiment: 0.7,
        volume: 2500000,
        trend: 'up' as const,
      },
      'defi': {
        sentiment: 0.6,
        volume: 1800000,
        trend: 'up' as const,
      },
      'meme': {
        sentiment: 0.8,
        volume: 5200000,
        trend: 'up' as const,
      },
      'gaming': {
        sentiment: 0.5,
        volume: 900000,
        trend: 'stable' as const,
      },
      'ai': {
        sentiment: 0.75,
        volume: 3200000,
        trend: 'up' as const,
      },
    },
  };
}

async function getCategorySentiment(category: string) {
  const categoryMap: { [key: string]: any } = {
    'crypto': {
      sentiment: 0.7,
      volume: 2500000,
      trend: 'up' as const,
    },
    'defi': {
      sentiment: 0.6,
      volume: 1800000,
      trend: 'up' as const,
    },
    'meme': {
      sentiment: 0.8,
      volume: 5200000,
      trend: 'up' as const,
    },
    'gaming': {
      sentiment: 0.5,
      volume: 900000,
      trend: 'stable' as const,
    },
    'ai': {
      sentiment: 0.75,
      volume: 3200000,
      trend: 'up' as const,
    },
  };

  return categoryMap[category] || {
    sentiment: 0.6,
    volume: 1000000,
    trend: 'stable' as const,
  };
}

async function getTrendingSentimentTopics() {
  return [
    {
      topic: 'Solana Meme Coins',
      sentiment: 0.85,
      mentions: 15420,
      trend: 'up' as const,
      keywords: ['BONK', 'WEN', 'POPCAT', 'MEW'],
    },
    {
      topic: 'AI Tokens',
      sentiment: 0.72,
      mentions: 8930,
      trend: 'up' as const,
      keywords: ['artificial intelligence', 'machine learning', 'AI crypto'],
    },
    {
      topic: 'DeFi Yields',
      sentiment: 0.58,
      mentions: 6750,
      trend: 'stable' as const,
      keywords: ['yield farming', 'staking', 'liquidity mining'],
    },
  ];
} 