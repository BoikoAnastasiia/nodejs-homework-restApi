const express = require('express');
const router = express.Router();
const schema = require('./validation');
const contactsController = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');

router
  .get('/', guard, schema.getAllContacts, contactsController.getAllContacts)
  .post('/', guard, schema.createContact, contactsController.createContact);

router
  .get('/:contactId', guard, contactsController.getContactById)
  .delete('/:contactId', guard, contactsController.removeContactById)
  .patch(
    '/:contactId',
    guard,
    schema.updateContact,
    contactsController.updateContactById
  );

module.exports = router;
