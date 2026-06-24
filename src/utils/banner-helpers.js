const DEFAULT_ASSETS_ORIGIN =
  process.env.NEXT_PUBLIC_ASSETS_ORIGIN || "http://localhost:1337";

export function getStrapiMediaUrl(media, assetsOrigin = DEFAULT_ASSETS_ORIGIN) {
  const url = media?.data?.attributes?.url || media?.attributes?.url || media?.url;

  if (!url) {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const origin = assetsOrigin?.replace(/\/$/, "") || DEFAULT_ASSETS_ORIGIN;
  return `${origin}${url.startsWith("/") ? url : `/${url}`}`;
}

export function resolveBannerLink(link) {
  if (!link || !String(link).trim()) {
    return null;
  }

  const value = String(link).trim();

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:")
  ) {
    return value;
  }

  return `/${value.replace(/^\/+/, "")}`;
}

const FALLBACK_SLIDES = [
  {
    id: "fallback-1",
    subtitle: "African Shipping Management",
    title: "Solutions numériques pour la collecte des redevances",
    description:
      "ASM accompagne l'État et ses partenaires dans la digitalisation des redevances multimodales, la mobilisation des recettes publiques et la transparence des opérations.",
    buttonText: "En savoir plus",
    buttonLink: "/about",
    buttonExternal: false,
    secondaryButtonText: "Notre brochure",
    secondaryButtonLink: "/brochure.pdf",
    secondaryButtonExternal: true,
    videoLabel: "Qui sommes-nous",
    videoLink: "/about",
    videoUrl: "",
    backgroundType: "image",
    image: "/assets/img/hero/hero-port-sunset.png",
    thumb: "/assets/img/hero/hero-port-sunset.png",
    backgroundVideo: null,
  },
  {
    id: "fallback-2",
    subtitle: "ASM RDC",
    title: "Modernisation des redevances et de la gouvernance publique",
    description:
      "ASM accompagne l'État et ses partenaires dans la digitalisation des redevances multimodales, la mobilisation des recettes publiques et la transparence des opérations.",
    buttonText: "Nos produits",
    buttonLink: "/products",
    buttonExternal: false,
    secondaryButtonText: "Notre brochure",
    secondaryButtonLink: "/brochure.pdf",
    secondaryButtonExternal: true,
    videoLabel: "Qui sommes-nous",
    videoLink: "/about",
    videoUrl: "",
    backgroundType: "image",
    image: "/assets/img/hero/hero-worker-container.png",
    thumb: "/assets/img/hero/hero-worker-container.png",
    backgroundVideo: null,
  },
  {
    id: "fallback-3",
    subtitle: "Transport maritime & logistique",
    title: "Accompagnement des opérateurs et institutions portuaires",
    description:
      "ASM accompagne l'État et ses partenaires dans la digitalisation des redevances multimodales, la mobilisation des recettes publiques et la transparence des opérations.",
    buttonText: "Nos services",
    buttonLink: "/services",
    buttonExternal: false,
    secondaryButtonText: "Notre brochure",
    secondaryButtonLink: "/brochure.pdf",
    secondaryButtonExternal: true,
    videoLabel: "Qui sommes-nous",
    videoLink: "/about",
    videoUrl: "",
    backgroundType: "image",
    image: "/assets/img/hero/hero-aerial-ship.png",
    thumb: "/assets/img/hero/hero-aerial-ship.png",
    backgroundVideo: null,
  },
];

function mapBannerEntry(entry, assetsOrigin) {
  const attrs = entry?.attributes || {};
  const imageUrl = getStrapiMediaUrl(attrs.image, assetsOrigin);
  const thumbUrl =
    getStrapiMediaUrl(attrs.thumbnail, assetsOrigin) || imageUrl;
  const videoUrl = getStrapiMediaUrl(attrs.backgroundVideo, assetsOrigin);
  const useVideo =
    attrs.backgroundType === "video" && Boolean(videoUrl);

  return {
    id: entry.id,
    order: attrs.order ?? 0,
    subtitle: attrs.subtitle || "",
    title: attrs.title || "",
    description: attrs.description || "",
    buttonText: attrs.buttonText || "Découvrir",
    buttonLink: resolveBannerLink(attrs.buttonLink),
    buttonExternal: Boolean(attrs.buttonExternal),
    secondaryButtonText: attrs.secondaryButtonText || "",
    secondaryButtonLink: resolveBannerLink(attrs.secondaryButtonLink),
    secondaryButtonExternal: Boolean(attrs.secondaryButtonExternal),
    videoLabel: attrs.videoLabel || "",
    videoLink: resolveBannerLink(attrs.videoLink),
    videoUrl: attrs.videoUrl || "",
    backgroundType: useVideo ? "video" : "image",
    image: imageUrl,
    thumb: thumbUrl,
    backgroundVideo: useVideo ? videoUrl : null,
  };
}

export function mapBannerSlides(
  bannerData = [],
  assetsOrigin = DEFAULT_ASSETS_ORIGIN,
  { useFallback = true } = {}
) {
  if (!Array.isArray(bannerData) || bannerData.length === 0) {
    return useFallback ? FALLBACK_SLIDES : [];
  }

  return [...bannerData]
    .map((entry) => mapBannerEntry(entry, assetsOrigin))
    .filter((slide) => slide.image || slide.backgroundVideo)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export const BANNER_POPULATE_QUERY =
  "populate[image]=*&populate[backgroundVideo]=*&populate[thumbnail]=*&sort=order:asc&pagination[pageSize]=50";
