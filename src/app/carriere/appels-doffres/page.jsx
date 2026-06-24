import React from "react";
import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import AppelsDoffresList from "@/components/extra-page/carriere/appels-doffres-list";

export const metadata = {
  title: "Appels d'offres | African Shipping Management (ASM) RDC",
  description:
    "Consultez les appels d'offres d'African Shipping Management (ASM) RDC.",
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: { canonical: "/carriere/appels-doffres" },
};

const AppelsDoffresPage = () => {
  return (
    <Wrapper>
      <HeaderThere />
      <AppelsDoffresList />
      <FooterFour />
    </Wrapper>
  );
};

export default AppelsDoffresPage;
