const {appError, catchAsync} = require('../utils/CatchError');
const Song = require('../models/songModel');
const SavedPlaylist = require('../models/savedPlaylistModel');

exports.getSavedPlaylist = catchAsync(async(req, res, next) => {
    const userId = req.user.id;

    const query = {user: userId};
    const populate = {path: "song"};

    let saved = await SavedPlaylist.find(query).sort({artist: 1}).populate(populate);

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
        ...song._doc,
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