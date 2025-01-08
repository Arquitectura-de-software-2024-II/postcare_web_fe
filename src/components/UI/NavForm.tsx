"use client";

import Button from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Option {
  label: string;
  onClick: () => void;
}

interface NavFormProps {
  backLink?: string;
  title?: string;
  options?: Option[];
}

const NavForm: React.FC<NavFormProps> = ({
  backLink = "",
  title = "",
  options = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-row justify-between items-center mb-6">
      {backLink && (
        <Button
          rightIcon={<FontAwesomeIcon icon={faArrowLeft} className="w-7 h-7" />}
          navigate={backLink}
          noBorder={true}
        />
      )}
      {title && <h4 className="text-primaryColor text-center">{title}</h4>}
      {options.length > 0 ? (
        <div className="relative inline-block text-left">
          <Button
            noBorder={true}
            onClick={toggleMenu}
            rightIcon={
              <FontAwesomeIcon icon={faEllipsisVertical} className="w-7 h-7" />
            }
          />

          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      option.onClick();
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-10"></div>
      )}
    </div>
  );
};

export default NavForm;
