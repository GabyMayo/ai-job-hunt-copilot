"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface PageTitleContextValue {
  title: string | null;
  setTitle: (title: string | null) => void;
}

const PageTitleContext = createContext<PageTitleContextValue | null>(null);

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState<string | null>(null);

  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
}

export function usePageTitleValue() {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error("usePageTitleValue must be used within a PageTitleProvider");
  }
  return context.title;
}

/**
 * Lets a page override the header title (e.g. showing "Google · SWE Intern"
 * on an application detail page instead of a generic route-based title).
 * Automatically clears when the calling component unmounts.
 */
export function useSetPageTitle(title: string | null) {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error("useSetPageTitle must be used within a PageTitleProvider");
  }
  const { setTitle } = context;

  useEffect(() => {
    setTitle(title);
    return () => setTitle(null);
  }, [title, setTitle]);
}
