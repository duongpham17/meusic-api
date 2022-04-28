const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    cryptoAddress: {
        type: String,
    },
    code: {
        type: String,
        select: false,
    },
    confirmation: {
        type: String
    },
    link_expiration_time:{
        type: Date,
        default: Date.now() + (1 * 60 * 60 * 1000),
    },
    verified: {
        type: Boolean
    }
});

//hashing the code
userSchema.pre('save', async function(next){
    //only run this when password has been modified
    if(!this.code) return next();

    //hash password
    this.code = await bcrypt.hash(this.code, 12);

    next();
});

//check if confirm password matches the encrypted password.
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return bcrypt.compare(candidatePassword, userPassword)
}

//generate a random token to verify users email
userSchema.methods.createVerifyToken = function(){
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const hashToken = crypto.createHash('sha256').update(verifyToken).digest('hex');

    const code = Math.floor(100000 + Math.random() * 900000);

    //given to user to verify account
    this.code = code;
    this.confirmation = hashToken;

    //link will expire timer in 5min
    this.link_expiration_time = Date.now() + ( 5 * 60 * 1000);

    this.save();

    return {hashToken, code};
};

const User = mongoose.model('User', userSchema);

module.exports = User;