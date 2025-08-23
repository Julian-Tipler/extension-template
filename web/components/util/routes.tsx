import { FiHome, FiPhone } from "react-icons/fi";
// import { GrArticle } from "react-icons/gr";
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
  { name: "Moms", icon: FiHome, href: "/" },
  {
    name: "Contact",
    icon: FiPhone, // Phone/contact related icon
    href: ROUTES.public.contact.path,
  },
  // ...existing code...
];
