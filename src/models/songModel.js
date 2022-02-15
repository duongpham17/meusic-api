const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
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
    duration: {
        type: Number
    },
    image: {
        type: String,
        trim: true,
    },
    played: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

songSchema.pre("save", function (next){
    const wordConfig = (word) => {
        return String(word)
        .toLowerCase()
        .split(" ")
        .map(el => el.slice(0, 1).toUpperCase() + el.slice(1) )
        .join(" ")
    }
    
    this.title = wordConfig(this.title)
    this.artist = wordConfig(this.artist);
    this.song = wordConfig(this.song);

    next();
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;