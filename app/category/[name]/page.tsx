// app/category/[name]/page.tsx

import { getProductsByCategory } from "@/lib/getProductsByCategory";
import { Product } from "@/app/types/Product";
import ProductItem from "@/app/myReusableComponents/ProductItem";
import { notFound } from "next/navigation";

type Props = {
  params: {
    name: string;
  };
};

export default async function CategoryPage({ params }: Props) {
  const category = decodeURIComponent(params.name);
  const products: Product[] = await getProductsByCategory(category);

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-6 capitalize">{category} Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
<ProductItem product={product} key={product.$id} showStock={true} />

        ))}
      </div>
    </div>
  );
}
