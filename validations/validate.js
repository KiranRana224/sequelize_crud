const Joi = require("joi");

// Create a Joi schema to validate the user data
const userValidationSchema = Joi.object({
	first_name: Joi.string().min(3).max(30).required().messages({
		"string.base": `"First name" should be a type of 'text'`,
		"string.empty": `"First name" cannot be an empty field`,
		"string.min": `"First name" should have a minimum length of {#limit}`,
		"any.required": `"First name" is a required field`,
	}),

	last_name: Joi.string().min(3).max(30).required().messages({
		"string.base": `"Last name" should be a type of 'text'`,
		"string.empty": `"Last name" cannot be an empty field`,
		"string.min": `"Last name" should have a minimum length of {#limit}`,
		"any.required": `"Last name" is a required field`,
	}),

	mobile: Joi.string()
		.pattern(/^[0-9]{10}$/)
		.required()
		.messages({
			"string.pattern.base": `"Mobile" should be a 10-digit number`,
			"string.empty": `"Mobile" cannot be an empty field`,
			"any.required": `"Mobile" is a required field`,
		}),
	email: Joi.string().required().messages({
		"any.required": `"Email" is a required field`,
	}),

	password: Joi.string().min(8).required().messages({
		"string.base": `"Password" should be a type of 'text'`,
		"string.empty": `"Password" cannot be an empty field`,
		"string.min": `"Password" should have a minimum length of {#limit}`,
		"any.required": `"Password" is a required field`,
	}),

	is_active: Joi.boolean().optional(), // Optional field, defaults to true if not provided
});

module.exports = { userValidationSchema };
