import React, { useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/use-form';
import UsersListContext from '../../store/users-list';
import { post, put } from '../../utils/api-helper';
import { toastActions } from '../../store/toast-slice';
import FormFieldSet from './FormFieldSet';

const initialValues = {
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  phone: ''
};

const validations = {
  firstName: {
    required: true,
    validator: 'validateNoSpecialChar'
  },
  lastName: {
    required: true,
    validator: 'validateNoSpecialChar'
  },
  birthDate: {
    required: true,
    validator: null
  },
  email: {
    required: true,
    validator: 'validateEmail'
  },
  phone: {
    required: false,
    validator: 'validatePhone'
  }
};

const fieldSet = [
  {
    fieldSetLabel: 'Personal Info: ',
    fields: [
      {
        inputName: 'firstName',
        inputLabel: 'First Name',
        inputType: 'text'
      },
      {
        inputName: 'lastName',
        inputLabel: 'Last Name',
        inputType: 'text'
      },
      {
        inputName: 'birthDate',
        inputLabel: 'Birth Date',
        inputType: 'date'
      }
    ]
  },
  {
    fieldSetLabel: 'Contact Info: ',
    fields: [
      {
        inputName: 'email',
        inputLabel: 'Email address',
        inputType: 'email'
      },
      {
        inputName: 'phone',
        inputLabel: 'Phone',
        inputType: 'tel'
      }
    ]
  }
];

const UserForm = () => {
  const { userId } = useParams();
  const { updateUser, addUser, fnHandleError } = useContext(UsersListContext);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fnSuccess = useCallback(
    (res, ctxHandler, message) => {
      const { id, image, email, birthDate, phone, firstName, lastName } =
        res.data;
      ctxHandler({ id, image, email, birthDate, phone, firstName, lastName });
      dispatch(
        toastActions.showNotification({
          status: 'success',
          title: 'Success',
          message: message
        })
      );
      navigate('/');
    },
    [dispatch, navigate]
  );

  const onSubmit = async () => {
    let url = '/users/add';
    if (userId) {
      url = `/users/${userId}`;

      return put(url, data).then((res) => {
        fnSuccess(res, updateUser, 'Update request has been sent successfully');
      }, fnHandleError);
    }

    return post(url, data).then((res) => {
      fnSuccess(res, addUser, 'Add request has been sent successfully');
    }, fnHandleError);
  };

  const { data, handleChange, handleSubmit, loading, error } = useForm({
    initialValues,
    validations,
    userId,
    onSubmit
  });

  if (loading) {
    return (
      <div
        className="spinner-border mx-auto mt-3"
        style={{ display: 'block' }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <form className="container-md mt-3" onSubmit={handleSubmit}>
      {fieldSet.map((set, index) => (
        <FormFieldSet
          {...set}
          key={index}
          inputValues={data}
          errorMess={error}
          handleChange={handleChange}
        />
      ))}
      <div className="row container">
        <div className="col-6">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
