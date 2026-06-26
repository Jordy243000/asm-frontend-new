"use client";
import React from "react";
import CargonScripts from "@/components/Layouts/cargon/cargon-scripts";
import { SiteContentProvider } from "@/context/site-content-provider";
import { PageTransitionProvider } from "@/context/page-transition-provider";
import { useCargonInit } from "@/hooks/use-cargon-init";

/**
 * Shell global monté une seule fois dans layout.js.
 * Évite de remonter scripts jQuery/Slick à chaque changement de page.
 */
const SiteShell = ({ children }) => {
  useCargonInit(["base"]);

  return (
    <SiteContentProvider>
      <PageTransitionProvider>
        {children}
        <button id="topBtn2" type="button" aria-label="Retour en haut">
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </PageTransitionProvider>
      <CargonScripts />
    </SiteContentProvider>
  );
};

export default SiteShell;
