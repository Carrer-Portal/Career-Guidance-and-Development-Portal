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
        departmentId : Joi.number().integer().label("departmentId").messages({
            "string": "Please provide a valid department name.",
            "string.empty":"The department field is required."
        }),
        facultyId : Joi.number().integer().label("departmentId").messages({
            "string": "Please provide a valid faculty name.",
            "string.empty":"The faculty field is required."
        }),
        password : passwordComplexity().required().label("password")
    });
    return schema.validate(data);
};

const validateCreateAppointment = (data) => {
    const schema = Joi.object({
        date: Joi.date().iso().required().messages({
            'date.base': 'Date must be a valid date',
            'date.format': 'Date must be in ISO8601 format',
            'any.required': 'Date is required'
        }),
        time: Joi.string().required().messages({
            'string.base': 'Time must be a string',
            'any.required': 'Time is required'
        }),
        description: Joi.string().required().messages({
            'string.base': 'Description must be a string',
            'any.required': 'Description is required'
        })
    });
    return schema.validate(data);
};

const validateUpdateAppointment = (data) => {
    const schema = Joi.object({
        date: Joi.date().iso().optional().messages({
            'date.base': 'Date must be a valid date',
            'date.format': 'Date must be in ISO8601 format'
        }),
        time: Joi.string().optional().messages({
            'string.base': 'Time must be a string'
        }),
        description: Joi.string().optional().messages({
            'string.base': 'Description must be a string'
        })
    });
    return schema.validate(data);
};


const validateCreateNotice = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().messages({
            'string.base': 'Title must be a string',
            'any.required': 'Title is required'
        }),
        content: Joi.string().required().messages({
            'string.base': 'Content must be a string',
            'any.required': 'Content is required'
        })
    });
    return schema.validate(data);
};

const validateUpdateNotice = (data) => {
    const schema = Joi.object({
        title: Joi.string().optional().messages({
            'string.base': 'Title must be a string'
        }),
        content: Joi.string().optional().messages({
            'string.base': 'Content must be a string'
        })
    });
    return schema.validate(data);
};

const validateCreateWorkshop = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().messages({
            'string.base': 'Title must be a string',
            'any.required': 'Title is required'
        }),
        description: Joi.string().required().messages({
            'string.base': 'Description must be a string',
            'any.required': 'Description is required'
        }),
        date: Joi.date().iso().required().messages({
            'date.base': 'Date must be a valid date',
            'date.format': 'Date must be in ISO8601 format',
            'any.required': 'Date is required'
        })
    });
    return schema.validate(data);
};

const validateUpdateWorkshop = (data) => {
    const schema = Joi.object({
        title: Joi.string().optional().messages({
            'string.base': 'Title must be a string'
        }),
        description: Joi.string().optional().messages({
            'string.base': 'Description must be a string'
        }),
        date: Joi.date().iso().optional().messages({
            'date.base': 'Date must be a valid date',
            'date.format': 'Date must be in ISO8601 format'
        })
    });
    return schema.validate(data);
};

const validateSaveResume = (data) => {
    const schema = Joi.object({
        userId: Joi.number().integer().required().messages({
            'number.base': 'User ID must be a number',
            'any.required': 'User ID is required'
        }),
        title: Joi.string().required().messages({
            'string.base': 'Title must be a string',
            'any.required': 'Title is required'
        }),
        content: Joi.string().required().messages({
            'string.base': 'Content must be a string',
            'any.required': 'Content is required'
        })
    });
    return schema.validate(data);
};

export default { validateLogin, validateCreateUser,
    validateCreateAppointment,
    validateUpdateAppointment,
    validateCreateNotice,
    validateUpdateNotice,
    validateCreateWorkshop,
    validateUpdateWorkshop,
    validateSaveResume
 };