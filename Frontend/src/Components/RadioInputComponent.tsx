import React from 'react';
import { Form } from 'react-bootstrap';
import './RadioInputComponent.css';

interface RadioInputComponentProps {
    names: string[];
    onChange: (selectedValue: string) => void;
}

const RadioInputComponent: React.FC<RadioInputComponentProps> = ({ names, onChange }) => {
    return (
        <div className="radio-form">
            <Form className="box">
                {names.map((name, idx) => (
                    <Form.Check
                        key={idx}
                        className="custom-radio"
                        inline
                        label={name}
                        name="group1"
                        type="radio"
                        id={`inline-radio-${idx}`}
                        onChange={() => onChange(name)}
                    />
                ))}
            </Form>
        </div>
    );
};

export default RadioInputComponent;
