import { cargonMenu } from "@/constants/cargon-menu";
import { officesByCountry } from "@/constants/offices";
import { PAGE_HERO_IMAGES } from "@/constants/page-hero-images";

export const DEFAULT_GLOBAL_SETTINGS = {
  footerDescription:
    "Notre portée nationale, combinée à une expertise locale, garantit des solutions numériques sécurisées, traçables et performantes pour le transport multimodal en RDC.",
  footerCtaTitle:
    "Modernisez la gestion du transport multimodal avec ASM.",
  footerCtaButtonText: "Nous contacter",
  footerCtaButtonLink: "/contact",
  footerCtaImage: "/cargon/img/about/ca-cta-2.1.png",
  brochureUrl: "/brochure.pdf",
  supportPhone: "+243991450541",
  supportPhoneLabel: "Appelez-nous",
  newsletterPlaceholder: "Votre adresse e-mail",
  newsletterButtonText: "S'abonner",
  siteLogo: "/assets/img/logo/logo.png",
};

export const DEFAULT_HOME_PAGE = {
  aboutImageMain: "/cargon/img/about/about-2.1.png",
  aboutImageOverlay: "/cargon/img/about/about-2.2.png",
  aboutPhone: "+243991450541",
  aboutPhoneLabel: "Appelez-nous",
  aboutButtonText: "En savoir plus",
  aboutButtonLink: "/about",
  servicesSubtitle: "Nos services",
  servicesTitle: "Solutions numériques pour le transport multimodal",
  servicesButtonText: "Voir tous nos services",
  servicesButtonLink: "/services",
  productsSubtitle: "Nos produits",
  productsTitle: "Produits logiciels pour la gestion portuaire",
  productsDescription:
    "Découvrez nos solutions phares pour la digitalisation des opérations maritimes et portuaires.",
  productsButtonText: "Voir tous nos produits",
  productsButtonLink: "/products",
  serviceCtaTitle:
    "Avec ASM RDC, optimisez l'organisation et le suivi des activités de votre entreprise avec nos produits logiciels.",
  serviceCtaText: "",
  serviceCtaButtonText: "Découvrir nos produits",
  serviceCtaButtonLink: "/products",
  workProcessSubtitle: "Pourquoi choisir",
  workProcessTitle: "African Shipping Management ASM RDC",
  workProcessImageMain: "/cargon/img/about/about-work-2.1.png",
  workProcessImageOverlay: "/cargon/img/about/about-work-2.2.png",
  testimonialsSubtitle: "Témoignages",
  testimonialsTitle: "La confiance de nos partenaires",
  testimonialsDescription:
    "ASM s'appuie sur des équipes engagées pour accompagner les institutions publiques et les opérateurs privés.",
  blogSubtitle: "Actualités",
  blogTitle: "Dernières publications",
  blogDescription:
    "Retrouvez les articles, actualités et communiqués d'African Shipping Management.",
  blogButtonText: "Voir toutes les actualités",
  blogButtonLink: "/blog",
  contactSubtitle: "Nous contacter",
  contactTitle: "Exprimez-nous vos besoins",
  contactDescription:
    "Notre équipe vous répond dans les meilleurs délais pendant les heures ouvrables.",
};

export const DEFAULT_WORK_PROCESS_STEPS = [
  {
    id: 1,
    title: "Expertise reconnue",
    description:
      "Une maîtrise approfondie de la digitalisation du secteur maritime et portuaire pour optimiser vos opérations.",
  },
  {
    id: 2,
    title: "Solutions sur mesure",
    description:
      "Des services adaptés aux besoins spécifiques des acteurs publics et privés pour une gestion efficace.",
  },
  {
    id: 3,
    title: "Fiabilité et transparence",
    description:
      "Un engagement fort pour la traçabilité, la sécurité et une transparence totale dans toutes les opérations.",
  },
  {
    id: 4,
    title: "Innovation et engagement",
    description:
      "Une équipe passionnée qui met la technologie au service de votre croissance et de votre compétitivité.",
  },
];

