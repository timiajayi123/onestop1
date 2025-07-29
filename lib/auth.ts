import { Client, Account, OAuthProvider } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

export const account = new Account(client);

// Sign in with Google (you can add Apple, GitHub, etc.)
export const signInWithGoogle = () => {
  return account.createOAuth2Session(
    OAuthProvider.Google,
    'http://localhost:3000/account', // Success URL
    'http://localhost:3000/login'    // Failure URL
  );
};

// Get current logged-in user
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch {
    return null;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
  } catch (err) {
    console.log("Logout failed:", err);
  }
};
