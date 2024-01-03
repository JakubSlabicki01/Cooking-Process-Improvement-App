import React, { useState } from 'react';
import './CheckboxComponent.css';

// Define the props type for the CustomCheckbox component
interface CustomCheckboxProps {
  label: string; // Explicitly typing the label as a string
}

const CheckboxComponent: React.FC<CustomCheckboxProps> = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={{ display: 'none' }} // Hide the default checkbox
      />
      <span className={`checkmark ${checked ? 'checked' : ''}`}></span>
      <span>{label}</span>
    </label>
  );
};

export default CheckboxComponent;
