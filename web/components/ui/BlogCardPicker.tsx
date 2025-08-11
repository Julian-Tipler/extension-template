import { createClient } from "@/lib/supabase/server";
import { BlogCard } from "./BlogCard";

export enum BlogCardPickerSize {
  SMALL = "small",
  LARGE = "large",
}

export const BlogCardPicker = async ({
  size,
}: {
  size: BlogCardPickerSize;
}) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return (
    <div
      className="w-full grid gap-6"
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${
          size === BlogCardPickerSize.SMALL ? "250px" : "300px"
        }, 1fr))`,
      }}
    >
      {data.map((blogPost, index) => (
        <BlogCard key={index} blogPost={blogPost} />
      ))}
    </div>
  );
};
