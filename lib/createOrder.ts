import { database } from "@/lib/appwriteConfig";
import { ID } from "appwrite";

const DATABASE_ID = "67cb37e2000b1b9ebcf7"; // ✅ Your DB
const ORDERS_COLLECTION_ID = "6880c6b70035c9e8456f"; // ✅ Orders collection
const PRODUCTS_COLLECTION_ID = "67cb39180023bdb0c2fc"; // 🔹 CHANGE THIS

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
  paystackRef?: string;
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

    // 1. Create order
    const orderRes = await database.createDocument(
      DATABASE_ID,
      ORDERS_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        address,
        phone,
        items: JSON.stringify(sanitizedCart),
        total: totalAmount,
        paystackRef: paystackRef || "",
        orderNumber,
        status: "paid",
        createdAt: new Date().toISOString(),
      }
    );

    // 2. Update stock for each product
    for (const item of cart) {
      try {
        console.log("Fetching product:", item.id);

        const product = await database.getDocument(
          DATABASE_ID,
          PRODUCTS_COLLECTION_ID,
          item.id
        );

        console.log("Current stock:", product.stock);

        const newStock = (product.stock || 0) - item.quantity;
        if (newStock < 0) throw new Error(`Not enough stock for ${product.name}`);

        await database.updateDocument(
          DATABASE_ID,
          PRODUCTS_COLLECTION_ID,
          item.id,
          { stock: newStock }
        );

        console.log(`✅ Updated stock for ${product.name}: ${newStock}`);
      } catch (err) {
        console.error(`❌ Failed to update stock for product ${item.id}`, err);
      }
    }

    return { success: true, data: orderRes };
  } catch (err: any) {
    console.error("❌ Error placing order:", err);
    return { success: false, message: err.message };
  }
};
