import FaqJsonLd from "./JsonLd";

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <FaqJsonLd />
      </head>
      {children}
    </>
  );
}
