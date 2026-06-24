"use client";

import RichTextContent from "@/components/common/rich-text-content";

function ChecklistBlock({ title, intro, items, icon = "check" }) {
  if (!items?.length && !intro && !title) {
    return null;
  }

  return (
    <section className="asm-product-module-section">
      {title ? <h4 className="asm-product-module-section__title">{title}</h4> : null}
      {intro ? <RichTextContent content={intro} className="asm-product-module-section__intro" /> : null}
      {items?.length ? (
        <ul className={`asm-product-checklist asm-product-checklist--${icon}`}>
          {items.map((item, index) => (
            <li key={`${item?.list}-${index}`}>
              <span className="asm-product-checklist__icon" aria-hidden="true">
                <i className="fa-solid fa-circle-check" />
              </span>
              <span>{item?.list}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

const ProductModuleDetail = ({ module }) => {
  if (!module) {
    return null;
  }

  const hasAccessLink = Boolean(module.accessLink?.trim());

  return (
    <div className="asm-product-module-detail">
      {module.tagline ? (
        <p className="asm-product-module-detail__tagline">{module.tagline}</p>
      ) : null}

      <ChecklistBlock title="Présentation" intro={module.description} />

      <ChecklistBlock
        title={module.objectivesTitle}
        intro={module.objectivesIntro}
        items={module.objective}
      />

      <ChecklistBlock title={module.whyUseTitle} intro={module.whyUse} />

      <ChecklistBlock
        title={module.featuresTitle}
        intro={module.featuresIntro}
        items={module.feature}
      />

      {module.closingTitle || module.closing ? (
        <section className="asm-product-module-section asm-product-module-highlight">
          {module.closingTitle ? (
            <h4 className="asm-product-module-section__title">{module.closingTitle}</h4>
          ) : null}
          <RichTextContent content={module.closing} />
        </section>
      ) : null}

      {module.accessTitle || module.accessIntro || module.accessLinkLabel ? (
        <section className="asm-product-module-access">
          {module.accessTitle ? (
            <h4 className="asm-product-module-section__title">{module.accessTitle}</h4>
          ) : null}
          <RichTextContent content={module.accessIntro} className="asm-product-module-section__intro" />
          {hasAccessLink ? (
            <a
              href={module.accessLink}
              className="ca-btn-primary-22 asm-product-access-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {module.accessLinkLabel || "Accéder à la plateforme"}
              <span>
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </span>
            </a>
          ) : module.accessLinkLabel ? (
            <div className="asm-product-access-unavailable">
              <i className="fa-solid fa-clock" aria-hidden="true" />
              <span>{module.accessLinkLabel}</span>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
};

export default ProductModuleDetail;
