import Joi from "joi";

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const userSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().min(8).required(),
});

export default validateUser = validator(userSchema);
