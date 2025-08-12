"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createStripeSessionAndRedirect } from "@/lib/createStripeSessionAndRedirect";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/app/context/AuthProvider";

function CheckoutStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const { session, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log("CheckoutStartContent rendered", { productId });
  useEffect(() => {
    async function checkPriceAndRedirect() {
      if (!productId) {
        setError("No price ID provided");
        setIsLoading(false);
        return;
      }

      // Wait for authentication to complete
      if (loading) return;

      if (!session || !session.user) {
        setError("Not authenticated");
        setIsLoading(false);
        return;
      }

      createStripeSessionAndRedirect(productId);
    }

    // Create Supabase client
    checkPriceAndRedirect();
  }, [productId, router, loading, session]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="mt-2">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Moms
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">
        {loading || isLoading ? "Processing your request..." : "Redirecting..."}
      </h1>
    </div>
  );
}

export default function CheckoutStart() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutStartContent />
    </Suspense>
  );
}
