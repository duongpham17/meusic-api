const Room = require('../models/roomModel');

exports.join = (socket, io) => {
    socket.on('joinRoom', async data => {
        const {room, _id} = data.room;
        const {user} = data;

        user.socketId = socket.id

        const roomData = await Room.findByIdAndUpdate(_id, 
            {$push: {online: user}}, 
            {new: true}
        );

        socket.join(room);
        io.to(room).emit('joinedRoom', roomData);
    });
};

exports.leave = (socket, io) => {
    socket.on('leaveRoom', async data => {
        const {room, _id} = data.room;
        const {user} = data;
        const roomData = await Room.findByIdAndUpdate(_id, {$pull: {online: {_id: user._id}}}, {new: true});
        socket.leave(room);
        io.to(room).emit('leftRoom', roomData);
    });
};

exports.disconnecting = (socket, io) => {
    socket.on('disconnecting', async () => {
        const inRoom = await Room.findOne({online: {$elemMatch: {socketId: socket.id}}});
        if(inRoom) {
            const {_id} = inRoom;
            const roomData = await Room.findByIdAndUpdate(_id, {$pull: {online: {socketId: socket.id}}}, {new: true});
            const {room} = roomData;
            io.to(room).emit('leftRoom', roomData);
        }
    });
};

exports.disconnect = (socket, io) => {
    socket.on('disconnect', async () => {

    });
};