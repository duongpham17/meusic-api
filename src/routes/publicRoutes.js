const router = require('express').Router();
const song = require('../controllers/songController');

router.get('/songs', song.getSongs);
router.get('/songs/:title', song.searchSongs);

module.exports = router;