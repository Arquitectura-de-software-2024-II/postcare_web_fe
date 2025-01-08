import clsx from "clsx";
import SelectComponent from "./Select";

interface InputProps {
  label?: string; // Texto del botón
  type?: "text" | "email" | "password" | "number" | "date" | "datetime-local"; // Tipo de input
  name?: string;
  id?: string; // ID del input
  placeholder?: string; // Placeholder del input
  required?: boolean; // Campo requerido
  disabled?: boolean; // Deshabilitar el input
  successMessage?: string; // Mensaje de éxito
  errorMessage?: string; // Mensaje de éxito
  explanationMessage?: string; // Explicación del input
  leftIcon?: React.ReactNode; // Ícono a la izquierda
  options?: { value: string; label: string }[];
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  label = "",
  type = "text", // Tipo de input
  id = "",
  placeholder = "",
  required = false,
  disabled = false,
  successMessage = "",
  errorMessage = "",
  explanationMessage = "",
  name = "",
  leftIcon,
  options,
  onChange,
  value,
}) => {
  // Clases base para todos los botones
  let inputBaseClasses;
  let labelClasses;

  if (errorMessage) {
    inputBaseClasses =
      "bg-errorColor-5 border-errorColor focus:ring-errorColor-5 focus:border-errorColor";
    labelClasses = "text-errorColor";
  } else if (successMessage) {
    inputBaseClasses =
      "bg-successColor-5 border-successColor focus:ring-successColor-5 focus:border-successColor";
    labelClasses = "text-successColor";
  } else {
    inputBaseClasses =
      "bg-primaryColor-5 border-grayColor-30 focus:ring-primaryColor-10 focus:border-primaryColor";
    labelClasses = "text-textColor-110";
  }

  inputBaseClasses = clsx(
    inputBaseClasses,
    "placeholder:text-grayColor-40 text-textColor focus:bg-backgroundColor-90 shadow border-2 focus:ring border rounded-lg block w-full p-2.5 text-sm font-normal focus:outline-none focus:shadow-outline"
  );
  labelClasses = clsx(labelClasses, "block mb-2 text-sm font-semibold");

  const dissabledClasses =
    " disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  const paddingInputClasses = leftIcon ? "ps-10" : "";

  const generalMessageClasses = " mt-2 text-xs font-light";
  const successMessageClasses = "text-successColor" + generalMessageClasses;
  const errorMessageClasses = "text-errorColor" + generalMessageClasses;
  const explanationMessageClasses = "text-textColor" + generalMessageClasses;

  // Combina las clases
  const InputClasses = clsx(
    inputBaseClasses,
    paddingInputClasses,
    dissabledClasses
  );
  const selectClasses = clsx(InputClasses);
  const iconClasses = "w-4 h-4";

  let inputElement;

  const baseInput = (
    <input
      type={type}
      id={id}
      name={name}
      className={InputClasses}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      onChange={onChange}
      value={value}
    />
  );

  if (leftIcon) {
    inputElement = (
      <div className="relative mb-6">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          {leftIcon && <span className={iconClasses}>{leftIcon}</span>}
        </div>
        {baseInput}
      </div>
    );
  } else if (options) {
    inputElement = (
      <SelectComponent
        options={options}
        id={id}
        className={selectClasses}
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
      />
    );
  } else {
    inputElement = baseInput;
  }

  return (
    <div>
      <label className={labelClasses}>{label}</label>
      {inputElement}
      {successMessage && (
        <p className={successMessageClasses}>{successMessage}</p>
      )}
      {errorMessage && <p className={errorMessageClasses}>{errorMessage}</p>}
      <p className={explanationMessageClasses}>{explanationMessage}</p>
    </div>
  );
};

export default Input;
