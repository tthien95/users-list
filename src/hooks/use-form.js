import { useCallback, useEffect, useState } from 'react';
import { get } from '../utils/api-helper';
import validators from '../utils/validation';
import { useDispatch } from 'react-redux';
import { toastActions } from '../store/toast-slice';
import { useNavigate } from 'react-router-dom';

export const useForm = ({
  initialValues = {},
  userId = '',
  validations,
  onSubmit
}) => {
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fnHandleError = useCallback(
    ({ response }) => {
      dispatch(
        toastActions.showNotification({
          status: 'error',
          title: 'Error',
          message:
            response?.data?.message ||
            response?.statusText ||
            'There is something wrong happended while fetching data'
        })
      );
      navigate('/');
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (userId) {
      setLoading(true);
      const fnHandleSuccess = (res) => {
        if (!res || res.message) {
          dispatch(
            toastActions.showNotification({
              status: 'error',
              title: 'Error',
              message:
                res?.message ||
                'There is something wrong happended while fetching data'
            })
          );
          navigate('/');
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
      };

      get(`/users/${userId}`)
        .then(fnHandleSuccess, fnHandleError)
        .finally(() => {
          setLoading(false);
        });
    } else {
      let data = initialValues;
      setData({
        ...data
      });
    }
  }, [userId, initialValues, dispatch, navigate, fnHandleError]);

  const handleChange = (event) => {
    if (event?.target?.name) {
      setData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value
      }));
    } else {
      console.error('Please set name attribute for this input');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

    if (onSubmit) {
      setLoading(true);
      onSubmit().finally(() => {
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
