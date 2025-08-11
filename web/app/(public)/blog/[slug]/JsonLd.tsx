import { createBlogPostSchema, createBreadcrumbSchema } from "@/lib/schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BlogPostJsonLd({ post }: { post: any }) {
  // Blog post schema
  const blogPostSchema = createBlogPostSchema(post);

  // Create breadcrumb for blog post
  const breadcrumbItems = [
    { name: "Home", url: "https://wisepilot.io/" },
    { name: "Blog", url: "https://wisepilot.io/blog" },
    { name: post.title, url: `https://wisepilot.io/blog/${post.slug}` },
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
