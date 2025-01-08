import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "./button";

interface AlertProps {
  type?: "info" | "danger" | "success" | "warning" | "dark";
  title?: string;
  message?: string;
}

const Alert: React.FC<AlertProps> = ({
  type = "info",
  title = "",
  message = "",
}) => {

  let containerClasses;
  let buttonType: "secondary" | "error" | "primary" | "background";
  
  if (type == "dark") {
    containerClasses = "p-4 text-gray-800 border border-gray-300 rounded-lg bg-gray-50"
    buttonType = "primary" 
    // buttonPrimary:
    //   "text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2",
    // buttonSecondary:
    //   "text-gray-800 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5",
    }else if (type == "danger") {
      containerClasses ="p-4 text-red-800 border border-red-300 rounded-lg bg-red-50"
      buttonType = "error" 
    }else if (type == "success") {
      containerClasses =
        "p-4 text-green-800 border border-green-300 rounded-lg bg-green-50 "
        buttonType = "primary" 
    }else if (type == "warning") {
      containerClasses =
        "p-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50"
        buttonType = "error"  
    }else {
      containerClasses =
      "p-4 text-primaryColor border border-blue-300 rounded-lg bg-primaryColor-5 "
      buttonType = "primary"  
    }
  

  return (
    <div className={containerClasses} role="alert">
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faCircleInfo}
          className="flex-shrink-0 w-4 h-4 me-2"
        />
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">{message}</div>
      <div className="flex gap-2">
        <Button label = "Eliminar" color={buttonType} size="xs"/>
        <Button label = "Eliminar" color={buttonType} outlined={true} size="xs"/>
      </div>
    </div>
  );
};

export default Alert;
