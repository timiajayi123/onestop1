"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { database } from "@/lib/appwriteConfig";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const SuccessPage = () => {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await database.getDocument(
          "67cb37e2000b1b9ebcf7", // DB ID
          "6880c6b70035c9e8456f", // Collection ID
          orderId!
        );
        setOrder(res);
      } catch (err) {
        toast.error("Failed to load order");
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  const items = Array.isArray(order?.items)
    ? order.items
    : typeof order?.items === "string"
    ? JSON.parse(order.items)
    : [];

  const total =
    order?.totalAmount ??
    items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

  const generateReceipt = () => {
    if (!order) return;

    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("🧾 1neStopShop Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.$id}`, 20, 30);
    doc.text(`Phone: ${order.phone}`, 20, 40);
    doc.text(`Address: ${order.address}`, 20, 50);
    doc.text(`Total: ₦${total}`, 20, 60);
    doc.text("Items Purchased:", 20, 70);

    autoTable(doc, {
      startY: 75,
      head: [["Name", "Qty", "Price"]],
      body: items.map((item: any) => [
        item.name,
        item.quantity,
        `₦${item.price}`,
      ]),
      styles: { fillColor: [240, 240, 240] },
    });

    doc.save(`receipt_${order.$id}.pdf`);
  };

  if (!order) return <p className="text-center py-10 text-gray-500">Loading order...</p>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 sm:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600 mb-2">✅ Order Successful!</h1>
        <p className="text-lg text-gray-600">
          Thank you for shopping with <span className="font-semibold">1neStopShop</span>.
        </p>
        <p className="text-gray-500 mt-1">Here’s your order summary and receipt.</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Detail label="Order ID" value={order.$id} />
          <Detail label="Phone" value={order.phone} />
          <Detail label="Address" value={order.address} />
          <Detail
            label="Total"
            value={<span className="font-bold text-green-600">₦{total}</span>}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🛍 Items</h2>
          <ul className="space-y-4">
            {items.map((item: any, i: number) => (
              <li
                key={i}
                className="flex items-center gap-4 border-b pb-3"
              >
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity} | ₦{item.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={generateReceipt}
        className="mt-8 mx-auto block bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
      >
        📄 Download Receipt (PDF)
      </button>
    </div>
  );
};

// Small reusable component
const Detail = ({ label, value }: { label: string; value: any }) => (
  <div className="flex justify-between items-center text-gray-700">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

export default SuccessPage;
