import React from 'react';
import FormInput from './FormInput';

export default function FormFieldSet({
  fieldSetLabel,
  fields,
  inputValues,
  errorMess,
  handleChange
}) {
  let chunk = [];
  let newFields = [].concat(...fields);

  while (newFields.length) {
    chunk.push(newFields.splice(0, 2));
  }
  return (
    <fieldset className="row container">
      <legend>{fieldSetLabel}</legend>
      {chunk.map((row, rowIndex) => {
        return (
          <div className="row mb-3" key={rowIndex}>
            {row.map((val, colIndex) => (
              <FormInput
                {...val}
                key={`${rowIndex}-${colIndex}`}
                inputValue={inputValues[val.inputName]}
                inputError={errorMess[val.inputName]}
                handleChange={handleChange}
              />
            ))}
          </div>
        );
      })}
    </fieldset>
  );
}
