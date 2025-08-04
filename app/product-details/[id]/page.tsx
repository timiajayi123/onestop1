import { getProduct } from '@/app/action/appwrite';
import React from 'react';

type Product = {
  $id: string;
  name: string;
  price: number;
  long_description: string;
  short_description: string;
  images: string[];
};

interface ProductDetailProps {
  params: { id: string };
}

const ProductDetail = async ({ params }: ProductDetailProps) => {
  const product = await getProduct(params.id);

  if (!product) {
    return <div className="p-4 text-red-500">Product not found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 py-5">
      <div className="col-span-1 md:col-span-2">
        <img src={product.images[0]} alt={product.name} />
      </div>

      <div className="col-span-1 md:col-span-2">
        <p className="py-5 text-2xl font-bold">
<span>NGN {Number(product.price).toLocaleString()}</span>

        </p>
        <p>{product.long_description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
