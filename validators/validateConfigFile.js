const Joi = require('joi');

const configFileSchema = Joi.object().keys({
  urls: Joi.array().items(Joi.string().uri().required()).required().messages({
    'any.required': 'urls is required field',
  }),
  interval: Joi.number().greater(0),
  threshold: Joi.number().greater(0),
});

const validator = schema => payload =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

exports.validateConfigFile = validator(configFileSchema);
