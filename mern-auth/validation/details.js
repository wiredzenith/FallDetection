const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateDetailsInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.number = !isEmpty(data.number) ? data.number : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
// number checks
  if (Validator.isEmpty(data.number)) {
    errors.number = "number field is required";
  } else if (!Validator.isMobilePhone(data.number)) {
    errors.number = data.number + "number is invalid";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
