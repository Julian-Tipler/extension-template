import { supabaseAdmin } from "@/lib/supabase/admin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const invoicePaymentSucceeded = async (data: any) => {
  // Stripe subscription ID from the event
  const stripeSubscriptionId = data?.object?.subscription;
  if (!stripeSubscriptionId) {
    console.error("No Stripe subscription ID found in invoice data");
    return;
  }

  // Get the period end from the invoice (in seconds, convert to ms)
  // const periodEnd = data?.object?.lines?.data?.[0]?.period?.end;

  // Update the subscription status to 'active', set lastPaymentAt and subscriptionExpiry
  const { error } = await supabaseAdmin
    .from("purchases")
    .update({
      status: "active",
    })
    .eq("stripeSubscriptionId", stripeSubscriptionId);

  if (error) {
    console.error("Failed to update subscription status to active:", error);
  } else {
    console.log(`Subscription ${stripeSubscriptionId} set to active.`);
  }
};
