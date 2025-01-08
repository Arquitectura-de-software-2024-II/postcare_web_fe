import clsx from "clsx";

interface AvatarProps {
  size?: "xs" | "sm" | "base" | "l" | "xl";
}

const Avatar: React.FC<AvatarProps> = ({ size = "base" }) => {
  const baseClasses = "relative overflow-hidden bg-gray-100 rounded-full hover:ring-4 hover:ring-backgroundColor";

  const sizeClasses = {
    xs: "w-10 h-10",
    sm: "w-10 h-10",
    base: "w-10 h-10",
    l: "w-10 h-10",
    xl: "w-10 h-10",
  };

  // Combina las clases
  const avatarClasses = clsx(baseClasses, sizeClasses[size]);

  const iconClasses = "absolute w-12 h-12 text-grayColor-40 -left-1";

  return (
    <div className={avatarClasses}>
      <svg
        className={iconClasses}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default Avatar;
