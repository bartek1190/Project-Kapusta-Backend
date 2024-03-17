const Joi = require("joi");

const transactionSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string().valid("income", "expenses").required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
});

const validateTransaction = (transactionData) => {
  return transactionSchema.validateAsync(transactionData, {
    abortEarly: false,
  });
};

module.exports = { validateTransaction };
