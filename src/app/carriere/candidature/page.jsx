import React from "react";
import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import CandidaturePage from "@/components/extra-page/carriere/candidature-page";

export const metadata = {
  title: "Candidature spontanée | African Shipping Management (ASM) RDC",
  description:
    "Déposez votre CV et candidatez spontanément chez African Shipping Management (ASM) RDC.",
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: { canonical: "/carriere/candidature" },
};

const CandidatureRoutePage = () => {
  return (
    <Wrapper>
      <HeaderThere />
      <CandidaturePage />
      <FooterFour />
    </Wrapper>
  );
};

export default CandidatureRoutePage;
