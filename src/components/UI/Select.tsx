export interface Option {
  value: string;
  label: string;
}

interface SelectComponentProps {
  options: Option[];
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  value?: string;
  disabled?: boolean;
}

const SelectComponent = ({
  options,
  id = "select",
  name = "",
  placeholder = "Elegir opción",
  className = "",
  onChange,
  value,
  disabled = false,
}: SelectComponentProps) => {

  return (
    <select id={id} className={className} onChange={onChange} name={name} defaultValue={value} disabled={disabled}>
      <option key="" value="" className="text-grayColor-30">{placeholder}</option>
      {options.map((option,index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
