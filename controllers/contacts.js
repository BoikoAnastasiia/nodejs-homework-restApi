const Contacts = require('../model/contacts');
const HttpCodes = require('../helpers/httpCodes');

const getAllContacts = async (req, res, next) => {
  const userId = req.user.id;
  const { query } = req;

  try {
    const contacts = await Contacts.listContacts(userId, query);

    return res.status(HttpCodes.OK).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;

  try {
    const contact = await Contacts.getContactById(contactId, userId);

    if (contact) {
      return res.status(HttpCodes.OK).json(contact);
    } else {
      return res.status(HttpCodes.NOT_FOUND).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  const { body } = req;
  const userId = req.user.id;

  try {
    const newContact = await Contacts.addContact({ ...body, owner: userId });

    if (newContact) {
      return res.status(HttpCodes.CREATED).json(newContact);
    }
  } catch (error) {
    next(error);
  }
};

const removeContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;

  try {
    const isDeletedContact = await Contacts.removeContact(contactId, userId);

    if (isDeletedContact) {
      res.status(HttpCodes.OK).json({ message: 'contact deleted' });
    } else {
      res.status(HttpCodes.NOT_FOUND).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  const { params, body } = req;
  const { contactId } = params;
  const userId = req.user.id;

  try {
    const updatedContact = await Contacts.updateContact(
      contactId,
      body,
      userId
    );

    if (updatedContact) {
      return res.status(HttpCodes.OK).json(updatedContact);
    } else {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
};
