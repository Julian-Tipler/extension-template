import Section, { Variant } from "../layout/Section";
import ParagraphText from "../text/ParagraphText";
import SubTitle from "../text/SubTitle";
import { UseCaseText } from "../UseCaseText";
import { FEATURE_TAGLINE, FEATURES } from "@/lib/siteConfig";

export const Features = ({ variant = "primary" }: { variant?: Variant }) => {
  return (
    <Section id="features" variant={variant}>
      <div className="mx-auto flex max-w-screen-xl flex-col gap-16 overflow-hidden px-4 py-24 lg:px-6 lg:py-28">
        <div className="h-[348px] md:h-auto">
          <h2
            className="mb-4 text-5xl font-normal leading-tight text-gray-900 dark:text-white"
            aria-live="polite"
          >
            <span>
              Achieve more <UseCaseText />
            </span>
          </h2>
          <p className="font-light text-gray-600 dark:text-gray-400 sm:text-lg">
            {FEATURE_TAGLINE}
          </p>
        </div>
        <div>
          <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div key={feature.title}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full text-primary lg:h-12 lg:w-12">
                  <feature.icon size={"42"} />
                </div>
                <SubTitle>{feature.title}</SubTitle>
                <ParagraphText>{feature.description}</ParagraphText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
