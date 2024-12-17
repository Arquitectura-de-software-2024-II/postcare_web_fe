import styles from "./TextField.module.css";
import React, { ReactNode } from 'react';

interface TextFieldProps {
  label:string
  children?: ReactNode;
}

export default function TextField({ label = "", children }: TextFieldProps){
  return (
    <div className={styles.textField}>
      {label=="" ? <></> : <label className={styles.textField__label}>{label}</label> }
      <div className={styles.textField__input}>
        {children}
      </div>
    </div>
  );
}