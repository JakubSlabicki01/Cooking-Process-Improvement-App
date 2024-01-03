import React from 'react';
import './InputComponent.css';
import { ChangeEvent, useState, useEffect } from "react";

interface InputCompProps extends React.HTMLProps<HTMLInputElement> {
  type: "login" | "password" | "email";
  classElem?: "login" | "password" | "email" | "small";
  placeholder: string;
}

const InputComponent = (props: InputCompProps) => {
  const { type, classElem, placeholder, ...rest } = props;

  return (
    <input
      type={type}
      className={`input ${classElem ?? ''}`}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default InputComponent;
