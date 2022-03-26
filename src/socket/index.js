
exports.join = (socket, io) => {
    socket.on('join', async data => {
        const {room} = data;

        socket.join(room);

        io.to(room).emit('joined', "user something");
    });
};

