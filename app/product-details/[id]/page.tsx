import { getProduct } from '@/app/action/appwrite';
import React from 'react';

interface ProductDetailProps {
  params: {
    id: string;
  };
}

const ProductDetail = async ({ params }: ProductDetailProps) => {
  const { id } = params;
  const product = await getProduct(id);

  console.log(product);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 py-5">
      <div className="col-span-1 md:col-span-2">
        <img
          src={product?.images?.[0] || '/placeholder.jpg'} // Fallback if no image
          alt={product?.name}
        />
      </div>

      <div className="col-span-1 md:col-span-2">
        <p className="py-5 text-2xl font-bold">
          {product?.name} <span>NGN {product?.price}</span>
        </p>
        <p>{product?.long_description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
