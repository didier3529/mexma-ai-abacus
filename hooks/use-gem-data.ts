// Bradley AI Gem Scanner - React Hook for Gem Data
// Manages gem data fetching, caching, and real-time updates

import {
    Gem,
    GemCategory,
    GemResponse,
    GemSortBy,
    GemTimeframe,
    SentimentData,
    SentimentResponse
} from '@/lib/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// API client configuration
const API_BASE = '/api/gems';

interface UseGemDataOptions {
  category?: GemCategory;
  limit?: number;
  timeframe?: GemTimeframe;
  sortBy?: GemSortBy;
  minAiScore?: number;
  networks?: string[];
  refreshInterval?: number;
  enabled?: boolean;
}

interface UseGemDataReturn {
  // Data
  gems: Gem[];
  sentiment: SentimentData | null;

  // Loading states
  isLoading: boolean;
  isRefreshing: boolean;
  isError: boolean;
  error: Error | null;

  // Metadata
  totalFound: number;
  lastUpdated: string | null;
  nextScanIn: number;
  source: string;

  // Actions
  refetch: () => Promise<void>;
  refresh: () => Promise<void>;
  clearCache: () => void;
  preloadGems: (gemAddresses: string[]) => Promise<void>;
}

// Helper function to build query parameters
const buildQueryParams = (options: UseGemDataOptions): string => {
  const params = new URLSearchParams();
  
  if (options.category) params.append('category', options.category);
  if (options.limit) params.append('limit', options.limit.toString());
  if (options.timeframe) params.append('timeframe', options.timeframe);
  if (options.sortBy) params.append('sortBy', options.sortBy);
  if (options.minAiScore) params.append('minAiScore', options.minAiScore.toString());
  if (options.networks?.length) params.append('networks', options.networks.join(','));
  
  return params.toString();
};

// Fetch gems from API
const fetchGems = async (options: UseGemDataOptions): Promise<GemResponse> => {
  const queryParams = buildQueryParams(options);
  const url = `${API_BASE}/live${queryParams ? `?${queryParams}` : ''}`;
  
  console.log(`[useGemData] Fetching from: ${url}`);
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  // Handle new API format
  if (data.success !== undefined) {
      return {
        gems: data.data || [],
        metadata: {
          totalFound: data.metadata?.totalFound || 0,
          lastUpdated: data.metadata?.lastRefresh || new Date().toISOString(),
          scanDuration: 0,
          nextScanIn: 0,
          source: data.metadata?.apiSource || 'api'
        }
      };
  }
  
  // Handle legacy format
  return data;
};

// Fetch sentiment data
const fetchSentiment = async (): Promise<SentimentResponse> => {
  const response = await fetch(`${API_BASE}/sentiment`, {
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`Sentiment API Error: ${response.status}`);
  }

  return response.json();
};

export const useGemData = (options: UseGemDataOptions = {}): UseGemDataReturn => {
  const queryClient = useQueryClient();
  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef<NodeJS.Timeout>();
  
  // Default options
  const defaultOptions: UseGemDataOptions = {
    category: 'meme',
    limit: 10,
    timeframe: '1h',
    sortBy: 'aiScore',
    refreshInterval: 30000, // 30 seconds
    enabled: true,
    ...options,
  };

  // Create query key
  const queryKey = useMemo(() => [
    'gems',
    defaultOptions.category,
    defaultOptions.limit,
    defaultOptions.timeframe,
    defaultOptions.sortBy,
    defaultOptions.minAiScore,
    defaultOptions.networks?.join(','),
  ], [defaultOptions]);

  // Main gems query
  const {
    data: gemResponse,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey,
    queryFn: () => fetchGems(defaultOptions),
    refetchInterval: defaultOptions.refreshInterval,
    enabled: defaultOptions.enabled,
    staleTime: 10000, // 10 seconds
    gcTime: 300000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Sentiment query
  const {
    data: sentimentResponse,
  } = useQuery({
    queryKey: ['sentiment'],
    queryFn: fetchSentiment,
    refetchInterval: 60000, // 1 minute
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes
    retry: 2,
  });

  // Countdown timer for next refresh
  useEffect(() => {
    if (defaultOptions.refreshInterval && defaultOptions.refreshInterval > 0) {
      const startCountdown = () => {
        setCountdown(Math.floor(defaultOptions.refreshInterval! / 1000));
        
        countdownRef.current = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              return Math.floor(defaultOptions.refreshInterval! / 1000);
            }
            return prev - 1;
          });
        }, 1000);
      };

      startCountdown();

      return () => {
        if (countdownRef.current) {
          clearInterval(countdownRef.current);
        }
      };
    }
  }, [defaultOptions.refreshInterval]);

  // Actions
  const refresh = useCallback(async () => {
    console.log('[useGemData] Manual refresh triggered');
    await refetch();
  }, [refetch]);

  const clearCache = useCallback(() => {
    queryClient.removeQueries({ queryKey });
    queryClient.removeQueries({ queryKey: ['sentiment'] });
  }, [queryClient, queryKey]);

  const preloadGems = useCallback(async (gemAddresses: string[]) => {
    // Preload individual gem data for better performance
    const preloadPromises = gemAddresses.map(address => 
      queryClient.prefetchQuery({
        queryKey: ['gem', address],
        queryFn: () => fetchGems({ ...defaultOptions, limit: 1 }),
        staleTime: 30000,
      })
    );
    
    await Promise.allSettled(preloadPromises);
  }, [queryClient, defaultOptions]);

  // Processed data
  const gems = useMemo(() => {
    if (!gemResponse?.gems) return [];
    
    let processedGems = [...gemResponse.gems];
    
    // Apply additional filtering if needed
    if (defaultOptions.minAiScore) {
      processedGems = processedGems.filter(gem => 
        (gem.aiScore || 0) >= defaultOptions.minAiScore!
      );
    }
    
    return processedGems;
  }, [gemResponse?.gems, defaultOptions.minAiScore]);

  const totalFound = gemResponse?.metadata?.totalFound || gems.length;
  const lastUpdated = gemResponse?.metadata?.lastUpdated || null;
  const source = gemResponse?.metadata?.source || 'unknown';

  return {
    // Data
    gems,
    sentiment: sentimentResponse?.data || null,
    
    // Loading states
    isLoading,
    isRefreshing: isFetching && !isLoading,
    isError: isError || false,
    error: error || null,
    
    // Metadata
    totalFound,
    lastUpdated,
    nextScanIn: countdown,
    source,
    
    // Actions
    refetch: refresh,
    refresh,
    clearCache,
    preloadGems,
  };
}; 