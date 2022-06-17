import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/use-form';

const onSubmit = () => {
  console.log('User has submitted!');
};

const initialValues = {
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  phone: ''
};

export default function UserForm() {
  const { userId } = useParams();

  const { data, handleChange, handleSubmit, loading } = useForm({
    initialValues,
    userId,
    onSubmit
  });

  const { firstName, lastName, birthDate, email, phone } = data;

  if (loading) {
    return (
      <div
        className="spinner-border mx-auto"
        style={{ textAlign: 'center' }}
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
              value={firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={handleChange}
            />
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
              value={birthDate}
              onChange={handleChange}
            />
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
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              value={phone}
              onChange={handleChange}
            />
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
}
