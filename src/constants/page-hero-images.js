export const PAGE_HERO_IMAGES = {
  about: "/assets/img/breadcrumb/aboutBanner.png",
  blog: "/assets/img/breadcrumb/blogBanner.png",
  career: "/assets/img/breadcrumb/careerBanner.png",
  contact: "/assets/img/breadcrumb/contactBanner.png",
  gallery: "/assets/img/breadcrumb/galleryBanner.png",
  products: "/assets/img/breadcrumb/productBanner.png",
  services: "/assets/img/breadcrumb/servBanner.png",
  team: "/assets/img/breadcrumb/aboutBanner.png",
  default: "/assets/img/breadcrumb/aboutBanner.png",
};

export function getPageHeroImage(variant, override) {
  if (override) {
    return override;
  }

  if (variant && PAGE_HERO_IMAGES[variant]) {
    return PAGE_HERO_IMAGES[variant];
  }

  return PAGE_HERO_IMAGES.default;
}
