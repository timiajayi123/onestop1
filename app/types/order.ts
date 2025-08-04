import { CartItem } from '@/app/types/cart';

export interface Order {
  $id: string;
  $createdAt: string;
  $updatedAt: string;

  userId: string;
  address: string;
  phone: string;
  cart: CartItem[];
  totalAmount: number;

  status?: 'pending' | 'processed' | 'shipped' | 'cancelled'; // Add more if needed
  email?: string; // Optional, helps with searching
}
