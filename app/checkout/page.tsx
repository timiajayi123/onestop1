'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/app/Store/CartStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { account } from '@/lib/appwriteConfig';
import PaystackButton from '@/components/ui/PaystackButton';

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
      // 1️⃣ Verify payment first
      const verifyRes = await fetch(`/api/verify/verifypaystack?reference=${reference}`);
      const result = await verifyRes.json();

      if (!result.success) {
        toast.error('Payment verification failed');
        return;
      }

      // 2️⃣ Send cart + user info to server to create order & update stock
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          orderData: {
            items: cart.map((item) => ({
              $id: item.$id,
              name: item.name,
              price: item.price,
              quantity: Number(item.quantity),
              image: item.image || '/placeholder.jpg',
            })),
            total: totalPrice(),
            address,
            phone,
            paystackRef: reference,
          },
        }),
      });

      const orderData = await orderRes.json();

      if (orderRes.ok) {
        toast.success('Order placed successfully!');
        clearCart();
        router.push(`/success?orderId=${orderData.$id}`);
      } else {
        toast.error(orderData.error || 'Order failed');
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
        return;
      }

      const storedCart = localStorage.getItem('checkoutCart');
      if (storedCart) setCart(JSON.parse(storedCart));

      setIsClientReady(true);
    };

    checkAuthAndHydrateCart();
  }, [router, setCart]);

  if (!isClientReady) return <p className="text-center py-10">Loading checkout...</p>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.$id} className="flex justify-between">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>₦{item.price * Number(item.quantity)}</span>
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
