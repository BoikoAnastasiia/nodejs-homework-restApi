const express = require('express');
const router = express.Router();
const ctrls = require('../../controllers/users');
const guard = require('../../helpers/guard');
const uploadAvatar = require('../../helpers/upload-avatar');

router.patch('/', guard, ctrls.updateSubscriptionStatus);
router.post('/signup', ctrls.signUp);
router.post('/login', ctrls.logIn);
router.post('/logout', guard, ctrls.logOut);
router.get('/current', guard, ctrls.currentRequest);
router.patch(
  '/avatars',
  guard,
  uploadAvatar.single('avatar'),
  ctrls.updateAvatar
);

module.exports = router;
