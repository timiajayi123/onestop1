
"use client"

import { useEffect, useState } from "react";
import { account } from "@/lib/appwriteConfig"; // Adjust the import path as necessary
import { Models } from "appwrite";

export default function useAuth() {
  const [user, setUser] = useState<Models.User<{}> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        // User is not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