export const DEFAULT_PAGE_METAS = {
  services: {
    slug: "services",
    breadcrumbTitle: "Nos services",
    breadcrumbParent: "Accueil",
    breadcrumbParentLink: "/",
    subtitle: "Ce que nous faisons",
    pageTitle: "Nos services",
    intro:
      "Des solutions numériques pour accompagner la transformation du transport maritime en RDC.",
    heroImage: PAGE_HERO_IMAGES.services,
  },
  products: {
    slug: "products",
    breadcrumbTitle: "Nos produits",
    breadcrumbParent: "Accueil",
    breadcrumbParentLink: "/",
    subtitle: "Produits",
    pageTitle: "Nos produits logiciels",
    intro: "",
    heroImage: PAGE_HERO_IMAGES.products,
  },
  blog: {
    slug: "blog",
    breadcrumbTitle: "Actualités",
    breadcrumbParent: "Accueil",
    breadcrumbParentLink: "/",
    subtitle: "Blog",
    pageTitle: "Actualités & publications",
    intro: "",
    heroImage: PAGE_HERO_IMAGES.blog,
  },
  gallery: {
    slug: "gallery",
    breadcrumbTitle: "Galerie",
    breadcrumbParent: "Accueil",
    breadcrumbParentLink: "/",
    subtitle: "Galerie",
    pageTitle: "Galerie photos",
    intro: "",
    heroImage: PAGE_HERO_IMAGES.gallery,
  },
  contact: {
    slug: "contact",
    breadcrumbTitle: "Contact",
    breadcrumbParent: "Accueil",
    breadcrumbParentLink: "/",
    subtitle: "Contact",
    pageTitle: "Contactez-nous",
    intro: "",
    heroImage: PAGE_HERO_IMAGES.contact,
  },
  equipe: {
    slug: "equipe",
    breadcrumbTitle: "Notre équipe",
    breadcrumbParent: "Accueil",
    breadcrumbParentLink: "/",
    subtitle: "Équipe",
    pageTitle: "Notre équipe",
    intro: "",
    heroImage: PAGE_HERO_IMAGES.team,
  },
  about: {
    slug: "about",
    breadcrumbTitle: "À propos",
    breadcrumbParent: "Accueil",
    breadcrumbParentLink: "/",
    subtitle: "À propos",
    pageTitle: "À propos de nous",
    intro: "",
    heroImage: PAGE_HERO_IMAGES.about,
  },
  "carriere-offres": {
    slug: "carriere-offres",
    breadcrumbTitle: "Offres d'emploi",
    breadcrumbParent: "Carrière",
    breadcrumbParentLink: "/carriere/offres",
    subtitle: "Opportunités",
    pageTitle: "Rejoignez notre équipe",
    intro:
      "Découvrez nos offres d'emploi et postulez en ligne en envoyant votre CV.",
    heroImage: PAGE_HERO_IMAGES.career,
  },
  "carriere-appels": {
    slug: "carriere-appels",
    breadcrumbTitle: "Appels d'offres",
    breadcrumbParent: "Carrière",
    breadcrumbParentLink: "/carriere/offres",
    subtitle: "Marchés publics",
    pageTitle: "Appels d'offres",
    intro: "Consultez nos appels d'offres en cours.",
    heroImage: PAGE_HERO_IMAGES.career,
  },
  "carriere-candidature": {
    slug: "carriere-candidature",
    breadcrumbTitle: "Candidature spontanée",
    breadcrumbParent: "Carrière",
    breadcrumbParentLink: "/carriere/offres",
    subtitle: "Candidature",
    pageTitle: "Envoyez votre candidature",
    intro:
      "Vous ne trouvez pas d'offre correspondant à votre profil ? Envoyez-nous une candidature spontanée.",
    heroImage: PAGE_HERO_IMAGES.career,
  },
};

export const DEFAULT_FOOTER_LINKS = {
  quick: [
    { title: "Accueil", link: "/", isExternal: false },
    { title: "Services", link: "/services", isExternal: false },
    { title: "À propos", link: "/about", isExternal: false },
    { title: "Actualités", link: "/blog", isExternal: false },
    { title: "Contact", link: "/contact", isExternal: false },
  ],
  other: [
    { title: "Produits", link: "/products", isExternal: false },
    { title: "Notre équipe", link: "/equipe", isExternal: false },
    { title: "Carrières", link: "/carriere/offres", isExternal: false },
    { title: "Galerie", link: "/gallery", isExternal: false },
    { title: "Brochure", link: "/brochure.pdf", isExternal: true },
  ],
};

export const DEFAULT_NAVIGATION = cargonMenu;

export { officesByCountry as DEFAULT_OFFICES };
