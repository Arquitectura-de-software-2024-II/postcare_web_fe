import { ComponentType, MouseEventHandler, ReactNode } from 'react';
// import styles from "./Button.module.css";

interface ButtonProps {
  disabled?: boolean;
  outlined?: boolean;
  type?: "button" | "submit" | "reset";
  haveIcon?: boolean;
  Icon?: ComponentType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  isRound?: boolean;
  isRecording?: boolean;
}

export default function Button ({ type = "button", onClick, haveIcon=false, Icon,disabled=false, children}: ButtonProps) {

    return (
      // <button type={type} className={`${styles.button} ${outlined ? styles.button__secondary : styles.button__primary} ${isRound ? styles.button__round : ''} `} onClick={onClick} disabled={disabled}>
      <button type={type} className="w-full bg-primary hover:bg-blue-900 text-white font-medium py-2 px-4 rounded-lg transition duration-200" onClick={onClick} disabled={disabled}>
        {haveIcon && Icon ? <Icon /> : null}
        {children}
      </button>
    );
}