const mongoose = require('mongoose');

const savedPlaylistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    song: {
        type: mongoose.Schema.ObjectId,
        ref: 'Song',
    },
    artist:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

savedPlaylistSchema.pre("save", function (next){
    const wordConfig = (word) => {
        return String(word)
        .toLowerCase()
        .split(" ")
        .map(el => el.slice(0, 1).toUpperCase() + el.slice(1) )
        .join(" ")
    }
    
    this.artist = wordConfig(this.artist);

    next();
});

const SavedPlaylist = mongoose.model('SavedPlaylist', savedPlaylistSchema);

module.exports = SavedPlaylist;