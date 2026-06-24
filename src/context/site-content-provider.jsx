"use client";
import React from "react";
import axios from "axios";
import { getStrapiMediaUrl } from "@/utils/banner-helpers";
import {
  DEFAULT_FOOTER_LINKS,
  DEFAULT_GLOBAL_SETTINGS,
  DEFAULT_HOME_PAGE,
  DEFAULT_NAVIGATION,
  DEFAULT_OFFICES,
  DEFAULT_PAGE_METAS,
  DEFAULT_WORK_PROCESS_STEPS,
} from "@/constants/site-content-fallbacks";

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

function mergeSettings(attrs) {
  if (!attrs) return DEFAULT_GLOBAL_SETTINGS;
  return {
    ...DEFAULT_GLOBAL_SETTINGS,
    footerDescription: attrs.footerDescription ?? DEFAULT_GLOBAL_SETTINGS.footerDescription,
    footerCtaTitle: attrs.footerCtaTitle ?? DEFAULT_GLOBAL_SETTINGS.footerCtaTitle,
    footerCtaButtonText:
      attrs.footerCtaButtonText ?? DEFAULT_GLOBAL_SETTINGS.footerCtaButtonText,
    footerCtaButtonLink:
      attrs.footerCtaButtonLink ?? DEFAULT_GLOBAL_SETTINGS.footerCtaButtonLink,
    footerCtaImage:
      getStrapiMediaUrl(attrs.footerCtaImage) ?? DEFAULT_GLOBAL_SETTINGS.footerCtaImage,
    brochureUrl: attrs.brochureUrl ?? DEFAULT_GLOBAL_SETTINGS.brochureUrl,
    supportPhone: attrs.supportPhone ?? DEFAULT_GLOBAL_SETTINGS.supportPhone,
    supportPhoneLabel:
      attrs.supportPhoneLabel ?? DEFAULT_GLOBAL_SETTINGS.supportPhoneLabel,
    newsletterPlaceholder:
      attrs.newsletterPlaceholder ?? DEFAULT_GLOBAL_SETTINGS.newsletterPlaceholder,
    newsletterButtonText:
      attrs.newsletterButtonText ?? DEFAULT_GLOBAL_SETTINGS.newsletterButtonText,
    siteLogo: getStrapiMediaUrl(attrs.siteLogo) ?? DEFAULT_GLOBAL_SETTINGS.siteLogo,
  };
}

function mergeHomePage(attrs) {
  if (!attrs) return DEFAULT_HOME_PAGE;
  const merged = { ...DEFAULT_HOME_PAGE };
  Object.keys(DEFAULT_HOME_PAGE).forEach((key) => {
    if (attrs[key] != null && attrs[key] !== "") {
      merged[key] = attrs[key];
    }
  });
  merged.aboutImageMain =
    getStrapiMediaUrl(attrs.aboutImageMain) ?? DEFAULT_HOME_PAGE.aboutImageMain;
  merged.aboutImageOverlay =
    getStrapiMediaUrl(attrs.aboutImageOverlay) ?? DEFAULT_HOME_PAGE.aboutImageOverlay;
  merged.workProcessImageMain =
    getStrapiMediaUrl(attrs.workProcessImageMain) ??
    DEFAULT_HOME_PAGE.workProcessImageMain;
  merged.workProcessImageOverlay =
    getStrapiMediaUrl(attrs.workProcessImageOverlay) ??
    DEFAULT_HOME_PAGE.workProcessImageOverlay;
  return merged;
}

function mapPageMetas(entries) {
  const map = { ...DEFAULT_PAGE_METAS };
  (entries || []).forEach((entry) => {
    const attrs = entry?.attributes;
    const slug = attrs?.slug;
    if (!slug) return;
    map[slug] = {
      ...(DEFAULT_PAGE_METAS[slug] || {}),
      slug,
      breadcrumbTitle: attrs.breadcrumbTitle || DEFAULT_PAGE_METAS[slug]?.breadcrumbTitle,
      breadcrumbParent: attrs.breadcrumbParent || DEFAULT_PAGE_METAS[slug]?.breadcrumbParent,
      breadcrumbParentLink:
        attrs.breadcrumbParentLink || DEFAULT_PAGE_METAS[slug]?.breadcrumbParentLink,
      subtitle: attrs.subtitle || DEFAULT_PAGE_METAS[slug]?.subtitle,
      pageTitle: attrs.pageTitle || DEFAULT_PAGE_METAS[slug]?.pageTitle,
      intro: attrs.intro ?? DEFAULT_PAGE_METAS[slug]?.intro,
      heroImage:
        getStrapiMediaUrl(attrs.heroImage) || DEFAULT_PAGE_METAS[slug]?.heroImage,
      seoTitle: attrs.seoTitle || "",
      seoDescription: attrs.seoDescription || "",
    };
  });
  return map;
}

function mapOffices(entries) {
  if (!entries?.length) return DEFAULT_OFFICES;

  const groups = new Map();

  entries.forEach((entry) => {
    const attrs = entry?.attributes;
    if (!attrs) return;
    const key = attrs.countryKey || attrs.country;
    if (!groups.has(key)) {
      groups.set(key, {
        id: key,
        country: attrs.country,
        flag: attrs.flag || "",
        mapPosition: {
          top: attrs.mapTop || "50%",
          left: attrs.mapLeft || "50%",
        },
        offices: [],
        minSortOrder: attrs.sortOrder ?? 0,
      });
    }
    const group = groups.get(key);
    group.minSortOrder = Math.min(group.minSortOrder, attrs.sortOrder ?? 0);
    group.offices.push({
      id: `${key}-${entry.id}`,
      city: attrs.city,
      address: attrs.address || "",
      email: attrs.email || null,
      sortOrder: attrs.sortOrder ?? 0,
      showOnMap: attrs.showOnMap !== false,
    });
  });

  return Array.from(groups.values())
    .sort((a, b) => a.minSortOrder - b.minSortOrder)
    .map(({ minSortOrder, ...group }) => group);
}

