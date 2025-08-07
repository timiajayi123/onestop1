'use client';

import { useEffect, useState } from 'react';
import { account, database, Config } from '@/lib/appwriteConfig';
import { Query } from 'appwrite';
import ProductItem from '@/app/myReusableComponents/ProductItem';
import { toast } from 'sonner';


const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Removed unused userId state

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const user = await account.get();
        // Removed setUserId since userId state is not used

        const favRes = await database.listDocuments(
          Config.databaseId,
          Config.favoritesCollectionId,
          [Query.equal('userId', user.$id)]
        );

        const productIds = favRes.documents.map((doc) => ({
          productId: doc.productId,
          favId: doc.$id,
        }));

        const productPromises = productIds.map((item) =>
          database.getDocument(Config.databaseId, Config.productsCollectionId, item.productId).then(product => ({
            ...product,
            favId: item.favId,
          }))
        );

        const products = await Promise.all(productPromises);
        setWishlist(products);
      } catch (error) {
        console.error('Error loading wishlist:', error);
        toast.error('Failed to load wishlist');
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  const removeFromWishlist = async (favId: string) => {
    try {
      await database.deleteDocument(Config.databaseId, Config.favoritesCollectionId, favId);
      setWishlist((prev) => prev.filter((item) => item.favId !== favId));
      toast.success('Removed from wishlist');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  return (
<div className="w-full px-4 sm:px-6 lg:px-8 py-10">

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Your Wishlist</h1>

      {loading ? (
        <p className="text-center">Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-center text-lg text-gray-500">Your wishlist is currently empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
{wishlist.map((product) => (
  <div key={product.favId} className="relative group border rounded-2xl p-3 shadow-sm hover:shadow-md transition">
<ProductItem
  key={product.favId}
  product={product}
  isWishlistPage
  onRemove={() => removeFromWishlist(product.favId)}
  hideFavoriteButton={true} // ✅ this is what hides the button
/>
  </div>
))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
