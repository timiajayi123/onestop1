"use client"

import ProductItem from "./myReusableComponents/ProductItem";
import { useState, useEffect } from 'react';
import { listProducts } from '@/app/action/appwrite';
import { CartLoader } from '@/components/ui/LoadingCart';
import ImageSlider from './myReusableComponents/ImageSlider';

type productProps = {
  name: string;
  price: number;
  long_description: string;
  short_description: string;
  images: string[];
  $id: string;
  category: string; // ✅ Added this line
};

const Home = () => {
  const Images = [
    "images/Carousel1.jpeg",
    "images/Carousel2.jpeg",
    "images/Carousel3.jpeg",
  ];

  const [products, setProducts] = useState<productProps[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await listProducts();
      if (!response) throw new Error('No Product Found');

      const formattedData = response.map((doc: any) => ({
        name: doc.Name,
        price: doc.Price,
        long_description: doc.Long_Description,
        short_description: doc.Short_Description,
        images: doc.images,
        $id: doc.$id,
        category: doc.category || "", // ✅ Safely assign category
      }));

      setProducts(formattedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center mt-24 mb-14 px-4">
        <ImageSlider />
        <div className="my-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            featured products
          </h2>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-screen">
          <CartLoader />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products?.map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
