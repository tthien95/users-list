import React, { useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/use-form';
import UsersListContext from '../../store/users-list';
import { post, put } from '../../utils/api-helper';
import { toastActions } from '../../store/toast-slice';

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

  const { firstName, lastName, birthDate, email, phone } = data;
  const {
    firstName: firstNameError,
    lastName: lastNameError,
    birthDate: birthDateError,
    email: emailError,
    phone: phoneError
  } = error;

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
      <fieldset className="row mb-3 container">
        <legend>Personal Info: </legend>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
            {firstNameError && <p className="error">{firstNameError}</p>}
          </div>
          <div className="col-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
            {lastNameError && <p className="error">{lastNameError}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="birthDate" className="form-label">
              Birth Date
            </label>
            <input
              type="date"
              className="form-control"
              id="birthDate"
              name="birthDate"
              value={birthDate}
              onChange={handleChange}
            />
            {birthDateError && <p className="error">{birthDateError}</p>}
          </div>
        </div>
      </fieldset>
      <fieldset className="row mb-3 container">
        <legend>Contact Info: </legend>
        <div className="row">
          <div className="col-6">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div className="col-6">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
            />
            {phoneError && <p className="error">{phoneError}</p>}
          </div>
        </div>
      </fieldset>
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
