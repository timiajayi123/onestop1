'use client';

import { usePathname, useRouter } from 'next/navigation';
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
import FavoritesButton from "@/app/myReusableComponents/FavoritesButton";
import { Button } from '@/components/ui/button';
import Image from "next/image";
import { useState } from "react";

interface ProductItemProps {
  product: Product;
  showStock?: boolean;
  isWishlistPage?: boolean;
  onRemove?: () => void;
  hideFavoriteButton?: boolean;
  isDetailPage?: boolean; // new prop
}

const ProductItem = ({
  product,
  showStock = false,
  isWishlistPage = false,
  onRemove,
  hideFavoriteButton = false,
  isDetailPage = false,
}: ProductItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { addToCart } = useCartStore();
  const isCategoryPage = pathname?.startsWith('/category');
  const [animating, setAnimating] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    addToCart({
      $id: product.$id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      quantity: 1,
    });

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
  };

  const handleShopNow = () => {
    setAnimating(true);
    setTimeout(() => {
      router.push(`/category/${product.category}`);
    }, 400); // matches animation duration
  };

  // ✅ Single return with conditional for detail page
  if (isDetailPage) {
    return (
      <div className="px-4 md:px-0">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-green-700 font-semibold mb-4">
          NGN {Number(product.price).toLocaleString()}
        </p>
        <div className="w-full h-96 flex items-center justify-center bg-white rounded-md overflow-hidden mb-4">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            width={600}
            height={600}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <p className="text-gray-700">{product.long_description || "No description available."}</p>

        {/* Optional: Add to cart in detail view */}
        <button
          onClick={handleAddToCart}
          className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add to Cart
        </button>
      </div>
    );
  }

  return (
    <Card className="relative cursor-pointer transition hover:shadow-xl hover:scale-[1.02] duration-300">
      {!hideFavoriteButton && (
        <div className="absolute top-2 right-2 z-20">
          <FavoritesButton productId={product.$id} />
        </div>
      )}

      {isWishlistPage && onRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          ❌
        </Button>
      )}

      <CardHeader>
        <h3 className="text-lg font-semibold">{product.name}</h3>
      </CardHeader>

      <CardContent>
        <Link href={`/product-details/${product.$id}`}>
          <div className="w-full h-60 sm:h-72 flex items-center justify-center bg-white rounded-md overflow-hidden">
            <Image
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.name}
              width={400}
              height={400}
              className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </Link>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">₦{product.price}</span>
          {showStock && (
            product.stock > 0 ? (
              <span className="text-xs text-green-600 font-medium">
                In Stock ({product.stock} left)
              </span>
            ) : (
              <span className="text-xs text-red-500 font-medium">
                Out of Stock
              </span>
            )
          )}
        </div>

        {isCategoryPage ? (
          <div className="relative inline-block group overflow-hidden w-[160px] h-[42px]">
            <button
              onClick={handleAddToCart}
              className="bg-white text-black font-medium w-full h-full rounded-full border-2 border-gray-300 hover:border-black shadow-sm hover:shadow-md relative flex items-center justify-center"
              disabled={product.stock <= 0}
            >
              <span className="transition-opacity duration-300 group-hover:opacity-0 z-10">
                {product.stock > 0 ? 'Add to Cart' : 'Unavailable'}
              </span>
              <ShoppingCart
                className="h-5 w-5 text-black absolute top-1/2 left-[-30px] -translate-y-1/2 opacity-0 group-hover:left-[calc(50%-10px)] group-hover:opacity-100 transition-all duration-500 ease-in-out z-20"
              />
            </button>
          </div>
        ) : (
          <div className="relative inline-block group overflow-hidden w-[160px] h-[42px]">
            <button
              onClick={handleShopNow}
              className="bg-white text-black font-medium w-full h-full rounded-full border-2 border-gray-300 hover:border-black shadow-sm hover:shadow-md relative flex items-center justify-center"
            >
              <span
                className={`transition-opacity duration-300 z-10 ${
                  animating ? "opacity-0" : "group-hover:opacity-0"
                }`}
              >
                Shop Now
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-black absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out z-20 ${
                  animating
                    ? "left-[calc(50%-10px)] opacity-100"
                    : "left-[-30px] opacity-0 group-hover:left-[calc(50%-10px)] group-hover:opacity-100"
                }`}
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
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
