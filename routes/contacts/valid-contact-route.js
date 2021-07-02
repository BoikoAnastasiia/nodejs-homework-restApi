const Joi = require('joi');

const schemaCreateContacts = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string().required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  favorite: Joi.boolean(),
}).or('name', 'phone', 'email', 'favorite');

const schemaQueryContacts = Joi.object({
  sortBy: Joi.string().valid('name', 'email', 'phone').optional(),

  sortByDecs: Joi.string().valid('name', 'email', 'phone').optional(),

  filter: Joi.string().optional(),

  limit: Joi.number().integer().min(1).max(50).optional(),

  offset: Joi.number().integer().min(0).optional(),

  favorite: Joi.boolean(),
}).without('sortBy', 'sortByDecs');

const schemaUpdateContacts = Joi.object({
  name: Joi.string().min(3).max(30).optional(),

  phone: Joi.string().optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),

  favorite: Joi.boolean().optional(),
});

const schemaStatusContactValidation = Joi.object({
  favorite: Joi.boolean().optional(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    next({ status: 400, message: err.message.replace(/"/g, "'") });
  }
};

module.exports = {
  queryContactsValidation: async (req, res, next) => {
    return await validate(schemaQueryContacts, req.query, next);
  },
  createContactValidation: async (req, res, next) => {
    return await validate(schemaCreateContacts, req.body, next);
  },
  updateContactValidation: async (req, res, next) => {
    return await validate(schemaUpdateContacts, req.body, next);
  },
  updateStatusContactValidation: async (req, res, next) => {
    return await validate(schemaStatusContactValidation, req.body, next);
  },
};
