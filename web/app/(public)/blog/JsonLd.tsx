import { createBreadcrumbSchema } from "@/lib/schema";

export default function BlogListJsonLd() {
  // Create breadcrumb list for blog index page
  const breadcrumbItems = [
    { name: "Home", url: "https://wisepilot.io/" },
    { name: "Blog", url: "https://wisepilot.io/blog" },
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);

  // Blog index page specific schema
  const blogIndexSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://wisepilot.io/blog/#blog",
    name: "Wise Systems Blog",
    description:
      "Articles and tutorials about Next.js, Supabase, and modern web development",
    url: "https://wisepilot.io/blog",
    publisher: {
      "@type": "Organization",
      "@id": "https://wisepilot.io/#organization",
      name: "Wise Systems LLC",
      logo: {
        "@type": "ImageObject",
        url: "https://wisepilot.io/logo.png",
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
      />
    </>
  );
}
