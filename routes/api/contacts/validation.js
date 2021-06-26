const Joi = require('joi');
const HttpCodes = require('../../../helpers/httpCodes');

const createContact = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().min(3).max(50).required(),
  phone: Joi.string().alphanum().min(1).max(50).optional(),
  subscription: Joi.string().alphanum().optional(),
});

const updateContact = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().min(3).max(50).optional(),
  phone: Joi.string().alphanum().min(1).max(50).optional(),
  subscription: Joi.string().alphanum().optional(),
});

const getAllContacts = Joi.object({
  page: Joi.string().min(1).optional(),
  limit: Joi.string().min(1).optional(),
  sub: Joi.string().min(1).optional(),
});

module.exports.createContact = (req, _res, next) => {
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return next({ status: HttpCodes.BAD_REQUEST, message: 'missing fields' });
  }

  const { error } = createContact.validate(body);

  if (error) {
    const [{ type, path, message }] = error.details;

    return next({
      status: HttpCodes.BAD_REQUEST,
      message:
        type === 'any.required'
          ? `missing required ${path[0]} field`
          : message.replace(/"/g, ''),
    });
  } else {
    next();
  }
};

module.exports.updateContact = (req, _res, next) => {
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return next({ status: HttpCodes.BAD_REQUEST, message: 'missing fields' });
  }

  const { error } = updateContact.validate(body);

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: HttpCodes.BAD_REQUEST,
      message: message.replace(/"/g, ''),
    });
  } else {
    next();
  }
};

module.exports.getAllContacts = (req, _res, next) => {
  const { page, limit } = req.query;

  const { error } = getAllContacts.validate({ page, limit });

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: HttpCodes.BAD_REQUEST,
      message: message.replace(/"/g, ''),
    });
  } else {
    next();
  }
};
