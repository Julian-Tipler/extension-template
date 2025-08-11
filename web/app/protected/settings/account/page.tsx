"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAuth } from "@/app/context/AuthProvider";
import { createClient } from "@/lib/supabase/client";

// Define types for products and purchases
type Product = {
  id: string;
  name: string;
  price?: number;
  description?: string;
};

export default function AccountPage() {
  const { session, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserPurchases() {
      if (!session?.user?.id) return;

      try {
        const supabase = createClient();
        const { data: purchases, error: purchasesError } = await supabase
          .from("purchases")
          .select(
            `
            *,
            product:productId (
              id,
              name,
              price,
              description
            )
          `
          )
          .eq("userId", session.user.id)
          .eq("status", "active");

        if (purchasesError) throw purchasesError;

        if (purchases) {
          // Extract product information from purchases
          const userProducts = purchases.map((purchase) => purchase.product);
          setProducts(userProducts);
        }
      } catch (err: any) {
        console.error("Error fetching purchases:", err);
        setError(err.message || "Failed to load your purchased products");
      } finally {
        setIsLoading(false);
      }
    }

    if (session && !loading) {
      fetchUserPurchases();
    }
  }, [session, loading]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-muted-foreground mt-2">
          Manage Your Mom and personal information
        </p>
      </div>

      <div className="border-t pt-6">
        <form className="space-y-6">
          {/* Your Mom image and products */}
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-6">
              <div className="relative h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
                <span className="text-xl font-semibold">JD</span>
                {/* You can add an image here with next/image */}
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-medium mb-2">Your Products</h3>
                {isLoading ? (
                  <p className="text-sm text-muted-foreground">
                    Loading your products...
                  </p>
                ) : error ? (
                  <p className="text-sm text-red-500">{error}</p>
                ) : products.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    You don't own any products yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2"
                      >
                        <span className="text-sm font-medium">
                          {product.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="example@example.com" />
            <p className="text-xs text-muted-foreground">
              This email will be used for important notifications
            </p>
          </div>
          {/* Preferences section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing-emails" defaultChecked />
                <Label htmlFor="marketing-emails">
                  Receive marketing emails
                </Label>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
