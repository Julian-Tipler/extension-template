"use client";
import React from "react";
import { BRAND_NAME } from "@/lib/siteConfig";
import { useModal } from "@/app/context/ModalContext";

export const GoToPlansButton = () => {
  const { showModal } = useModal();
  return (
    <button
      onClick={async () => {
        showModal("sign up", `/protected/plans`);
        // await createStripeSession(stripePriceId); TODO future
      }}
      className="w-full py-3 rounded-xl font-semibold text-lg flex items-center justify-center bg-primary text-white"
    >
      {/* <IconColor className="mx-2" />  */}
      Get {BRAND_NAME}
    </button>
  );
};
