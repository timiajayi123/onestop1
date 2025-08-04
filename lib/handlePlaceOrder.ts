// lib/handlePlaceOrder.ts

import { account, database } from "@/lib/appwriteConfig";
import { ID } from "appwrite";

// ✅ Replace these with your actual Appwrite Database and Collection IDs
const DATABASE_ID = "67cb37e2000b1b9ebcf7";
const COLLECTION_ID = "6880c6b70035c9e8456f";

export const handlePlaceOrder = async ({
  name,
  phone,
  address,
  items,
  totalAmount,
  orderNumber,
}: {
  name: string;
  phone: string;
  address: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  totalAmount: number;
  orderNumber: string;
}) => {
  try {
    // ✅ Ensure the user is logged in
    const user = await account.get();
    const userId = user.$id;

    // 🔁 Fix image field and provide fallback if missing
    const sanitizedItems = items.map((item) => ({
      ...item,
      image: item.image || "/placeholder.jpg",
    }));

    // ✅ Create document in Appwrite
    const response = await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        userId,
        name,
        phone,
        address,
        items: sanitizedItems,
        totalAmount,
        orderNumber,
      }
    );

    return { success: true, response };
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return { success: false, message: error.message };
  }
};
