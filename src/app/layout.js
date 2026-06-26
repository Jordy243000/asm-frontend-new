if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

import "react-toastify/dist/ReactToastify.css";
import "react-photo-view/dist/react-photo-view.css";
import "@/assets/cargon-overrides.css";

import Dependency from "@/components/utilities/Dependency";
import SiteShell from "@/components/Layouts/site-shell";
import { ToastContainer } from "react-toastify";

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
        alt: "Logo ASM RDC",
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
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="/cargon/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/cargon/css/all.css" />
        <link rel="stylesheet" href="/cargon/css/magnific-popup.css" />
        <link rel="stylesheet" href="/cargon/css/slick.css" />
        <link rel="stylesheet" href="/cargon/css/slick-theme.css" />
        <link rel="stylesheet" href="/cargon/css/nice-select.css" />
        <link rel="stylesheet" href="/cargon/css/typography.css" />
        <link rel="stylesheet" href="/cargon/css/aos.css" />
        <link rel="stylesheet" href="/cargon/css/style.css" />
        <link rel="stylesheet" href="/cargon/css/responsive.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "African Shipping Management (ASM) RDC",
              alternateName: "ASM RDC",
              url: "https://africansm-rdc.com",
              logo: "https://africansm-rdc.com/assets/img/logo/logo.png",
              email: "support@africansm-rdc.com",
              telephone: "+243857513492",
            }),
          }}
        />
      </head>
      <body className="cargon-theme cargon-index-2">
        <ToastContainer />
        <Dependency />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
