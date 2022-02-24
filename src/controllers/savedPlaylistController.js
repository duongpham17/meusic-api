const {appError, catchAsync} = require('../utils/catchError');
const Song = require('../models/songModel');
const SavedPlaylist = require('../models/savedPlaylistModel');

exports.getSavedPlaylist = catchAsync(async(req, res, next) => {
    const userId = req.user.id;
    const sort = req.query.sort;

    const sortQuery = sort === "newest" || sort === "undefined" ? {createdAt: -1} : {artist: 1};
    const findQuery = {user: userId};
    const populate = {path: "song"};

    let saved = await SavedPlaylist.find(findQuery).sort(sortQuery).populate(populate);

    saved = saved.map(el => el.song);

    res.status(200).json({
        status: "success",
        saved
    });
});

exports.addToSavedPlaylist = catchAsync(async(req, res, next) => {
    const songId = req.params.id;

    const userId = req.user.id;

    const exist = await SavedPlaylist.findOne({user: userId, song: songId});

    if(exist) return next(new appError("Song already exist", 401));

    const song = await Song.findById(songId);

    const data = {
        artist: song.artist,
        user: userId,
        song: songId,
    };

    let saved = await SavedPlaylist.create(data);

    saved = await saved.populate("song");

    res.status(200).json({
        status: "success",
        saved: saved.song
    });
});

exports.removeFromSavedPlaylist = catchAsync(async(req, res, next) => {
    const songId = req.params.id;
    const userId = req.user.id;

    await SavedPlaylist.findOneAndDelete({user: userId, song: songId});

    res.status(200).json({
        status: "success",
    });
});