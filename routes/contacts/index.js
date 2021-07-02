const express = require('express');
const router = express.Router();
const ctrls = require('../../controllers/contacts');
const {
  queryContactsValidation,
  createContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
} = require('../contacts/valid-contacts-route');
const guard = require('../../helpers/guard');

router
  .get('/', guard, queryContactsValidation, ctrls.getAll)
  .post('/', guard, createContactValidation, ctrls.create);
router
  .get('/:contactId', guard, ctrls.getById)
  .delete('/:contactId', guard, ctrls.remove)
  .put('/:contactId', guard, updateContactValidation, ctrls.update);

router.patch(
  '/:contactId/favorite',
  guard,
  updateStatusContactValidation,
  ctrls.updateStatus
);

module.exports = router;
