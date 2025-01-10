"use client";

import clsx from "clsx";
import Link from "next/link";
import Spinner from "./Spinner";

interface ButtonProps {
  label?: string; // Texto del botón
  color?: "primary" | "secondary" | "error" | "background"; // Estilos predefinidos
  size?: "xs" | "sm" | "base" | "l" | "xl"; // Tamaño del botón
  outlined?: boolean; // Botón con bordes
  noBorder?: boolean; // Botón sin bordes
  disabled?: boolean; // Deshabilitar el botón
  onClick?: () => void; // Evento al hacer clic
  leftIcon?: React.ReactNode; // Ícono a la izquierda
  rightIcon?: React.ReactNode; // Ícono a la derecha
  type?: "button" | "submit" | "reset"; // Tipo de botón
  navigate?: string; // Navegar a una ruta
  loading?: boolean; // Mostrar spinner
  fullWidth?: boolean; // Ancho completo
  additionalClasses?: string; // Clases adicionales
}

const Button: React.FC<ButtonProps> = ({
  label = "",
  color = "primary",
  size = "base",
  disabled = false,
  outlined = false,
  noBorder = false,
  onClick,
  leftIcon,
  rightIcon,
  type = "button",
  navigate = "",
  loading = false,
  fullWidth = false,
  additionalClasses = "",
}) => {
  // Clases base para todos los botones
  const baseClasses =
    "rounded-lg font-medium transition ease-in-out duration-200 focus:outline-none flex items-center justify-center gap-2 w-fit";

  // Clases dinámicas según las props
  let colorClasses;
  let styleClasses = "";
  // let colorIcon;
  if (outlined) {
    colorClasses = {
      primary:
        "text-primaryColor hover:text-backgroundColor border-primaryColor hover:bg-primaryColor focus:ring-primaryColor-20",
      secondary:
        "text-secondaryColor hover:text-backgroundColor border-secondaryColor hover:bg-secondaryColor focus:ring-secondaryColor-20",
      error:
        "text-errorColor hover:text-backgroundColor border-errorColor hover:bg-errorColor focus:ring-errorColor-20",
      background:
        "text-backgroundColor hover:text-primaryColor border-backgroundColor hover:bg-backgroundColor focus:ring-primaryColor-20",
    };
    styleClasses = "border-2 focus:ring-4 focus:outline-none";
  } else if (noBorder) {
    colorClasses = {
      primary: "text-primaryColor focus:ring-4 focus:ring-primaryColor-20",
      secondary:
        "text-secondaryColor focus:ring-4 focus:ring-secondaryColor-20",
      error: "text-errorColor focus:ring-4 focus:ring-errorColor-20",
      background:
        "text-backgroundColor focus:ring-4 focus:ring-ring-primaryColor-20",
    };
    styleClasses = "hover:underline";
  } else {
    colorClasses = {
      primary:
        "bg-primaryColor text-backgroundColor hover:bg-primaryColor-110 focus:ring-primaryColor-20",
      secondary:
        "bg-secondaryColor text-backgroundColor hover:bg-secondaryColor-110 focus:ring-secondaryColor-20",
      error:
        "bg-errorColor text-backgroundColor hover:bg-errorColor-110 focus:ring-errorColor-20",
      background:
        "bg-backgroundColor text-primaryColor hover:bg-backgroundColor-110 focus:ring-ring-primaryColor-20",
    };
    styleClasses = "focus:ring-4 focus:outline-none";
  }

  const sizeClasses = {
    xs: "px-3 py-2 text-xs",
    sm: "px-3 py-2 text-sm",
    base: "px-5 py-2.5 text-sm",
    l: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-lg",
  };

  const sizeIcon = {
    xs: "w-3 h-3",
    sm: "w-3 h-3 ",
    base: "w-3.5 h-3.5",
    l: "w-4 h-4",
    xl: "w-4 h-4",
  };

  // Combina las clases
  const buttonClasses = clsx(
    colorClasses[color],
    baseClasses,
    styleClasses,
    sizeClasses[size],
    additionalClasses, // Clases adicionales
    { "w-full": fullWidth }, // Ancho completo
    { "opacity-50 cursor-not-allowed": disabled } // Estilo cuando está deshabilitado,
  );

  const iconClasses = clsx("flex items-center justify-center", sizeIcon[size]);

  let contentButton;

  const loadingColor: Record<
    "primary" | "secondary" | "error" | "background",
    "primary" | "secondary" | "error" | "background"
  > = {
    primary: "background",
    secondary: "background",
    error: "background",
    background: "primary",
  };

  if (loading) {
    contentButton = (
      <>
        <Spinner size="xs" color={loadingColor[color]} />{" "}
        <span>Cargando...</span>
      </>
    );
  } else {
    contentButton = (
      <>
        {leftIcon && <span className={iconClasses}>{leftIcon}</span>}
        {label &&
        <span className="text-center flex items-center justify-center">
          {label}
        </span>}
        {rightIcon && <span className={iconClasses}>{rightIcon}</span>}
      </>
    );
  }

  //Diseño boton

  if (navigate) {
    return (
      <Link
        href={navigate}
        className={buttonClasses}
        onClick={onClick}
        type={type}
      >
        {contentButton}
      </Link>
    );
  } else {
    return (
      <button
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled || loading}
        type={type}
      >
        {contentButton}
      </button>
    );
  }
};

export default Button;
