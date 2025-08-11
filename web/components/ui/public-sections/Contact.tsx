import React from "react";
import Section, { Variant } from "../layout/Section";
import { SERVICE, SUPPORT_EMAIL } from "@/lib/siteConfig";
import { ContactForm } from "../ContactForm";

export const Contact = ({ variant = "primary" }: { variant?: Variant }) => {
  return (
    <Section id="contact" variant={variant}>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl font-normal leading-tight text-gray-900 dark:text-white">
            Give us feedback here!
          </h2>
          <p className="mb-2 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            We&apos;re here to help you get started with {SERVICE}. Our team of
            engineers is ready to answer your questions and help you get
            started.
          </p>
          <p className="mb-10 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            Use the form below to send us a message or email us at{" "}
            <a
              className="font-semibold text-blue-700"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
};
