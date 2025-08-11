"use client";

import { useModal } from "@/app/context/ModalContext";
import { LoginForm } from "@/components/auth/login-form";
import { SignUpForm } from "@/components/auth/sign-up-form";

// Basic Modal component
export const LoginModal = () => {
  const { modalType, closeModal } = useModal();

  if (!modalType) return null;
  // Handler to close modal when clicking on overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click is on the overlay itself
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={handleOverlayClick}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          minWidth: 400,
          maxWidth: 400,
          width: 400,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            fontSize: 20,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        {modalType === "sign in" && <LoginForm />}
        {modalType === "sign up" && <SignUpForm />}
      </div>
    </div>
  );
};
