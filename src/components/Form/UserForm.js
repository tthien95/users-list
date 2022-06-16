import React from 'react';

const handleFormSubmit= (event) => {
  event.preventDefault();
}

export default function UserForm() {
  return (
    <form className="container-md mt-3" onSubmit={handleFormSubmit}>
      <fieldset className="row mb-3 container">
        <legend>Personal Info: </legend>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input type="text" className="form-control" id="firstName" />
          </div>
          <div className="col-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input type="text" className="form-control" id="lastName" />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="firstName" className="form-label">
              Birth Date
            </label>
            <input type="date" className="form-control" id="firstName" />
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
