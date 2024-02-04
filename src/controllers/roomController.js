const {appError, catchAsync} = require('../utils/catchError');
const Room = require('../models/roomModel');


exports.getMyRooms = catchAsync(async(req, res, next) => {
    const userID = req.user.id;

    const room = await Room.find({admin: userID}).sort({createdAt: -1});

    res.status(200).json({
        status: "success",
        room
    });
});

exports.search = catchAsync(async(req, res, next) => {
    const name = req.params.name;

    const query = {
        room: {$regex: new RegExp(name, "i") }
    };

    const room = await Room.find(query).select(["room", "private"]);

    res.status(200).json({
        status: "success",
        room
    });
});

exports.create = catchAsync(async(req, res, next) => {
    const {name} = req.body;
    const admin = req.user.id;

    const roomExist = await Room.findOne({room : name});

    if(roomExist) return next(new appError("exist", 400));

    const room = await Room.create({room: name, admin});

    res.status(200).json({
        status: "success",
        room
    });
});

exports.private = catchAsync(async(req, res, next) => {
    const {password, _id, private} = req.body;
    
    let room;

    if(private){
        room = await Room.findByIdAndUpdate(_id, {password, private: true}, {new: true});
    }

    if(!private){
        room = await Room.findByIdAndUpdate(_id, {password: undefined, private: false}, {new: true});
    }

    res.status(200).json({
        status: "success",
        room
    });
});  

exports.checkPassword = catchAsync(async(req, res, next) => {
    const {password, _id} = req.body;
    const userID = req.user.id;

    let room = await Room.findById(_id).select("+password");

    const correct = room.password === password;

    if(!correct) return next(new appError("Password is incorrect", 401));

    room = await Room.findByIdAndUpdate(_id, {$push : {verified: userID}}, {new: true});

    res.status(200).json({
        status: "success",
        room,
    });
});


exports.getRoom = catchAsync(async(req, res, next) => {
    const name = req.params.name;

    const room = await Room.findOne({room: name});

    res.status(200).json({
        status: "success",
        room
    });
});

exports.delete = catchAsync(async(req, res, next) => {
    const id = req.params.id;

    await Room.findByIdAndDelete(id);

    res.status(200).json({
        status: "success",
    });
});