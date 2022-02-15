const rateLimit = require('express-rate-limit');

const limiter = (rate, minute, message) => rateLimit({
    max: rate,
    windowMs: minute * 60 * 1000,
    message: message
});

module.exports = (app) => {
    
}