import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import CtcForm from "@/components/extra-page/contact/ctc-form";
import React from "react";

export const metadata = {
  title:
    "Contact | African Shipping Management (ASM) RDC - Support & Solutions Maritimes",
  description:
    "Contactez notre équipe ASM pour des solutions digitales maritimes sur mesure. Bureau à Kinshasa, support client et partenariats pour la transformation portuaire en RDC et en Afrique.",
  keywords: [
    "Contact ASM RDC",
    "Support maritime digital",
    "Bureau ASM Kinshasa",
    "Demande de devis maritime",
    "Service client ASM",
    "Contact urgence portuaire",
    "Partenariat maritime RDC",
    "Email ASM Congo",
    "Téléphone African Shipping Management",
    "Adresse ASM Kinshasa",
  ],
  authors: [
    {
      name: "African Shipping Management (ASM) RDC",
      url: "https://africansm-rdc.com",
    },
  ],
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contactez ASM RDC | Experts en Solutions Maritimes Digitales",
    description:
      "Notre équipe est disponible pour répondre à vos questions sur nos solutions de digitalisation portuaire et maritime en République Démocratique du Congo.",
    url: "/contact",
    images: [
      {
        url: "/assets/img/contact/contact-header.jpg",
        width: 1200,
        height: 630,
        alt: "Équipe support ASM RDC prête à vous aider",
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
    title: "Contactez les Experts Maritimes d'ASM RDC",
    description:
      "Des questions sur la digitalisation portuaire? Notre équipe support vous répond sous 24h. Solutions sur mesure pour les ports africains.",
    images: {
      url: "/assets/img/contact/twitter-card.jpg",
      alt: "Contactez African Shipping Management ASM RDC",
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
    "og:contact:phone": "+243857513492",
    "og:contact:phone_secondary": "+243818053492",
    "og:contact:email": "contact@africansm-rdc.com",
    "og:contact:address": "12 Avenue des Ports, Gombe, Kinshasa, RDC",
    "og:contact:hours": "Lun-Ven: 8h00-17h00",
    "og:slogan":
      "ASM RDC - Votre partenaire en solutions maritimes digitales, à votre écoute",
  },
};

const ContactUs = () => {
  return (
    <>
      <Wrapper>
        <HeaderThere />
        <CtcForm />
        <FooterFour />
      </Wrapper>
    </>
  );
};

export default ContactUs;
