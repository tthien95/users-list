import React from 'react';
import FormInput from './FormInput';
import { FormFields, FieldElement } from '../../type/form';

interface FormFieldSetProps {
  fieldSetLabel: string;
  fields: FieldElement[];
  inputValues: FormFields | {};
  errorMess: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormFieldSet: React.FC<FormFieldSetProps> = ({
  fieldSetLabel,
  fields,
  inputValues,
  errorMess,
  handleChange
}) => {
  let chunk = [];
  let newFields = ([] as FieldElement[]).concat(...fields);

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
                inputValue={(inputValues as any)[val.inputName]}
                inputError={errorMess[val.inputName]}
                handleChange={handleChange}
              />
            ))}
          </div>
        );
      })}
    </fieldset>
  );
};

export default FormFieldSet;
