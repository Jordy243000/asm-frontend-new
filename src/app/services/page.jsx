import MainServices from "@/components/extra-page/services/services";
import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import React from "react";

export const metadata = {
  title:
    "Services | African Shipping Management (ASM) RDC - Solutions Maritimes Digitales",
  description:
    "Découvrez nos solutions digitales pour le secteur maritime : gestion des redevances, traçabilité des cargaisons, optimisation portuaire et systèmes d'information logistiques en RDC.",
  keywords: [
    "services ASM",
    "African Shipping Management",
    "solutions maritimes RDC",
    "digitalisation portuaire",
    "gestion des redevances maritimes",
    "systèmes logistiques Congo",
    "traçabilité des cargaisons",
    "optimisation portuaire Kinshasa",
    "automatisation maritime",
  ],
  authors: [
    {
      name: "African Shipping Management (ASM) RDC",
      url: "https://africansm-rdc.com",
    },
  ],
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title:
      "Services Professionnels | African Shipping Management (ASM) RDC - Expertise Maritime Digitale",
    description:
      "Solutions complètes pour la transformation digitale des opérations maritimes et portuaires en République Démocratique du Congo.",
    url: "/services",
    images: [
      {
        url: "/assets/img/logo/logo.png",
        width: 800,
        height: 600,
        alt: "Logo ASM RDC",
      },
    ],
    locale: "fr_CD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Services Maritimes Digitaux par African Shipping Management (ASM) RDC",
    description:
      "Avec African Shipping Management (ASM) RDC, Optimisez vos opérations portuaires avec nos solutions technologiques sur mesure.",
    images: {
      images: ["/assets/img/logo/logo.png"],
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
    "og:service:category": "DIGITALISATION_MARITIME",
    "og:contact:phone": "+243857513492",
    "og:slogan":
      "African Shipping Management (ASM) RDC vous offre des solutions digitales au service du secteur maritime africain",
    "og:email": "support@africansm-rdc.com",
  },
};

const ServicesPage = () => {
  return (
    <>
      <Wrapper>
        <HeaderThere />
        <MainServices />
        <FooterFour />
      </Wrapper>
    </>
  );
};

export default ServicesPage;
