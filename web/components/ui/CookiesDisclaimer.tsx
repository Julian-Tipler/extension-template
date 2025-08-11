"use client";

import { useEffect, useState } from "react";
import { ROUTES } from "../util/routes";
import { Button } from "./Button";

export const CookiesDisclaimer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Check if the user has already given consent
    const consent = localStorage.getItem("cookiesConsent");

    if (!consent) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesConsent", "true");
    setShowDisclaimer(false);
  };

  if (!showDisclaimer) return null;

  return (
    <div
      className="fixed flex flex-col bottom-4 left-4 right-4 md:w-96 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-7 items-start rounded-md shadow-2xl gap-6 z-10"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white leading-tight">
          We Use Cookies
        </h2>
        <p className="font-light text-gray-500 dark:text-gray-400 text-sm">
          We use only essential cookies to enable basic site functions, such as
          secure login. These cookies do not store any personally identifiable
          information.
        </p>
        <p className="font-light text-gray-500 dark:text-gray-400 text-sm">
          For further privacy information please review our{" "}
          <a
            className="text-blue-600"
            href={`${window.location.origin}${ROUTES.public.privacyPolicy.path}`}
          >
            Privacy Policy
          </a>
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleAccept}
          aria-label="Accept cookies and close this message"
        >
          Got it!
        </Button>
      </div>
    </div>
  );
};
