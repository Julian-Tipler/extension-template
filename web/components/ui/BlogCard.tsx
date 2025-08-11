import Image from "next/image";
import Link from "next/link";

type BlogPost = {
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const BlogCard = ({ blogPost }: { blogPost: BlogPost }) => {
  const { slug, title, author, mainImageUrl, description, createdAt } =
    blogPost;

  const parsedCreatedAt = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden bg-white hover:shadow-sm transition-shadow duration-100 max-w-sm"
    >
      <Image
        className="w-full h-52 object-cover"
        src={mainImageUrl}
        alt={title}
      />
      <div className="py-4">
        <div className="text-sm text-gray-500 mb-1 font-light">
          <span>{author}</span> &bull; <span>{parsedCreatedAt}</span>
        </div>
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <p className="text-gray-500 text-base">{description}</p>
      </div>
    </Link>
  );
};
