"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Account, Avatars } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

const account = new Account(client);
const avatars = new Avatars(client);

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await account.get();
        setUser(res);
      } catch (error) {
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
src={avatars.getInitials(user.name, 128, 128)}

          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          {user.labels?.includes("admin") && (
            <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded-full mt-1 inline-block">
              Admin
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-4 w-full"
      >
        Logout
      </button>
    </div>
  );
}
