// lib/createOrder.ts

import { database } from "@/lib/appwriteConfig";
import { ID } from "appwrite";

const DATABASE_ID = "67cb37e2000b1b9ebcf7";
const COLLECTION_ID = "6880c6b70035c9e8456f";

export const createOrder = async ({
  userId,
  address,
  phone,
  cart,
  totalAmount,
}: {
  userId: string;
  address: string;
  phone: string;
  cart: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  totalAmount: number;
}) => {
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
       items: JSON.stringify(cart), // ✅ saves as a string

        total: totalAmount, // 👈 THIS LINE FIXES YOUR ERROR
     orderNumber,
    status: "pending", // ✅ explicitly set the required status
    createdAt: new Date().toISOString(), // ✅ set the createdAt timestamp
  }
        
    );

    return { success: true, data: res };
  } catch (err: any) {
    console.error("Error placing order:", err);
    return { success: false, message: err.message };
  }
};