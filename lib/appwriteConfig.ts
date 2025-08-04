// lib/appwriteConfig.ts

import { Client, Databases, Account, Teams, ID, OAuthProvider } from 'appwrite';


// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '') // e.g., 'https://cloud.appwrite.io/v1'
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '');   // your project ID

// Appwrite services
export const account = new Account(client);
export const database = new Databases(client);
export const teams = new Teams(client);  // <-- add this

// Useful constants and utilities
export const IDHelper = ID; // to avoid conflict with `ID` keyword in some scopes
export const OAuth = OAuthProvider;
export { ID }; // Make sure this line exists

// Config object for database/collection IDs
export const Config = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || '',
  productsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID || '',
  ordersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_ORDER_COLLECTION_ID || '',
  adminTeamId: process.env.NEXT_PUBLIC_ADMIN_TEAM_ID || '',  // ✅ Add this line
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
      projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '', // ← Add this
};

// Admin team ID from environment variables
export const ADMIN_TEAM_ID = process.env.NEXT_PUBLIC_ADMIN_TEAM_ID || '';

// Export client as default or named export
export { client };
