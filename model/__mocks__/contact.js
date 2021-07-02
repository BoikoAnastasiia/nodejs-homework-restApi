const { contacts } = require('./data');

const listContacts = jest.fn((userId, query) => {
  const { limit = 5, offset = 0 } = query;
  return { contacts, total: contacts.length, limit, offset };
});

const getContactById = jest.fn((userId, contactId) => {
  const [contact] = contacts.filter(
    el => String(el.contactId) === String(contactId)
  );
  return contact;
});

const removeContact = jest.fn((userId, contactId) => {
  const index = contacts.findIndex(
    el => String(el.contactId) === String(contactId)
  );
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  return contact;
});

const addContact = jest.fn((userId, body) => {
  contacts.push({ ...body, _id: '60940d30b9f0ed2f5cac96a6' });
  return { ...body, _id: '60940d30b9f0ed2f5cac96a6' };
});

const updateContact = jest.fn((userId, contactId, body) => {
  let [contact] = contacts.filter(el => String(el._id) === String(contactId));
  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

const updateStatusContact = jest.fn((userId, contactId, body) => {
  if (Object.keys(body).length !== 0) {
    let [contact] = contacts.filter(el => String(el._id) === String(contactId));
    if (contact) {
      contact = { ...contact, ...body };
      return contact;
    } else {
      return null;
    }
  }
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
