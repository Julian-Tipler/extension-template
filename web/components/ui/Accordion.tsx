'use client';

import classNames from "classnames";
import { useState } from "react";

export const Accordion = ({
  title,
  body,
  position,
}: {
  title: string;
  body: React.ReactNode;
  position: "top" | "middle" | "bottom" | "single";
}) => {
  const [open, setOpen] = useState(false);
  const headingId = `accordion-collapse-heading-${title}`;
  const bodyId = `accordion-collapse-body-${title}`;

  return (
    <>
      <h2
        id={headingId}
        className="text-lg bg-white rounded-t-xl max-w-[1055px]"
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={classNames(
            "text-start flex items-center justify-between w-full p-3 font-light rtl:text-right text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3",
            {
              "border-b-0": position === "top" || position === "middle",
              "rounded-t-xl": position === "top",
              "border-0 border-b hover:bg-white": position === "single",
              "!text-black": open,
            },
          )}
          data-accordion-target={`#${bodyId}`}
          aria-expanded="true"
          aria-controls={bodyId}
        >
          <span>{title}</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${!open && "rotate-180"} shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={bodyId}
        className={classNames("bg-white max-w-[1055px]", {
          hidden: !open,
        })}
        aria-labelledby={headingId}
      >
        <div
          className={classNames(
            "p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900",
            {
              "p-1 border-0": position === "single",
            },
          )}
        >
          {body}
        </div>
      </div>
    </>
  );
};
