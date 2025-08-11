import { IconType } from "react-icons";
import Link from "next/link";

type LinkItemProps = {
  name: string;
  icon?: IconType;
  href: string;
  isExternal?: boolean;
  itemProp?: string;
  ariaLabel?: string;
  title?: string;
};

export const LinkItem = ({
  name,
  icon: Icon,
  href,
  isExternal = false,
  itemProp,
  ariaLabel,
  title,
}: LinkItemProps) => {
  // Set appropriate attributes for external links
  const relAttribute = isExternal ? "noopener noreferrer" : undefined;
  const targetAttribute = isExternal ? "_blank" : undefined;

  // Use Next.js Link for internal links, regular anchor for external
  const LinkComponent = isExternal ? "a" : Link;

  return (
    <li itemScope itemProp={itemProp}>
      <LinkComponent
        {...(isExternal ? { href } : { href })}
        className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
        rel={relAttribute}
        target={targetAttribute}
        aria-label={ariaLabel || name}
        title={title || name}
      >
        <span className="flex items-center">
          {Icon && <Icon className="mr-2" />}
          {name}
        </span>
      </LinkComponent>
    </li>
  );
};
