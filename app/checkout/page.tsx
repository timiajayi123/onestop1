'use client';
export const dynamicSetting = 'force-dynamic'; // <-- renamed to avoid conflict

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/app/Store/CartStore";
import { createOrder } from "@/lib/createOrder";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { account } from "@/lib/appwriteConfig";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(
  () => import("react-paystack").then(mod => mod.PaystackButton),
  { ssr: false }
);

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart, setCart, setTotalPrice } = useCartStore();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [isClientReady, setIsClientReady] = useState(false);

  const router = useRouter();

  const handleSuccess = async (reference: string) => {
    try {
      const verifyRes = await fetch(`/api/verify/verifypaystack?reference=${reference}`);
      const result = await verifyRes.json();

      if (!result.success) {
        toast.error("Payment verification failed");
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
          image: item.image,
        })),
        totalAmount: totalPrice(),
        paystackRef: reference,
      });

      if (orderRes.success && orderRes.data) {
        toast.success("Order placed!");
        clearCart();
        router.push(`/success?orderId=${orderRes.data.$id}`);
      } else {
        toast.error(orderRes.message || "Order failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    // Only runs on client
    const checkAuthAndHydrateCart = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
        setEmail(user.email);
      } catch {
        toast.warning("You need to sign in to checkout");
        router.push("/signin");
      }

      // Hydrate cart from localStorage if needed
      const storedCart = localStorage.getItem("checkoutCart");
      const storedTotal = localStorage.getItem("checkoutTotal");

      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }

      if (storedTotal) {
        setTotalPrice(parseFloat(storedTotal));
      }

      setIsClientReady(true); // mark hydration done
    };

    checkAuthAndHydrateCart();
  }, [router, setCart, setTotalPrice]);

  const publicKey = "pk_test_4b80438a9e6c48413a367eb76f58eadae5f31a42";

  const paystackProps = {
    email: email || "placeholder@email.com",
    amount: totalPrice() * 100,
    publicKey,
    text: "Pay with Paystack",
    onSuccess: (ref: any) => handleSuccess(ref.reference),
    onClose: () => toast.info("Payment closed"),
  };

  if (!isClientReady) {
    return <p className="text-center py-10">Loading checkout...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.$id} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>₦{item.price * item.quantity}</span>
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
              {...paystackProps}
              className="w-full bg-black text-white px-6 py-3 rounded text-lg hover:bg-gray-800 transition"
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
