import { ReactNode } from "react";
import Section, { Variant } from "../layout/Section";
import {
  BRAND_NAME,
  IMAGE_ONE_URL,
  IMAGE_TWO_URL,
} from "@/lib/siteConfig";
import Image from "next/image";

export const CustomSolution = ({
  children,
  variant = "primary",
}: {
  children?: ReactNode;
  variant?: Variant;
}) => {
  return (
    <>
      <Section id="custom" variant={variant}>
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-28 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 lg:order-last">
            <h2 className="mb-4 text-5xl font-normal text-gray-900 dark:text-white">
              Need a custom solution?
            </h2>
            <p className="mb-4 font-light">
              Wise systems builds custom products including AI solutions to
              match your needs. If you like {BRAND_NAME}, our skilled engineers
              can create a tailored solution for you.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 lg:order-first">
            <Image
              className="w-full rounded-lg"
              src={IMAGE_ONE_URL}
              alt="Chatbot engineers"
              loading="lazy"
              width={600}
              height={400}
            />
            <Image
              className="mt-4 w-full h-full rounded-lg lg:mt-10"
              src={IMAGE_TWO_URL}
              alt="Chatbot engineers 2"
              loading="lazy"
              width={600}
              height={400}
            />
          </div>
        </div>
      </Section>
      {children}
    </>
  );
};
