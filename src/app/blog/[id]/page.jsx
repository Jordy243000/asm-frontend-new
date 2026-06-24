import SingleBlog from "@/components/extra-page/blog-details/single-blog";
import SingleService from "@/components/extra-page/services-details/single-service";
import MainServices from "@/components/extra-page/services/services";
import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;
  return {
    title:
      "Blog | African Shipping Management (ASM) RDC - Actualités & Insights Maritimes",
    description:
      "Découvrez nos articles, actualités et communications sur la transformation digitale du secteur maritime en RDC et en Afrique. Expertises, innovations et tendances par ASM.",
    keywords: [
      "Blog ASM",
      "Actualités maritimes RDC",
      "Articles portuaires",
      "African Shipping Management blog",
      "Nouvelles technologies maritimes",
      "Digitalisation portuaire",
      "Communiqués ASM",
      "Secteur maritime Congo",
      "Innovations logistiques Afrique",
      "Trends maritime digital",
    ],
    authors: [
      {
        name: "African Shipping Management (ASM) RDC",
        url: "https://africansm-rdc.com",
      },
    ],
    metadataBase: new URL("https://africansm-rdc.com"),

    alternates: {
      canonical: `/blog/${id}`,
    },
    openGraph: {
      title:
        "Blog Expert | African Shipping Management (ASM) RDC - Analyses Maritimes",
      description:
        "Plateforme de connaissances sur l'innovation maritime et portuaire en Afrique : articles techniques, actualités sectorielles et analyses d'experts.",
      url: `/blog/${id}`,
      images: [
        {
          url: "/assets/img/logo/logo.png",
          width: 1920,
          height: 1080,
          alt: "Logo African Shipping Management ASM RDC",
        },
      ],
      locale: "fr_CD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog ASM RDC - Le futur du maritime digital en Afrique",
      description:
        "Suivez nos analyses exclusives sur la révolution digitale du secteur maritime et portuaire africain avec African Shipping Management.",
      images: {
        url: "/assets/img/blog/blog-social.jpg",
        alt: "Couverture du Blog African Shipping Management ASM RDC",
      },
      site: "@africansm_rdc",
      creator: "@asm_rdc_blog",
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
        "max-snippet": -1,
      },
    },
    other: {
      "og:content:type": "BLOG",
      "og:contact:phone": "+243857513492",
      "og:slogan":
        "African Shipping Management (ASM) RDC partage son expertise maritime digitale à travers son blog",
      "og:email": "blog@africansm-rdc.com",
      "og:author": "Équipe éditoriale ASM",
    },
  };
}

const SingleBlogPage = () => {
  return (
    <>
      <Wrapper>
        <HeaderThere />
        <SingleBlog />
        <FooterFour />
      </Wrapper>
    </>
  );
};

export default SingleBlogPage;
