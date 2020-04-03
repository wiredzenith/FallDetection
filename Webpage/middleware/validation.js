const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = {
    //validate registration info to reduce junk being stored in DB
    validateRegistration: function (data) {
        var data = data.query;
        
        let errors = {};
        data.name = !isEmpty(data.name) ? data.name : "";
        data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";
        data.password2 = !isEmpty(data.password2) ? data.password2 : "";
        //chesk if name was entered
        if (validator.isEmpty(data.name)) {
            errors.name = "Name field is required";
        }
        // chec if email was entered 
        if (validator.isEmpty(data.email)) {
            errors.email = "Email field is required";
            //check if email is valid
        } else if (!validator.isEmail(data.email)) {
            errors.email = "Email is invalid";
        }
        // check passowrd
        if (validator.isEmpty(data.password)) {
            errors.password = "Password field is required";
        }
        if (validator.isEmpty(data.password2)) {
            errors.password2 = "Confirm password field is required";
        }
        //set minimum and maximum lenght of password
        if (!validator.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = "Password must be at least 6 characters";
        }
        // see if second password is the same as first password
        if (!validator.equals(data.password, data.password2)) {
            errors.password2 = "Passwords must match";
        }
        // return errors
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }
}