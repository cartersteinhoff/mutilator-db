import { Suspense } from "react";
import { HeaderClient } from "./header-client";

function HeaderSkeleton() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              MutilatorDB
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-9 bg-muted rounded animate-pulse"></div>
            <div className="w-20 h-9 bg-purple-600/50 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Header() {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderClient />
    </Suspense>
  );
}