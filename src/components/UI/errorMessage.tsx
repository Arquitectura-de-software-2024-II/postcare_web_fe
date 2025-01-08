import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "",
}) => {
    return(
        <div className="w-full flex flex-row justify-center items-center bg-errorColor-5 text-errorColor px-3 py-2 rounded-lg border-errorColor text-sm">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-3 w-5 h-5" />
            <p>{message}</p>
        </div>
    );
}

export default ErrorMessage;