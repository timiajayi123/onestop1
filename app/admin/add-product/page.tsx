'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  database,
  account,
  teams,
  Config,
  ADMIN_TEAM_ID,
} from '@/lib/appwriteConfig';
import { ID, Permission } from 'appwrite';
import AdminShell from '@/components/ui/AdminShell';

export default function AddProductPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [imagesInput, setImagesInput] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const router = useRouter();

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const handleLogout = () => {
    localStorage.removeItem('email');
    router.push('/');
  };

  useEffect(() => {
    const init = async () => {
      try {
        const session = await account.get();
        const memberships = await teams.listMemberships(ADMIN_TEAM_ID);
        const isMember = memberships.memberships.some(
          (m) => m.userId === session.$id && m.roles.includes('admin')
        );
        if (!isMember) return setIsAdmin(false);

        setIsAdmin(true);

        // Fetch categories from existing products
        const productsRes = await database.listDocuments(
          Config.databaseId,
          Config.productsCollectionId
        );

        const cats = new Set<string>();
        productsRes.documents.forEach((doc: any) => {
          if (doc.category) cats.add(doc.category);
        });
        setCategories([...cats]);
      } catch (error) {
        console.error('Admin check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleImageInputChange = (val: string) => {
    setImagesInput(val);
    const urls = val
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean);
    setImages(urls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await database.createDocument(
        Config.databaseId,
        Config.productsCollectionId,
        ID.unique(),
        {
          Name: name, // match the exact field name in your Appwrite schema
          Price: parseFloat(price),
          Short_Description: shortDesc,
          Long_Description: longDesc,
          images,
          category,
        },
        [
          Permission.read(`team:${ADMIN_TEAM_ID}`),
          Permission.update(`team:${ADMIN_TEAM_ID}`),
          Permission.delete(`team:${ADMIN_TEAM_ID}`),
        ]
      );

      alert('✅ Product added');
      router.push('/admin');
    } catch (error) {
      console.error('Add error:', error);
      alert('❌ Failed to add product');
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (!isAdmin) return <div className="p-6 text-red-500">Access denied</div>;

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
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow space-y-5"
      >
        <h2 className="text-2xl font-bold">➕ Add New Product</h2>

        <input
          className="w-full p-3 border rounded"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full p-3 border rounded"
          placeholder="Price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <textarea
          className="w-full p-3 border rounded"
          placeholder="Short Description"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          required
        />

        <textarea
          className="w-full p-3 border rounded"
          placeholder="Long Description"
          value={longDesc}
          onChange={(e) => setLongDesc(e.target.value)}
          required
        />

        <div>
          <input
            className="w-full p-3 border rounded"
            placeholder="Image URLs (comma separated)"
            value={imagesInput}
            onChange={(e) => handleImageInputChange(e.target.value)}
          />

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview ${idx}`}
                  className="rounded border h-32 object-contain bg-gray-100"
                />
              ))}
            </div>
          )}
        </div>

        <select
          className="w-full p-3 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
        >
          Add Product
        </button>
      </form>
    </AdminShell>
  );
}
