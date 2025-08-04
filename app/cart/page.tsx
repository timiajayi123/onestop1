'use client';
import { useCartStore } from '@/app/Store/CartStore';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCartStore();

  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">🛒 Your cart is empty</p>
      ) : (
        <Card>
          <CardContent className="p-8">
            <h1 className="text-4xl font-semibold mb-10">Your Cart</h1>

            <div className="flex flex-col gap-8">
              {cart.map((item) => (
                <div
                  key={item.$id}
                  className="flex items-center gap-8 border-b pb-6"
                >
                  <img
                    src={item.image || '/placeholder.png'}
                    alt={item.name}
                    className="w-40 h-40 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <h2 className="text-2xl font-medium">{item.name}</h2>
                    <p className="text-2xl font-bold text-gray-800 mt-2">
                      ₦{item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity(item.$id, Math.max(item.quantity - 1, 1))
                        }
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-4 py-1 border rounded text-base font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity(item.$id, item.quantity + 1)
                        }
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.$id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={26} />
                  </button>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between items-center pt-8 mt-6 border-t">
                <p className="text-2xl font-semibold text-gray-700">Total:</p>
                <p className="text-3xl font-bold text-green-600">
                  ₦{totalPrice().toLocaleString()}
                </p>
              </div>

              {/* Checkout Button */}
              <button
  onClick={() => {
    localStorage.setItem("checkoutCart", JSON.stringify(cart));
    localStorage.setItem("checkoutTotal", totalPrice().toString());
    router.push('/checkout');
  }}
  className="mt-8 px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transition"
>
  Proceed to Checkout
</button>

            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
