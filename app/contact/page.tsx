"use client";

import { Mail, Phone, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          We’re here to help. Reach out to us through any of the options below.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-center gap-4 border rounded-xl p-4 hover:shadow-md transition">
            <Mail className="w-6 h-6 text-indigo-600" />
            <div>
              <p className="font-semibold text-gray-900">Admin</p>
              <p className="text-gray-600 text-sm">timileyinajayi@onestopshop.com.ng</p>

            </div>
          </div>

          <div className="flex items-center gap-4 border rounded-xl p-4 hover:shadow-md transition">
            <Mail className="w-6 h-6 text-indigo-600" />
            <div>
              <p className="font-semibold text-gray-900">Email</p>

              <p className="text-gray-600 text-sm">support@onestopshop.com.ng</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border rounded-xl p-4 hover:shadow-md transition">
            <Phone className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-gray-900">Phone</p>
              <p className="text-gray-600 text-sm">0903 070 6919</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border rounded-xl p-4 hover:shadow-md transition">
            <MessageSquare className="w-6 h-6 text-teal-600" />
            <div>
              <p className="font-semibold text-gray-900">WhatsApp</p>
              <p className="text-gray-600 text-sm">0815 989 2957</p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600">
            We usually respond within <span className="font-medium">24 hours</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
