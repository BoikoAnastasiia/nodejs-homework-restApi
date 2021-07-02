const { User, users } = require('./data');

const findById = jest.fn(contactId => {
  const [user] = users.filter(el => String(el.contactId) === String(contactId));
  return user;
});

const findByEmail = jest.fn(email => {
  return {};
});

const create = jest.fn(userOptions => {
  return {};
});

const updateToken = jest.fn((contactId, token) => {
  return {};
});

const updateAvatar = jest.fn((contactId, avatar) => {
  const [user] = users.filter(el => String(el._id) === String(contactId));
  user.avatar = avatar;
  return user;
});

const updateSubscription = jest.fn((userId, body) => {
  if (Object.keys(body).length !== 0) {
    return {};
  } else {
    return null;
  }
});

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
};
