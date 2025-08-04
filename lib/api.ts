import { Client, Databases, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // ✅ Replace with your endpoint if different
  .setProject("67ca041d0033246ecf15");              // ✅ Replace with your actual project ID

const databases = new Databases(client);

const DATABASE_ID = "67cb37e2000b1b9ebcf7"; // ✅ Replace this with your actual database ID
const ORDERS_COLLECTION_ID = "6880c6b70035c9e8456f"; // ✅ Replace with actual collection ID

// ✅ Get all orders
export async function getOrders() {
  try {
    const res = await databases.listDocuments(DATABASE_ID, ORDERS_COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
    ]);
    return res.documents;
  } catch (error) {
    console.error("❌ Failed to fetch orders:", error);
    return [];
  }
}

// ✅ Update order status
export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const updated = await databases.updateDocument(
      DATABASE_ID,
      ORDERS_COLLECTION_ID,
      orderId,
      {
        status: newStatus,
      }
    );
    return updated;
  } catch (error) {
    console.error("❌ Failed to update status:", error);
    return null;
  }
}
