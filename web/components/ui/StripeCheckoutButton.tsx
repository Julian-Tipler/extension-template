"use client";
import React from "react";
import { BRAND_NAME } from "@/lib/siteConfig";
import { useModal } from "@/app/context/ModalContext";
import { useAuth } from "@/app/context/AuthProvider";

interface StripeCheckoutButtonProps {
  stripePriceId: string;
}

export const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({
  stripePriceId,
}) => {
  const redirectLink = `/protected/checkout-start?stripePriceId=${stripePriceId}`;
  const { showModal } = useModal();
  const { session, loading } = useAuth();
  return (
    <button
      onClick={async () => {
        if (loading) return;
        if (!session) {
          showModal("sign up", redirectLink);
        } else {
          window.location.href = redirectLink;
        }
      }}
      className="w-full py-3 rounded-xl font-semibold text-lg flex items-center justify-center bg-primary text-white"
    >
      {/* <IconColor className="mx-2" />  */}
      Get {BRAND_NAME}
    </button>
  );
};
