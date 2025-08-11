
interface ParagraphTextProps {
  children: React.ReactNode;
  className?: string;
}

const ParagraphText: React.FC<ParagraphTextProps> = ({
  children,
  className = "",
}) => (
  <p className={`font-light text-gray-500 dark:text-gray-400 ${className}`}>
    {children}
  </p>
);

export default ParagraphText;
