"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { LINK_ITEMS, LinkItemProps } from "@/components/util/routes";
import { CloseIcon } from "../CloseIcon";

export const MobileMenuButton = ({}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const body = document.body;
      if (isMobileMenuOpen) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
    }
  }, [isMobileMenuOpen]);
  return (
    <>
      <button
        data-collapse-toggle="mobile-menu-2"
        type="button"
        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="mobile-menu-2"
        aria-expanded="false"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="sr-only">Open main menu</span>
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        <svg
          className="hidden w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {isMobileMenuOpen && (
        <MobileMenu
          items={LINK_ITEMS}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        >
          {/* Auth Buttons can be placed here if needed */}
        </MobileMenu>
      )}
    </>
  );
};

export const MobileMenu = ({
  items,
  children,
  setIsMobileMenuOpen,
}: {
  items: LinkItemProps[];
  children?: React.ReactNode;
  setIsMobileMenuOpen: (value: boolean) => void;
}) => {
  useEffect(() => {
    const queryItems = document.querySelectorAll(".mobile-menu-item");

    queryItems.forEach((item, index) => {
      (item as HTMLElement).style.animation =
        `fade-in-up .1s ease-out ${index * 0.02}s forwards`;
    });
  }, []);

  return (
    <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-20 lg:hidden h-screen">
      <ul className="px-4">
        {items.map((item, i) => (
          <li
            key={`link-item-${i}`}
            className="mobile-menu-item"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <a
              href={item.href}
              className="block py-4 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      {children && (
        <div className="flex w-full mt-10 items-end justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
