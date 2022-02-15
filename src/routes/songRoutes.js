const router = require('express').Router();
const auth = require('../controllers/authController');
const song = require('../controllers/songController');

router.get('/', song.getSongs);
router.get('/played/:id', song.incrementSongPlayed)

router.use(auth.protect);

router.get('/:title', song.searchSongs);
router.post('/upload', song.uploadSong);

// router.use(auth.restrictTo(["admin"]));
router.delete('/', song.deleteSong);

module.exports = router;