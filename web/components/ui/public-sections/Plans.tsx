import Section, { Variant } from "@/components/ui/layout/Section";

import classNames from "classnames";
import Link from "next/link";
// import { FaArrowDown, FaArrowRight } from "react-icons/fa6";

import { createClient } from "@/lib/supabase/server";
import { PlanCard } from "@/components/ui/PlanCard";
import { WHICH_PLAN_BEST_VALUE } from "@/lib/siteConfig";
// import { ROUTES } from "@/components/util/routes";

export type PlanFeature = {
  description: string;
  check: boolean;
};

export type Plan = {
  id: number;
  price: number;
  stripePriceId: string;
  color: string;
  description: string;
  features: PlanFeature[];
  name: string;
};

export const Plans = async ({ variant = "primary" }: { variant?: Variant }) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("plans")
    .select("*")
    .order("price", { ascending: true });

  const plans: Plan[] = data ? data : [];

  return (
    <Section id="pricing" variant={variant}>
      <div
        className={classNames("flex flex-col items-center px-4 py-24 lg:px-6")}
      >
        <h2 className="mb-4 text-center text-5xl font-normal">Pricing</h2>
        <p className="mb-1 text-lg font-light text-gray-500 dark:text-gray-400">
          Select a plan that matches your company&apos;s needs.
        </p>
        <p className="mb-20 text-lg font-light text-gray-500 dark:text-gray-400">
          If you want a custom solution for your website,{" "}
          <Link className="font-semibold text-blue-700" href="/contact">
            contact us!
          </Link>
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {plans.map((plan, i) => (
            <li key={plan.name}>
              <PlanCard
                price={plan.price}
                stripePriceId={plan.stripePriceId}
                color={plan.color}
                description={plan.description}
                features={plan.features}
                name={plan.name}
                bestValue={i === WHICH_PLAN_BEST_VALUE} // Example: mark the second plan as best value
              ></PlanCard>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
