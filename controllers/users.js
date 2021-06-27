require('dotenv').config();
const jwt = require('jsonwebtoken');
const Users = require('../model/users');
const HttpCodes = require('../helpers/httpCodes');
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findByEmail(email);

    if (user) {
      return res.status(HttpCodes.CONFLICT).json({
        message: 'Email in use',
      });
    }

    const newUser = await Users.create(email, password);

    return res.status(HttpCodes.CREATED).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        message: 'Email or password is wrong',
      });
    }

    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '3h' });

    await Users.updateToken(id, token);

    return res.status(HttpCodes.OK).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const userId = req.user.id;

  try {
    await Users.updateToken(userId, null);

    return res.status(HttpCodes.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};


const updateSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const userId = req.user.id;

  try {
    const user = await Users.updateSubscription(userId, subscription);

    return res.status(HttpCodes.OK).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, updateSubscription };
