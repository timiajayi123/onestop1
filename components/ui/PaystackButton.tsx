// components/PaystackButton.tsx
import React from "react";

type PaystackButtonProps = {
  email: string;
  amount: number; // in naira
  onSuccess: (reference: string) => void;
};

const PaystackButton: React.FC<PaystackButtonProps> = ({ email, amount, onSuccess }) => {
  const payWithPaystack = () => {
    const handler = (window as any).PaystackPop.setup({
      key: "pk_test_4b80438a9e6c48413a367eb76f58eadae5f31a42", // replace with real public key
      email,
      amount: amount * 100, // convert to kobo
      currency: "NGN",
      callback: function (response: any) {
        onSuccess(response.reference);
      },
      onClose: function () {
        alert("Payment was cancelled.");
      },
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={payWithPaystack}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      Pay Now
    </button>
  );
};

export default PaystackButton;
