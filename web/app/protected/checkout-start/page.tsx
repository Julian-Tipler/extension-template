"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createStripeSessionAndRedirect } from "@/lib/createStripeSessionAndRedirect";

function CheckoutStartContent() {
  const searchParams = useSearchParams();
  const stripePriceId = searchParams.get("stripePriceId");

  useEffect(() => {
    if (stripePriceId) {
      createStripeSessionAndRedirect(stripePriceId);
    }
  }, [stripePriceId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Redirecting to checkout...</h1>
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