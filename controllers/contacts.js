const contacts = require('../model/index');

const get = async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    return res.json({ status: 'success', code: 200, data: { allContacts } });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'Contact was found',
        data: { contact },
      });
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const contact = await contacts.addContact(req.body);

    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        message: 'Contact was created',
        data: { contact },
      });
    } else {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Contact already exists',
      });
    }
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await contacts.removeContact(req.params.contactId);

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'Contact deleted',
        data: { contact },
      });
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const contact = await contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (JSON.stringify(req.body) === '{}') {
      return res
        .status(400)
        .json({ status: 'error', code: 400, message: 'Missing fields' });
    }
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'Contact was updated',
        data: { contact },
      });
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
};
const updateStatus = async (req, res, next) => {
  try {
    const contact = await contacts.updateStatusContact(
      req.params.contactId,
      req.body
    );
    if (JSON.stringify(req.body) === '{}') {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing fields favorite',
      });
    }
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'Contact was updated',
        data: { contact },
      });
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  updateStatus,
};
