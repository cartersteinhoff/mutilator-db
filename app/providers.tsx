"use client";

import { StackProvider } from "@stackframe/stack";
import { stackClientApp } from "@/lib/stack-client";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <StackProvider app={stackClientApp}>
        {children}
      </StackProvider>
    </TooltipProvider>
  );
}