import React from "react";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import CargonAboutPage from "@/components/extra-page/about/cargon-about-page";

export const metadata = {
  title:
    "À propos | African Shipping Management (ASM) RDC - Notre Histoire & Mission",
  description:
    "Découvrez African Shipping Management (ASM), son histoire, sa mission et son engagement à transformer le secteur maritime, portuaire et logistique en RDC grâce à des solutions digitales innovantes.",
  keywords: [
    "African Shipping Management (ASM) RDC",
    "ASM RDC",
    "à propos ASM",
    "transformation digitale maritime",
    "solutions portuaires",
    "vision ASM",
    "mission ASM",
  ],
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: { canonical: "/about" },
  openGraph: {
    title: "À propos de African Shipping Management (ASM) RDC",
    description:
      "Apprenez-en plus sur ASM RDC et son engagement pour la digitalisation du secteur maritime en République Démocratique du Congo.",
    url: "/about",
    images: [{ url: "/assets/img/logo/logo.png", width: 1920, height: 1080, alt: "Logo ASM RDC" }],
    locale: "fr_CD",
    type: "website",
  },
};

const AboutUsPage = () => {
  return (
    <Wrapper>
      <HeaderThere />
      <main className="cargon-inner-page ca-about-page">
        <Breadcrumb slug="about" />
        <CargonAboutPage />
      </main>
      <FooterFour />
    </Wrapper>
  );
};

export default AboutUsPage;
