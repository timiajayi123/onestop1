'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CartItem = {
  $id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalPrice: () => number;
  setCart: (items: CartItem[]) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
addToCart: (item) => {
  
  console.log("🛒 addToCart called with:", item); // <--- ADD THIS


  const cart = get().cart;
  const existing = cart.find((i) => i.$id === item.$id);

  // Create a fully valid cart item
  const fullItem: CartItem = {
    $id: item.$id,
    name: item.name,
    price: item.price || 0,
    quantity: item.quantity || 1,
    image: item.image || "/placeholder.png",
  };
  console.log("🧪 fullItem constructed as:", fullItem); // <--- ADD THIS TOO
  if (existing) {
    set({
      cart: cart.map((i) =>
        i.$id === fullItem.$id
          ? { ...i, quantity: i.quantity + fullItem.quantity }
          : i
      ),
    });
  } else {
    set({ cart: [...cart, fullItem] });
  }
},


      removeFromCart: (id) =>
        set({ cart: get().cart.filter((item) => item.$id !== id) }),

      clearCart: () => set({ cart: [] }),

      updateQuantity: (id, quantity) =>
        set({
          cart: get().cart.map((item) =>
            item.$id === id ? { ...item, quantity } : item
          ),
        }),

      totalPrice: () =>
        get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

setCart: (items) => {
  const sanitized = items.map((item) => ({
    $id: item.$id,
    name: item.name,
    price: item.price || 0,
    quantity: item.quantity || 1,
    image: item.image || "/placeholder.png",
  }));
  set({ cart: sanitized });
},

    }),
    {
      name: 'cart-storage',
      storage: typeof window !== 'undefined'
        ? createJSONStorage(() => localStorage)
        : undefined, // avoids window error during SSR
    }
  )
);
