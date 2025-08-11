import { ReactNode } from "react";

export const TitleText = ({
  children,
  primary,
}: {
  children: ReactNode;
  primary?: boolean;
}) => {
  return (
    <h1
      className={`mb-4 flex flex-col gap-3 text-6xl font-bold leading-tight ${primary ? "text-primary " : "text-black"}`}
    >
      {children}
    </h1>
  );
};
