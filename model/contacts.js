const Contacts = require('./schemas/contact');

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDecs,
    filter,
    favorite = null,
    limit = 5,
    offset = 0,
  } = query;
  const optionsSearch = { owner: userId };
  if (favorite !== null) {
    optionsSearch.favorite = favorite;
  }
  const results = await Contacts.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDecs ? { [`${sortByDecs}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'name email phone',
    },
  });
  const { docs: contacts, totalDocs: total } = results;
  return { contacts, total, limit, offset };
};

const getContactById = async (userId, contactId) => {
  const result = await Contacts.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email phone',
  });
  return result;
};

const removeContact = async (userId, contactId) => {
  const result = await Contacts.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contacts.create({ ...body, owner: userId });
  return result;
};

const updateContact = async (userId, contactId, body) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const updateStatusContact = async (userId, contactId, body) => {
  if (Object.keys(body).length !== 0) {
    const result = await Contacts.findByIdAndUpdate(
      { _id: contactId, owner: userId },
      { ...body },
      { new: true }
    );
    return result;
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
