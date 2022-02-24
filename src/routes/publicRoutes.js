const router = require('express').Router();
const public = require('../controllers/publicController');

router.get('/', public.getSongs);
router.get('/all', public.getAllSongs);
router.get('/title/:title', public.searchSongsBasedOnTitle);
router.get('/artist/:artist', public.searchSongsBasedOnArtist);
router.get('/limit/:limit', public.getLimitSongs);

module.exports = router;