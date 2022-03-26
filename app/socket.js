const Socket = require('../src/socket');

module.exports = (http) => {
    const io = require('socket.io')(http);

    io.on('connection', socket => {
        Socket.join(socket, io);
    });
}