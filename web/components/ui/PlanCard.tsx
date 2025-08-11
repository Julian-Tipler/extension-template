import React from "react";
import { Check } from "./icons/Check";
import { X } from "./icons/X";
import { centsToDollars } from "@/lib/priceConverter";
import { PlanFeature } from "./public-sections/Plans";
import { StripeCheckoutButton } from "./StripeCheckoutButton";
import Spacer from "./Spacer";
import { BEST_VALUE_TEXT, BOTTOM_PRICING_TEXT } from "@/lib/siteConfig";

interface PlanCard {
  price: number;
  stripePriceId: string;
  color: string;
  description: string;
  features: PlanFeature[];
  name: string;
  bestValue?: boolean; // Optional prop to indicate if this is the best value plan
}

export const PlanCard: React.FC<PlanCard> = ({
  price,
  stripePriceId,
  color,
  description,
  features,
  name,
  bestValue = false, // Default to false if not provided
}) => {
  return (
    <div className="relative flex flex-col items-center">
      {" "}
      {/* Container for the border/best value text */}
      {bestValue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black font-semibold text-xs px-3 py-1 rounded-full shadow z-10 text-white">
          {BEST_VALUE_TEXT}
        </div>
      )}
      <div
        className={`bg-white rounded-2xl shadow-lg min-w-96 max-w-md flex flex-col items-center relative overflow-hidden ${
          bestValue ? "border-4 border-primary" : ""
        }`}
      >
        {/* Header at the very top */}
        <div
          className="w-full py-4 flex justify-center items-center overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-lg font-bold text-white m-0">{name}</h2>
        </div>
        {/* Card content with padding */}
        <div className="p-8 flex flex-col items-center w-full">
          <Spacer size="small" />
          <div className="flex items-baseline mb-4">
            {(() => {
              const [dollars, cents] = centsToDollars(price, true).split(".");
              return (
                <span className="text-5xl font-extrabold text-black flex items-start">
                  ${dollars}
                  <span className="text-xl align-top ml-1 relative">
                    {cents}
                  </span>
                </span>
              );
            })()}
            <span className="ml-2 text-sm text-neutral-400 font-medium">
              USD
            </span>
          </div>
          <p className="text-neutral-300 mb-6 text-center">{description}</p>
          <ul className="mb-8 w-full">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className={`flex items-center mb-3 text-md ${
                  feature.check ? "text-black" : "text-neutral-500 line-through"
                }`}
              >
                {feature.check ? (
                  <Check className="w-5 h-5 mr-2 text-green-400" />
                ) : (
                  <X className="w-5 h-5 mr-2 text-neutral-600" />
                )}
                {feature.description}
              </li>
            ))}
          </ul>
          <StripeCheckoutButton stripePriceId={stripePriceId} />
          <p className="mt-4 text-neutral-400 text-sm text-center">
            {BOTTOM_PRICING_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
};
