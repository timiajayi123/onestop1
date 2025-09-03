"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          At One Stop Shop, we respect your privacy and are committed to protecting your personal data.  
          This policy explains how we handle your information when you use our services.
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal information such as your name, email, phone number, shipping address, 
              and payment details when you use our platform to place an order or contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to process orders, provide customer support, 
              send important updates, and improve your overall shopping experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. Data Security
            </h2>
            <p>
              We take data protection seriously. All personal information is stored securely 
              and we use appropriate safeguards to protect against unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. Sharing of Information
            </h2>
            <p>
              We do not sell or rent your personal information to third parties. 
              However, we may share limited data with trusted service providers 
              (such as payment processors or delivery partners) to fulfill your orders.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5. Your Rights
            </h2>
            <p>
              You have the right to request access, correction, or deletion of your personal data at any time. 
              If you wish to exercise these rights, please contact us at{" "}
              <a
                href="mailto:support@onestopshop.com.ng"
                className="text-blue-600 underline"
              >
                support@onestopshop.com.ng
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              6. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. 
              Any changes will be posted on this page with the updated effective date.
            </p>
          </section>
        </div>

        <p className="mt-8 text-sm text-gray-500 text-center">
          Effective Date: August 2025
        </p>
      </div>
    </div>
  );
}
