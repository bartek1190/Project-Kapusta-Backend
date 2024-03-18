const Joi = require("joi");

const incomeTransactionSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string().valid("income"),
  category: Joi.string().valid("Salary", "Add. Income").required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
});

const expensesTransactionSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string().valid("expenses"),
  category: Joi.string()
    .valid(
      "Transport",
      "Products",
      "Health",
      "Alcohol",
      "Entertainment",
      "Housing",
      "Technique",
      "Communal, communications",
      "Sports, hobbies",
      "Education",
      "Other"
    )
    .required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
});

const validateIncomeTransaction = (transactionData) => {
  return incomeTransactionSchema.validateAsync(transactionData, {
    abortEarly: false,
  });
};

const validateExpensesTransaction = (transactionData) => {
  return expensesTransactionSchema.validateAsync(transactionData, {
    abortEarly: false,
  });
};

module.exports = { validateIncomeTransaction, validateExpensesTransaction };
