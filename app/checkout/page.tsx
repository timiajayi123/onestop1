'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/app/Store/CartStore';
import { createOrder } from '@/lib/createOrder';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { account } from '@/lib/appwriteConfig';
import PaystackButton from '@/components/ui/PaystackButton'// 👈 Your custom client-side component

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart, setCart } = useCartStore();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [isClientReady, setIsClientReady] = useState(false);

  const router = useRouter();

  const handleSuccess = async (reference: string) => {
    try {
      const verifyRes = await fetch(`/api/verify/verifypaystack?reference=${reference}`);
      const result = await verifyRes.json();

      if (!result.success) {
        toast.error('Payment verification failed');
        return;
      }

      const orderRes = await createOrder({
        userId,
        address,
        phone,
        cart: cart.map((item) => ({
          id: item.$id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "/placeholder.jpg",
        })),
        totalAmount: totalPrice(),
        paystackRef: reference,
      });

      if (orderRes.success && orderRes.data) {
        toast.success('Order placed!');
        clearCart();
        router.push(`/success?orderId=${orderRes.data.$id}`);
      } else {
        toast.error(orderRes.message || 'Order failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    const checkAuthAndHydrateCart = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
        setEmail(user.email);
      } catch {
        toast.warning('You need to sign in to checkout');
        router.push('/signin');
      }

      const storedCart = localStorage.getItem('checkoutCart');

      if (storedCart) setCart(JSON.parse(storedCart));
      // Removed setTotalPrice as it does not exist

      setIsClientReady(true);
    };

    checkAuthAndHydrateCart();
  }, [router, setCart]);

  if (!isClientReady) {
    return <p className="text-center py-10">Loading checkout...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        {cart.length > 0 ? (
          cart.map((item: { $id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: number; }) => (
            <div key={item.$id} className="flex justify-between">
              <span>
                {String(item.name)} (x{String(item.quantity)})
              </span>
              <span>₦{item.price * (typeof item.quantity === 'number' ? item.quantity : Number(item.quantity) || 0)}</span>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        <hr />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₦{totalPrice().toLocaleString()}</span>
        </div>

        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border rounded mt-4"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded mt-2"
        />

        {address && phone ? (
          <div className="mt-6">
            <PaystackButton
              email={email}
              amount={totalPrice()}
              onSuccess={handleSuccess}
              onClose={() => toast.info('Payment closed')}
            />
          </div>
        ) : (
          <button
            className="w-full bg-gray-400 text-white px-6 py-3 rounded text-lg mt-6 cursor-not-allowed"
            disabled
          >
            Fill form to enable payment
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
