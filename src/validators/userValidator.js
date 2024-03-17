const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateBalanceSchema = Joi.object({
  balance: Joi.number().min(0.01).required(),
});

const validateRegister = (userData) => {
  return registerSchema.validateAsync(userData, { abortEarly: false });
};

const validateLogin = (userData) => {
  return loginSchema.validateAsync(userData, { abortEarly: false });
};

const validateUpdateBalance = (userData) => {
  return updateBalanceSchema.validateAsync(userData, { abortEarly: false });
};

module.exports = { validateRegister, validateLogin, validateUpdateBalance };
