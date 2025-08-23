import { NextRequest, NextResponse } from "next/server";
// import { stripe } from "@/lib/stripeClient";
import { checkoutSessionCompleted } from "./handlers/checkoutSessionCompleted";
import { customerSubscriptionDeleted } from "./handlers/customerSubscriptionDeleted";
import { invoicePaymentFailed } from "./handlers/invoicePaymentFailed";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  console.log("Received Stripe webhook request");
  let event: Stripe.Event;

  try {
    const stripeSignature = (await headers()).get("stripe-signature");

    event = stripe.webhooks.constructEvent(
      await req.text(),
      stripeSignature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  const { type, data } = event;

  switch (type) {
    case "checkout.session.completed":
      // Create new subscription row
      await checkoutSessionCompleted(data);
      break;
    // case "invoice.payment_succeeded":
    //   await checkoutSessionCompleted(data);
    //   break;
    case "customer.subscription.deleted":
      await customerSubscriptionDeleted(data);
      break;
    case "invoice.payment_failed":
      await invoicePaymentFailed(data);
      break;
    default:
      console.warn("Unhandled event type:", type);
  }

  return NextResponse.json({ received: true, type, data }, { status: 200 });
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
