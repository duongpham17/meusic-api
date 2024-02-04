const router = require('express').Router();
const auth = require('../controllers/authController');
const savedPlaylist = require('../controllers/savedPlaylistController');

router.use(auth.protect)

router.get('/', savedPlaylist.getAll);
router.post('/:id', savedPlaylist.add);
router.delete('/:id', savedPlaylist.delete);

module.exports = router;