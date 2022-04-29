const {appError, catchAsync} = require('../utils/catchError');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {emailSignup, emailLogin} = require('../email');

/**
 * @param { Object } user - user information
 * @param { string } type - enum "email" | "crypto"
*/
const createSecureToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRES}d` });

    const expireInNumber = Date.now() + (process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000);

    const cookie = {
        token: `Bearer ${token}`,
        expires: expireInNumber,
    };

    return cookie;
};

exports.protect = catchAsync(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
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

    const select = ["email", "username", "role", "createdAt", "cryptoAddress"]

    const user = await User.findById(req.user.id).select(select);

    if(!user) return next(new appError('please log back in for a new token', 401));

    res.status(201).json({
        status: "success",
        user
    });
});

exports.signupEmail = catchAsync(async(req, res, next) => {
    const { email } = req.body;

    let user = await User.findOne({ email, verified: false });

    if (user) {

        const {code, hashToken} = user.createVerifyToken();

        const confirmURL = `/confirm/${code}-${hashToken}`;
    
        await emailSignup({
            email: user.email,
            url: confirmURL,
            code
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

    user = await User.create({ email, username, verified: false });

    const {code, hashToken} = user.createVerifyToken();

    const confirmURL = `/confirm/${code}-${hashToken}`;

    await emailSignup({
        email: user.email,
        url: confirmURL,
        code
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

    const {code, hashToken} = user.createVerifyToken();

    const confirmURL = `/confirm/${`${code}-${hashToken}`}`;

    await emailLogin({
        email: user.email,
        url: confirmURL,
        code
    });

    res.status(200).json({
        status: "success",
        message: 'sent'
    });
});

exports.confirmEmail = catchAsync(async (req, res, next) => {
    const token = req.params.code;

    const [code, confirmation] = token.split("-");

    let user = await User.findOne({confirmation}).select('+code');

    const linkExpired = Date.now() > user.link_expiration_time;

    if(linkExpired) return next(new appError("This confirmation code no longer exist", 401));

    const correctUser = !user || await user.correctPassword(code, user.code);

    if (!correctUser) return next(new appError("This confirmation code no longer exist", 401));

    user.code = undefined;
    user.confirmation = undefined;
    user.verified = undefined;

    await user.save();

    const cookie = createSecureToken(user);

    res.status(200).json({
        status: "success",
        user,
        cookie
    });
});

exports.confirmCode = catchAsync(async (req, res, next) => {
    const {code, email} = req.body;

    let user = await User.findOne({email}).select('+code');

    const linkExpired = Date.now() > user.link_expiration_time;

    if(linkExpired) return next(new appError("This confirmation code no longer exist", 401));

    const correctUser = !user || await user.correctPassword(code, user.code);

    if (!correctUser) return next(new appError("This confirmation code no longer exist", 401));

    user.code = undefined;
    user.confirmation = undefined;
    user.verified = undefined;

    await user.save();

    const cookie = createSecureToken(user);

    res.status(200).json({
        status: "success",
        user,
        cookie
    });
});

exports.cryptoAuthentication = catchAsync(async(req, res, next) => {
    const {hexAddress} = req.body;

    let user = await User.findOne({cryptoAddress: hexAddress});

    if(!user) {

        const generateRandomName = (string) => {
            const randomNumber = (string) => Math.floor(Math.random() * Number(string.length));
    
            let name = [];
    
            const splitString = string.split("");
            
            for(let i = 0; i < 12; i++) name.push(splitString[randomNumber(hexAddress)]);
    
            return name.join("");
        };

        const randomName = generateRandomName(hexAddress);
    
        const username = `${randomName.substring(0, 5)} ${randomName.substring(5)}`;

        const email = `${randomName}@unknown.io`;

        user = await User.create({cryptoAddress: hexAddress, username, email});
    };

    const cookie = createSecureToken(user);

    res.status(200).json({
        status: "success",
        user,
        cookie
    });

});