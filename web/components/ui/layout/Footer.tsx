import { ROUTES } from "@/components/util/routes";
import { IconColor } from "../icons/IconColor";

export const Footer = () => {
  return (
    <footer className="justify-self-start py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-8xl">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <IconColor size="32" />
          <span className="block font-normal text-center text-gray-600 dark:text-gray-400">
            © Wise Systems LLC
          </span>
          <a
            href={ROUTES.public.privacyPolicy.path}
            target="_blank"
            rel="noreferrer"
            className="block font-normal text-center text-primary underline"
          >
            Privacy Policy
          </a>
          <a
            href={ROUTES.public.termsOfService.path}
            target="_blank"
            rel="noreferrer"
            className="block font-normal text-center text-primary underline"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
