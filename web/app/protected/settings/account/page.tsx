"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAuth } from "@/app/context/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { createMomUrl } from "@/lib/create-mom-url";

// Define types for products and purchases
type Product = {
  id: string;
  name: string;
  price?: number;
  description?: string;
  assetUrl?: string;
};

export default function AccountPage() {
  const { session, loading } = useAuth();
  const searchParams = useSearchParams();
  const messageFromURL = searchParams.get("message");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingSelection, setUpdatingSelection] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(
    messageFromURL
  );

  // Helper function to get the selected product
  const getSelectedProduct = () => {
    if (!selectedProductId) return null;
    return products.find((product) => product.id === selectedProductId) || null;
  };

  const handleProductSelect = async (productId: string) => {
    if (!session?.user?.id || updatingSelection) return;

    try {
      setUpdatingSelection(true);
      setSuccessMessage(null); // Clear any existing success message
      const supabase = createClient();

      // Update user's selectedProduct in the profiles table
      const { error } = await supabase
        .from("users")
        .update({ selectedProduct: productId })
        .eq("id", session.user.id);

      if (error) throw error;

      // Update local state to reflect the change
      setSelectedProductId(productId);

      // Show success feedback
      setSuccessMessage("Mom updated successfully!");

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err: any) {
      console.error("Error updating selected product:", err);
      setError(err.message || "Failed to update your selected mom");
    } finally {
      setUpdatingSelection(false);
    }
  };

  useEffect(() => {
    // Clear URL message after 3 seconds if it exists
    if (messageFromURL) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [messageFromURL]);

  useEffect(() => {
    async function fetchUserPurchases() {
      if (!session?.user?.id) return;

      try {
        const supabase = createClient();
        // Fetch user's purchases
        const { data: purchases, error: purchasesError } = await supabase
          .from("purchases")
          .select(
            `
            *,
            product:productId (
              id,
              name,
              price,
              description,
              assetUrl
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

        // Fetch user's currently selected product
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("selectedProduct")
          .eq("id", session.user.id)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
        } else if (userData) {
          setSelectedProductId(userData.selectedProduct);
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
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
                  {getSelectedProduct()?.assetUrl ? (
                    <Image
                      src={createMomUrl(getSelectedProduct()?.assetUrl!)}
                      alt={getSelectedProduct()?.name || "Selected Mom"}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  ) : (
                    <span className="text-xl font-semibold">Mom</span>
                  )}
                </div>
                <span className="text-sm font-medium mt-2">
                  {getSelectedProduct()?.name || "Select a Mom"}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <h3 className="text-lg font-medium mb-2">Your Moms</h3>
                {isLoading ? (
                  <p className="text-sm text-muted-foreground">
                    Loading your moms...
                  </p>
                ) : error ? (
                  <p className="text-sm text-red-500">{error}</p>
                ) : products.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    You don't own any products yet.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductSelect(product.id)}
                        className={`flex flex-col items-center rounded-md p-2 cursor-pointer transition-colors
                          ${
                            selectedProductId === product.id
                              ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-1"
                              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        style={{ width: "70px" }}
                      >
                        <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0 mb-1">
                          {product.assetUrl ? (
                            <Image
                              src={createMomUrl(product.assetUrl)}
                              alt={product.name}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                              <span className="text-xs">Mom</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Status message area with fixed height to prevent layout shifts */}
                <div className="h-6 mt-2">
                  {updatingSelection && (
                    <p className="text-xs text-muted-foreground">
                      Updating your selection...
                    </p>
                  )}
                  {successMessage && (
                    <p className="text-xs text-green-500 font-medium">
                      ✓ {successMessage}
                    </p>
                  )}
                </div>
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
