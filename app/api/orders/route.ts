// app/api/orders/route.ts
console.log("ENV CHECK", {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.APPWRITE_PROJECT_ID,
  apiKey: process.env.APPWRITE_API_KEY ? "loaded" : "missing",
});


import { Client, Databases, ID, Permission } from "node-appwrite";
import { NextResponse } from "next/server";

// Server-side Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)  // public is OK for endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID!)             // server-only project ID
  .setKey(process.env.APPWRITE_API_KEY!);                  // server secret key

const databases = new Databases(client);

export async function POST(req: Request) {
  try {
    const { userId, orderData } = await req.json();

    console.log("Received orderData:", orderData);

    const items = Array.isArray(orderData.items) ? orderData.items : [];
    console.log("Items array for stock update:", items);

    // Permissions for the order document
    const permissions = [
      Permission.read(`user:${userId}`),
      Permission.read(`team:${process.env.ADMIN_TEAM_ID}/admin`),
      Permission.update(`team:${process.env.ADMIN_TEAM_ID}/admin`),
      Permission.delete(`team:${process.env.ADMIN_TEAM_ID}/admin`),
    ];

    // Create the order
    const order = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_ORDER_COLLECTION_ID!,
      ID.unique(),
      orderData,
      permissions
    );

    // Update stock for each item
    for (const item of items) {
      const productId = item.$id;
      const qtyOrdered = Number(item.quantity) || 0;

      if (!productId) {
        console.warn("Skipping item with no $id:", item);
        continue;
      }
console.log("DatabaseId:", process.env.APPWRITE_DATABASE_ID);
console.log("OrderCollectionId:", process.env.APPWRITE_ORDER_COLLECTION_ID);

      const product = await databases.getDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_PRODUCT_COLLECTION_ID!,
        productId
      );

      const currentStock = Number(product.stock) || 0;
      const newStock = Math.max(currentStock - qtyOrdered, 0);

      console.log(
        `Stock update - Product: ${productId}, Current: ${currentStock}, Ordered: ${qtyOrdered}, New: ${newStock}`
      );

      await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_PRODUCT_COLLECTION_ID!,
        productId,
        { stock: newStock }
      );
    }

    return NextResponse.json(order, { status: 201 });
  } catch (err: any) {
    console.error("Error in /api/orders:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
