'use client';

import { useEffect, useState } from 'react';
import { account, database, Config } from '@/lib/appwriteConfig';
import { Query } from 'appwrite';
import Image from 'next/image';
import { toast } from 'sonner';

interface Order {
  $id: string;
  productId: string;
  quantity: number;
  status: string;
  createdAt: string;
}

interface Product {
  $id: string;
  title: string;
  imageUrl: string;
  price: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsMap, setProductsMap] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = await account.get();

        const orderRes = await database.listDocuments(
          Config.databaseId,
          Config.ordersCollectionId,
          [Query.equal('userId', user.$id), Query.orderDesc('$createdAt')]
        );

        const orders: Order[] = orderRes.documents.map((doc: any) => ({
          $id: doc.$id,
          productId: doc.productId,
          quantity: doc.quantity,
          status: doc.status,
          createdAt: doc.createdAt || doc.$createdAt,
        }));

        const productIds = [...new Set(orders.map(o => o.productId))];
console.log("Product IDs:", productIds);

   const productFetches = productIds.map(async (pid) => {
  try {
    return await database.getDocument(Config.databaseId, Config.productsCollectionId, pid);
  } catch (err) {
    console.warn(`Product with ID ${pid} not found`, err);
    return null;
  }
});

const products = await Promise.all(productFetches);

const productMap: Record<string, Product> = {};
products
  .filter((product) => product !== null)
  .forEach((product) => {
    if (!product) return;
    productMap[product.$id] = {
      $id: product.$id,
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
    };
  });
        setOrders(orders);
        setProductsMap(productMap);
      } catch (error) {
        console.error('Failed to load orders:', error);
        toast.error('Failed to load your orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>

      {loading ? (
        <p className="text-center">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const product = productsMap[order.productId];
            if (!product) return null;

            return (
              <div
                key={order.$id}
                className="flex items-center justify-between border p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h2 className="font-semibold">{product.title}</h2>
                    <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                    <p className="text-sm text-gray-500">Status: {order.status}</p>
                    <p className="text-sm text-gray-400">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${product.price * order.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
