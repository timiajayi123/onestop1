'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/app/Store/CartStore';
import { getProduct } from '@/app/action/appwrite';
import { CartLoader } from '@/components/ui/LoadingCart';
import { Button } from '@/components/ui/button';
import { mapAppwriteProduct } from '@/lib/mapAppwriteProduct';


interface ProductDetailProps {
  params: { id: string };
}

type Product = {
  $id: string;
  Name: string;
  Price: number;
  Long_Description: string;
  Short_Description: string;
  images: string[];
  stock?: number;
  category?: string;
};

const ProductDetail = ({ params }: ProductDetailProps) => {
  const { id } = params;
  const router = useRouter();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProduct(id);
        if (!res) throw new Error('Product not found');
        // Map response to match Product type if needed
setProduct(mapAppwriteProduct(res));


      } catch (err) {
        console.error(err);
        router.push('/'); // fallback if product not found
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      $id: product.$id,
      name: product.Name,
      price: product.Price,
      image: product.images?.[0],
      quantity: 1,
    });

    toast.success(
      <div className="flex items-center gap-3">
        <img
          src={product.images?.[0]}
          alt={product.Name}
          className="w-12 h-12 rounded object-cover border border-gray-200"
        />
        <div>
          <p className="font-semibold">1 item of {product.Name}</p>
          <p className="text-sm text-muted-foreground">Added to cart</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CartLoader />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-5 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Left Big Image */}
      <div className="col-span-1 md:col-span-2 flex items-center justify-center h-[500px] bg-white rounded-md overflow-hidden">
        <Image
          src={product.images?.[0] || '/placeholder.png'}
          alt={product.Name}
          width={600}
          height={600}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Right Details */}
      <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.Name}</h1>
        <p className="text-2xl text-green-700 font-semibold">
          NGN {Number(product.Price).toLocaleString()}
        </p>
        {product.stock !== undefined && (
          <p className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
          </p>
        )}
        <p className="text-gray-700">{product.Long_Description || 'No description available.'}</p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock !== undefined && product.stock <= 0}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>

          {product.category && (
            <Button onClick={() => router.push(`/category/${product.category}`)} variant="outline">
              Shop Category
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
