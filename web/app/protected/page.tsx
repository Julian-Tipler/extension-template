import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import SubTitle from "@/components/ui/text/SubTitle";
import ParagraphText from "@/components/ui/text/ParagraphText";
import Section from "@/components/ui/layout/Section";
import SubscriptionText from "@/components/ui/SubscriptionText";

export default async function UserInfo() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <Section
      id="protected-user-info"
      variant="primary"
      className="relative overflow-hidden"
    >
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-40 px-4 py-24 md:px-24 lg:grid-cols-2 lg:px-6 lg:py-28">
        <div className="flex flex-col items-center justify-center text-center font-light sm:text-lg lg:items-start lg:text-start">
          <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center mb-6">
            <InfoIcon size="16" strokeWidth={2} />
            You are logged in
          </div>
          <h2 className="font-bold text-2xl mb-4">Your information:</h2>
          <div className="flex flex-col gap-2 items-start w-full max-w-md mx-auto lg:mx-0">
            <SubTitle>Email:</SubTitle>
            <ParagraphText>{data.claims.email}</ParagraphText>
            <SubTitle>Subscriptions:</SubTitle>
            <SubscriptionText />
          </div>
        </div>
        {/* You can add a visual or illustration here for the second column, or leave it empty for now */}
        <div className="hidden lg:block"></div>
      </div>
    </Section>
  );
}
