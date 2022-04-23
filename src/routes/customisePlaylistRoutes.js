const router = require('express').Router();
const auth = require('../controllers/authController');
const customisePlaylist = require('../controllers/customisePlaylistController');

router.use(auth.protect);

router.get('/', customisePlaylist.getAll);
router.post('/', customisePlaylist.create);
router.patch('/', customisePlaylist.update);
router.post('/duplicate', customisePlaylist.duplicate);
router.delete('/:id', customisePlaylist.delete);
router.patch('/reorder', customisePlaylist.reorder);
router.post('/save', customisePlaylist.savePlaylist);
router.get('/randomise', customisePlaylist.generateRandomPlaylist)

module.exports = router;