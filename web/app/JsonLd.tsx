import { organizationSchema, productSchema } from "@/lib/schema";

// Create a WebPage schema for the homepage
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://wisepilot.io/#webpage",
  url: "https://wisepilot.io/",
  name: "Wise Systems | Next.js and Supabase SaaS Starter Kit",
  description:
    "Build powerful SaaS applications with our Next.js and Supabase starter kit. Ready-to-use authentication, payments, and UI components.",
  isPartOf: {
    "@id": "https://wisepilot.io/#website",
  },
  datePublished: "2023-01-01T00:00:00+00:00",
  dateModified: new Date().toISOString(),
  breadcrumb: {
    "@id": "https://wisepilot.io/#breadcrumb",
  },
};

// Add Website schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://wisepilot.io/#website",
  url: "https://wisepilot.io/",
  name: "Wise Systems",
  description: "Next.js and Supabase SaaS Starter Kit",
  publisher: {
    "@id": "https://wisepilot.io/#organization",
  },
};

export default function RootJsonLd() {
  // Combine all schemas with proper @id references
  const enhancedOrgSchema = {
    ...organizationSchema,
    "@id": "https://wisepilot.io/#organization",
  };

  const allSchemas = [
    enhancedOrgSchema,
    websiteSchema,
    webPageSchema,
    productSchema,
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
