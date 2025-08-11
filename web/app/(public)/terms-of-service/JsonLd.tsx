import { createBreadcrumbSchema } from "@/lib/schema";

export default function TermsOfServiceJsonLd() {
  // Create breadcrumb for terms of service
  const breadcrumbItems = [
    { name: "Home", url: "https://wisepilot.io/" },
    { name: "Terms of Service", url: "https://wisepilot.io/terms-of-service" },
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);

  // WebPage specific schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://wisepilot.io/terms-of-service/#webpage",
    url: "https://wisepilot.io/terms-of-service/",
    name: "Terms of Service - Wise Systems",
    description:
      "Terms and conditions for using Wise Systems products and services.",
    datePublished: "2024-08-21T00:00:00Z",
    dateModified: "2024-08-21T00:00:00Z",
    isPartOf: {
      "@id": "https://wisepilot.io/#website",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}
