import clsx from "clsx";

interface CardProps {
  children?: React.ReactNode;
  aditionalClasses?: string;
}

const Card: React.FC<CardProps> = ({ children, aditionalClasses = "" }) => {
  const baseClasses =
    "bg-backgroundColor-90 border-gray-200 w-full p-4 border rounded-lg shadow sm:p-6 md:p-8 my-4";
  const cardClasses = clsx(baseClasses, aditionalClasses);

  return <div className={cardClasses}>{children}</div>;
};

export default Card;
