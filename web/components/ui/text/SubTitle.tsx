
interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ children, className = "" }) => (
  <h3 className={`mb-2 text-xl font-bold dark:text-white ${className}`}>
    {children}
  </h3>
);

export default SubTitle;
