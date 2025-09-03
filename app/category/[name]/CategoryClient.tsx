"use client";

import { useEffect, useState } from "react";
import ProductItem from "@/app/myReusableComponents/ProductItem";
import { CartLoader } from "@/components/ui/LoadingCart";
import { Product } from "@/app/types/Product";

type Props = {
  products: any[]; // raw Appwrite data
  category: string;
};

export default function CategoryClient({ products, category }: Props) {
  const [loading, setLoading] = useState(true);
  const [mappedProducts, setMappedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const formatted: Product[] = products.map((p: any) => ({
        $id: p.$id,
        Name: p.Name ?? "Unnamed Product",
        price: p.Price ?? 0,
        long_description: p.Long_Description ?? "",
        short_description: p.Short_Description ?? "",
        images: p.images ?? [],
        stock: p.stock ?? 0,
        category: p.category ?? "",
        colors: p.colors ?? [],
      }));
      setMappedProducts(formatted);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [products]);

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
        {mappedProducts.map((product) => (
          <ProductItem key={product.$id} product={product} showStock={true} />
        ))}
      </div>
    </div>
  );
}
