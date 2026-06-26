"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import CargonLoader from "@/components/Layouts/cargon/cargon-loader";
import CargonScripts from "@/components/Layouts/cargon/cargon-scripts";
import { SiteContentProvider } from "@/context/site-content-provider";
import { refreshAos, useCargonInit } from "@/hooks/use-cargon-init";

/**
 * Shell global monté une seule fois dans layout.js.
 * Évite de remonter scripts jQuery/Slick à chaque changement de page.
 */
const SiteShell = ({ children }) => {
  const pathname = usePathname();
  useCargonInit(["base"]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.jQuery) {
        window.jQuery("#preloader").fadeOut(500);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    refreshAos();
    const timer = setTimeout(() => refreshAos(), 200);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <SiteContentProvider>
      <CargonLoader />
      {children}
      <button id="topBtn2" type="button" aria-label="Retour en haut">
        <i className="fa-solid fa-arrow-up"></i>
      </button>
      <CargonScripts />
    </SiteContentProvider>
  );
};

export default SiteShell;
