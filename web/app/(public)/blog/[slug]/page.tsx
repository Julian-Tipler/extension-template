import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { CTABubble } from "@/components/ui/CTABubble";
import { createClient } from "@/lib/supabase/server";
import { ArticleMarkdown } from "@/components/ui/ArticleMarkdown";
import {
  BlogCardPicker,
  BlogCardPickerSize,
} from "@/components/ui/BlogCardPicker";
import Image from "next/image";
import type { Metadata } from "next";
import BlogPostJsonLd from "./JsonLd";

// Next.js 13+ dynamic route page signature
type PageProps = {
  params: Promise<{ slug: string }>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const supabase = await createClient();
  const slug = params.slug;

  const { data: blogPost } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blogPost) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: blogPost.title,
    description: blogPost.description,
    alternates: {
      canonical: `/blog/${blogPost.slug}`,
    },
    openGraph: {
      title: blogPost.title,
      description: blogPost.description,
      type: "article",
      publishedTime: blogPost.publishedDate,
      modifiedTime: blogPost.updatedDate || blogPost.publishedDate,
      authors: [blogPost.author || "Wise Systems Team"],
      images: [
        {
          url: blogPost.mainImageUrl || "/opengraph-image.png",
          width: 800,
          height: 600,
          alt: blogPost.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const supabase = await createClient();

  const { slug } = await params;
  const { data: blogPost, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !blogPost) {
    return <div className="p-8 text-center">Blog post not found.</div>;
  }

  return (
    <>
      <BlogPostJsonLd post={blogPost} />
      <div className="mt-16 min-h-screen p-4">
        <div className="back-container mx-auto flex w-full max-w-screen-xl justify-start text-sm font-bold">
          <Link href="../" className="flex items-center gap-1">
            <FaArrowLeft />
            Back
          </Link>
        </div>
        <div className="content-container flex w-full flex-col items-center gap-20 md:gap-14">
          <div className="article-container w-full max-w-2xl">
            <h1 className="mb-2 text-center text-4xl font-bold">
              {blogPost.title}
            </h1>
            <p className="mb-4 text-center text-base text-gray-500">
              {blogPost.description}
            </p>
            {blogPost.mainImageUrl && (
              <Image
                className="my-8 h-48 w-full object-cover sm:h-64 lg:h-96"
                src={blogPost.mainImageUrl}
                alt={blogPost.title}
                width={800}
                height={600}
              />
            )}
            <ArticleMarkdown content={blogPost.content} />
          </div>
          <CTABubble />
          <div className="w-full max-w-4xl md:p-8 lg:p-8">
            <BlogCardPicker size={BlogCardPickerSize.SMALL} />
          </div>
        </div>
      </div>
    </>
  );
}
