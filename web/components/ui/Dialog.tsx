import classNames from "classnames";
import React, { useEffect, useRef } from "react";

type DialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  setIsOpen,
  children,
  className,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === dialogRef.current) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      ref={dialogRef}
      tabIndex={-1}
      onClick={handleBackgroundClick}
      className={classNames(
        "bg-black bg-opacity-10 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full lg:inset-0 max-h-full",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Dialog;
