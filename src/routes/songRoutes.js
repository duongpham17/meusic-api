const router = require('express').Router();
const auth = require('../controllers/authController');
const song = require('../controllers/songController');

router.get('/', song.getSongs);
router.get('/total', song.getTotalSongs);
router.get('/played/:id', song.playedCounter);

router.use(auth.protect);
router.post('/upload', song.upload);

module.exports = router;