import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import ProductsShowcase from "@/components/extra-page/products/products-showcase";
import React, { Suspense } from "react";

const Products = () => {
  return (
    <main className="cargon-inner-page asm-products-page">
      <Breadcrumb slug="products" />
      <Suspense fallback={<div className="asm-products-showcase asm-products-showcase--loading pt-70 pb-100" />}>
        <ProductsShowcase />
      </Suspense>
    </main>
  );
};

export default Products;
