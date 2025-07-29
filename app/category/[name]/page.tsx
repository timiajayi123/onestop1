import { getProductsByCategory } from "@/lib/getProductsByCategory";
import ProductItem from "@/app/myReusableComponents/ProductItem";

type Props = {
  params: {
    name: string;
  };
};

export default async function CategoryPage({ params }: Props) {
  const { name } = params;

  const rawProducts = await getProductsByCategory(name);

  const products = rawProducts.map((doc: any) => ({
    name: doc.Name,
    price: doc.Price,
    long_description: doc.Long_Description,
    short_description: doc.Short_Description,
    images: doc.images,
    $id: doc.$id,
    category: doc.category || "",
  }));

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold capitalize mb-6">{name} collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <ProductItem key={product.$id} product={product} />
        ))}
      </div>
    </main>
  );
}
