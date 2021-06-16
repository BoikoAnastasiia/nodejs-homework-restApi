const express = require('express');
const router = new express.Router();

const { addPostValidation } = require('../middlewares/validationMiddleware');
const { asyncWrapper } = require('../helpers/apiHelpers');
const modelsMiddleware = require('../middlewares/models');
const {
  getcontacts,
  getPostById,
  addPost,
  changePost,
  deletePost,
} = require('../controllers/contactsController');

router.use(modelsMiddleware);

router.get('/', asyncWrapper(getcontacts));
router.get('/:id', asyncWrapper(getPostById));
router.post('/', addPostValidation, asyncWrapper(addPost));
router.put('/:id', addPostValidation, asyncWrapper(changePost));
router.delete('/:id', asyncWrapper(deletePost));

module.exports = { contactsRouter: router };
