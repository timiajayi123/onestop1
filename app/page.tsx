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
};

const Home = () => {
  const [products, setProducts] = useState<productProps[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState(false);

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
        category: doc.category || "",
      }));

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
    {showPopup && <TutorialPopup onClose={() => setShowPopup(false)} />}

    {/* Help Button shows only when popup is closed */}
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

    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center mt-24 mb-14 px-4">
        <ImageSlider />
        <div className="my-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Featured Products
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <CartLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{[...new Set(products?.map(p => p.category))].map((category) => {
  const oneProduct = products?.find(p => p.category === category);
  return oneProduct ? (
    <ProductItem product={oneProduct} key={oneProduct.$id} />
  ) : null;
})}

        </div>
      )}
    </div>
  </>
);
}

export default Home;
