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
        const cart = get().cart;
        const existing = cart.find((i) => i.$id === item.$id);

        if (existing) {
          set({
            cart: cart.map((i) =>
              i.$id === item.$id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ cart: [...cart, item] });
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

      setCart: (items) => set({ cart: items }),
    }),
    {
      name: 'cart-storage',
      storage: typeof window !== 'undefined'
        ? createJSONStorage(() => localStorage)
        : undefined, // avoids window error during SSR
    }
  )
);
