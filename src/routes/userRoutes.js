const router = require('express').Router();
const user = require('../controllers/userController');
const auth = require('../controllers/authController');

router.use(auth.protect);

router.patch('/username', user.updateUsername);

module.exports = router;