export function getCountryMapMarkers(offices) {
  return (offices || DEFAULT_OFFICES)
    .filter((group) => group.offices.some((office) => office.showOnMap !== false))
    .map((group) => ({
      id: group.id,
      country: group.country,
      flag: group.flag,
      mapPosition: group.mapPosition,
      cities: group.offices
        .filter((office) => office.showOnMap !== false)
        .map((office) => office.city),
      offices: group.offices.filter((office) => office.showOnMap !== false),
    }));
}

function mapWorkSteps(entries) {
  if (!entries?.length) return DEFAULT_WORK_PROCESS_STEPS;
  return [...entries]
    .map((entry) => ({
      id: entry.id,
      title: entry.attributes?.title,
      description: entry.attributes?.description,
      sortOrder: entry.attributes?.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

function mapFooterLinks(entries) {
  if (!entries?.length) return DEFAULT_FOOTER_LINKS;
  const quick = [];
  const other = [];
  [...entries]
    .sort((a, b) => (a.attributes?.sortOrder ?? 0) - (b.attributes?.sortOrder ?? 0))
    .forEach((entry) => {
      const attrs = entry.attributes;
      const item = {
        title: attrs.title,
        link: attrs.link,
        isExternal: Boolean(attrs.isExternal),
      };
      if (attrs.group === "other") other.push(item);
      else quick.push(item);
    });
  return {
    quick: quick.length ? quick : DEFAULT_FOOTER_LINKS.quick,
    other: other.length ? other : DEFAULT_FOOTER_LINKS.other,
  };
}

function getNavParentKey(link = "") {
  return link.replace(/^\//, "").split("/")[0] || "";
}

function mapNavigation(entries) {
  if (!entries?.length) return DEFAULT_NAVIGATION;

  const items = [...entries].sort(
    (a, b) => (a.attributes?.sortOrder ?? 0) - (b.attributes?.sortOrder ?? 0)
  );

  const topLevel = items.filter((item) => !item.attributes?.parentKey);
  const children = items.filter((item) => item.attributes?.parentKey);

  const mapped = topLevel.map((item) => {
    const attrs = item.attributes;
    const parentKey = getNavParentKey(attrs.link);
    const childItems = children
      .filter((child) => child.attributes.parentKey === parentKey)
      .map((child) => ({
        title: child.attributes.label,
        link: child.attributes.link,
      }));

    const menu = {
      title: attrs.label,
      link: attrs.link,
    };

    if (childItems.length) {
      menu.children = childItems;
    }

    return menu;
  });

  return mapped.length ? mapped : DEFAULT_NAVIGATION;
}

const defaultContext = {
  loaded: false,
  settings: DEFAULT_GLOBAL_SETTINGS,
  homePage: DEFAULT_HOME_PAGE,
  pageMetas: DEFAULT_PAGE_METAS,
  offices: DEFAULT_OFFICES,
  workSteps: DEFAULT_WORK_PROCESS_STEPS,
  footerLinks: DEFAULT_FOOTER_LINKS,
  navigation: DEFAULT_NAVIGATION,
  getPageMeta: (slug) => DEFAULT_PAGE_METAS[slug] || null,
};

export const SiteContentContext = React.createContext(defaultContext);

export function SiteContentProvider({ children }) {
  const [state, setState] = React.useState(defaultContext);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [
          settingsRes,
          homeRes,
          pageMetaRes,
          officesRes,
          workRes,
          footerRes,
          navRes,
        ] = await Promise.all([
          axios.get(`${API}/global-setting?populate=*`).catch(() => null),
          axios
            .get(
              `${API}/home-page?populate[aboutImageMain]=*&populate[aboutImageOverlay]=*&populate[workProcessImageMain]=*&populate[workProcessImageOverlay]=*`
            )
            .catch(() => null),
          axios
            .get(`${API}/page-metas?populate=*&pagination[pageSize]=50`)
            .catch(() => null),
          axios
            .get(`${API}/offices?sort=sortOrder:asc&pagination[pageSize]=100`)
            .catch(() => null),
          axios
            .get(`${API}/work-process-steps?sort=sortOrder:asc&pagination[pageSize]=20`)
            .catch(() => null),
          axios
            .get(`${API}/footer-links?sort=sortOrder:asc&pagination[pageSize]=50`)
            .catch(() => null),
          axios
            .get(`${API}/navigation-items?sort=sortOrder:asc&pagination[pageSize]=50`)
            .catch(() => null),
        ]);

        if (cancelled) return;

        const pageMetas = mapPageMetas(pageMetaRes?.data?.data);
        const next = {
          loaded: true,
          settings: mergeSettings(settingsRes?.data?.data?.attributes),
          homePage: mergeHomePage(homeRes?.data?.data?.attributes),
          pageMetas,
          offices: mapOffices(officesRes?.data?.data),
          workSteps: mapWorkSteps(workRes?.data?.data),
          footerLinks: mapFooterLinks(footerRes?.data?.data),
          navigation: mapNavigation(navRes?.data?.data),
          getPageMeta: (slug) => pageMetas[slug] || DEFAULT_PAGE_METAS[slug] || null,
        };
        setState(next);
      } catch (error) {
        console.error("Erreur chargement contenu site:", error);
        if (!cancelled) {
          setState({ ...defaultContext, loaded: true });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteContentContext.Provider value={state}>{children}</SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return React.useContext(SiteContentContext);
}
