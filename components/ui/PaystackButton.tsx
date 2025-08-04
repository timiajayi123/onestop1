
'use client';

import { useEffect } from 'react';

type Props = {
  email: string;
  amount: number; // amount in Naira
  onSuccess?: (ref: string) => void;
  onClose?: () => void;
};

export default function PaystackButton({
  email,
  amount,
  onSuccess,
  onClose,
}: Props) {
  useEffect(() => {
    // Inject the Paystack script dynamically
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const payWithPaystack = () => {
    const handler = (window as any).PaystackPop?.setup({
      key: "pk_test_4b80438a9e6c48413a367eb76f58eadae5f31a42", // replace with real public key
      email,
      amount: amount * 100, // Convert to kobo
      currency: 'NGN',
      ref: 'ref-' + Math.floor(Math.random() * 1000000000),
      callback: function (response: any) {
        alert('Payment successful! Reference: ' + response.reference);
        if (onSuccess) onSuccess(response.reference);
      },
      onClose: function () {
        alert('Payment window closed');
        if (onClose) onClose();
      },
    });

    handler?.openIframe();
  };

  return (
    <button
      onClick={payWithPaystack}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      Pay with Paystack
    </button>
  );
}
