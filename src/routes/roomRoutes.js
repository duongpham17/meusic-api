const router = require('express').Router();
const auth = require('../controllers/authController');
const room = require('../controllers/roomController');

router.use(auth.protect);

router.get('/', room.getMyRooms);
router.post('/', room.create);
router.get('/:name', room.getRoom);
router.get('/search/:name', room.search);
router.patch('/private', room.private);
router.post('/password', room.checkPassword);
router.delete('/:id', room.delete);

module.exports = router;