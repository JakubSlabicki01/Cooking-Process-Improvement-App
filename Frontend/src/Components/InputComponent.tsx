import React, { ChangeEvent } from 'react';
import './InputComponent.css';

interface InputCompProps extends React.HTMLProps<HTMLInputElement> {
  type: "text" | "password" | "email";
  classElem?: "login" | "password" | "email" | "small";
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // Ensure onChange is correctly typed
}

const InputComponent = ({ type, classElem, placeholder, onChange, ...rest }: InputCompProps) => {
  return (
    <input
      type={type}
      className={`input ${classElem ?? ''}`}
      placeholder={placeholder}
      onChange={onChange} // Ensure onChange is properly passed
      {...rest}
    />
  );
};

export default InputComponent;
