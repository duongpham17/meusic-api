const router = require('express').Router();
const auth = require('../controllers/authController');

router.get('/persist', auth.protect, auth.loggedIn);

router.post('/login/email', auth.login);
router.post('/signup/email', auth.signupEmail);
router.post('/signup/username', auth.signupUsername);
router.post('/confirm/:code', auth.confirmEmail);
router.post('/confirm', auth.confirmCode);

module.exports = router;