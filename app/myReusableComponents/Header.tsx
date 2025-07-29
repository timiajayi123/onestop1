"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/app/Store/CartStore";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { ShoppingCart, User, Inbox, Heart, Ticket, List } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { cart } = useCartStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const dropdown = document.getElementById("user-dropdown");
      const button = document.getElementById("user-dropdown-button");
      if (
        dropdown &&
        !dropdown.contains(event.target as Node) &&
        button &&
        !button.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setDropdownOpen(false);
    router.push("/signin");
  };

  if (loadingUser) {
    return (
      <header className="bg-[#1a1a1a] text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div>Loading...</div>
      </header>
    );
  }

  return (
    <header className="bg-[#1a1a1a] text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo and Brand */}
      <div className="flex items-center gap-4">
        <img
          src="/logo.jpg"
          alt="logo"
          className="h-10 w-10 rounded-full object-cover shadow-md"
        />
        <h1 className="text-xl font-semibold tracking-wide text-white/90">
          One Stop Shop
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex gap-6 items-center text-sm font-medium relative">
        <a
          href="#"
          className="text-white/80 hover:text-white transition-colors duration-200"
        >
          Home
        </a>

        {!user ? (
          <Link
            href="/signin"
            className="text-white/80 hover:text-white transition-colors"
          >
            Sign In
          </Link>
        ) : (
          <div className="relative">
            <button
              id="user-dropdown-button"
              onClick={() => setDropdownOpen((open) => !open)}
              className="flex items-center gap-2 text-white/90 hover:text-white"
            >
              <User className="w-4 h-4" />
              Hi, {user?.name ? user.name.split(" ")[0] : "User"}
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                id="user-dropdown"
                className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-[100]"
              >
                <Link href="/account">
                  <div className="flex items-center px-4 py-2 hover:bg-gray-100 gap-2 cursor-pointer">
                    <User className="w-4 h-4" /> My Account
                  </div>
                </Link>
                <Link href="/orders">
                  <div className="flex items-center px-4 py-2 hover:bg-gray-100 gap-2 cursor-pointer">
                    <List className="w-4 h-4" /> Orders
                  </div>
                </Link>
                <Link href="/inbox">
                  <div className="flex items-center px-4 py-2 hover:bg-gray-100 gap-2 relative cursor-pointer">
                    <Inbox className="w-4 h-4" />
                    Inbox
                    <span className="absolute right-4 top-2 bg-orange-600 text-white text-xs rounded-full px-1.5">
                      1
                    </span>
                  </div>
                </Link>
                <Link href="/wishlist">
                  <div className="flex items-center px-4 py-2 hover:bg-gray-100 gap-2 cursor-pointer">
                    <Heart className="w-4 h-4" /> Wishlist
                  </div>
                </Link>
                <Link href="/vouchers">
                  <div className="flex items-center px-4 py-2 hover:bg-gray-100 gap-2 cursor-pointer">
                    <Ticket className="w-4 h-4" /> Voucher
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Cart Icon */}
        <Link
          href="/cart"
          className="relative text-white hover:text-white/90 transition-all"
        >
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
              {cart.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
