const joi = require('joi');

const userValidation = joi.object({
  email: joi.string()
    .required()
    .email({ tlds: { allow: ['com', 'net', 'io'] } }),
  password: joi.string()
    .required()
    .max(22)
    .min(2),
});
module.exports = userValidation;
