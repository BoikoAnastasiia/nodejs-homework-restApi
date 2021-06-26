const Joi = require('joi');
const HttpCodes = require('../../../helpers/httpCodes');
const { Subscriptions } = require('../../../helpers/constants');

const createUser = Joi.object({
  email: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(50).alphanum().required(),
  subscription: Joi.string().min(1).max(50).alphanum().optional(),
});

const loginUser = Joi.object({
  email: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(50).alphanum().required(),
});

const updateSubscrUser = Joi.object({
  subscription: Joi.string()
    .min(1)
    .max(50)
    .required()
    .valid(...Subscriptions.values),
});

module.exports.createUser = (req, _res, next) => {
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return next({ status: HttpCodes.BAD_REQUEST, message: 'missing fields' });
  }

  const { error } = createUser.validate(body);

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

module.exports.loginUser = (req, _res, next) => {
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return next({ status: HttpCodes.BAD_REQUEST, message: 'missing fields' });
  }

  const { error } = loginUser.validate(body);

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

module.exports.updateSubscrUser = (req, _res, next) => {
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return next({ status: HttpCodes.BAD_REQUEST, message: 'missing fields' });
  }

  const { error } = updateSubscrUser.validate(body);

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
