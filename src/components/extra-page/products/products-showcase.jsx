"use client";

import React from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import ProductCard from "./product-card";
import { getProductSlug, PRODUCTS_POPULATE_QUERY } from "@/utils/product-helpers";

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
