const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/users');
const schema = require('./validation');
const guard = require('../../../helpers/guard');

router
  .post('/register', schema.createUser, usersController.register)
  .post('/login', schema.loginUser, usersController.login)
  .post('/logout', guard, usersController.logout);

router.patch(
  '/',
  guard,
  schema.updateSubscrUser,
  usersController.updateSubscription
);

module.exports = router;
