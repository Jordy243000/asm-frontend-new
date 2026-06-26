"use client";

import React from "react";
import Link from "next/link";
import axios from "axios";
import ProductCard from "@/components/extra-page/products/product-card";
import { PRODUCTS_POPULATE_QUERY } from "@/utils/product-helpers";
import { useSiteContent } from "@/context/site-content-provider";

const HomeProductsSection = () => {
  const { homePage } = useSiteContent();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openProductId, setOpenProductId] = React.useState(null);
  const [activeModuleByProduct, setActiveModuleByProduct] = React.useState({});

  React.useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?${PRODUCTS_POPULATE_QUERY}&pagination[pageSize]=6`
      )
      .then((res) => setProducts(res?.data?.data || []))
      .catch((error) => {
        console.error(error);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

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
      <section className="asm-home-products pt-100 pb-70">
        <div className="container">
          <div className="asm-products-showcase asm-products-showcase--loading">
            <div className="asm-products-skeleton" />
            <div className="asm-products-skeleton asm-products-skeleton--short" />
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <section className="asm-home-products pt-100 pb-70">
      <div className="container">
        <div className="ca-portfolio-content-2 ca-sec-content-2 text-center mb-50">
          <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block">
            {homePage.productsSubtitle}
          </h5>
          <h2 className="ca-section-title theme-black-2 fnw-600 pt-16 ca-text-cap">
            {homePage.productsTitle}
          </h2>
          <p className="pt-16">{homePage.productsDescription}</p>
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

        <div className="text-center pt-30">
          <Link href={homePage.productsButtonLink} className="ca-btn-primary-22">
            {homePage.productsButtonText}{" "}
            <span>
              <i className="fa-solid fa-arrow-right" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeProductsSection;
