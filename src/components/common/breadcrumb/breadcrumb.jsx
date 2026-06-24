"use client";
import CargonBreadcrumb from "@/components/Layouts/cargon/cargon-breadcrumb";
import { getPageHeroImage } from "@/constants/page-hero-images";
import { useSiteContent } from "@/context/site-content-provider";

const Breadcrumb = ({
  slug,
  title,
  subTitle,
  back,
  backLink,
  breadcrumb_bg,
  heroImage,
  variant,
}) => {
  const { getPageMeta } = useSiteContent();
  const meta = slug ? getPageMeta(slug) : null;

  const resolvedTitle = title ?? meta?.pageTitle ?? "";
  const resolvedSubTitle = subTitle ?? meta?.subtitle ?? resolvedTitle;
  const resolvedBack = back ?? meta?.breadcrumbParent ?? "Accueil";
  const resolvedBackLink = backLink ?? meta?.breadcrumbParentLink ?? "/";
  const resolvedHero = breadcrumb_bg || heroImage || meta?.heroImage;
  const resolvedVariant = variant ?? slug;

  return (
    <CargonBreadcrumb
      title={resolvedTitle}
      parentLabel={resolvedBack}
      parentLink={resolvedBackLink}
      currentLabel={resolvedSubTitle || resolvedTitle}
      backgroundImage={getPageHeroImage(resolvedVariant, resolvedHero)}
    />
  );
};

export default Breadcrumb;
