'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/app/Store/CartStore';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Product } from '@/app/types/Product';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const pathname = usePathname();
  const { addToCart } = useCartStore();
  const isCategoryPage = pathname?.startsWith('/category');
  // Removed unused loading state

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // setLoading(true); // Removed unused loading state

    addToCart({
      $id: product.$id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      quantity: 1,
      
    });
    console.log("Product in toast:", product);

 toast.success(
    <div className="flex items-center gap-3">
<img
  src={product.images?.[0]}
  alt={product.name}
  className="w-12 h-12 rounded object-cover border border-gray-200"
/>

      <div>
        <p className="font-semibold">1 item of {product.category}</p>
        <p className="text-sm text-muted-foreground">Added to cart</p>
      </div>
    </div>
  );


    // setTimeout(() => setLoading(false), 1000); // Removed unused loading state
  };

  return (
    <Card className="cursor-pointer transition hover:shadow-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">{product.name}</h3>
      </CardHeader>

      <CardContent>
        <Link href={`/product-details/${product.$id}`}>
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md"
          />
        </Link>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <span className="text-sm font-semibold">₦{product.price}</span>

        {isCategoryPage ? (
          <div className="relative inline-block group overflow-hidden w-[160px] h-[42px]">
            <button
              onClick={handleAddToCart}
              className="bg-white text-black font-medium w-full h-full rounded-full border-2 border-gray-300 hover:border-black shadow-sm hover:shadow-md relative flex items-center justify-center"
            >
              <span className="transition-opacity duration-300 group-hover:opacity-0 z-10">
                Add to Cart
              </span>
              <ShoppingCart
                className="h-5 w-5 text-black absolute top-1/2 left-[-30px] -translate-y-1/2 opacity-0 group-hover:left-[calc(50%-10px)] group-hover:opacity-100 transition-all duration-500 ease-in-out z-20"
              />
            </button>
          </div>
        ) : (
          <div className="relative inline-block group overflow-hidden w-[160px] h-[42px]">
            <Link href={`/category/${product.category}`}>
              <button className="bg-white text-black font-medium w-full h-full rounded-full border-2 border-gray-300 hover:border-black shadow-sm hover:shadow-md relative flex items-center justify-center">
                <span className="transition-opacity duration-300 group-hover:opacity-0 z-10">
                  Shop Now
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black absolute top-1/2 left-[-30px] -translate-y-1/2 opacity-0 group-hover:left-[calc(50%-10px)] group-hover:opacity-100 transition-all duration-500 ease-in-out z-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-1.2 6h12.8L17 13M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </button>
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
