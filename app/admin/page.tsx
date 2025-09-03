  'use client';
    import { useEffect, useState } from 'react';
  import { useRouter } from 'next/navigation';
  import type { Product } from "@/app/types/Product"; // ✅ This should match your source of truth

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
  import { getImageUrl } from '@/lib/getImageUrl';
import { toast } from 'sonner';
// ❌ Remove this:
// const bucketId = '...';
// const projectId = '...';

// ✅ This is enough:

  type Order = {
    $id: string;
    userId: string;
    items: string;
    total: number;
    address: string;
    phone: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    orderNumber: string;
    paystackRef: string;
  };



  export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const router = useRouter();


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
    // (Removed from here. This block should be inside the return statement, after all function declarations.)
const [searchTerm, setSearchTerm] = useState('');

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
  Name: doc.Name,
  Price: typeof doc.Price === 'number' ? doc.Price : Number(doc.Price),
  category: doc.category,
  images: Array.isArray(doc.images) ? doc.images : [],
  Long_Description: doc.Long_Description ?? '',
  Short_Description: doc.Short_Description ?? '',
  stock: typeof doc.stock === 'number' ? doc.stock : 0,
  // For convenience in UI, also provide normalized fields (optional)
  name: doc.Name,
  price: typeof doc.Price === 'number' ? doc.Price : Number(doc.Price),
  long_description: doc.Long_Description ?? '',
  short_description: doc.Short_Description ?? ''
}));

        const mappedOrders: Order[] = ordersRes.documents.map((doc) => {
          // Ensure correct field names and provide robust fallbacks
          const userId =
        doc.userId ||
        doc.UserId ||
        (doc.user && (doc.user.$id || doc.user.id)) ||
        '';
          const items =
        doc.items ||
        doc.Items ||
        '';
          let total = 0;
          if (typeof doc.total === 'number') total = doc.total;
          else if (typeof doc.Total === 'number') total = doc.Total;
          else if (typeof doc.totalAmount === 'number') total = doc.totalAmount;
          else if (typeof doc.TotalAmount === 'number') total = doc.TotalAmount;
          else if (typeof doc.amount === 'number') total = doc.amount;
          else if (typeof doc.Amount === 'number') total = doc.Amount;
          else total = Number(
        doc.total ||
        doc.Total ||
        doc.totalAmount ||
        doc.TotalAmount ||
        doc.amount ||
        doc.Amount ||
        0
          );
          const address =
        doc.address ||
        doc.Address ||
        '';
          const phone =
        doc.phone ||
        doc.Phone ||
        '';
          const status: Order['status'] =
        doc.status ||
        doc.Status ||
        'pending';
          const createdAt =
        doc.$createdAt ||
        doc.createdAt ||
        doc.CreatedAt ||
        '';
          const orderNumber =
        doc.orderNumber ||
        doc.OrderNumber ||
        '';
          const paystackRef =
        doc.paystackRef ||
        doc.PaystackRef ||
        '';

          return {
        $id: doc.$id,
        userId,
        items,
        total,
        address,
        phone,
        status,
        createdAt,
        orderNumber,
        paystackRef,
          };
        });

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
const filteredOrders = orders.filter(
  (order) =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userId.toLowerCase().includes(searchTerm.toLowerCase())
);

    if (loading)
      return (
        <div className="flex justify-center items-center h-64 text-gray-600">
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
        <div className="p-8 text-center text-red-600 text-xl font-semibold">
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

        sidebarCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleLogout={handleLogout}
      >
        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
            <p className="text-gray-500 text-lg">{products.length} total</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
            <p className="text-gray-500 text-lg">{orders.length} total</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
            <p className="text-gray-500 text-lg">Manage products & orders</p>
          </div>
        </section>

        {/* Products */}
        <section className="mb-16">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-bold mb-6 text-gray-900 capitalize border-b border-gray-300 pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((product) => (
                  <div key={product.$id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="w-full bg-white rounded-xl p-4">
                      <div className="aspect-square w-full mb-2">
                        {product.images?.[0] ? (
                          <Image
  src={getImageUrl(product.images[0])}
  alt={product.name || 'Product image'}
  width={500} // add dimensions if not set elsewhere
  height={500}
/>

                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                            No image
                          </div>
                        )}
                      </div>
                      <h2 className="text-lg font-medium text-gray-800">{product.name}</h2>
                     <p className="text-indigo-600 font-bold text-lg mt-1">
  {typeof product.price === 'number'
    ? formatCurrency(product.price)
    : 'No price'}
</p>

                    </div>
                    <div className="flex space-x-3 p-4">
<button
  onClick={() => setEditingProduct(product)} // <-- just set the product for editing
  className="flex-1 bg-white text-black border border-black hover:bg-gray-100 rounded-md py-2 text-sm font-semibold"
>
  Edit
</button>
<button
  onClick={() => handleDelete(product.$id)}
  className="flex-1 bg-black text-white border border-black hover:bg-gray-800 rounded-md py-2 text-sm font-semibold"
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
          <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-300 pb-2">
            Recent Orders
          </h3>
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Order ID or User ID"
              className="w-full max-w-xs p-2 border rounded"
            />
          </div>
          {filteredOrders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full bg-white divide-y divide-gray-200">
                  <thead>
  <tr>
    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User ID</th>
    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</th>
    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created At</th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Paystack Ref</th>
  </tr>
</thead>

<tbody className="divide-y divide-gray-200">
  {filteredOrders.map((order) => (
    <tr key={order.$id} className="hover:bg-gray-50">
      {/* Order Number (Real Order ID) */}
      <td className="px-6 py-4 text-sm font-mono text-gray-700 truncate max-w-[140px]">
        {order.orderNumber}
      </td>

      {/* User ID */}
      <td className="px-6 py-4 text-sm font-mono text-gray-700 truncate max-w-[140px]">
        {order.userId}
      </td>

      {/* Status (Editable) */}
      <td className="px-6 py-4">
        <select
          value={order.status}
          onChange={async (e) => {
            const newStatus = e.target.value as typeof order.status;
            try {
              await database.updateDocument(
                Config.databaseId,
                Config.ordersCollectionId,
                order.$id,
                {
                  status: newStatus,
                  userId: order.userId,
                  items: order.items,
                  total: order.total,
                  address: order.address,
                  phone: order.phone,
                  createdAt: order.createdAt,
                  orderNumber: order.orderNumber,
                  paystackRef: order.paystackRef,
                }
              );
              // Update local state
              setOrders((prev) =>
                prev.map((o) =>
                  o.$id === order.$id ? { ...o, status: newStatus } : o
                )
              );
              toast('Order status updated!');
            } catch (err) {
              console.error('Failed to update order status:', err);
              toast('Failed to update status. Try again.');
            }
          }}
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-300 text-gray-800'}`}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </td>

      {/* Total */}
      <td className="px-6 py-4 text-sm text-gray-600">
        ₦{order.total.toLocaleString()}
      </td>

      {/* Phone */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {order.phone}
      </td>

      {/* Address */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {order.address}
      </td>

      {/* Created At */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {formatDate(order.createdAt)}
      </td>
      {/* Paystack Ref */}
     <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer hover:underline" onClick={() => navigator.clipboard.writeText(order.paystackRef)}>
  {order.paystackRef || '-'}
</td>

    </tr>
  ))}
</tbody>


              </table>
            </div>
          )}
        </section>
        {editingProduct && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 transition-colors">
    <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
      {/* X Button */}
      <button
        type="button"
        aria-label="Close"
        onClick={() => setEditingProduct(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-2xl font-bold focus:outline-none"
      >
        &times;
      </button>
      <h2 className="text-lg font-bold mb-4">Edit Product</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const updatedProduct = {
            Name: (formData.get('name') as string) ?? '',
            Price: parseFloat(formData.get('price') as string),
            category: (formData.get('category') as string) ?? '',
            Short_Description: (formData.get('short_description') as string) ?? '',
            Long_Description: (formData.get('long_description') as string) ?? '',
          };

          try {
            await database.updateDocument(
              Config.databaseId,
              Config.productsCollectionId,
              editingProduct.$id,
              updatedProduct
            );
            setProducts((prev) =>
              prev.map((p) =>
                p.$id === editingProduct.$id
                  ? {
                      ...p,
                      name: typeof updatedProduct.Name === 'string' ? updatedProduct.Name : p.name,
                      price: typeof updatedProduct.Price === 'number' ? updatedProduct.Price : p.price,
                      category: typeof updatedProduct.category === 'string' ? updatedProduct.category : p.category,
                      short_description: typeof updatedProduct.Short_Description === 'string' ? updatedProduct.Short_Description : p.short_description,
                      long_description: typeof updatedProduct.Long_Description === 'string' ? updatedProduct.Long_Description : p.long_description,
                    }
                  : p
              )
            );
            toast('Product updated!');
            setEditingProduct(null);
          } catch (err) {
            console.error('Failed to update product:', err);
            alert('Update failed. Try again later.');
          }
        }}
      >
        <input
          type="text"
          name="name"
          defaultValue={typeof editingProduct.name === 'string' ? editingProduct.name : ''}
          placeholder="Name"
          required
          className="w-full mb-2 p-2 border rounded"
          autoComplete="off"
        />
        <input
          type="number"
          name="price"
          defaultValue={editingProduct.price}
          placeholder="Price"
          step="0.01"
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          defaultValue={editingProduct.category}
          placeholder="Category"
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          name="short_description"
          placeholder="Short Description"
          defaultValue={editingProduct.short_description || ''}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          name="long_description"
          placeholder="Long Description"
          defaultValue={editingProduct.long_description || ''}
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </AdminShell>
    );
  }
