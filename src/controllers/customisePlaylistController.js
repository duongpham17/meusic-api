const {appError, catchAsync} = require('../utils/catchError');
const CustomisePlaylist = require('../models/customisePlaylistModel');
const Songs = require('../models/songModel');

exports.create = catchAsync(async(req, res, next) => {
    const {name} = req.body;

    const userID = req.user.id

    const customise = await CustomisePlaylist.create({user: userID, name});

    res.status(200).json({
        status: "success",
        customise
    });
});

exports.getAll = catchAsync(async(req, res, next) => {
    const userID = req.user.id

    const customise = await CustomisePlaylist.find({user: userID}).sort({createdAt: -1})

    res.status(200).json({
        status: "success",
        customise
    });
});

exports.update = catchAsync(async(req, res, next) => {
    const {_id} = req.body;
    const data = req.body;

    const customise = await CustomisePlaylist.findByIdAndUpdate(_id, data, {new: true});

    res.status(200).json({
        status: "success",
        customise
    });
});

exports.reorder = catchAsync(async(req, res, next) => {
    const data = req.body;

    const sortedDateByNewest = data.map(el => el.createdAt).sort((a, b) => new Date(b) - new Date(a));

    for(let index in data){
        const playlist = data[index];
        const createdAt = sortedDateByNewest[index];
        const positionChanged = playlist.createdAt !== createdAt;
        if(positionChanged) await CustomisePlaylist.findByIdAndUpdate(playlist._id, {createdAt});
    };

    res.status(200).json({
        status: "success"
    });
})

exports.duplicate = catchAsync(async(req, res, next) => {
    const {name, song, user} = req.body;

    const customise = await CustomisePlaylist.create({name, song, user});

    res.status(200).json({
        status: "success",
        customise
    });
});


exports.delete = catchAsync(async(req, res, next) => {
    const id = req.params.id;

    await CustomisePlaylist.findByIdAndDelete(id);

    res.status(200).json({
        status: "success",
    });
});


exports.savePlaylist = catchAsync(async(req, res, next) => {
    const {song, name} = req.body;
    const user = req.user.id;

    const customise = await CustomisePlaylist.create({user, name, song});

    res.status(200).json({
        status: "success",
        customise,
    });
});

exports.generateRandomPlaylist = catchAsync(async(req, res, next) => {
    const [TOTAL_RANDOM_SONG_ALLOWED, LIMIT_RESULTS ] = [30, 100]; 
    const TOTAL_SONGS = await Songs.countDocuments();
    const TOTAL_PAGES = Math.floor(TOTAL_SONGS / LIMIT_RESULTS);
    const generateRandomNumber = (number) => Math.floor(Math.random() * number);

    const song = [];

    while(song.length <= TOTAL_RANDOM_SONG_ALLOWED){
        const songsAddedSoFar = song.length;
        if(songsAddedSoFar ===  TOTAL_RANDOM_SONG_ALLOWED) break; 

        const skip = generateRandomNumber(TOTAL_PAGES);
        const songs = await Songs.find().limit(LIMIT_RESULTS).skip(LIMIT_RESULTS * skip);
        const currentTotalSongs = songs.length;

        for (let i = 0; i < 10; i++) {
            const randomIndex = generateRandomNumber(currentTotalSongs);
            song.push(songs[randomIndex]);    
        };

    }

    const generateRandomName = (string) => {
        const array = string.split(" ");
        const stringLength = array.length;
        const word = array[generateRandomNumber(stringLength)];
        return word;
    };

    const word1 = generateRandomName(song[generateRandomNumber(TOTAL_RANDOM_SONG_ALLOWED)].song);
    const word2 = generateRandomName(song[generateRandomNumber(TOTAL_RANDOM_SONG_ALLOWED)].song);

    const name = `${word1} ${word2}`.replace(/[\])}[{(]/g, '');

    const customise = await CustomisePlaylist.create({user: req.user.id, name, song});

    res.status(200).json({
        status: "success",
        customise
    });
});