export type Order = {
  $id: string;
  userId: string;
  total: number;
  address: string;
  phone: string;
  status: string;
  createdAt: string;
  orderNumber?: string;
  paystackRef?: string;
};
