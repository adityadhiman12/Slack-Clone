const joi = require('joi');

const channelValidator = joi.object({
  id: joi
    .number()
    .integer()
    .positive(),
  name: joi.string().required(),
});

module.exports = channelValidator;
