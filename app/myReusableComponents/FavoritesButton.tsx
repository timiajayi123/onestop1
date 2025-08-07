'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { account, database, ID, Config } from '@/lib/appwriteConfig';
import { Query } from 'appwrite';
import clsx from 'clsx';

const FavoritesButton = ({ productId }: { productId: string }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [favoriteDocId, setFavoriteDocId] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);

        const result = await database.listDocuments(
          Config.databaseId,
          Config.favoritesCollectionId,
          [
            Query.equal('userId', user.$id),
            Query.equal('productId', productId)
          ]
        );

        if (result.total > 0) {
          setFavoriteDocId(result.documents[0].$id);
        }
      } catch (err) {
        console.error('User not signed in or error:', err);
      }
    };

    loadUser();
  }, [productId]);

  const toggleFavorite = async () => {
    if (!userId) return;

    setAnimate(true); // Trigger animation
    setTimeout(() => setAnimate(false), 500); // Reset after animation

    if (favoriteDocId) {
      await database.deleteDocument(Config.databaseId, Config.favoritesCollectionId, favoriteDocId);
      setFavoriteDocId(null);
    } else {
      const doc = await database.createDocument(
        Config.databaseId,
        Config.favoritesCollectionId,
        ID.unique(),
        {
          userId,
          productId,
        }
      );
      setFavoriteDocId(doc.$id);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="absolute top-2 right-2 z-20"
      title="Add to favorites"
    >
      <Heart
        className={clsx(
          'w-6 h-6 transition-transform duration-300 ease-in-out',
          {
            'text-red-500 fill-red-500 scale-125': animate,
            'text-gray-400': !animate,
          }
        )}
      />
    </button>
  );
};

export default FavoritesButton;
