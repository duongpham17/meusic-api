const mongoose = require('mongoose');
const crypto = require('crypto');

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
    confirmation: {
        type: String
    },
    link_expiration_time:{
        type: Date,
        default: Date.now() + (1 * 60 * 60 * 1000),
    }
});

//generate a random token to verify users email
userSchema.methods.createVerifyToken = function(){
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const hashToken = crypto.createHash('sha256').update(verifyToken).digest('hex');

    //given to user to verify account
    this.confirmation = hashToken;

    //link will expire timer
    this.link_expiration_time = Date.now() + (1 * 60 * 60 * 1000);

    this.save();

    return hashToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;