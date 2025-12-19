"use client";

import { useContext } from "react";
import { StoreContext } from "@/src/store/RootStore";
import type { RootStore } from "@/src/store/RootStore";

export function useStores(): RootStore {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStores must be used within a StoreProvider");
  }
  return context;
}
