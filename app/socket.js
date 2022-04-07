const cors = require('./cors');
const socketController = require('../src/socket');

module.exports = (http) => {

    const io = require('socket.io')(http, {cors: {origin: cors.whitelist} });

    io.on('connection', socket => {
        socketController.join(socket, io);

        socketController.leave(socket, io);

        socketController.updateSong(socket, io);

        socketController.changeSong(socket, io);

        socketController.test(socket, io);

        socketController.disconnecting(socket, io);

        socketController.disconnect(socket, io);
    });

}