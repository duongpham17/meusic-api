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

    const cryptoAddressExist = await User.findOne({cryptoAddress: hexAddress});

    if(cryptoAddressExist) return next(new appError("Crypto wallet already linked to another account", 401));

    const user = await User.findByIdAndUpdate(userID, {cryptoAddress: hexAddress}, {new: true});

    res.status(200).json({
        status: "success",
        user
    });
});