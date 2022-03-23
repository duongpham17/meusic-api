const {appError, catchAsync} = require('../utils/catchError');
const CustomisePlaylist = require('../models/customisePlaylistModel');

exports.createCustomisePlaylist = catchAsync(async(req, res, next) => {
    const {name} = req.body;

    const userID = req.user.id

    const customise = await CustomisePlaylist.create({user: userID, name});

    res.status(200).json({
        status: "success",
        customise
    });
});

exports.getCustomisePlaylist = catchAsync(async(req, res, next) => {
    const userID = req.user.id

    const customise = await CustomisePlaylist.find({user: userID}).sort({createdAt: -1})

    res.status(200).json({
        status: "success",
        customise
    });
});

exports.updateCustomisePlaylist = catchAsync(async(req, res, next) => {
    const {_id} = req.body;
    const data = req.body;

    const customise = await CustomisePlaylist.findByIdAndUpdate(_id, data, {new: true});

    res.status(200).json({
        status: "success",
        customise
    });
});

exports.reorderCustomisePlaylist = catchAsync(async(req, res, next) => {
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

exports.duplicateCustomisePlaylist = catchAsync(async(req, res, next) => {
    const {name, song, user} = req.body;

    const customise = await CustomisePlaylist.create({name, song, user});

    res.status(200).json({
        status: "success",
        customise
    });
});


exports.deleteCustomisePlaylist = catchAsync(async(req, res, next) => {
    const id = req.params.id;

    await CustomisePlaylist.findByIdAndDelete(id);

    res.status(200).json({
        status: "success",
    });
});


exports.saveOthersPlaylistToCustomisePlaylist = catchAsync(async(req, res, next) => {
    const {song, name} = req.body;
    const user = req.user.id;

    const customise = await CustomisePlaylist.create({user, name, song});

    res.status(200).json({
        status: "success",
        customise,
    });
});