import React from "react";
import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import Equipe from "@/components/extra-page/equipe/equipe";

export const metadata = {
  title:
    "Équipe | African Shipping Management (ASM) RDC - Nos Experts Maritimes",
  description:
    "Découvrez l'équipe d'African Shipping Management (ASM) RDC : nos experts en logistique maritime, solutions portuaires et transformation digitale en République Démocratique du Congo.",
  keywords: [
    "Équipe ASM",
    "Experts maritime RDC",
    "African Shipping Management équipe",
    "Professionnels portuaires Congo",
    "Leadership ASM RDC",
    "Équipe logistique maritime",
  ],
  authors: [
    {
      name: "African Shipping Management (ASM) RDC",
      url: "https://africansm-rdc.com",
    },
  ],
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: {
    canonical: "/equipe",
  },
  openGraph: {
    title: "Notre Équipe | ASM RDC - Experts en solutions maritimes",
    description:
      "Rencontrez les professionnels qui font avancer la digitalisation du secteur maritime et portuaire en Afrique centrale.",
    url: "/equipe",
    images: [
      {
        url: "/assets/img/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Équipe African Shipping Management ASM RDC",
      },
    ],
    locale: "fr_CD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Équipe ASM RDC",
    description:
      "Les experts derrière la transformation digitale du secteur maritime en RDC.",
    images: {
      url: "/assets/img/logo/logo.png",
      alt: "Équipe ASM RDC",
    },
    site: "@africansm_rdc",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const EquipePage = () => {
  return (
    <Wrapper>
      <HeaderThere />
      <Equipe />
      <FooterFour />
    </Wrapper>
  );
};

export default EquipePage;
