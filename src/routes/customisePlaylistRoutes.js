const router = require('express').Router();
const auth = require('../controllers/authController');
const customisePlaylist = require('../controllers/customisePlaylistController');

router.use(auth.protect);

router.get('/', customisePlaylist.getCustomisePlaylist);
router.post('/', customisePlaylist.createCustomisePlaylist);
router.patch('/', customisePlaylist.updateCustomisePlaylist);
router.post('/duplicate', customisePlaylist.duplicateCustomisePlaylist);
router.delete('/:id', customisePlaylist.deleteCustomisePlaylist);
router.post('/others', customisePlaylist.saveOthersPlaylistToCustomisePlaylist)

module.exports = router;