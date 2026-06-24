"use client";

import React from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import ProductModuleDetail from "./product-module-detail";
import RichTextContent from "@/components/common/rich-text-content";
import {
  getProductPhotoUrl,
  getProductSlug,
  PRODUCTS_POPULATE_QUERY,
  sortProductModules,
} from "@/utils/product-helpers";

function ProductCard({ product, isOpen, activeModuleIndex, onToggle, onSelectModule }) {
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
              <div className="asm-product-modules__tabs" role="tablist" aria-label={`Modules ${attrs.title}`}>
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
                      <span className="asm-product-modules__tab-label">{module.name}</span>
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
}

const ProductsShowcase = () => {
  const searchParams = useSearchParams();
  const openParam = searchParams.get("open");

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [openProductId, setOpenProductId] = React.useState(null);
  const [activeModuleByProduct, setActiveModuleByProduct] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?${PRODUCTS_POPULATE_QUERY}`)
      .then((res) => setProducts(res?.data?.data || []))
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les produits pour le moment.");
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (!products.length || !openParam) {
      return;
    }

    const match = products.find((item) => {
      const slug = getProductSlug(item);
      return slug === openParam || String(item.id) === openParam;
    });

    if (!match) {
      return;
    }

    setOpenProductId(match.id);
    setActiveModuleByProduct((current) => ({
      ...current,
      [match.id]: current[match.id] ?? 0,
    }));

    requestAnimationFrame(() => {
      document
        .getElementById(`product-${getProductSlug(match)}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [products, openParam]);

  const handleToggle = (productId) => {
    setOpenProductId((current) => (current === productId ? null : productId));
    setActiveModuleByProduct((current) => ({
      ...current,
      [productId]: current[productId] ?? 0,
    }));
  };

  const handleSelectModule = (productId, moduleIndex) => {
    setActiveModuleByProduct((current) => ({
      ...current,
      [productId]: moduleIndex,
    }));
  };

  if (loading) {
    return (
      <div className="asm-products-showcase asm-products-showcase--loading">
        <div className="asm-products-skeleton" />
        <div className="asm-products-skeleton asm-products-skeleton--short" />
      </div>
    );
  }

  if (error) {
    return <p className="asm-products-error">{error}</p>;
  }

  if (!products.length) {
    return (
      <p className="asm-products-empty">
        Aucun produit publié pour le moment. Revenez bientôt.
      </p>
    );
  }

  return (
    <section className="asm-products-showcase pt-70 pb-100">
      <div className="container">
        <div className="asm-products-heading text-center mb-50">
          <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block">
            Nos solutions
          </h5>
          <h2 className="ca-section-title theme-black-2 fnw-600 pt-16 pb-16">
            Produits logiciels ASM
          </h2>
          <p className="asm-products-heading__lead">
            Cliquez sur un produit pour découvrir ses modules et leurs fonctionnalités.
          </p>
        </div>

        <div className="asm-products-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isOpen={openProductId === product.id}
              activeModuleIndex={activeModuleByProduct[product.id] ?? 0}
              onToggle={() => handleToggle(product.id)}
              onSelectModule={(index) => handleSelectModule(product.id, index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
