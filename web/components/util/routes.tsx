import { FiHelpCircle, FiHome, FiPhone, FiTool } from "react-icons/fi";
import { GrArticle } from "react-icons/gr";
import { IconType } from "react-icons";

export const ROUTES = {
  auth: {},
  protected: {},
  public: {
    home: {
      path: "/",
    },
    privacyPolicy: {
      path: "/privacy-policy",
    },
    termsOfService: {
      path: "/terms-of-service",
    },
    customSolution: {
      path: "/custom-solution",
    },
    contact: {
      path: "/contact",
    },
    faq: {
      path: "/faq",
    },
    blog: {
      path: "/blog",
    },
    about: {
      path: "/about",
    },
    // publicDemo: {
    //   path: "/public-demo",
    // },
    // pricing: {
    //   path: "/pricing",
    // },
  },
};

export type LinkItemProps = {
  name: string;
  icon: IconType;
  href: string;
};

export const LINK_ITEMS: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/" },
  {
    name: "Custom Solutions",
    icon: FiTool, // Custom/solutions related icon
    href: ROUTES.public.contact.path,
  },
  {
    name: "Contact",
    icon: FiPhone, // Phone/contact related icon
    href: ROUTES.public.contact.path,
  },
  {
    name: "FAQ",
    icon: FiHelpCircle, // Question/help related icon
    href: ROUTES.public.faq.path,
  },
  { name: "Blog", icon: GrArticle, href: ROUTES.public.blog.path },
  // ...existing code...
];
