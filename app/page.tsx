'use client';

import { useState, useEffect } from 'react';
import ProductItem from "./myReusableComponents/ProductItem";
import { listProducts } from '@/app/action/appwrite';
import { CartLoader } from '@/components/ui/LoadingCart';
import ImageSlider from './myReusableComponents/ImageSlider';
import TutorialPopup from "@/components/ui/TutorialPopup";
import { HelpCircle } from "lucide-react";

type productProps = {
  name: string;
  price: number;
  long_description: string;
  short_description: string;
  images: string[];
  $id: string;
  category: string;
  inStock: number;
  stock: number;
};

const Home = () => {
  const [products, setProducts] = useState<productProps[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await listProducts();
const formattedData = Array.isArray(response)
  ? response.map((doc: any) => ({
      name: doc.Name || "Unnamed Product",
      price: doc.Price ?? 0,
      long_description: doc.Long_Description || "",
      short_description: doc.Short_Description || "",
      images: doc.images || [],
      $id: doc.$id,
      category: doc.category || "",
      inStock: doc.stock ?? 0,
      stock: doc.stock ?? 0,
    }))
  : [];


      setProducts(formattedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) setShowPopup(true);

    fetchProduct();
  }, []);

  return (
    <>
      {/* Tutorial popup */}
      {showPopup && <TutorialPopup onClose={() => setShowPopup(false)} />}

      {!showPopup && (
        <div className="group fixed bottom-6 left-6 z-50">
          <button
            onClick={() => setShowPopup(true)}
            className="bg-white hover:bg-gray-100 border border-gray-300 shadow-lg rounded-full p-3 transition duration-300"
            aria-label="Show Tutorial"
          >
            <HelpCircle className="h-5 w-5 text-black-600" />
          </button>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap">
            Show Tutorial
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="container mx-auto p-4">
        {/* Carousel + Banners */}
        <div className="relative w-full flex items-center justify-center mt-24 mb-14">

          {/* Left Banners */}
          <div className="hidden md:flex flex-col gap-6 fixed left-4 top-28 z-50">
            <div className="bg-white border border-gray-200 px-5 py-4 rounded-xl shadow-md w-[200px] h-[120px] flex flex-col justify-center hover:shadow-lg transition duration-300">
              <h2 className="text-base font-semibold text-gray-800">🔥 Flash Sale</h2>
              <p className="text-sm text-gray-500">Up to 50% OFF</p>
            </div>
            <div className="bg-white border border-gray-200 px-5 py-4 rounded-xl shadow-md w-[200px] h-[120px] flex flex-col justify-center hover:shadow-lg transition duration-300">
              <h2 className="text-base font-semibold text-gray-800">🚚 Free Shipping</h2>
              <p className="text-sm text-gray-500">On orders ₦10,000+</p>
            </div>
          </div>

          {/* Carousel */}
          <div className="mx-auto w-full max-w-[1400px] px-2">
            <ImageSlider />
          </div>

          {/* Right Banners */}
          <div className="hidden md:flex flex-col gap-6 fixed right-4 top-28 z-50">
            <div className="bg-white border border-gray-200 px-5 py-4 rounded-xl shadow-md w-[200px] h-[120px] flex flex-col justify-center hover:shadow-lg transition duration-300">
              <h2 className="text-base font-semibold text-gray-800">🆕 New Arrivals</h2>
              <p className="text-sm text-gray-500">Fresh Drops!</p>
            </div>
            <div className="bg-white border border-gray-200 px-5 py-4 rounded-xl shadow-md w-[200px] h-[120px] flex flex-col justify-center hover:shadow-lg transition duration-300">
              <h2 className="text-base font-semibold text-gray-800">⭐ Top Picks</h2>
              <p className="text-sm text-gray-500">Curated for You</p>
            </div>
          </div>
        </div>

        {/* Featured Products Title */}
        <div className="my-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Featured Products
          </h2>
        </div>

        {/* Products or Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <CartLoader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...new Set(products?.map((p) => p.category))].map((category) => {
              const oneProduct = products?.find((p) => p.category === category);
              return oneProduct ? (
                <ProductItem product={oneProduct} key={oneProduct.$id} />
              ) : null;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
