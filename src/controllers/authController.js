const User = require('../models/userModel');
const {appError, catchAsync} = require('../utils/catchError');

const {emailSignup, emailLogin} = require('../email');

const {promisify} = require('util');
const jwt = require('jsonwebtoken');

const isDevelopment = process.env.NODE_ENV === "development";

const createSecureToken = (res, user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRES}d` });

    const cookieOptions = {
        expires: new Date(Date.now() + (process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000)),
        maxAge: process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000,
        sameSite: isDevelopment ? "" : "none",
        httpOnly: isDevelopment ? false : true,
        secure: isDevelopment ? false : true,
    };

    res.cookie("jwt", token, cookieOptions);

    return token;
};

exports.protect = catchAsync(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if(!token) return next(new appError('Login to access these features', 401));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const existingUser = await User.findById(decoded.id).select(['role']);

    if(!existingUser) return next(new appError('The user belonging to this token does not exist.', 401));

    req.user = existingUser;

    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new appError('You do not have permission to perform this action', 403))
        }
        next();
    }
};

exports.loggedIn = catchAsync(async (req, res, next) => {

    const select = ["email", "username", "role", "createdAt"]

    const user = await User.findById(req.user.id).select(select);

    if(!user) return next(new appError('please log back in for a new token', 401));

    res.status(201).json({
        status: "success",
        user
    })
});

exports.signupEmail = catchAsync(async(req, res, next) => {
    const { email } = req.body;

    let user = await User.findOne({ email, verified: false });

    if (user) {

        const hashToken = user.createVerifyToken();

        const confirmURL = `/confirm/${hashToken}`;
    
        await emailSignup({
            email: user.email,
            url: confirmURL,
        });
    
        return res.status(200).json({
            status: "success",
            message: 'sent',
        });
    }

    user = await User.findOne({email});

    if (user) return next(new appError("Email has been taken", 401));

    res.status(200).json({
        status: "success",
        message: "available",
    });

});

exports.signupUsername = catchAsync(async (req, res, next) => {
    const { email, username } = req.body;

    let user = await User.findOne({ username });

    if (user) return next(new appError("Username has been taken", 401));

    user = await User.create({ email, username });

    const hashToken = user.createVerifyToken();

    const confirmURL = `/confirm/${hashToken}`;

    await emailSignup({
        email: user.email,
        url: confirmURL,
    });

    res.status(200).json({
        status: "success",
        message: 'sent'
    });
});

exports.login = catchAsync(async(req, res, next) => {
    const {email} = req.body;

    let user = await User.findOne({email});

    if(!user) return next(new appError("Incorrect credentials", 401));

    const hashToken = user.createVerifyToken();

    const confirmURL = `/confirm/${hashToken}`;

    await emailLogin({
        email: user.email,
        url: confirmURL,
    });

    res.status(200).json({
        status: "success",
        message: 'sent'
    });
});

exports.confirmEmail = catchAsync(async (req, res, next) => {
    const confirmation = req.params.code;

    let user = await User.findOne({confirmation});

    const linkExpired = Date.now() > user.link_expiration_time;

    if(linkExpired) return next(new appError("This confirmation code no longer exist", 401));

    user.confirmation = undefined;
    user.verified = undefined;

    await user.save();

    const token = createSecureToken(res, user);

    res.status(200).json({
        status: "success",
        user,
        token,
    });
});


exports.logout = async (req, res, next) => {
    const options = {
        expires: new Date( Date.now() + 2000),
        httpOnly: isDevelopment ? false : true,
        secure: isDevelopment ? false: true
    }

    res.cookie('jwt', 'expiredtoken', options);
    res.cookie('login', 'expiredToken', options);

    res.status(200).json({
        status: 'success'
    });
};