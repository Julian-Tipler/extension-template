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
  const periodEnd = data?.object?.lines?.data?.[0]?.period?.end;
  const subscriptionExpiry = periodEnd
    ? new Date(periodEnd * 1000).toISOString()
    : null;

  // Update the subscription status to 'active', set lastPaymentAt and subscriptionExpiry
  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update({
      status: "active",
      lastPaymentAt: new Date().toISOString(),
      ...(subscriptionExpiry && { subscriptionExpiry }),
    })
    .eq("stripeSubscriptionId", stripeSubscriptionId);

  if (error) {
    console.error("Failed to update subscription status to active:", error);
  } else {
    console.log(`Subscription ${stripeSubscriptionId} set to active.`);
  }
};
