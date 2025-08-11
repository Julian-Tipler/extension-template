import { createBreadcrumbSchema } from "@/lib/schema";

export default function PrivacyPolicyJsonLd() {
  // Create breadcrumb list for privacy policy
  const breadcrumbItems = [
    { name: "Home", url: "https://wisepilot.io/" },
    { name: "Privacy Policy", url: "https://wisepilot.io/privacy-policy" },
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);

  // WebPage specific schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://wisepilot.io/privacy-policy/#webpage",
    url: "https://wisepilot.io/privacy-policy/",
    name: "Privacy Policy - Wise Systems",
    description:
      "Our privacy policy explains how we collect, use, and protect your personal data when using our services.",
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
