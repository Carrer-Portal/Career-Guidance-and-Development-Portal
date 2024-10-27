import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const validateLogin = (data) => {
    const schema = Joi.object({
        userName : Joi.string().email().required().label("userName").messages({
            "string.email": "Please provide a valid email address for the Email.",
            "string.empty":"The email field is required."
        }),
    });
    return schema.validate(data.email);
};

const validateCreateUser = (data) => {
    const schema = Joi.object({
        universityEmail : Joi.string().email().required().label("universityEmail").messages({
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
        contactNumber : Joi.string().required().label("contactNumber").messages({
            "string": "Please provide a valid contact number.",
            "string.empty":"The contact number field is required."
        }),
        regNo : Joi.string().required().label("regNo").messages({
            "string": "Please provide a valid Registration Number.",
            "string.empty":"The Registration Number field is required."
        }),
        departmentId : Joi.string().required().label("departmentId").messages({
            "string": "Please provide a valid department name.",
            "string.empty":"The department field is required."
        }),
        password : passwordComplexity().required().label("password")
    });
    return schema.validate(data);
};

export default { validateLogin, validateCreateUser };