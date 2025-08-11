"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

// Define the Purchase type based on your Supabase schema
type Purchase = {
  id: string;
  created_at: string;
  user_id: string;
  product_name: string;
  amount: number;
  currency: string;
  status: string;
  payment_method?: string;
  invoice_id?: string;
};

export default function PurchasesPage() {
  const { session, loading } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPurchases() {
      if (!session?.user.id) return;

      try {
        setIsLoading(true);
        const supabase = createClient();

        const { data, error } = await supabase
          .from("purchases")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setPurchases(data || []);
      } catch (err: any) {
        console.error("Error fetching purchases:", err);
        setError(err.message || "Failed to load purchase history");
      } finally {
        setIsLoading(false);
      }
    }

    if (session && !loading) {
      fetchPurchases();
    }
  }, [session, loading]);

  // Format currency for display
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount / 100); // Assuming amount is stored in cents
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading || isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Purchase History</h2>
          <p className="text-muted-foreground mt-2">
            View your past purchases and subscription history
          </p>
        </div>
        <div className="flex items-center justify-center h-60">
          <div className="text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-sm text-muted-foreground">
              Loading purchase history...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Purchase History</h2>
          <p className="text-muted-foreground mt-2">
            View your past purchases and subscription history
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Purchase History</h2>
        <p className="text-muted-foreground mt-2">
          View your past purchases and subscription history
        </p>
      </div>

      {purchases.length === 0 ? (
        <div className="bg-muted/50 border rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium">No purchases yet</h3>
          <p className="text-muted-foreground mt-1">
            Your purchase history will appear here once you make your first
            purchase.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => (window.location.href = "/protected/plans")}
          >
            View Plans
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-muted/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatDate(purchase.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {purchase.product_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(purchase.amount, purchase.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        purchase.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : purchase.status === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : purchase.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {purchase.status.charAt(0).toUpperCase() +
                        purchase.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {purchase.invoice_id && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary hover:text-primary-hover"
                        onClick={() => {
                          // Handle invoice download or view
                          console.log(`View invoice ${purchase.invoice_id}`);
                        }}
                      >
                        View Receipt
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
