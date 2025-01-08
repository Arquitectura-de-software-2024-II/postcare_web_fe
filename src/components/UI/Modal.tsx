import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
  footerButtons?: React.ReactNode;
  type?: "default" | "popup";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = "",
  content,
  footerButtons,
  type = "default", // "default" o "popup"
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative p-4 ${
          type === "default" ? "w-full max-w-2xl" : "w-full max-w-md"
        }`}
      >
        {/* Modal Content */}
        <div className="relative bg-backgroundColor-90 rounded-lg shadow">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-3 ${
              type === "default" ? "end-3" : "end-2.5"
            } bg-transparent hover:bg-grayColor-20 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center`}
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="w-6 h-6 text-primaryColor"
            />
            <span className="sr-only">Close modal</span>
          </button>

          {/* Header */}
          {type === "default" && title && (
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-primaryColor">{title}</h3>
            </div>
          )}

          {/* Body */}
          <div className={`p-4 md:p-5 ${type === "popup" && "text-center"}`}>
            {content}
          </div>

          {/* Footer */}
          {footerButtons && (
            <div
              className={`flex ${
                type === "popup"
                  ? "justify-center gap-2 pb-4 md:pb-5"
                  : "items-center border-t border-grayColor-20 rounded-b  p-4 md:p-5"
              }`}
            >
              {footerButtons}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
