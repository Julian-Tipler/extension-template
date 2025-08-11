import { supabaseAdmin } from "@/lib/supabase/admin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkoutSessionCompleted = async (data: any) => {
  let subscriptionId = null;

  try {
    const userId = data?.object?.metadata.user_id;
    if (!userId) {
      throw new Error("No user ID found in session data");
    }
    console.info("checkoutSessionCompleted for user:", userId);

    // Fetch user from public.users
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user", userError);
      throw new Error("Error fetching user");
    }

    // Fetch plan from public.plans
    const { data: plan, error: planError } = await supabaseAdmin
      .from("plans")
      .select("*")
      .eq("stripePriceId", data.object.metadata.stripePriceId)
      .single();

    if (planError) {
      console.error("Error fetching plan", planError);
      throw new Error("Error fetching plan");
    }

    // Create a new subscription
    const { data: newSubscription, error: subscriptionError } =
      await supabaseAdmin
        .from("subscriptions")
        .insert({
          userId: user.id, // link subscription to this user
          planId: plan.id,
          stripeSubscriptionId: data.object.subscription,
          status: "unpaid", // Set initial status to unpaid
          lastPaymentAt: null,
        })
        .select("id")
        .single();

    subscriptionId = newSubscription?.id;

    if (subscriptionError) {
      console.error("Issue creating subscription", subscriptionError);
      throw new Error("Issue creating subscription");
    }
    console.log("New Subscription", newSubscription);

    // TODO: Send thank-you email to the user here
    // Example:
    // await sendThankYouEmail(user.email, plan.name);

    return { received: true };
  } catch (error) {
    if (subscriptionId) {
      await supabaseAdmin
        .from("subscriptions")
        .delete()
        .eq("id", subscriptionId);
    }
    console.error("error:", error);
    throw error;
  }
};

// const returnEmail = (customerName: string, session: { id: string }) => {
//   return `
//     <h1>Thank you for your order, ${customerName}!</h1>
//     <p>Your payment was successful. We'll process your order shortly.</p>
//     <p>Order ID: ${session.id}</p>
//   `;
// };
