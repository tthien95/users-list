import React from 'react';

export default function FormInput({
  inputName,
  inputLabel,
  inputValue,
  inputType = 'text',
  inputError,
  handleChange
}) {
  return (
    <div className="col-6">
      <label htmlFor={inputName} className="form-label">
        {inputLabel}
      </label>
      <input
        type={inputType}
        className="form-control"
        id={inputName}
        name={inputName}
        value={inputValue}
        onChange={handleChange}
      />
      {inputError && <p className="error">{inputError}</p>}
    </div>
  );
}
