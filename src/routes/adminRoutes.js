const router = require('express').Router();
const admin = require('../controllers/adminController');
const auth = require('../controllers/authController');

router.use(auth.protect, auth.restrictTo("admin"));

router.patch('/songs/keys', admin.updateSongsKeys);
router.patch('/songs/information', admin.updateSong);
router.delete('/songs/:id', admin.deleteSong);
router.delete('/cid', admin.deleteAllFromStorage);

module.exports = router;