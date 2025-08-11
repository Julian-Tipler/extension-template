// JSON-LD Schema for organization
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wise Systems LLC",
  url: "https://wisepilot.io",
  logo: {
    "@type": "ImageObject",
    url: "https://wisepilot.io/logo.png",
    width: "180",
    height: "60",
  },
  description:
    "Wise Systems provides SaaS solutions and starter kits for modern web applications with Next.js and Supabase.",
  sameAs: [
    "https://twitter.com/wisesystems",
    "https://www.linkedin.com/company/wise-systems-llc",
    "https://github.com/Wise-Systems-LLC",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "2002 E Gann Hill Dr",
    addressLocality: "Cedar Park",
    addressRegion: "TX",
    postalCode: "78613",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-123-4567",
    contactType: "customer service",
    email: "support@wisepilot.io",
    availableLanguage: "English",
  },
  foundingDate: "2020-01-01",
  founder: {
    "@type": "Person",
    name: "Wise Systems Team",
  },
};

// JSON-LD Schema for SaaS product
export const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WisePilot",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "SaaS",
  description:
    "A complete Next.js and Supabase starter kit for building modern SaaS applications with authentication, payments, and UI components",
  operatingSystem: "Web browser, iOS, Android",
  offers: {
    "@type": "AggregateOffer",
    highPrice: "99.99",
    lowPrice: "29.99",
    priceCurrency: "USD",
    offerCount: "3",
    offers: [
      {
        "@type": "Offer",
        name: "Basic Plan",
        price: "29.99",
        priceCurrency: "USD",
        description: "Essential features for small projects",
        url: "https://wisepilot.io/plans#basic",
      },
      {
        "@type": "Offer",
        name: "Pro Plan",
        price: "59.99",
        priceCurrency: "USD",
        description: "Advanced features for growing businesses",
        url: "https://wisepilot.io/plans#pro",
      },
      {
        "@type": "Offer",
        name: "Enterprise Plan",
        price: "99.99",
        priceCurrency: "USD",
        description: "Complete solution for large organizations",
        url: "https://wisepilot.io/plans#enterprise",
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "89",
    bestRating: "5",
    worstRating: "1",
  },
  featureList:
    "Authentication, Stripe Payments, UI Components, Blog, Contact Form, FAQ Section",
  screenshot: "https://wisepilot.io/screenshots/dashboard.png",
  downloadUrl: "https://github.com/Wise-Systems-LLC/next-supabase-template",
};

// JSON-LD Schema for breadcrumbs
export const createBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// JSON-LD Schema for FAQs
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is WisePilot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WisePilot is a conversational AI chatbot that helps your website visitors find answers to their questions instantly.",
      },
    },
    {
      "@type": "Question",
      name: "How much does WisePilot cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WisePilot offers multiple pricing tiers starting from $29.99 per month. Visit our pricing page for more details.",
      },
    },
    // Add more questions as needed
  ],
};

// JSON-LD Schema for blog posts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createBlogPostSchema = (post: any) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  image: post.mainImageUrl,
  datePublished: post.publishedDate,
  dateModified: post.updatedDate || post.publishedDate,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://wisepilot.io/blog/${post.slug}`,
  },
  author: {
    "@type": "Person",
    name: post.author || "Wise Systems Team",
    url: post.authorUrl || "https://wisepilot.io/team",
  },
  publisher: {
    "@type": "Organization",
    name: "Wise Systems LLC",
    logo: {
      "@type": "ImageObject",
      url: "https://wisepilot.io/logo.png",
      width: "180",
      height: "60",
    },
  },
  keywords: post.keywords?.join(", ") || "Next.js, Supabase, Web Development",
  articleSection: post.category || "Technology",
  wordCount: post.content ? post.content.split(" ").length : undefined,
  inLanguage: "en-US",
});
