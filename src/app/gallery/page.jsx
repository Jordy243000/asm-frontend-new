import React from "react";
import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import Gallery from "@/components/extra-page/gallery/gallery";

export const metadata = {
  title:
    "Galerie | African Shipping Management (ASM) RDC - Projets & Événements Maritimes",
  description:
    "Explorez notre galerie visuelle : découvrez nos projets maritimes, solutions digitales en action, et événements clés qui transforment le secteur portuaire en RDC et en Afrique.",
  keywords: [
    "Galerie ASM",
    "Photos maritimes RDC",
    "Projets portuaires ASM",
    "Événements maritime Congo",
    "Images digitalisation portuaire",
    "Réalisations African Shipping Management",
    "Solutions logistiques visuelles",
    "Photos Kinshasa port",
    "Cas d'utilisation maritime",
    "Transformation digitale en images",
  ],
  authors: [
    {
      name: "African Shipping Management (ASM) RDC",
      url: "https://africansm-rdc.com",
    },
  ],
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Galerie Exclusive | ASM RDC - L'innovation maritime en images",
    description:
      "Notre portfolio visuel présente l'impact concret de nos solutions digitales sur les opérations maritimes et portuaires en Afrique centrale.",
    url: "/gallery",
    images: [
      {
        url: "/assets/img/gallery/gallery-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Aperçu de la galerie ASM - Projets maritimes en action",
      },
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
    title: "Galerie ASM RDC - Voir la révolution maritime digitale",
    description:
      "Une collection visuelle de nos réalisations et de l'évolution des ports africains grâce à nos solutions technologiques.",
    images: {
      url: "/assets/img/gallery/twitter-card.jpg",
      alt: "Galerie African Shipping Management - Images maritimes",
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
      "max-video-preview": -1,
    },
  },
  other: {
    "og:content:type": "GALLERY",
    "og:gallery:category": "MARITIME_TRANSFORMATION",
    "og:contact:phone": "+243857513492",
    "og:slogan":
      "ASM RDC capture l'évolution digitale du secteur maritime africain en images",
    "og:email": "communication@africansm-rdc.com",
  },
};

const GalleryPage = () => {
  return (
    <>
      <Wrapper>
        <HeaderThere />
        <Gallery />
        <FooterFour />
      </Wrapper>
    </>
  );
};

export default GalleryPage;
