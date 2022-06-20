import { useEffect, useState } from 'react';
import { get } from '../utils/api-helper';
import validators from '../utils/validation';

export const useForm = (options) => {
  const [data, setData] = useState(options?.initialValues || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (options?.userId) {
      setLoading(true);
      get(`/users/${options.userId}`)
        .then((res) => {
          if (!res || res.message) {
            console.error('There is something wrong with the request');
          } else {
            const { firstName, lastName, birthDate, email, phone } = res.data;
            setData({
              firstName,
              lastName,
              birthDate,
              email,
              phone
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      let data = options?.initialValues || {};
      setData({
        ...data
      });
    }
  }, [options.userId, options.initialValues]);

  const handleChange = (event) => {
    if (event?.target?.name) {
      setData({
        ...data,
        [event.target.name]: event.target.value
      });
    } else {
      console.error('Please set name attribute for this input');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newError = {};

      for (const key in validations) {
        if (Object.hasOwnProperty.call(validations, key)) {
          const validation = validations[key];
          const value = data[key];

          if (validation.required && !value) {
            valid = false;
            newError[key] = 'This field cannot be empty';
          }

          if (!newError[key] && value && validation.validator) {
            const { isValid, message } =
              validators[validation.validator](value);
            valid = isValid;
            if (!isValid) {
              newError[key] = message;
            }
          }
        }
      }

      if (!valid) {
        setError(newError);
        return;
      }
    }

    setError({});

    if (options?.onSubmit) {
      setLoading(true);
      options.onSubmit().finally(() => {
        setLoading(false);
      });
    }
  };

  return {
    data,
    loading,
    error,
    handleChange,
    handleSubmit
  };
};
