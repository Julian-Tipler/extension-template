import Section, { Variant } from "../layout/Section";
import MomPurchaser from "../MomPurchaser";

export const MomPurchaserSection = ({
  variant = "primary",
}: {
  variant?: Variant;
}) => {
  return (
    <Section id="mom-purchaser" variant={variant}>
      <div className="mx-auto flex max-w-screen-xl flex-col gap-16 overflow-hidden px-4 py-12 lg:px-6">
        <MomPurchaser />
      </div>
    </Section>
  );
};
