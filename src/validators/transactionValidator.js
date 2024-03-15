const Joi = require("joi");

const transactionSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().required(),
  amount: Joi.number().required(),
  user: Joi.string().required(), // Assuming user is passed as an ID
});

const validateTransaction = (transactionData) => {
  return transactionSchema.validate(transactionData, { abortEarly: false });
};

module.exports = { validateTransaction };
