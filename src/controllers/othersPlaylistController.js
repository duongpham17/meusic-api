const {appError, catchAsync} = require('../utils/catchError');
const Others = require('../models/othersPlaylistModel');
const Customise = require('../models/customisePlaylistModel');

exports.getOthersPlaylist = catchAsync(async(req, res, next) => {
    const user = req.user.id;

    let others = await Others.find({user}).populate("others");

    others.forEach(async el => !el.others && await Others.findByIdAndDelete(el._id, {new:true}));

    others = others.map(el => el.others);

    res.status(200).json({
        status: "success",
        others
    });
});

exports.searchOthersPlaylist = catchAsync(async(req, res, next) => {
    const name = req.params.name;

    let others = await Customise.find({name: {$regex: new RegExp(name, "i") }}).limit(40);

    others = others.map(el => { return {
        image: el?.song[0]?.image,
        songs: el.song.length,
        _id: el._id,
        name: el.name
    }});

    res.status(200).json({
        status: "success",
        others,
    });
});

exports.saveOthersPlaylist = catchAsync(async(req, res, next) => {
    const others = req.params.id;
    const user = req.user.id;

    const exist = await Others.find({user, others});

    if(exist.length) return next(new appError("Already saved", 401));

    let data = await Others.create({user, others});

    data = await data.populate('others');

    res.status(200).json({
        status: "success",
        others: data.others
    });
});

exports.deleteOthersPlaylist = catchAsync(async(req, res, next) => {
    const others = req.params.id;

    await Others.findOneAndDelete({others});

    res.status(200).json({
        status: "success",
    });

})