"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const ProductRedirect = () => {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      router.replace(`/products?open=${id}`);
    }
  }, [id, router]);

  return null;
};

export default ProductRedirect;
