import { getProduct } from '@/app/action/appwrite';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

type Product = {
  $id: string;
  name: string;
  price: number;
  long_description: string;
  short_description: string;
  images: string[];
};

// ✅ Metadata generation with correct typing
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product does not exist.',
    };
  }

  return {
    title: product.name,
    description: product.short_description,
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: product.images?.map((url) => ({ url })) || [],
    },
  };
}

// ✅ Product detail page with proper type and error handling
const ProductDetailPage = async ({ params }: Props) => {
  const product: Product | null = await getProduct(params.id);

  if (!product) {
    notFound(); // triggers 404 page
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 py-5">
      <div className="col-span-1 md:col-span-2">
        <img
          src={product.images?.[0] || '/placeholder.png'}
          alt={product.name}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="col-span-1 md:col-span-2 px-4">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-green-700 font-semibold mb-4">
          NGN {Number(product.price).toLocaleString()}
        </p>
        <p className="text-gray-700">{product.long_description || 'No description available.'}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;