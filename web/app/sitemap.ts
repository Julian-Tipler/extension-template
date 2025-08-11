import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  // Get all blog posts for dynamic sitemap entries
  const supabase = await createClient();
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("slug, updatedDate, publishedDate")
    .order("publishedDate", { ascending: false });

  // Create blog post sitemap entries
  const blogEntries =
    blogPosts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedDate || post.publishedDate || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) || [];

  // Combine static and dynamic entries
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...blogEntries,
  ];
}
