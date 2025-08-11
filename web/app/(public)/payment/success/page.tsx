// app/success/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push("/protected/settings/account");
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-2xl font-bold mb-2">Payment Successful 🎉</h1>
      <p className="mb-6">Thank you for your purchase!</p>
      <p className="text-gray-600 animate-pulse">Loading Your Mom...</p>
    </div>
  );
}
