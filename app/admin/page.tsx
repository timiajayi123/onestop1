'use client';

import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  PlusSquare,
  Package,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminShell({ children }: AdminLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out hidden md:flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          {!sidebarCollapsed && <h1 className="text-xl font-bold">Admin</h1>}
          <button onClick={toggleSidebar}>
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
            <LayoutDashboard size={20} />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </Link>
          <Link href="/admin/add-product" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
            <PlusSquare size={20} />
            {!sidebarCollapsed && <span>Add Product</span>}
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
            <Package size={20} />
            {!sidebarCollapsed && <span>Orders</span>}
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 border-t border-gray-200 hover:bg-gray-100"
        >
          <LogOut size={20} />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </aside>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <button onClick={toggleDrawer} className="p-4">
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {drawerOpen && (
          <div className="fixed inset-0 z-40 bg-white w-64 shadow-md">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h1 className="text-xl font-bold">Admin</h1>
              <button onClick={toggleDrawer}>
                <X size={20} />
              </button>
            </div>
            <nav className="px-2 py-4 space-y-2">
              <Link href="/admin" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
              <Link href="/admin/add-product" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                <PlusSquare size={20} />
                <span>Add Product</span>
              </Link>
              <Link href="/admin/orders" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                <Package size={20} />
                <span>Orders</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 mt-4 border-t border-gray-200 hover:bg-gray-100"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4">{children}</main>
    </div>
  );
}
