export type Product = {
  $id: string;
  Name: string;
  price: number;
  long_description: string;
  short_description: string;
  images: string[];
  category?: string;
  colors?: string[];
  stock: number; // ✅ change this l
};
