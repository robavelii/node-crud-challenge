const Joi = require('joi');
const personSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name cannot exceed 100 characters'
        }),
    age: Joi.number()
        .integer()
        .min(0)
        .max(150)
        .required()
        .messages({
            'number.base': 'Age must be a number',
            'number.integer': 'Age must be an integer',
            'number.min': 'Age cannot be negative',
            'number.max': 'Age cannot exceed 150'
        }),
    hobbies: Joi.array()
        .items(Joi.string().min(1).max(100))
        .required()
        .messages({
            'array.base': 'Hobbies must be an array',
            'string.min': 'Hobby name must be at least 1 character long',
            'string.max': 'Hobby name cannot exceed 100 characters'
        })
});

module.exports = personSchema;