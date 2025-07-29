import { Client, Databases } from "appwrite";
import { Product } from "../types/Product";

export const Config = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
  productCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
};

export const client = new Client();
export const database = new Databases(client);

client.setEndpoint(Config.endpoint!).setProject(Config.project!);

// ✅ Update this
export const listProducts = async (): Promise<Product[] | null> => {
  try {
    const response = await database.listDocuments(
      Config.databaseId!,
      Config.productCollectionId!
    );

    if (!response) throw new Error("No products found");

return response.documents as unknown as Product[];

  } catch (error) {
    console.error(error);
    return null;
  }
};

// ✅ Update this
export const getProduct = async (
  productId: string
): Promise<Product | null> => {
  try {
    const response = await database.getDocument(
      Config.databaseId!,
      Config.productCollectionId!,
      productId
    );

    if (!response) throw new Error("No product found");

return response as unknown as Product;

  } catch (error) {
    console.error(error);
    return null;
  }
};
