const router = require('express').Router();
const auth = require('../controllers/authController');
const savedPlaylist = require('../controllers/savedPlaylistController');

router.use(auth.protect)

router.get('/', savedPlaylist.getSavedPlaylist);
router.post('/:id', savedPlaylist.addToSavedPlaylist);
router.delete('/:id', savedPlaylist.removeFromSavedPlaylist);

module.exports = router;