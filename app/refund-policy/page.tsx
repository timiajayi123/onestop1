'use client';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Refund Policy
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Hassle-free refunds to keep your shopping experience smooth.
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            At <span className="font-semibold">OneStop Shop</span>, we want you
            to be completely satisfied with your purchase.
          </p>

          <div className="bg-gray-100 p-5 rounded-xl">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Refund Guidelines
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Refunds are accepted within{" "}
                <span className="font-semibold">7 days</span> (1 week) from the
                date of delivery.
              </li>
              <li>
                Items must be unused, in their original condition, and in the
                original packaging.
              </li>
              <li>
                To request a refund, please contact our support team via the{" "}
                <a
                  href="/contact"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Contact Page
                </a>
                .
              </li>
              <li>
                Refunds will be processed to your original method of payment
                once your return is approved.
              </li>
            </ul>
          </div>

          <p>
            <span className="font-semibold">Note:</span> Delivery fees are
            non-refundable. Customers are responsible for the cost of return
            shipping unless the item received was defective or incorrect.
          </p>
        </div>
      </div>
    </div>
  );
}
