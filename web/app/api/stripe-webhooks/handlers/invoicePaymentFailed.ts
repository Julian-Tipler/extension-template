import { supabaseAdmin } from "@/lib/supabase/admin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const invoicePaymentFailed = async (data: any) => {
  try {
    console.error("invoicePayment failed", data);

    const { subscription } = data.object;

    // Disable the subscription if payment fails
    const { error } = await supabaseAdmin
      .from("subscriptions")
      .update({ active: false })
      .eq("stripeSubscriptionId", subscription)
      .select("*")
      .single();

    if (error) {
      console.error("subscription doesn't exist", error);
      throw new Error("Subscription doesn't exist");
    }
    return { received: true };
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};
