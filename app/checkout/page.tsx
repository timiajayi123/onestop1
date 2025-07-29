"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/app/Store/CartStore";
import { createOrder } from "@/lib/createOrder";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { account } from "@/lib/appwriteConfig";

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCartStore();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");

  const router = useRouter(); // ✅ now this is valid

  // 🔐 Auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id); // ✅ Save user ID for order
      } catch {
        toast.warning("You need to sign in to checkout");
        router.push("/signin");
      }
    };

    checkAuth();
  }, []);

  const handlePlaceOrder = async () => {
    if (!address || !phone) {
      toast.error("Please fill in all fields.");
      return;
    }

    const result = await createOrder({
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
    });

    if (result.success && result.data) {
      toast.success("Order placed successfully!");
      clearCart();
      router.push(`/success?orderId=${result.data.$id}`); // ✅ Success redirect
    } else {
      toast.error(result.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        {cart.map((item) => (
          <div key={item.$id} className="flex justify-between">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>₦{item.price * item.quantity}</span>
          </div>
        ))}

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

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-black text-white px-6 py-3 rounded text-lg hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
