import { Client, Databases, Account, ID, OAuthProvider } from 'appwrite'; // ✅ FIXED

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

export const database = new Databases(client);
export const account = new Account(client);
export { ID, OAuthProvider };

export const Config = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
};

export { client }; // ✅ This exports `client`
