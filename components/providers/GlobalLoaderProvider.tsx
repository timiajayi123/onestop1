"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CartLoader } from "@/components/ui/LoadingCart";

type GlobalLoaderContextType = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const GlobalLoaderContext = createContext<GlobalLoaderContextType | undefined>(
  undefined
);

export function GlobalLoaderProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  // ✅ Whenever route changes, stop loading automatically
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <GlobalLoaderContext.Provider value={{ loading, setLoading }}>
      {loading && <CartLoader />} {/* ✅ Loader visible globally */}
      {children}
    </GlobalLoaderContext.Provider>
  );
}

export function useGlobalLoader() {
  const context = useContext(GlobalLoaderContext);
  if (!context) {
    throw new Error("useGlobalLoader must be used within GlobalLoaderProvider");
  }
  return context;
}
