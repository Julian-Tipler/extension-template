"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useModal } from "@/app/context/ModalContext";
import Spacer from "../ui/Spacer";
import { IconColor } from "../ui/icons/IconColor";

// Function to assign free products to users
async function assignFreeProductsToUser(userId: string) {
  const supabase = createClient();

  // 1. Get all free products
  const { data: freeProducts, error: productsError } = await supabase
    .from("products")
    .select("id")
    .eq("price", 0);

  if (productsError || !freeProducts?.length) return;

  // 2. Check if user already has these products
  const { data: existingPurchases } = await supabase
    .from("purchases")
    .select("productId")
    .eq("userId", userId);

  const existingProductIds = existingPurchases?.map((p) => p.productId) || [];

  // 3. Create purchase records for products the user doesn't already have
  const newPurchases = freeProducts
    .filter((product) => !existingProductIds.includes(product.id))
    .map((product) => ({
      userId,
      productId: product.id,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

  if (newPurchases.length) {
    await supabase.from("purchases").insert(newPurchases);
  }
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { showModal, closeModal, redirectLink } = useModal();
  console.log("Redirect Link:", redirectLink);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}`,
        },
      });
      if (error) throw error;

      // Assign free products to new user
      if (data?.user) {
        await assignFreeProductsToUser(data.user.id);
      }

      closeModal();
      router.push(redirectLink || "/protected/settings/account");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="p-6">
        <CardHeader>
          <IconColor size="36" />
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                id="repeat-password"
                type="password"
                placeholder="Repeat Password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Spacer size="medium" />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating an account..." : "Sign up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <span
                onClick={() => showModal("sign in", redirectLink)}
                className="underline underline-offset-4 cursor-pointer font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") showModal("sign in");
                }}
              >
                Login
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
