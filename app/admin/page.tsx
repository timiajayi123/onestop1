  'use client';

  import { useEffect, useState } from 'react';
  import { useRouter } from 'next/navigation';
  import {
    account,
    database,
    teams,
    Config,
    ADMIN_TEAM_ID
  } from '@/lib/appwriteConfig';
  import AdminShell from '@/components/ui/AdminShell'
  ;
  import Image from 'next/image';

const getImageUrl = (file: string) => {
  const fileId = file.split('/').pop()?.split('?')[0]; // Extract ID
  return `https://cloud.appwrite.io/v1/storage/buckets/${Config.bucketId}/files/${fileId}/preview?project=${Config.projectId}`;
};


  type Product = {
    $id: string;
    name: string;
    price: number;
    category: string;
    images?: string[];
  };

  type Order = {
    $id: string;
    customerName: string;
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
  };

  export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    const router = useRouter();

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);
    const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
    const handleLogout = async () => {
      try {
        await account.deleteSession('current');
        router.push('/');
      } catch {
        localStorage.removeItem('email');
        router.push('/');
      }
    };


  useEffect(() => {
    const checkIfAdmin = async () => {
      try {
        const session = await account.get();
        const memberships = await teams.listMemberships(ADMIN_TEAM_ID);
        const isMember = memberships.memberships.some(
          (m) => m.userId === session.$id && m.roles.includes('admin')
        );

        if (!isMember) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        setIsAdmin(true);

        const [productsRes, ordersRes] = await Promise.all([
          database.listDocuments(Config.databaseId, Config.productsCollectionId),
          database.listDocuments(Config.databaseId, Config.ordersCollectionId)
        ]);

        const mappedProducts: Product[] = productsRes.documents.map((doc) => ({
          $id: doc.$id,
          name: doc.name,
          price: Number(doc.price),
          category: doc.category,
          images: doc.images ?? []
        }));

        const mappedOrders: Order[] = ordersRes.documents.map((doc) => ({
          $id: doc.$id,
          customerName: doc.customerName,
          totalAmount: Number(doc.totalAmount),
          status: doc.status,
          createdAt: doc.$createdAt
        }));

        setProducts(mappedProducts);
        setOrders(mappedOrders);
      } catch (err) {
        console.error('❌ AdminPage Error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkIfAdmin();
  }, []);

    const handleEdit = (product: Product) => {
      alert(`Edit feature coming soon for "${product.name}"`);
    };

    const handleDelete = async (productId: string) => {
      if (!confirm('Are you sure you want to delete this product?')) return;

      try {
        await database.deleteDocument(Config.databaseId, Config.productsCollectionId, productId);
        setProducts((prev) => prev.filter((p) => p.$id !== productId));
      } catch (err) {
        console.error('❌ Delete error:', err);
        alert('Failed to delete product, try again later.');
      }
    };

    if (loading)
      return (
        <div className="flex justify-center items-center h-64 text-gray-600 dark:text-gray-400">
          <svg
            className="animate-spin h-8 w-8 mr-3 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Loading admin data...
        </div>
      );

    if (!isAdmin)
      return (
        <div className="p-8 text-center text-red-600 dark:text-red-400 text-xl font-semibold">
          Access denied. You do not have permission to view this page.
        </div>
      );

    const groupedProducts = products.reduce<Record<string, Product[]>>((acc, product) => {
      const category = product.category || 'Uncategorized';
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});

    const formatDate = (dateString: string) =>
      new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

    const formatCurrency = (amount: number): string =>
      new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      }).format(amount);

    const statusColors: Record<Order['status'], string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <AdminShell
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        sidebarCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleLogout={handleLogout}
      >
        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Products</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{products.length} total</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Orders</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{orders.length} total</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Admin Panel</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Manage products & orders</p>
          </div>
        </section>

        {/* Products */}
        <section className="mb-16">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100 capitalize border-b border-gray-300 dark:border-gray-700 pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((product) => (
                  <div key={product.$id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="w-full bg-white rounded-xl p-4">
                      <div className="aspect-square w-full mb-2">
                        {product.images?.[0] ? (
                          <Image
                            src={getImageUrl(product.images[0])}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                            No image
                          </div>
                        )}
                      </div>
                      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">{product.name}</h2>
                      <p className="text-indigo-600 font-bold text-lg mt-1">
                        {product.price ? formatCurrency(product.price) : 'No price'}
                      </p>
                    </div>
                    <div className="flex space-x-3 p-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 text-sm font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.$id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-md py-2 text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Orders */}
        <section>
          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 pb-2">
            Recent Orders
          </h3>
          {orders.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No orders found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map((order) => (
                    <tr key={order.$id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300 truncate max-w-[140px]">{order.$id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{order.customerName || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-indigo-700 dark:text-indigo-400 font-semibold">{formatCurrency(order.totalAmount)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </AdminShell>
    );
  }
