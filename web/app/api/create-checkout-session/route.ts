import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripeClient";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { stripePriceId } = await request.json();

    // Validate input
    if (!stripePriceId) {
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripePriceId, // Assuming stripePriceId is a valid Stripe price ID
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${request.headers.get("origin")}/payment/success`,
      cancel_url: `${request.headers.get("origin")}/payment/cancel`,
      metadata: {
        stripePriceId,
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
