import React from "react";
import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import CarriereList from "@/components/extra-page/carriere/carriere-list";

export const metadata = {
  title: "Offres d'emploi | African Shipping Management (ASM) RDC",
  description:
    "Consultez les offres d'emploi d'African Shipping Management (ASM) RDC et postulez en ligne.",
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: { canonical: "/carriere/offres" },
};

const OffresPage = () => {
  return (
    <Wrapper>
      <HeaderThere />
      <CarriereList />
      <FooterFour />
    </Wrapper>
  );
};

export default OffresPage;
