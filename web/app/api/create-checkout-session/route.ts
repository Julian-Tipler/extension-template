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

    // Fetch the product from the database to get the stripePriceId
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("stripePriceId")
      .eq("id", productId)
      .single();

    if (productError || !product) {
      console.error("Error fetching product:", productError);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const stripePriceId = product.stripePriceId;

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
