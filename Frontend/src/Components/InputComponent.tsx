import React, { ChangeEvent } from 'react';
import './InputComponent.css';
import { Form, InputGroup } from 'react-bootstrap';

interface InputCompProps extends React.HTMLProps<HTMLInputElement> {
  type: "text" | "password" | "email" | "file";
  classElem?: "login" | "password" | "email" | "small";
  fileName?: string; // Add this line
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // Ensure onChange is correctly typed
}

const InputComponent = ({ type, classElem, placeholder, fileName, onChange, ...rest }: InputCompProps) => {
  if (type === 'file') {
    return (
      <div className={'file'}>
      <Form.Label size="lg">{fileName}</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control size="lg" type="file" onChange={onChange} />
      </InputGroup>
    </div>
    );
  }

  return (
    <input
      type={type}
      className={`input ${classElem ?? ''}`}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
    />
  );
};



export default InputComponent;
