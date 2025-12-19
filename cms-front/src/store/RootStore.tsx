"use client";

import { createContext, ReactNode } from "react";
import { AuthStore } from "./AuthStore";
import { UiStore } from "./UiStore";

export class RootStore {
  authStore: AuthStore;
  uiStore: UiStore;

  constructor() {
    this.authStore = new AuthStore();
    this.uiStore = new UiStore();
  }
}

// Singleton instance
let rootStore: RootStore | null = null;

export function getRootStore(): RootStore {
  if (typeof window === "undefined") {
    // Server-side: always create new store
    return new RootStore();
  }
  // Client-side: use singleton
  if (!rootStore) {
    rootStore = new RootStore();
  }
  return rootStore;
}

export const StoreContext = createContext<RootStore | null>(null);

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const store = getRootStore();

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}
