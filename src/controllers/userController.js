const {appError, catchAsync} = require('../utils/catchError');
const User = require("../models/userModel");
const { requestEmailChange } = require("../email");

exports.updateUsername = catchAsync(async(req, res, next) => {
    const {username} = req.body;

    const usernameExist = await User.findOne({username});

    if(usernameExist) return next(new appError("Username already exist", 401));

    const user = await User.findByIdAndUpdate(req.user.id, {username}, {new: true});

    res.status(200).json({
        status: "success",
        user
    });
});

exports.requestEmailChange = catchAsync(async(req, res, next) => {
    const userID = req.user._id;
    const {email} = req.body;

    let user = await User.findOne({email});

    if(user) return next(new appError("Email already exist", 401));

    user = await User.findById(userID);

    const {code} = user.createVerifyToken();

    await requestEmailChange({ 
        email,
        code,
    });

    res.status(200).json({
        status: "success",
        message: 'sent'
    });

});

exports.updateEmailConfirm = catchAsync(async (req, res, next) => {
    const {code, email} = req.body;
    const userID = req.user._id;

    let user = await User.findById(userID).select('+code');

    const correctCode = !user || await user.correctPassword(code, user.code);

    if (!correctCode) return next(new appError("Incorrect code", 401));

    user.code = undefined;

    user = await User.findByIdAndUpdate(userID, {email}, {new: true});

    res.status(200).json({
        status: "success",
        user
    });
});

exports.updateCryptoAddress = catchAsync(async(req, res, next) => {
    const userID = req.user._id;
    const {hexAddress} = req.body;

    let user = await User.findById(userID);

    const alreadyLinked = user.cryptoAddress.includes(hexAddress);

    if(alreadyLinked) return next(new appError("Already linked", 401));

    const linkedToOtherAccount = await User.findOne({cryptoAddress: {$in: [hexAddress]}});

    if(linkedToOtherAccount) return next(new appError("Already linked to another account", 401));

    user = await User.findByIdAndUpdate(userID, {$push: {cryptoAddress: hexAddress}}, {new: true});

    res.status(200).json({
        status: "success",
        user
    });
});

exports.removeCryptoAddress = catchAsync(async(req, res, next) => {
    const userID = req.user._id;
    const hexAddress = req.params.address;

    const user = await User.findByIdAndUpdate(userID, {$pull: {cryptoAddress: hexAddress}}, {new: true});

    res.status(200).json({
        status: "success",
        user
    });
});