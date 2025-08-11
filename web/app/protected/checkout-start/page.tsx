"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createStripeSessionAndRedirect } from "@/lib/createStripeSessionAndRedirect";
import { createClient } from "@/lib/supabase/client";

function CheckoutStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkPriceAndRedirect() {
      if (!productId) {
        setError("No price ID provided");
        setIsLoading(false);
        return;
      }

      try {
        // Create Supabase client
        const supabase = createClient();

        // Query the products table by productId
        const { data, error } = await supabase
          .from("products")
          .select("price")
          .eq("id", productId)
          .single();

        if (error) {
          console.error("Error fetching product:", error);
          setError("Failed to fetch product information");
          setIsLoading(false);
          return;
        }

        if (data) {
          if (data.price === 0) {
            // Free product - redirect to settings page
            router.push("/protected/settings/account");
          } else {
            // Paid product - proceed with Stripe checkout
            createStripeSessionAndRedirect(productId);
          }
        } else {
          setError("Product not found");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error in checkout process:", error);
        setError("An unexpected error occurred");
        setIsLoading(false);
      }
    }

    checkPriceAndRedirect();
  }, [productId, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="mt-2">{error}</p>
        <button
          onClick={() => router.push("/protected/plans")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Plans
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">
        {isLoading ? "Processing your request..." : "Redirecting..."}
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
