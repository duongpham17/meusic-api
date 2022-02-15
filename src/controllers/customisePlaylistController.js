const {appError, catchAsync} = require('../utils/CatchError');
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

    const customise = await CustomisePlaylist.find({user: userID});

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