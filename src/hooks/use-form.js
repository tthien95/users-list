import { useEffect, useState } from 'react';
import { get } from '../utils/api-helper';

export const useForm = (options) => {
  const [data, setData] = useState(options?.initialValues || {});
  const [loading, setLoading] = useState(false);

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
    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    data,
    loading,
    handleChange,
    handleSubmit
  };
};
