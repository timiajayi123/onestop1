import { database } from "@/lib/appwriteConfig";
import { ID } from "appwrite";

const DATABASE_ID = "67cb37e2000b1b9ebcf7";
const COLLECTION_ID = "6880c6b70035c9e8456f";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type OrderParams = {
  userId: string;
  address: string;
  phone: string;
  cart: CartItem[];
  totalAmount: number;
  paystackRef?: string; // ✅ include Paystack reference
};

export const createOrder = async ({
  userId,
  address,
  phone,
  cart,
  totalAmount,
  paystackRef,
}: OrderParams) => {
  try {
    const orderNumber = `ORDER-${Date.now()}`;

    const sanitizedCart = cart.map((item) => ({
      ...item,
      image: item.image || "/placeholder.jpg",
    }));

    const res = await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        userId,
        address,
        phone,
        items: JSON.stringify(sanitizedCart),
        total: totalAmount,
        paystackRef: paystackRef || "", // ✅ store the Paystack ref
        orderNumber,
        status: "pending",
        createdAt: new Date().toISOString(),
      }
    );

    return { success: true, data: res };
  } catch (err: any) {
    console.error("Error placing order:", err);
    return { success: false, message: err.message };
  }
};
