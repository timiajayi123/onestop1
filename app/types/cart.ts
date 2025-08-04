export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string; // 👈 make this optional (fixes error)
};
