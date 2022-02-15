const mongoose = require('mongoose');

const customisePlaylistSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    song: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const CustomisePlaylist = mongoose.model('CustomisePlaylist', customisePlaylistSchema);

module.exports = CustomisePlaylist;