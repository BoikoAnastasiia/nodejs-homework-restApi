require('../config/passport');
const passport = require('passport');
const HttpCodes = require('./httpCodes');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const token = req.get('Authorization')?.split(' ')[1];

    if (!user || err || !token || token !== user.token) {
      return res
        .status(HttpCodes.UNAUTHORIZED)
        .json({ message: 'Not authorized' });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
