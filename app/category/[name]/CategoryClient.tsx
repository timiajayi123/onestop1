// app/category/[name]/CategoryClient.tsx
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types/Product";
import ProductItem from "@/app/myReusableComponents/ProductItem";
import { CartLoader } from "@/components/ui/LoadingCart";

type Props = {
  products: Product[];
  category: string;
};

export default function CategoryClient({ products, category }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Small delay so loader shows
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CartLoader />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 capitalize">{category} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductItem key={product.$id} product={product} showStock={true} />
        ))}
      </div>
    </div>
  );
}
