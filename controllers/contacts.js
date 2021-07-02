const Contacts = require('../model/contacts');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { contacts, total, limit, offset } = await Contacts.listContacts(
      userId,
      req.query
    );
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
        total,
        limit,
        offset,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: { contact },
      });
    }
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.addContact(userId, req.body);
    console.log(contact);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: { contact },
      });
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: { message: 'missing fields' },
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.updateStatusContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: { message: 'missing fields' },
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  updateStatus,
};
