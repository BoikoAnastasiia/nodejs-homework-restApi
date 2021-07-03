const { HttpCode } = require('./constants');

const role = role => (req, res, next) => {
  const roleUser = req.user.subscription;
  if (roleUser !== role) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: 'error',
      code: HttpCode.FORBIDDEN,
      message: 'Not authorized',
    });
  }
  return next();
};

module.exports = role;
