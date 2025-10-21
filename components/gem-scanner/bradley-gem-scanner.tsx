"use client";

import { useHydration } from "@/components/ui/hydration-safe";
import { useGemData } from "@/hooks/use-gem-data";
import { RefreshCw, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

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
    
    const sources = [
      // DexScreener (most reliable for Solana tokens)
      `https://dd.dexscreener.com/ds-data/tokens/solana/${gem.address}.png`,
      // Solana FM
      `https://img.solana.fm/token/${gem.address}?size=64`,
      // Trust Wallet assets
      `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/${gem.address}/logo.png`,
      // Jupiter token list
      `https://token-list-api.solana.cloud/v1/list?name=${gem.address}`
    ];

    for (const url of sources) {
      try {
        console.log(`[GemLogo] Trying source: ${url}`);
        const response = await fetch(url, { method: 'HEAD' });
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
    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-mono font-bold text-black text-sm border border-cyan-500/30">
      {gem.symbol.charAt(0)}
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
      {/* Header - Clean Professional Style */}
      <div className="bg-black/90 backdrop-blur-sm border-b border-gray-800/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Search className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-orange-500 tracking-tight">Gem Scanner</h1>
              <p className="text-gray-300 text-sm font-medium">Real-time cryptocurrency gem discovery & analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-semibold">Live</span>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2.5 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-200 border border-gray-700/50 disabled:opacity-50"
              title="Refresh gem data"
            >
              <RefreshCw className={`h-4 w-4 text-gray-300 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 hover:bg-gray-900/70 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1 font-medium">Total Gems</p>
              <p className="text-2xl font-bold text-white">{gems.length}</p>
            </div>
            <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Search className="h-5 w-5 text-orange-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 hover:bg-gray-900/70 transition-colors">
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
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 hover:bg-gray-900/70 transition-colors">
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

      {/* Gems List */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Discovered Gems</h3>
          <p className="text-sm text-gray-400 mt-1">Real-time cryptocurrency discoveries</p>
        </div>

          {/* Gem Cards */}
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

                      {/* Right: AI Score - KEEP IN CURRENT POSITION */}
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-400">
                          {aiScore}
                        </div>
                        <div className="text-xs px-3 py-1 rounded-lg border border-orange-500/30 bg-orange-500/10 text-orange-400 font-semibold uppercase tracking-wider">
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

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">
                SOLANA MEME SCANNER • {filteredGems.length} GEMS ACTIVE
              </span>
            </div>
            <div className="text-sm text-gray-400">
              {lastUpdated
                ? `Last scan: ${new Date(lastUpdated).toLocaleTimeString()}`
                : "Initializing..."}
            </div>
          </div>
        </div>
    </div>
  );
};