const joi = require('joi');

const messageValidator = joi.object({
  id: joi
    .number()
    .integer()
    .positive(),
  channel_id: joi
    .number()
    .integer(),
  user_id: joi
    .number()
    .integer()
    .positive(),
  textMsg: joi
    .string()
    .required(),
});

module.exports = messageValidator;
