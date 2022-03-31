const socketController = require('../src/socket');


module.exports = (io) => {

    io.on('connection', socket => {
        socketController.join(socket, io);

        socketController.leave(socket, io);

        socketController.disconnecting(socket, io);

        socketController.disconnect(socket, io);
    });

}