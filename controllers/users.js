const Users = require('../model/users');
const jwt = require('jsonwebtoken');
const jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');
const { HttpCode } = require('../helpers/constants');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signUp = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email in use',
    });
  }
  try {
    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatar,
      },
    });
  } catch (e) {
    console.log('test');
    next(e);
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidPassword = user?.validPassword(password);
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Email or password is wrong',
    });
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });
  await Users.updateToken(user.id, token);
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    message: {
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const logOut = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const currentRequest = async (req, res, next) => {
  const id = req.user.id;
  const user = await Users.findById(id);
  return res.json({
    status: 'success',
    code: 200,
    data: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const updateSubscriptionStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await Users.updateSubscription(userId, req.body);
    if (user) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          user,
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

const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  const avatarUrl = await saveAvatarUser(req);
  await Users.updateAvatar(id, avatarUrl);
  return res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } });
};

const saveAvatarUser = async req => {
  const FOLDER_AVATARS = process.env.FOLDER_AVATARS;
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`;
  const img = await jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
  try {
    await fs.rename(
      pathFile,
      path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar)
    );
  } catch (error) {
    console.log(error.message);
  }
  const oldAvatar = req.user.avatar;
  if (oldAvatar.includes(`${FOLDER_AVATARS}/`)) {
    await fs.unlink(path.join(process.cwd(), 'public', oldAvatar));
  }
  return path.join(FOLDER_AVATARS, newNameAvatar).replace('\\', '/');
};

module.exports = {
  signUp,
  logIn,
  logOut,
  currentRequest,
  updateSubscriptionStatus,
  updateAvatar,
};
