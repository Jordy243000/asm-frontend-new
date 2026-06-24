import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import MainHomePage from "@/components/home/home";
import React from "react";

export const metadata = {
  title:
    "African Shipping Management (ASM) RDC - Solutions Digitales pour le Secteur Maritime",
  description:
    "African Shipping Management (ASM) RDC digitalise le secteur maritime et portuaire en RDC avec des solutions innovantes de gestion des infrastructures, redevances maritimes et transport multimodal.",
  keywords: [
    "African Shipping Management",
    "ASM RDC",
    "digitalisation maritime",
    "gestion portuaire RDC",
    "transport multimodal Congo",
    "solutions logistiques Kinshasa",
    "redevances maritimes",
    "sécurité portuaire",
    "traçabilité maritime",
  ],
  authors: [
    {
      name: "African Shipping Management (ASM) RDC",
      url: "https://africansm-rdc.com",
    },
  ],
  creator: "African Shipping Management (ASM) RDC",
  publisher: "African Shipping Management (ASM) RDC",
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "African Shipping Management (ASM) RDC - Leader en Digitalisation Maritime",
    description:
      "Solutions digitales innovantes pour moderniser la gestion maritime, portuaire et logistique en RDC et en Afrique.",
    url: "https://africansm-rdc.com",
    siteName: "African Shipping Management (ASM) RDC",
    images: [
      {
        url: "/assets/img/logo/logo.png",
        width: 800,
        height: 600,
        alt: "Logo African Shipping Management ASM RDC",
      },
    ],
    locale: "fr_CD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "African Shipping Management (ASM) RDC - Transformation Digitale du Secteur Maritime",
    description:
      "Partenaire stratégique pour la modernisation des infrastructures portuaires et la gestion maritime en RDC.",
    images: ["/assets/img/logo/logo.png"],
    site: "@africansm_rdc",
    creator: "@africansm_rdc",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "og:slogan":
      "African Shipping Management (ASM) RDC vous offre des solutions digitales au service du secteur maritime africain",
    "og:contact": "+243857513492",
    "og:email": "support@africansm-rdc.com",
  },
};

const Home1 = () => {
  return (
    <>
      <Wrapper>
        <HeaderThere />
        <MainHomePage />
        <FooterFour />
      </Wrapper>
    </>
  );
};

export default Home1;
