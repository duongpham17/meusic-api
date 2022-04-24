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
    cid: {
        type: String,
        trim: true
    },
    cidRemoved: {
        type: Boolean,
        default: false
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
    },
});

songSchema.pre("save", function (next){
    const stringFilter = (string) => {   
        const regexStringWithOffical =  /(official video|official audio|official animated video|official audio|official lyric video|official music video|clip official|official video edit)/g;
        const regexOtherStrings = /(lyrics|lyric|lyric video|video|audio)/g;
        const regexEmoji = /\p{Emoji}/gu;
        const regexParentheses = "()";
        const regexArray = "[]"
        const regexBrackets = "{}";

        const newString = string
            .toLowerCase()
            .replace(regexStringWithOffical, "")
            .replace(regexOtherStrings, "")
            .replace(regexEmoji, "")
            .replace(regexParentheses, "")
            .replace(regexArray, "")
            .replace(regexBrackets, "")
            .split(" ")
            .map(el => el.slice(0, 1).toUpperCase() + el.slice(1) )
            .join(" ");

        return newString
    }
    
    this.title = stringFilter(this.title)
    this.artist = stringFilter(this.artist);
    this.song = stringFilter(this.song);

    next();
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;