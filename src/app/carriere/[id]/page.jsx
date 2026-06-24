import React from "react";
import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import SingleCarriere from "@/components/extra-page/carriere/single-carriere";

export async function generateMetadata({ params }) {
  return {
    title: `Offre d'emploi | African Shipping Management (ASM) RDC`,
    metadataBase: new URL("https://africansm-rdc.com"),
    alternates: { canonical: `/carriere/${params.id}` },
  };
}

const CarriereDetailPage = () => {
  return (
    <Wrapper>
      <HeaderThere />
      <SingleCarriere />
      <FooterFour />
    </Wrapper>
  );
};

export default CarriereDetailPage;
