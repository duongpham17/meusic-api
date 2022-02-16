const rateLimit = require('express-rate-limit');

const limiter = (rate, cooldownPeriod, message) => rateLimit({
    max: rate,
    windowMs: cooldownPeriod * 60 * 1000,
    message: message
});

module.exports = (app) => {
    app.use(`/api/auth/login`, limiter(10, 5, "Too many attempts. Try again in 5 minutes" ));
}