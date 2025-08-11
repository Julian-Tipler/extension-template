import classNames from "classnames";

export type Variant = "primary" | "secondary";

enum VariantStyles {
  primary = "bg-background dark:bg-gray-800",
  secondary = "bg-secondaryBackground dark:bg-gray-700",
}

// Basically just borders and background color
const Section = ({
  id,
  variant = "primary",
  className,
  children,
}: {
  id: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <section
      id={id}
      className={classNames(
        className,
        VariantStyles[variant],
        "border-b border-primary-border"
      )}
    >
      {children}
    </section>
  );
};

export default Section;
