"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import CargonLoader from "@/components/Layouts/cargon/cargon-loader";
import { refreshAos } from "@/hooks/use-cargon-init";

const MIN_VISIBLE_MS = 1400;
const INNER_PAGE_READY_MS = 500;
const FALLBACK_READY_MS = 6000;

const PageTransitionContext = createContext({
  markPageReady: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

/** À appeler depuis une page dont le contenu dépend d'appels API / Slick. */
export function useReportPageReady(isReady) {
  const { markPageReady } = usePageTransition();

  useEffect(() => {
    if (isReady) {
      markPageReady();
    }
  }, [isReady, markPageReady]);
}

function isHomePath(pathname) {
  return pathname === "/" || pathname === "/home1";
}

export function PageTransitionProvider({ children }) {
  const pathname = usePathname();
  const [loaderPhase, setLoaderPhase] = useState("visible");
  const [pageReady, setPageReady] = useState(false);
  const navigationStartedAt = useRef(Date.now());
  const hideTimerRef = useRef(null);

  const markPageReady = useCallback(() => {
    setPageReady(true);
  }, []);

  useEffect(() => {
    setLoaderPhase("visible");
    setPageReady(false);
    navigationStartedAt.current = Date.now();
    document.body.classList.add("asm-page-loading");

    if (!isHomePath(pathname)) {
      const timer = setTimeout(() => markPageReady(), INNER_PAGE_READY_MS);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [pathname, markPageReady]);

  useEffect(() => {
    const fallback = setTimeout(() => markPageReady(), FALLBACK_READY_MS);
    return () => clearTimeout(fallback);
  }, [pathname, markPageReady]);

  useEffect(() => {
    if (!pageReady) {
      return undefined;
    }

    const elapsed = Date.now() - navigationStartedAt.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

    hideTimerRef.current = setTimeout(() => {
      setLoaderPhase("hiding");
      refreshAos();

      hideTimerRef.current = setTimeout(() => {
        setLoaderPhase("hidden");
        document.body.classList.remove("asm-page-loading");
        refreshAos();
      }, 520);
    }, remaining);

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [pageReady, pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
    refreshAos();
    const aosTimer = setTimeout(() => refreshAos(), 300);
    return () => clearTimeout(aosTimer);
  }, [pathname]);

  const contextValue = useMemo(
    () => ({
      markPageReady,
    }),
    [markPageReady]
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      <CargonLoader phase={loaderPhase} />
      <div
        className={`asm-page-content${loaderPhase === "hidden" ? " asm-page-content--ready" : ""}`}
        aria-busy={loaderPhase !== "hidden"}
      >
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
}
