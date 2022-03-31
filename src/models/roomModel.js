const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    admin:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    room: {
        type: String,
    },
    verified: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        }
    ],
    online: [
        {
            _id:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
            username: {
                type: String
            },
            socketId: {
                type: String
            }
        }
    ],
    private: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        select: false
    },
    songs:[
        {
            title:{
                type: String,
            },
            artist:{
                type: String,
            },
            song: {
                type: String,
            },
            url: {
                type: String,
                trim: true,
            },
            cid: {
                type: String,
                trim: true
            },
            duration: {
                type: Number
            },
            image: {
                type: String,
                trim: true,
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;