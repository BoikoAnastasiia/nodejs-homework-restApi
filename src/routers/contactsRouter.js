const express = require('express');
const router = new express.Router();

const { addContactValidation } = require('../middlewares/validationMiddleware');
const { asyncWrapper } = require('../helpers/apiHelpers');
const modelsMiddleware = require('../middlewares/models');
const {
  getContacts,
  getContactById,
  addContact,
  changeContact,
  deleteContact,
} = require('../controllers/contactsController');

router.use(modelsMiddleware);

router.get('/', asyncWrapper(getContacts));
router.get('/:id', asyncWrapper(getContactById));
router.post('/', addContactValidation, asyncWrapper(addContact));
router.put('/:id', addContactValidation, asyncWrapper(changeContact));
router.delete('/:id', asyncWrapper(deleteContact));

module.exports = { contactsRouter: router };
