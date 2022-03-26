const router = require('express').Router();
const auth = require('../controllers/authController');
const room = require('../controllers/roomController');

router.use(auth.protect);

router.get('/', room.getMyRooms);
router.post('/', room.createRoom);
router.get('/search/:name', room.searchRooms);
router.get('/:name', room.getRoom);
router.patch('/private', room.privateRoom);
router.delete('/:id', room.deleteRoom);


module.exports = router;