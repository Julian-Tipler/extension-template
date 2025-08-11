import React from "react";
import Section, { Variant } from "../layout/Section";
import { TitleText } from "../text/TitleText";
import Spacer from "../Spacer";
import { CALL_TO_ACTION, CALL_TO_ACTION_DESCRIPTION } from "@/lib/siteConfig";
import { GoToPlansButton } from "../GoToPlansButton";

export const CallToAction = ({
  variant = "primary",
}: {
  variant?: Variant;
}) => {
  return (
    <Section id="call-to-action" variant={variant}>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <TitleText>{CALL_TO_ACTION}</TitleText>
          <p className="mb-2 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            {CALL_TO_ACTION_DESCRIPTION}
          </p>
          <Spacer size="large" />
          <GoToPlansButton />
        </div>
      </div>
    </Section>
  );
};
