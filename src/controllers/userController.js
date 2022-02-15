const {appError, catchAsync} = require('../utils/catchError');
const User = require("../models/userModel");

exports.updateUsername = catchAsync(async(req, res, next) => {

    const {username} = req.body;

    const usernameExist = await User.findOne({username});

    if(usernameExist) return next(new appError("Username already exist", 401));

    const user = await User.findByIdAndUpdate(req.user.id, {username}, {new: true});

    res.status(200).json({
        status: "success",
        user
    });
})