import { Hero } from "@/components/ui/public-sections/Hero";
import { Features } from "@/components/ui/public-sections/Features";
import { CustomSolution } from "@/components/ui/public-sections/CustomSolution";
import { Contact } from "@/components/ui/public-sections/Contact";
import { CallToAction } from "@/components/ui/public-sections/CallToAction";
import { DESCRIPTION_OF_HOMEPAGE_CONTENT } from "@/lib/siteConfig";
import type { Metadata } from "next";
import SecretMoms from "@/components/ui/public-sections/SecretMoms";

export const metadata: Metadata = {
  title: "Wise Systems | AI-Powered Solutions",
  description: DESCRIPTION_OF_HOMEPAGE_CONTENT,
  alternates: {
    canonical: "/",
  },
};

export default function Public() {
  return (
    <>
      <Hero variant="primary" />
      <Features variant="secondary" />
      <SecretMoms />
      <Contact variant="secondary" />
      <CustomSolution variant="primary" />
      <CallToAction variant="secondary" />
    </>
  );
}
