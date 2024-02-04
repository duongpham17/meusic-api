const router = require('express').Router();
const auth = require('../controllers/authController');
const othersPlaylist = require('../controllers/othersPlaylistController');

router.use(auth.protect);

router.get('/', othersPlaylist.getAll);
router.post('/:id', othersPlaylist.save);
router.get('/:name', othersPlaylist.search);
router.delete('/:id', othersPlaylist.delete);

module.exports = router;