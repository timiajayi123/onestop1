"use client";

import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 mb-4">
          Welcome to One Stop Shop. By accessing or using our website, you agree
          to comply with the following terms and conditions. Please read them
          carefully before using our services.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-600 mb-4">
          By using our website, you confirm that you have read, understood, and
          agreed to these Terms & Conditions. If you do not agree, please do not
          use our services.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          2. Eligibility
        </h2>
        <p className="text-gray-600 mb-4">
          You must be at least 18 years old or have parental/guardian consent to
          use our services and make purchases on our platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          3. Products & Services
        </h2>
        <p className="text-gray-600 mb-4">
          We strive to display accurate product information. However, we do not
          guarantee that descriptions, images, or prices are error-free. We
          reserve the right to modify or discontinue products at any time
          without notice.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          4. Orders & Payments
        </h2>
        <p className="text-gray-600 mb-4">
          All orders are subject to acceptance and availability. Payments must
          be completed before your order is processed. We reserve the right to
          cancel or refuse any order if fraud or misuse is suspected.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          5. Delivery
        </h2>
        <p className="text-gray-600 mb-4">
          We currently deliver within Abuja. Delivery timelines may vary based
          on location and availability. We are not responsible for delays caused
          by third-party logistics providers.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          6. Returns & Refunds
        </h2>
        <p className="text-gray-600 mb-4">
          Please refer to our{" "}
          <a href="/refund-policy" className="text-blue-600 hover:underline">
            Refund Policy
          </a>{" "}
          page for details regarding returns, exchanges, and refunds.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          7. User Responsibilities
        </h2>
        <p className="text-gray-600 mb-4">
          You agree not to misuse our platform, engage in fraudulent activity,
          or attempt to interfere with the proper functioning of our website.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          8. Limitation of Liability
        </h2>
        <p className="text-gray-600 mb-4">
          One Stop Shop shall not be held liable for any damages arising from
          the use or misuse of our products or services, beyond the value of the
          purchased product.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          9. Changes to Terms
        </h2>
        <p className="text-gray-600 mb-4">
          We may update these Terms & Conditions from time to time. Updates will
          be posted on this page, and continued use of our site means you accept
          the revised terms.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          10. Contact Us
        </h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about these Terms & Conditions, please
          contact us at:
        </p>
        <ul className="text-gray-700 list-disc list-inside mb-6">
          <li>Email: support@onestopshop.com.ng</li>
          <li>Phone: 09030706919</li>
          <li>WhatsApp: 08159892957</li>
        </ul>

        <p className="text-gray-500 text-sm text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
