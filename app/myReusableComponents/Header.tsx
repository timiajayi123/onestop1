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
      } catch {
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
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setDropdownOpen(false);
    router.push("/signin");
  };

  if (loadingUser) {
    return (
      <header className="px-6 py-4 shadow-md">
        <div>Loading...</div>
      </header>
    );
  }

  return (
    <header
      className="
        sticky top-0 z-50 flex justify-between items-center px-6 py-3
        bg-white text-gray-800 shadow-sm 
        lg:bg-[#1a1a1a] lg:text-white lg:shadow-md
      "
    >
      {/* Logo & Brand */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.jpg"
          alt="logo"
          className="h-9 w-9 rounded-full object-cover lg:h-10 lg:w-10"
        />
        <h1
          className="
            text-lg font-semibold tracking-tight text-gray-900
            lg:text-xl lg:tracking-wide lg:text-white/90
          "
        >
          One Stop Shop
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex gap-6 items-center text-sm font-medium relative">
        <Link
          href="/"
          className="
            text-gray-600 hover:text-black transition-colors
            lg:text-white/80 lg:hover:text-white
          "
        >
          Home
        </Link>

        {!user ? (
          <Link
            href="/signin"
            className="
              text-gray-600 hover:text-black
              lg:text-white/80 lg:hover:text-white
            "
          >
            Sign In
          </Link>
        ) : (
          <div className="relative">
            <button
              id="user-dropdown-button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="
                flex items-center gap-2
                text-gray-700 hover:text-black
                lg:text-white/90 lg:hover:text-white
              "
            >
              <User className="w-5 h-5" />
              <span className="hidden md:block">
                Hi, {user?.name ? user.name.split(" ")[0] : "User"}
              </span>
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
                className="
                  absolute right-0 mt-2 w-52 rounded-xl shadow-lg py-2 z-[100]
                  bg-white text-black border border-gray-200
                "
              >
                <Link href="/account">
                  <div className="flex items-center px-4 py-2 hover:bg-gray-50 gap-2 cursor-pointer">
                    <User className="w-4 h-4" /> My Account
                  </div>
                </Link>
                <Link href="/orders">
                  <div className="flex items-center px-4 py-2 hover:bg-gray-50 gap-2 cursor-pointer">
                    <List className="w-4 h-4" /> Orders
                  </div>
                </Link>
                <Link href="/inbox">
                  <div className="flex items-center px-4 py-2 hover:bg-gray-50 gap-2 relative cursor-pointer">
                    <Inbox className="w-4 h-4" />
                    Inbox
                    <span
                      className="
                        absolute right-4 top-2 bg-black text-white text-[10px] rounded-full px-1.5
                        lg:bg-orange-600
                      "
                    >
                      1
                    </span>
                  </div>
                </Link>
                <Link href="/wishlist">
                  <div className="flex items-center px-4 py-2 hover:bg-gray-50 gap-2 cursor-pointer">
                    <Heart className="w-4 h-4" /> Wishlist
                  </div>
                </Link>
                <Link href="/vouchers">
                  <div className="flex items-center px-4 py-2 hover:bg-gray-50 gap-2 cursor-pointer">
                    <Ticket className="w-4 h-4" /> Voucher
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Cart */}
        <Link
          href="/cart"
          className="
            relative text-gray-700 hover:text-black transition-all
            lg:text-white hover:lg:text-white/90
          "
        >
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span
              className="
                absolute -top-1.5 -right-2
                bg-black text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center
                lg:bg-pink-600 lg:animate-pulse
              "
            >
              {cart.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
