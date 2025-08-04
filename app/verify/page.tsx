// app/verify/page.tsx
import { Suspense } from "react";
import VerifyPageContent from "./VerifyPageContent";

export default function VerifyPage() {
  return (
    <Suspense fallback={<p className="text-center py-10 text-gray-400">Verifying...</p>}>
      <VerifyPageContent />
    </Suspense>
  );
}
