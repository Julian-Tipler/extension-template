
import { BRAND_NAME } from "@/lib/siteConfig";
import { BlogCardPicker, BlogCardPickerSize } from "@/components/ui/BlogCardPicker";
import Section from "@/components/ui/layout/Section";
import Spacer from "@/components/ui/Spacer";

const BlogPage = () => {
  return (
    <Section
      variant={'secondary'}
      id="blog"
      className="px-4 md:px-36 pb-24 flex flex-col items-center w-full"
    >
      <Spacer/>
      <p className="font-extrabold text-primary">{BRAND_NAME}</p>
      <h1 className="mb-12 md:mb-32 text-5xl font-bold text-gray-900 dark:text-white leading-tight text-center">
        Articles from our team
      </h1>
      <BlogCardPicker size={BlogCardPickerSize.LARGE} />
    </Section>
  );
};

export default BlogPage;
