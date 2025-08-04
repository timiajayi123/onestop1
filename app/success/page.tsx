import { Suspense } from "react";
import SuccessPageContent from "./SuccessPageContent";

export const dynamic = "force-dynamic"; // optional, ensures it's rendered dynamically

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center py-10 text-gray-500">Loading...</p>}>
      <SuccessPageContent />
    </Suspense>
  );
}
