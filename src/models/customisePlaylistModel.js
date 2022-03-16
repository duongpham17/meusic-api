const mongoose = require('mongoose');

const customisePlaylistSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    song: [
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
    }
});

const CustomisePlaylist = mongoose.model('CustomisePlaylist', customisePlaylistSchema);

module.exports = CustomisePlaylist;