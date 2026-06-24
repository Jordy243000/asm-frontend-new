import Link from "next/link";
import React from "react";

const CargonBreadcrumb = ({
  title,
  parentLabel = "Accueil",
  parentLink = "/",
  currentLabel,
  backgroundImage,
}) => {
  const hasHeroImage = Boolean(backgroundImage);

  return (
    <section
      className={`ca-breadcrumb-area p-relative z-index-1 fix${
        hasHeroImage ? " ca-breadcrumb-area--hero" : " cream-bg-3"
      }`}
      style={
        hasHeroImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      <div className="container">
        <div className="ca-breadcrumb-content text-center">
          <h1 className="ca-breadcrumb-title fnw-600 ca-text-cap">{title}</h1>
          <div className="it-breadcum-link">
            <Link href={parentLink}>{parentLabel}</Link>
            <span>
              <i className="fa-solid fa-angle-right"></i>
            </span>
            <span className="active">{currentLabel || title}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CargonBreadcrumb;
