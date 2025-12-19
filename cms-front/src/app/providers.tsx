"use client";

import { ReactNode } from "react";
import { StoreProvider } from "@/src/store";
import { LanguageProvider } from "./lib/context/LanguageContext";
import { UserActivityWatcher } from "@/src/components";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const handleInactive = () => {
    console.log("User inactive - consider auto logout");
  };

  return (
    <StoreProvider>
      <LanguageProvider>
        <UserActivityWatcher
          timeout={15 * 60 * 1000} // 15 minutes
          onInactive={handleInactive}
        />
        {children}
      </LanguageProvider>
    </StoreProvider>
  );
}
