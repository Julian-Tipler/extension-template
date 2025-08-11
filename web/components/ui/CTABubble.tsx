"use client";

import Link from "next/link";
import { useModal } from "@/app/context/ModalContext";

export const CTABubble = () => {
  const { showModal } = useModal();
  const createAccount = () => {
    showModal("sign up");
  };
  return (
    <div className="rounded-lg border border-dashed border-gray-400 bg-blue-100 p-6">
      <div className="px-3 pb-3">
        <p className="text-lg font-semibold text-gray-800">
          <b>If you&apos;re ready for a chatbot that works:</b>
        </p>
      </div>
      <div className="px-6 pb-3">
        <ol className="list-decimal space-y-4 font-sans text-base text-gray-800">
          <li>
            <p>
              <Link
                href={"/contact"}
                className="font-bold text-blue-500 underline"
              >
                Contact Us
              </Link>{" "}
              - Let&apos;s set up a coffee chat to discuss your business needs
            </p>
          </li>
          <li>
            <p>
              <button
                type="button"
                onClick={createAccount}
                className="font-bold text-blue-500 underline"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Create Your Account
              </button>{" "}
              - Get started right away with our easy-to-use platform
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};
