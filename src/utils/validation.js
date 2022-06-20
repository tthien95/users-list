const validators = {
  validateEmail: (value) => {
    return {
      isValid: RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ).test(value),
      message: 'Invalid email format'
    };
  },

  validatePhone: (value) => {
    return {
      isValid: RegExp(
        /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      ).test(value),
      message:
        'Invalid phone number. Must contain + followed by country code and 10 digits phone number'
    };
  },

  validateNoSpecialChar: (value) => {
    return {
      isValid: RegExp(/^[A-Za-z]*$/).test(value),
      message: 'Must contains only alphabet characters'
    };
  }
};

export default validators;
