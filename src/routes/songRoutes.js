const router = require('express').Router();
const auth = require('../controllers/authController');
const song = require('../controllers/songController');

router.get('/', song.getSongs);
router.get('/played/:id', song.incrementSongPlayed)
router.get('/:title', song.searchSongs);

router.use(auth.protect);
router.post('/upload', song.uploadSong);
router.post('/upload/test', song.uploadTesting);

module.exports = router;