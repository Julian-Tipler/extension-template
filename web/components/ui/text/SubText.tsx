export const SubText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={`text-sm font-bold ${className}`}>{children}</p>;
};
