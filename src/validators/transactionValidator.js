import Joi from "joi";

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const transactionSchema = Joi.object({
  description: Joi.string().min(2).required(),
  amount: Joi.number().min(1).required(),
  date: Joi.string().required(),
});

export default validateTransaction = validator(transactionSchema);
