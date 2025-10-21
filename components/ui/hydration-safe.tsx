'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to safely handle hydration mismatches
 * Returns true only after component has hydrated on client
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Component wrapper to prevent hydration mismatches
 * Only renders children after hydration is complete
 */
export function HydrationSafe({ 
  children, 
  fallback = null 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const isHydrated = useHydration();

  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
} 