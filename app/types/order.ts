// app/types/order.ts
import { CartItem } from '@/app/types/cart';

export interface OrderParams {
  userId: string;
  address: string;
  phone: string;
  cart: CartItem[];
  totalAmount: number;
}
