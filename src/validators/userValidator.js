const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateRegister = (userData) => {
  return registerSchema.validate(userData, { abortEarly: false });
};

const validateLogin = (userData) => {
  return loginSchema.validate(userData, { abortEarly: false });
};

module.exports = { validateRegister, validateLogin };
