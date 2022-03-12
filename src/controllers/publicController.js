const {catchAsync} = require('../utils/catchError');
const Song = require('../models/songModel');

exports.getAllSongs = catchAsync(async(req, res, next) => {
    const songs = await Song.find().sort({createdAt: -1});

    res.status(200).json({
        status: "success",
        songs
    });
});


exports.searchSongsBasedOnTitle = catchAsync(async(req, res, next) => {  
    const {title} = req.params;

    const songs = await Song.find({title: {$regex: new RegExp(title, "i") }}).limit(30);

    res.status(200).json({
        status: "success",
        songs
    });
});

exports.searchSongsBasedOnArtist = catchAsync(async(req, res, next) => {  
    const {artist} = req.params;

    const songs = await Song.find({artist: {$regex: new RegExp(artist, "i") }}).limit(30);

    res.status(200).json({
        status: "success",
        songs
    });
});

exports.getLimitSongs = catchAsync(async(req, res, next) => {
    const limit = req.params.limit;

    const songs = await Song.find().limit(limit || 30);

    res.status(200).json({
        status: "success",
        songs
    });

});