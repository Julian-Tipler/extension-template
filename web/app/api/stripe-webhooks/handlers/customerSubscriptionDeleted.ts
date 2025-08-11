import { supabaseAdmin } from "@/lib/supabase/admin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const customerSubscriptionDeleted = async (data: any) => {
  try {
    console.warn("customerSubscriptionDeleted", data);
    const subscriptionId = data.object.id;

    // Inactivate the subscription if the user deletes their subscription
    const { error } = await supabaseAdmin
      .from("subscriptions")
      .update({ active: false })
      .eq("stripeSubscriptionId", subscriptionId)
      .order("createdAt", { ascending: false })
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
