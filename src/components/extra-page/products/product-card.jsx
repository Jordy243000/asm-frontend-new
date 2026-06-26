"use client";

import React from "react";
import ProductModuleDetail from "./product-module-detail";
import RichTextContent from "@/components/common/rich-text-content";
import {
  getProductPhotoUrl,
  getProductSlug,
  sortProductModules,
} from "@/utils/product-helpers";

const ProductCard = ({
  product,
  isOpen,
  activeModuleIndex,
  onToggle,
  onSelectModule,
}) => {
  const attrs = product?.attributes || {};
  const modules = sortProductModules(attrs.module || []);
  const photo = getProductPhotoUrl(product);
  const moduleCount = modules.length;
  const excerpt =
    attrs.shortDescription ||
    (attrs.description?.length > 200
      ? `${attrs.description.slice(0, 200).trim()}…`
      : attrs.description);

  return (
    <article
      id={`product-${getProductSlug(product)}`}
      className={`asm-product-card${isOpen ? " is-open" : ""}`}
    >
      <button
        type="button"
        className="asm-product-card__header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="asm-product-card__visual">
          <img src={photo} alt={attrs.title} loading="lazy" />
          <div className="asm-product-card__visual-overlay" />
        </div>

        <div className="asm-product-card__summary">
          <div className="asm-product-card__meta">
            <span className="asm-product-card__badge">Produit ASM</span>
            {moduleCount > 0 ? (
              <span className="asm-product-card__modules-count">
                {moduleCount} module{moduleCount > 1 ? "s" : ""}
              </span>
            ) : null}
          </div>
          <h3 className="asm-product-card__title">{attrs.title}</h3>
          <p className="asm-product-card__excerpt">{excerpt}</p>
        </div>

        <span className="asm-product-card__chevron" aria-hidden="true">
          <i className={`fa-solid fa-chevron-${isOpen ? "up" : "down"}`} />
        </span>
      </button>

      <div className={`asm-product-card__panel${isOpen ? " is-visible" : ""}`}>
        <div className="asm-product-card__panel-inner">
          <div className="asm-product-card__overview">
            <RichTextContent content={attrs.description} />
          </div>

          {modules.length > 0 ? (
            <div className="asm-product-modules">
              <div
                className="asm-product-modules__tabs"
                role="tablist"
                aria-label={`Modules ${attrs.title}`}
              >
                {modules.map((module, index) => {
                  const isActive = index === activeModuleIndex;
                  return (
                    <button
                      key={`${module.name}-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`asm-product-modules__tab${isActive ? " is-active" : ""}`}
                      onClick={() => onSelectModule(index)}
                    >
                      <span className="asm-product-modules__tab-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="asm-product-modules__tab-label">
                        {module.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="asm-product-modules__content" role="tabpanel">
                <ProductModuleDetail module={modules[activeModuleIndex]} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
