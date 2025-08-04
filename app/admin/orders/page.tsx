"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/select";
import { toast } from "sonner";

// --- Mocked or real Appwrite functions depending on your setup ---
import { getOrders, updateOrderStatus } from '@/lib/api'; // Adjust path to real location

// --- Types ---
type Order = {
  $id: string;
  $createdAt: string;
  userId: string;
  phone: string;
  totalAmount: number;
  status: "pending" | "processed" | "shipped" | "cancelled";
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

// --- Local utility ---
const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders as unknown as Order[]);
    } catch (err) {
      toast.error("Failed to fetch orders.");
    }
  };
  fetchOrders();
}, []);


  const handleStatusChange = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.$id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated.");
    } catch (err) {
      toast.error("Failed to update order status.");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const searchMatch =
      order.$id.includes(search) ||
      order.phone.toLowerCase().includes(search.toLowerCase()) ||
      order.userId.toLowerCase().includes(search.toLowerCase());
    const statusMatch = statusFilter ? order.status === statusFilter : true;
    return searchMatch && statusMatch;
  });

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Input
          placeholder="Search by Order ID, Phone, or User ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2"
        />
<Select value={statusFilter} onChange={(val) => setStatusFilter(val)}>

          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processed">Processed</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-sm text-muted-foreground">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.$id}
              className="border p-4 rounded-xl shadow-sm bg-white dark:bg-gray-900"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">
                  Order ID: {order.$id}
                </h3>
<Select
  value={order.status}
  onChange={(val) =>
    handleStatusChange(order.$id, val as Order["status"])
}
>

                  <SelectTrigger className="w-[150px]">
<SelectValue placeholder="Select status" />

                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processed">Processed</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm text-muted-foreground space-y-1 mb-2">
                <p>Phone: {order.phone}</p>
                <p>Total: {formatCurrency(order.totalAmount)}</p>
                <p>Placed: {new Date(order.$createdAt).toLocaleString()}</p>
                <p>User ID: {order.userId}</p>
              </div>

              <div className="grid gap-2">
                {order.cart.map((item, i) => (
                  <div
                    key={i}
                    className="border p-2 rounded bg-gray-50 dark:bg-gray-800"
                  >
                    <p className="font-medium">{item.name}</p>
                    <p>
                      Qty: {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
