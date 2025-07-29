import { database } from "@/app/appwrite";
import { ID, Query } from "appwrite";

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID!,
      [
        Query.equal("category", category.toLowerCase()),
      ]
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching category:", error);
    return [];
  }
};
