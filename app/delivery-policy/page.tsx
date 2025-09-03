'use client';

export default function DeliveryPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Shipping & Delivery Policy
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Clear and transparent information about our delivery process.
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            At <span className="font-semibold">OneStop Shop</span>, we currently
            deliver exclusively within{" "}
            <span className="font-semibold">Abuja, Nigeria</span>.
          </p>

          <div className="bg-gray-100 p-5 rounded-xl">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Delivery Information
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Delivery timeframe:{" "}
                <span className="font-semibold">1–3 business days</span>.
              </li>
              <li>Deliveries are made to the address provided at checkout.</li>
              <li>Our deliveries are made by our trusted dispatch riders and our Collaborative Delivery Companies.</li>
              <li>Business days exclude weekends and public holidays.</li>
            </ul>
          </div>

          <p>
            We are working on expanding our delivery locations soon, and will
            keep you updated once nationwide or international delivery becomes
            available.
          </p>
        </div>
      </div>
    </div>
  );
}
