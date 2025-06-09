'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface PageLoaderProps {
  children: React.ReactNode;
}

export function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 rounded-full animate-pulse mx-auto"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading MARI English</h2>
          <p className="text-gray-500">Preparing your learning experience...</p>
          
          {/* Animated dots */}
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}