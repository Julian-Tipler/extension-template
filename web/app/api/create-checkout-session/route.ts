import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripeClient";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    // Validate input
    if (!productId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    const id = user.data.user?.id;
    const email = user.data.user?.email;

    if (!id || !email) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    let stripePriceId: string;

    // if "random" id is used, use the environment variable for the price ID
    if (productId === process.env.NEXT_PUBLIC_RANDOM_MOM_ID) {
      // First, check if the user already owns all the moms
      const { data: allProducts, error: productsError } = await supabase
        .from("products")
        .select("id")
        .eq("active", true);
      console.log("allProducts", allProducts);

      if (productsError) {
        console.error("Error fetching products:", productsError);
        return NextResponse.json(
          { error: "Failed to check product ownership" },
          { status: 500 }
        );
      }

      const { data: userPurchases, error: purchasesError } = await supabase
        .from("purchases")
        .select("productId")
        .eq("userId", id);

      if (purchasesError) {
        console.error("Error fetching user purchases:", purchasesError);
        return NextResponse.json(
          { error: "Failed to check product ownership" },
          { status: 500 }
        );
      }

      // Create a Set of purchased product IDs for faster lookups
      const purchasedProductIds = new Set(
        userPurchases?.map((p) => p.productId) || []
      );
      console.log("Purchased Product IDs:", purchasedProductIds);
      // Check if user has purchased all available products
      const allProductsOwned = allProducts?.every((product) =>
        purchasedProductIds.has(product.id)
      );
      console.log("All Products Owned:", allProductsOwned);

      if (allProductsOwned) {
        return NextResponse.json({
          success: true,
          alreadyOwnsAllMoms: true,
        });
      }

      // If not all products are owned, continue with random mom selection
      const priceIdEnv = process.env.NEXT_PUBLIC_RANDOM_MOM_STRIPE_PRICE_ID;
      if (!priceIdEnv) {
        return NextResponse.json(
          { error: "Missing Stripe price ID configuration" },
          { status: 500 }
        );
      }
      stripePriceId = priceIdEnv;
    } else {
      // Normal product flow
      const { data: product, error } = await supabase
        .from("products")
        .select("price, stripePriceId")
        .eq("id", productId)
        .single();

      if (error || !product) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      if (product?.price === 0) {
        return NextResponse.json({
          success: true,
          isFreeProduct: true,
        });
      }

      // Check if the user already owns this product
      const { data: purchases } = await supabase
        .from("purchases")
        .select("id")
        .eq("userId", id)
        .eq("productId", productId)
        .single();

      // If user already owns this product, return with alreadyOwnsProduct flag
      if (purchases && purchases.id) {
        return NextResponse.json({
          success: true,
          alreadyOwnsProduct: true,
        });
      }

      stripePriceId = product?.stripePriceId || "";
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripePriceId, // Use the stripePriceId fetched from the product
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/payment/success`,
      cancel_url: `${request.headers.get("origin")}/payment/cancel`,
      metadata: {
        stripePriceId,
        productId,
        user_id: id,
        email: email,
      },
    });

    return NextResponse.json({ session: session });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
