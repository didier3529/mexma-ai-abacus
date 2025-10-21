'use client';

import { TokenLogo, logoService } from '@/lib/services/logo-service';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DynamicLogoProps {
  symbol: string;
  address?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showFallbackIcon?: boolean;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10', 
  lg: 'w-16 h-16'
};

export const DynamicLogo: React.FC<DynamicLogoProps> = ({
  symbol,
  address,
  name,
  size = 'md',
  className = '',
  showFallbackIcon = true
}) => {
  const [logo, setLogo] = useState<TokenLogo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    async function loadLogo() {
      try {
        setLoading(true);
        setError(null);
        setImageError(false);
        
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

  const handleImageError = () => {
    setImageError(true);
  };

  // Show loading skeleton
  if (loading) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gray-700 rounded-full animate-pulse flex items-center justify-center`}>
        <div className="w-1/2 h-1/2 bg-gray-600 rounded-full"></div>
      </div>
    );
  }

  // Show error or fallback
  if (error || imageError || !logo) {
    return showFallbackIcon ? (
      <div className={`${sizeClasses[size]} ${className} bg-gray-700 rounded-full flex items-center justify-center`}>
        <Search className="w-1/2 h-1/2 text-gray-400" />
      </div>
    ) : null;
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <img
        src={logo.logoUrl}
        alt={`${symbol} Logo`}
        className={`${sizeClasses[size]} object-contain rounded-full drop-shadow-lg`}
        onError={handleImageError}
        loading="lazy"
      />
      
      {/* Glow effect for successful loads */}
      {!imageError && (
        <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-sm animate-pulse pointer-events-none"></div>
      )}
      
      {/* Debug indicator (development only) */}
      {process.env.NODE_ENV === 'development' && logo.source && (
        <div className="absolute -bottom-1 -right-1 text-xs bg-blue-500 text-white px-1 rounded opacity-50 text-[8px]">
          {logo.source}
        </div>
      )}
    </div>
  );
};

export default DynamicLogo; 