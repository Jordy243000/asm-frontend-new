export const PRODUCTS_POPULATE_QUERY = [
  "populate[photo]=*",
  "populate[module][populate][objective]=*",
  "populate[module][populate][feature]=*",
  "populate[menuLinks]=*",
  "sort=sortOrder:asc",
].join("&");

export function getProductPhotoUrl(product, fallback = "/assets/img/breadcrumb/productBanner.png") {
  const url = product?.attributes?.photo?.data?.attributes?.url;
  if (!url) {
    return fallback;
  }
  return `${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${url}`;
}

export function sortProductModules(modules = []) {
  return [...modules].sort(
    (a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0)
  );
}

export function getProductSlug(product) {
  return product?.attributes?.slug || String(product?.id);
}
