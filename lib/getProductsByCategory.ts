
  import { database } from '@/app/action/appwrite';
  import { Product } from "@/app/types/Product";
  import { Query } from "appwrite";

  export async function getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await database.listDocuments(
        "67cb37e2000b1b9ebcf7",
        "67cb39180023bdb0c2fc",
        [Query.equal("category", category)]
      );

      // transform each doc to Product type
      return response.documents.map((doc: any) => ({
        $id: doc.$id,
        name: doc.name,
        price: doc.Price,
        long_description: doc.long_description,
        short_description: doc.short_description,
        images: doc.images,
        category: doc.category,
        colors: doc.colors,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
