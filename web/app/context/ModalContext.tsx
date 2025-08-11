"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "sign in" | "sign up" | null;

interface ModalContextType {
  modalType: ModalType;
  showModal: (type: ModalType, redirectLink?: string) => void;
  closeModal: () => void;
  redirectLink?: string; // Optional redirect link after modal action
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [redirectLink, setRedirectLink] = useState<string | undefined>(undefined);

  const showModal = (type: ModalType, link?: string) => {
    setModalType(type);
    setRedirectLink(link);
  };

  const closeModal = () => {
    setModalType(null);
    setRedirectLink(undefined);
  };

  return (
    <ModalContext.Provider value={{ modalType, showModal, closeModal, redirectLink }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
