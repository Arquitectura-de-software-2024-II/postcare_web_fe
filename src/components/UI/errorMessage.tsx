import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

interface ErrorMessageProps {
  message?: string;
  type?: "error" | "info";
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "",
  type = "error",
}) => {
  const baseClasses =
    "w-full flex flex-row justify-center items-center text-sm px-3 py-2 rounded-lg border";

  const colorClasses = {
    error:
      "bg-errorColor-5 text-errorColor border-errorColor",
    info: "bg-primaryColor-5 text-primaryColor  border-primaryColor-20",
  };

  const messageClasses = clsx(colorClasses[type], baseClasses);

  return (
    <div className={messageClasses}>
      <FontAwesomeIcon icon={faExclamationCircle} className="mr-3 w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
