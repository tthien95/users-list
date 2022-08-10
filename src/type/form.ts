import { HTMLInputTypeAttribute } from 'react';

export interface FormFields {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
}

export type FieldElement = {
  inputName: string;
  inputLabel: string;
  inputType: HTMLInputTypeAttribute;
};

export interface FieldSet {
  fieldSetLabel: string;
  fields: FieldElement[];
}

export interface ValidationProps {
  required: boolean;
  validator: string;
}
