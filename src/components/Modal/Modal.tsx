"use client";

import { useEffect } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title = "",
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;
  return (
    <div className={styles.modal__backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={stopPropagation}>
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h5 className="text-primary font-semibold">{title}</h5>
          <button
            type="button"
            className="text-primary bg-transparent hover:bg-primary hover:text-main rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5">{children}</div>
      </div>
    </div>
  );
};
