const mongoose = require('mongoose');

const othersPlaylistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    others: {
        type: mongoose.Schema.ObjectId,
        ref: 'CustomisePlaylist',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const OthersPlaylist = mongoose.model('OthersPlaylist', othersPlaylistSchema);

module.exports = OthersPlaylist;