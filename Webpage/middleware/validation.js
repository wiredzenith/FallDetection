const validator = require('validator');
const isEmpty = require('is-empty');

const Contacts = require('../models/contacts')
const Account = require('../models/accounts');





module.exports = {
    /**
     * Validation helper to validate new user registration from data.
     * return errors if any of the fields are missing or email is not valid format or 
     * passwords no not match.
     *
     * @param {*} data -- data from form to be validated
     * @returns -- Object of errors or if no errors returns True
     */
    validateRegistration: function (data) {


        let errors = {};

        data.username = !isEmpty(data.username) ? data.username : "";
        data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";
        data.password2 = !isEmpty(data.password2) ? data.password2 : "";

         //chesk if name was entered
        if (validator.isEmpty(data.username)) {
            errors.username = "Name field is required";
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
    },
    /**
     *validation helper function to validate contact numbers and names befro being 
     saved in to MongoDB database.
     *
     * @param {*} data -- input data from the form to be validated
     * @returns -- Object oi errors or is no errors returns True
     */
    validateContact: function (data) {


        let errors = {};
        console.log(data);

        data.name = !isEmpty(data.name) ? data.name : "";
        data.number = !isEmpty(data.number) ? data.number : "";

        if (validator.isEmpty(data.name)) {
            errors.name = "Name field is required";
        }
        if (validator.isEmpty(data.number)) {
            errors.number = "Number field is required";
        }
        console.log(data.number);
        if (!validator.isMobilePhone(data.number, "en-IE")) {
            errors.number = "Must be an Irish mobile number";
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }

    }
}
