const router = require('express').Router();
const user = require('../controllers/userController');
const auth = require('../controllers/authController');

router.use(auth.protect);

router.patch('/username', user.updateUsername);
router.patch('/email', user.requestEmailChange);
router.patch('/email/confirm', user.updateEmailConfirm);
router.patch('/crypto/address', user.updateCryptoAddress);
router.patch('/crypto/:address', user.removeCryptoAddress);

module.exports = router;