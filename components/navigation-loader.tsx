'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function NavigationLoader() {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsNavigating(true);
    
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isNavigating) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-3">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        <span className="text-gray-700 font-medium">Loading...</span>
      </div>
    </div>
  );
}