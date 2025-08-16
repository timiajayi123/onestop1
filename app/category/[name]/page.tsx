// app/category/[name]/page.tsx
import { getProductsByCategory } from "@/lib/getProductsByCategory";
import { Product } from "@/app/types/Product";
import { notFound } from "next/navigation";
import CategoryClient from "./CategoryClient";

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
      <CategoryClient products={products} category={category} />
    </div>
  );
}
