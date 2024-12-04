import { ChangeEvent } from "react";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
}

function InputField( {placeholder, value, onChange, onKeyDown}: InputFieldProps) {
  return (
    <input
      onKeyDown={onKeyDown}
      className="w-full h-10 border-2"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputField;
