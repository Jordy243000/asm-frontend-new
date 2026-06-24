import Products from "@/components/extra-page/blog/products";
import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import React from "react";

export const metadata = {
  title:
    "Produits | African Shipping Management (ASM) RDC - Solutions Technologiques Maritimes",
  description:
    "Découvrez nos solutions technologiques pour moderniser et digitaliser le secteur maritime, portuaire et logistique en RDC et en Afrique : SYGREM, automatisation portuaire, gestion des paiements et plus.",
  keywords: [
    "SYGREM",
    "système redevance maritime",
    "ASM RDC",
    "African Shipping Management",
    "automatisation portuaire",
    "gestion des paiements",
    "suivi des navires",
    "conformité OMI",
    "digitalisation maritime",
    "ports RDC",
    "logiciel portuaire",
    "solution portuaire intelligente",
    "audit maritime",
    "traçabilité navires",
    "Kinshasa",
    "Congo",
  ],
  authors: [
    {
      name: "African Shipping Management (ASM) RDC",
      url: "https://africansm-rdc.com",
    },
  ],
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title:
      "Produits Technologiques | African Shipping Management (ASM) RDC - Expertise Maritime Digitale",
    description:
      "Solutions innovantes pour la modernisation des opérations maritimes et portuaires en République Démocratique du Congo et en Afrique.",
    url: "/products",
    images: [
      {
        url: "/assets/img/logo/logo.png",
        width: 1920,
        height: 1080,
        alt: "Logo ASM RDC",
      },
    ],
    locale: "fr_CD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Produits Maritimes Digitaux par African Shipping Management (ASM) RDC",
    description:
      "Découvrez nos solutions technologiques pour transformer les opérations portuaires et maritimes en RDC avec African Shipping Management.",
    images: {
      url: "/assets/img/logo/logo.png",
      alt: "Logo African Shipping Management ASM RDC",
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
  other: {
    "og:service:category": "TECHNOLOGIE_MARITIME",
    "og:contact:phone": "+243857513492",
    "og:slogan":
      "African Shipping Management (ASM) RDC révolutionne le secteur maritime africain avec des solutions technologiques innovantes",
    "og:email": "support@africansm-rdc.com",
  },
};

const ProjectPage = () => {
  return (
    <>
      <Wrapper>
        <HeaderThere />
        <Products />
        <FooterFour />
      </Wrapper>
    </>
  );
};

export default ProjectPage;
