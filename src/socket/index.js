const Room = require('../models/roomModel');

exports.join = (socket, io) => {
    socket.on('joinRoom', async data => {
        const {room, _id} = data.room;
        const {user} = data;

        user.socketId = socket.id

        let roomData = await Room.findById(_id);

        const exist = roomData.online.some(el => el.username === user.username);

        if(!exist) {
            roomData.online.push(user);
            await roomData.save();
        }

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

exports.updateSong = (socket, io) => {
    socket.on('updateSong', async (data) => {
        const {type, index, room, song} = data;

        let roomData;

        if(type === "remove"){
            roomData = await Room.findOne({room});

            roomData.songs.splice(index, 1);

            roomData = await roomData.save({new: true});
        };

        if(type === "add"){
            roomData = await Room.findOne({room});

            roomData.songs.push(song);

            roomData = await roomData.save({new: true});
        };

        if(type === "addPlaylist") {
            roomData = await Room.findOne({room});

            roomData.songs = [...roomData.songs, ...song];

            roomData = await roomData.save({new: true});
        };

        if(type === "clear") {
            roomData = await Room.findOneAndUpdate({room}, {songs: []}, {new: true});
        }

        io.to(room).emit('updatedSong', roomData)
    });
};

exports.changeSong = (socket, io) => {
    socket.on('changeSong', async (data) => {
        const {index, room} = data;

        const roomData = await Room.findOneAndUpdate({room}, {index}, {new: true});

        io.to(room).emit('changedSong', roomData)
    });
}

exports.test = (socket, io) => {
    socket.on("test", (data) => {
        console.log(data)

        io.emit("tested", {user: "hello"})
    })
}