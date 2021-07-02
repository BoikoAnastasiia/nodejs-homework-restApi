const User = require('./schemas/user');

const findById = async contactId => {
  return await User.findOne({ _id: contactId });
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const create = async userOptions => {
  const user = new User(userOptions);
  return await user.save();
};

const updateToken = async (contactId, token) => {
  return await User.updateOne({ _id: contactId }, { token });
};

const updateAvatar = async (contactId, avatar) => {
  return await User.updateOne({ _id: contactId }, { avatar });
};

const updateSubscription = async (userId, body) => {
  if (Object.keys(body).length !== 0) {
    const result = await User.findByIdAndUpdate(
      { _id: userId },
      { ...body },
      { new: true }
    );
    return result;
  } else {
    return null;
  }
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
};
