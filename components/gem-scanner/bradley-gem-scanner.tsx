"use client";

import { useHydration } from "@/components/ui/hydration-safe";
import { useGemData } from "@/hooks/use-gem-data";
import { Activity, BarChart3, RefreshCw, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

// BULLETPROOF: Safe data formatting utilities
const formatPrice = (price: string | number | undefined): string => {
  // BULLETPROOF: Handle all possible edge cases
  if (
    price === undefined ||
    price === null ||
    price === "" ||
    price === "N/A"
  ) {
    return "0.000000";
  }

  let numPrice: number;

  if (typeof price === "string") {
    // Clean the string of any currency symbols or commas
    const cleanedPrice = price.replace(/[$,\s]/g, "");
    numPrice = parseFloat(cleanedPrice);
  } else {
    numPrice = price;
  }

  // Additional safety checks
  if (isNaN(numPrice) || !isFinite(numPrice) || numPrice < 0) {
    return "0.000000";
  }

  // Smart formatting based on magnitude
  if (numPrice >= 1) {
    return numPrice.toFixed(2);
  } else if (numPrice >= 0.01) {
    return numPrice.toFixed(4);
  } else {
    return numPrice.toFixed(6);
  }
};

// BULLETPROOF: Safe price change formatter
const formatPriceChange = (change: string | number | undefined): number => {
  if (change === undefined || change === null || change === "") return 0;
  const numChange = typeof change === "string" ? parseFloat(change) : change;
  return isNaN(numChange) ? 0 : numChange;
};

// BULLETPROOF: Safe volume formatter with K/M/B suffixes
const formatVolume = (volume: string | number | undefined): number => {
  if (volume === undefined || volume === null || volume === "") return 0;

  let numVolume: number;
  if (typeof volume === "string") {
    // Handle strings like "1.5M", "2.3K", "1.1B"
    const cleanedVolume = volume.replace(/[$,\s]/g, "");
    if (cleanedVolume.includes("K")) {
      numVolume = parseFloat(cleanedVolume.replace("K", "")) * 1000;
    } else if (cleanedVolume.includes("M")) {
      numVolume = parseFloat(cleanedVolume.replace("M", "")) * 1000000;
    } else if (cleanedVolume.includes("B")) {
      numVolume = parseFloat(cleanedVolume.replace("B", "")) * 1000000000;
    } else {
      numVolume = parseFloat(cleanedVolume);
    }
  } else {
    numVolume = volume;
  }

  return isNaN(numVolume) ? 0 : numVolume;
};

// ENHANCED: AI Score color and glow utilities
const getAIScoreColor = (score: number) => {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
};

const getAIScoreGlow = (score: number) => {
  if (score >= 80)
    return "shadow-green-400/50 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]";
  if (score >= 60)
    return "shadow-yellow-400/50 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]";
  if (score >= 40)
    return "shadow-orange-400/50 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]";
  return "shadow-red-400/50 drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]";
};

const getAIScoreBg = (score: number) => {
  if (score >= 80) return "bg-green-500/20 border-green-500/40";
  if (score >= 60) return "bg-yellow-500/20 border-yellow-500/40";
  if (score >= 40) return "bg-orange-500/20 border-orange-500/40";
  return "bg-red-500/20 border-red-500/40";
};

const getAIScoreLabel = (score: number) => {
  if (score >= 90) return "ELITE";
  if (score >= 80) return "HIGH";
  if (score >= 60) return "GOOD";
  if (score >= 40) return "FAIR";
  return "LOW";
};

// BULLETPROOF: Safe gem data validator
const validateGemData = (gem: any) => {
  return {
    address: gem.address || "unknown",
    symbol: gem.symbol || "UNK",
    priceUsd: formatPrice(gem.priceUsd || gem.price || 0),
    priceChange24h: formatPriceChange(gem.priceChange24h || 0),
    volume24h: formatVolume(gem.volume24h || 0),
    marketCap: formatVolume(gem.marketCap || 0),
    aiScore: typeof gem.aiScore === "number" ? gem.aiScore : 0,
    riskLevel: gem.riskLevel || "Medium",
    isNew: Boolean(gem.isNew || gem.metadata?.isNew),
    exchange: gem.dexPair?.exchange || gem.exchange || "Raydium",
  };
};

// IMPROVED LOGO IMPLEMENTATION - USES COMPREHENSIVE LOGO SERVICE
const GemLogo: React.FC<{ gem: any; className?: string }> = ({
  gem,
  className = "",
}) => {
  const [logoError, setLogoError] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Try multiple logo sources
  const tryLogoSources = async () => {
    console.log(`[GemLogo] Trying to load logo for ${gem.symbol} (${gem.address})`);
    
    // Known working logos for specific tokens
    const knownLogos: { [key: string]: string } = {
      'stSOL': 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj/logo.png'
    };
    
    const sources = [
      // Try known working logos first
      ...(knownLogos[gem.symbol] ? [knownLogos[gem.symbol]] : []),
      // Try Solana token list
      `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${gem.address}/logo.png`,
      // DexScreener alternative format
      `https://dd.dexscreener.com/ds-data/tokens/${gem.address}.png`,
      // DexScreener Solana format
      `https://dd.dexscreener.com/ds-data/tokens/solana/${gem.address}.png`,
      // Jupiter token list
      `https://token-list-api.solana.cloud/v1/list?name=${gem.address}`,
      // Trust Wallet assets
      `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/${gem.address}/logo.png`,
      // CoinGecko API (with proper headers)
      `https://assets.coingecko.com/coins/images/18369/large/stSOL.png`,
      // Alternative CoinGecko format
      `https://assets.coingecko.com/coins/images/solana/${gem.address}/large/${gem.symbol.toLowerCase()}.png`
    ];

    for (const url of sources) {
      try {
        console.log(`[GemLogo] Trying source: ${url}`);
        const response = await fetch(url, { 
          method: 'HEAD',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'image/*'
          }
        });
        if (response.ok) {
          console.log(`[GemLogo] Found logo at: ${url}`);
          setLogoUrl(url);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log(`[GemLogo] Failed to load from ${url}:`, error);
        continue;
      }
    }
    
    // If all sources fail, show fallback
    console.log(`[GemLogo] All sources failed for ${gem.symbol}, showing fallback`);
    setLogoError(true);
    setLoading(false);
  };

  React.useEffect(() => {
    if (gem.address) {
      tryLogoSources();
    } else {
      setLogoError(true);
      setLoading(false);
    }
  }, [gem.address]);

  const fallbackLogo = (
    <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center font-mono font-bold text-white text-xs border border-gray-500/30">
      {gem.symbol.substring(0, 2)}
    </div>
  );

  if (loading) {
    return (
      <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
      </div>
    );
  }

  if (logoError || !logoUrl) {
    return fallbackLogo;
  }

  return (
    <div className="relative w-10 h-10">
      <img
        src={logoUrl}
        alt={`${gem.symbol} logo`}
        className={`w-full h-full rounded-lg object-cover border border-slate-600 ${className}`}
        onError={() => setLogoError(true)}
      />
    </div>
  );
};

export const BradleyGemScanner: React.FC = () => {
  const [memeFilter, setMemeFilter] = useState<
    "all" | "new" | "trending" | "volume"
  >("all");
  const [isUpdating, setIsUpdating] = useState(false);
  const [cacheBustParam, setCacheBustParam] = useState("");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const isHydrated = useHydration();

  // ✅ FIXED: Use 10 gems like Indian version, not 4
  const {
    gems: rawGems,
    isLoading: loading,
    error,
    refetch,
    lastUpdated,
  } = useGemData({
    category: "meme",
    limit: 10, // ✅ CHANGED FROM 4 TO 10 TO MATCH INDIAN VERSION
    refreshInterval: 10000, // ← Live updates every 10 seconds
  });

  // BULLETPROOF: Validate and sanitize gem data
  const gems = useMemo(() => {
    if (!rawGems || !Array.isArray(rawGems)) return [];
    return rawGems.map(validateGemData);
  }, [rawGems]);

  const handleRefresh = () => {
    refetch();
  };

  // Filter gems based on meme sub-category
  const filteredGems = useMemo(() => {
    if (!gems) return [];

    switch (memeFilter) {
      case "new":
        return gems.filter((gem) => gem.isNew);
      case "trending":
        return gems.filter((gem) => gem.aiScore > 80);
      case "volume":
        return gems.sort((a, b) => b.volume24h - a.volume24h);
      default:
        return gems;
    }
  }, [gems, memeFilter]);

  // Client-side cache busting after hydration
  useEffect(() => {
    if (isHydrated) {
      setCacheBustParam(`?v=${Date.now()}`);
    }
  }, [isHydrated]);

  // Add loading state for price updates
  useEffect(() => {
    if (loading) {
      setIsUpdating(true);
      const timeout = setTimeout(() => setIsUpdating(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  // Copy address to clipboard with visual feedback
  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-orange-500" />
            <span className="mexma-text-gradient">Gem Scanner</span>
            <div className="ml-auto flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Real-time Gem Discovery</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4 text-green-400" />
                <span className="text-green-400">{gems.length} <span className="mexma-text-gradient">Gems Active</span></span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Gem Discovery Analysis</h3>
              <div className="space-y-3">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white animate-pulse">
                        Scanning for gems...
                      </span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-red-400 text-center">
                      <div className="text-2xl mb-2">⚠️</div>
                      <div>Scanner Error</div>
                      <div className="text-sm text-gray-400 mt-1">
                        {typeof error === 'string' ? error : 'Connection failed'}
                      </div>
                    </div>
                  </div>
                ) : !filteredGems || filteredGems.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-gray-400 text-center">
                      <div className="text-2xl mb-2">🔍</div>
                      <div>No meme gems found</div>
                      <div className="text-sm text-gray-500 mt-1">Try refreshing</div>
                    </div>
                  </div>
                ) : (
                  filteredGems.map((gem, index) => {
                    const priceChange = formatPriceChange(gem.priceChange24h);
                    const aiScore = gem.aiScore || 0;

                    return (
                      <div
                        key={`${gem.address || gem.symbol}-${index}`}
                        className="relative overflow-hidden bg-gray-800/30 hover:bg-gray-700/40 border border-gray-600 hover:border-gray-500 p-4 transition-all duration-200 group"
                      >
                        {/* Gem Card Content */}
                        <div className="flex items-center justify-between">
                          {/* Left: Token Info with REAL LOGOS */}
                          <div className="flex items-center space-x-4">
                            <GemLogo gem={gem} />
                            <div>
                              <div className="text-white text-lg font-bold font-mono uppercase tracking-wide">
                                {gem.symbol}
                              </div>
                              <div className="text-gray-400 text-sm">
                                {gem.exchange} • solana
                              </div>
                            </div>
                          </div>

                          {/* Center: Price Data */}
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <div className="text-white text-lg font-mono font-bold">
                                ${gem.priceUsd}
                              </div>
                              <div
                                className={`text-sm font-mono font-bold ${
                                  priceChange >= 0 ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {priceChange >= 0 ? "+" : ""}
                                {priceChange.toFixed(2)}%
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="text-gray-300 text-sm font-mono">
                                Vol: ${(gem.volume24h / 1000000).toFixed(2)}M
                              </div>
                              <div className="text-gray-400 text-xs">
                                MCap: ${(gem.marketCap / 1000000).toFixed(1)}M
                              </div>
                            </div>
                          </div>

                          {/* Right: AI Score */}
                          <div className="text-center">
                            <div className="text-2xl font-bold mexma-text-gradient mb-1">
                              {aiScore}
                            </div>
                            <div className="text-xs px-2 py-1 rounded-md border border-orange-500/20 bg-orange-500/5 text-orange-400 font-medium uppercase tracking-wider">
                              SCORE
                            </div>
                          </div>
                        </div>

                        {/* Address Copy Button */}
                        {gem.address && gem.address !== "unknown" && (
                          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => copyToClipboard(gem.address)}
                              className="px-2 py-1 text-xs bg-neutral-700 hover:bg-neutral-600 text-white rounded font-mono transition-colors"
                            >
                              {copiedAddress === gem.address ? "✓ Copied" : "Copy Address"}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Scanner Metrics</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-medium">Total Gems</p>
                      <p className="text-2xl font-bold mexma-text-gradient">{gems.length}</p>
                    </div>
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Search className="h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-medium">Scanner Status</p>
                      <p className="text-lg font-semibold text-green-400">Active</p>
                    </div>
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-medium">Last Updated</p>
                      <p className="text-lg font-semibold text-blue-400">Now</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <RefreshCw className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};