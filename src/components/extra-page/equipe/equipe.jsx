"use client";
import React from "react";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import CargonExecutivesSection from "@/components/extra-page/equipe/cargon-executives-section";
import CargonTeamMosaic from "@/components/extra-page/equipe/cargon-team-mosaic";

const Equipe = () => {
  return (
    <main className="cargon-inner-page">
      <Breadcrumb slug="equipe" />
      <CargonExecutivesSection />
      <CargonTeamMosaic />
    </main>
  );
};

export default Equipe;
