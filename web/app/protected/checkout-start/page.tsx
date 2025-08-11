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

      const userId = session.user.id;

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
            // Check if the user already owns this product
            const { data: purchases, error: purchasesError } = await supabase
              .from("purchases")
              .select("id")
              .eq("userId", userId)
              .eq("productId", productId)
              .eq("status", "active")
              .single();

            if (purchasesError && purchasesError.code !== "PGRST116") {
              // PGRST116 is the "not found" error code
              console.error(
                "Error checking existing purchases:",
                purchasesError
              );
              setError("Failed to check purchase history");
              setIsLoading(false);
              return;
            }

            if (purchases) {
              // User already owns this product - redirect to settings page with a message
              router.push(
                "/protected/settings/account?message=You already own this product"
              );
            } else {
              // Paid product - proceed with Stripe checkout
              createStripeSessionAndRedirect(productId);
            }
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
  }, [productId, router, loading, session]);

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
