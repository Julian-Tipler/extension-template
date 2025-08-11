import ParagraphText from "./text/ParagraphText";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface Subscription {
  id: string;
  planId: string;
  status: string;
  trialEnd?: string | null;
  subscriptionExpiry?: string | null;
  lastPaymentAt: string;
}

export default async function SubscriptionText() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  const userId = data.claims.sub || data.claims.user_id || data.claims.id;
  let subscriptions: Subscription[] = [];
  if (userId) {
    const { data: subsData } = await supabase
      .from("subscriptions")
      .select("id, planId, status, trialEnd, subscriptionExpiry, lastPaymentAt")
      .eq("userId", userId)
      .order("createdAt", { ascending: false });
    subscriptions = subsData || [];
  }
  if (!subscriptions || subscriptions.length === 0) {
    return <ParagraphText>No subscriptions found.</ParagraphText>;
  }
  return (
    <div>
      {subscriptions.map((sub) => (
        <div key={sub.id} style={{ marginBottom: 12 }}>
          <ParagraphText>
            <b>Plan:</b> {sub.planId} <br />
            <b>Status:</b> {sub.status} <br />
            <b>Trial Ends:</b>{" "}
            {sub.trialEnd ? new Date(sub.trialEnd).toLocaleDateString() : "N/A"}{" "}
            <br />
            <b>Expires:</b>{" "}
            {sub.subscriptionExpiry
              ? new Date(sub.subscriptionExpiry).toLocaleDateString()
              : "N/A"}{" "}
            <br />
            <b>Last Payment:</b>{" "}
            {new Date(sub.lastPaymentAt).toLocaleDateString()}
          </ParagraphText>
        </div>
      ))}
    </div>
  );
}
