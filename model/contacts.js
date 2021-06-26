const Contact = require('./schemas/contactSchema');
const { Subscriptions } = require('../helpers/constants');
const filterDefault = Subscriptions.values;

const addContact = async body => {
  return await Contact.create(body);
};

const listContacts = async (userId, query) => {
  const { page = '1', limit = '20', sub: filter = filterDefault } = query;

  const results = await Contact.paginate(
    { owner: userId, subscription: filter },
    {
      page,
      limit,
      populate: { path: 'owner', select: 'email' },
    }
  );
  const { docs: contacts, totalDocs: totalContacts, totalPages } = results;

  return {
    page,
    limit,
    totalContacts: totalContacts.toString(),
    totalPages: totalPages.toString(),
    contacts,
  };
};

const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId }).populate({
    path: 'owner',
    select: 'email',
  });
};

const updateContact = async (contactId, body, userId) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
};

const removeContact = async (contactId, userId) => {
  return await Contact.findOneAndRemove({ _id: contactId, owner: userId });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
