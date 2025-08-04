'use client';

import {
  Sun, Moon, Menu, X, LogOut, ChevronLeft, ChevronRight,
  LayoutDashboard, PlusSquare, Package
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  drawerOpen: boolean;
  toggleDrawer: () => void;
  handleLogout: () => void;
}

export default function AdminLayout({
  children,
  darkMode,
  toggleDarkMode,
  sidebarCollapsed,
  toggleSidebar,
  drawerOpen,
  toggleDrawer,
  handleLogout
}: AdminLayoutProps) {
  const navLinks = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/admin' },
    { label: 'Add Product', icon: <PlusSquare size={18} />, href: '/admin/add-product' },
    { label: 'Manage Orders', icon: <Package size={18} />, href: '/admin/orders' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="relative flex items-center justify-between mb-6 h-8">
          {!sidebarCollapsed && (
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Admin
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="absolute right-0 text-gray-700 dark:text-gray-300 p-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="space-y-4">
          {navLinks.map(({ label, icon, href }) => (
            <Link key={label} href={href} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary transition-all">
              {icon}
              {!sidebarCollapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-2 text-red-500 hover:text-red-600">
          <LogOut size={18} />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </aside>

      {/* Mobile Navigation & Main Content */}
      <div className="flex-1 relative">
        {/* Mobile Drawer Toggle */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button onClick={toggleDrawer} className="text-gray-800 dark:text-white p-2">
            {drawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Overlay */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden"
            onClick={toggleDrawer}
          />
        )}

        {/* Mobile Drawer */}
        <aside className={`fixed z-50 top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 p-4 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Menu</h2>
          <nav className="space-y-4">
            {navLinks.map(({ label, icon, href }) => (
              <Link key={label} href={href} onClick={toggleDrawer} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          <button onClick={handleLogout} className="mt-6 flex items-center gap-2 text-red-500 hover:text-red-600">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, Admin</h2>
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 p-2 rounded-md border dark:border-gray-600 border-gray-300">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
