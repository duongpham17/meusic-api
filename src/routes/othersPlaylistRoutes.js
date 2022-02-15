const router = require('express').Router();
const auth = require('../controllers/authController');
const others = require('../controllers/othersPlaylistController');

router.use(auth.protect);

router.get('/', others.getOthersPlaylist);
router.post('/:id', others.saveOthersPlaylist);
router.get('/:name', others.findOthersPlaylist);
router.delete('/:id', others.deleteOthersPlaylist);

module.exports = router;