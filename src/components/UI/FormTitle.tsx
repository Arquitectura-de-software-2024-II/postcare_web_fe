

interface FormTitleProps {
  title?: string;
}

const ErrorMessage: React.FC<FormTitleProps> = ({
  title = "",
}) => {
    return(
        <h4 className="text-primaryColor text-center mb-4">{title}</h4>
    );
}

export default ErrorMessage;