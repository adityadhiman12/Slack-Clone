const joi = require('joi');

const loginValidation = joi.object({
  email: joi.string()
    .required(),
  password: joi.string()
    .required()
    .min(3)
    .max(22),
});

module.exports = loginValidation;
