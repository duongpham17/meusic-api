const router = require('express').Router();
const auth = require('../controllers/authController');
const song = require('../controllers/songController');

router.get('/', song.getSongs);
router.get('/all', song.getAllSongs);
router.get('/limit/:limit', song.getLimitSongs);
router.get('/search/:title', song.searchSongs);
router.get('/played/:id', song.incrementSongPlayed);
router.get('/total', song.getTotalSongs);

router.use(auth.protect);
router.post('/upload', song.uploadSong);
router.post('/upload/test', song.uploadTesting);

module.exports = router;