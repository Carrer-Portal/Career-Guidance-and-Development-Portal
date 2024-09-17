const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const phoneNumberValidity = Joi.extend(require('joi-phone-number'));

const validateLogin = (data) =>{
    const schema = Joi.object({
        userName : Joi.string().email().required().label("userName").messages({
            "string.email": "Please provide a valid email address for the Email.",
            "string.empty":"The email field is required."
        }),
    });
    return schema.validate(data.email);
};

const validateCreateUser = (data) =>{
    const schema = Joi.object({
        userName : Joi.string().email().required().label("email").messages({
            "string.email": "Please provide a valid email address for the Email.",
            "string.empty":"The email field is required."
        }),
        firstName : Joi.string().required().label("firstName").messages({
            "string": "Please provide a valid Firt Name.",
            "string.empty":"The Firt Name is required."
        }),
        lastName : Joi.string().required().label("lastName").messages({
            "string": "Please provide a valid Last Name.",
            "string.empty":"The Last Name is required."
        }),
        contactNumber : phoneNumberValidity.string().phoneNumber().label("contactNumber").messages({
            "string.phoneNumber": "Please provide a valid contact number.",
            "string.empty":"The contact number field is required."
        }),
        regNumber : Joi.string().required().label("regNumber").messages({
            "string": "Please provide a valid Registration Number.",
            "string.empty":"The Registration Number field is required."
        }),
        faculty : Joi.string().required().label("faculty").messages({
            "string": "Please provide a valid faculty name.",
            "string.empty":"The faculty name field is required."
        }),
        department : Joi.string().required().label("department").messages({
            "string": "Please provide a valid department name.",
            "string.empty":"The department field is required."
        }),
        password : passwordComplexity().required().label("password")
    });
    return schema.validate(data);
};

module.exports = {validateLogin,validateCreateUser};