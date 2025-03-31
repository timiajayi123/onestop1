import { Client, Databases } from "appwrite";

export const Config = {
endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
productCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID,
databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,


}

export const client = new Client();
export const database = new Databases(client);
client
.setEndpoint(Config.endpoint!)
.setProject(Config.project!);




export const listProducts = async()=> {

try {
        const response = await database.listDocuments(Config.databaseId!, Config.productCollectionId!)
        if (!response) throw new Error('No product found ')
            return response.documents
}catch (error)  {
    console.log(error)
       return null
}







}