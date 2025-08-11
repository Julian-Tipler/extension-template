import Link from "next/link";

import { LinkItem } from "../LinkItem";
import { MobileMenuButton } from "./MobileMenu";
import { AuthButtons } from "../../auth/auth-buttons";
import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "../../auth/env-var-warning";
import { BRAND_NAME } from "@/lib/siteConfig";
import { LINK_ITEMS } from "../../util/routes";
import { IconColor } from "../icons/IconColor";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-10 ">
      <a
        href="#main-content"
        className="flex items-center justify-center sr-only focus:not-sr-only absolute top-0 left-0 right-0 bg-blue-600 text-white p-2 focus:outline-dotted outline-2 outline-offset-[-2px] outline-white"
      >
        Skip to main content
      </a>
      <nav className="bg-white border-primary-border px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b z-50">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link
            href={"/"}
            className="flex items-center gap-3"
            aria-label="Home"
          >
            <IconColor size="36" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {BRAND_NAME}
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <div>{!hasEnvVars ? <EnvVarWarning /> : <AuthButtons />}</div>
            <MobileMenuButton />
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex wrap-col mt-4 font-normal lg:flex-row lg:space-x-8 lg:mt-0">
              {LINK_ITEMS.map((item, i) => (
                <LinkItem key={`link-item-${i}`} {...item} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
